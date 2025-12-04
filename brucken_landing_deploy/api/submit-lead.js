import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, company, message } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: 'Faltan campos obligatorios: name, email' });
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return res.status(500).json({ error: 'Configuración de Supabase incompleta en el servidor' });
    }

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1) Crear/obtener empresa (opcional)
    let companyId = null;
    let companyRecord = null;
    if (company && company.trim()) {
      const { data: insertedCompany, error: insCompErr } = await supabase
        .from('companies')
        .insert([
          {
            name: company.trim(),
            phone: phone || null,
            notes: 'Creado automáticamente desde el formulario de contacto del sitio',
          },
        ])
        .select()
        .single();

      if (insCompErr) {
        // Si falla (por políticas), intentamos buscar por nombre aproximado (no crítico)
        const { data: existing, error: selErr } = await supabase
          .from('companies')
          .select('id')
          .ilike('name', company.trim())
          .limit(1)
          .maybeSingle();
        if (!selErr && existing) {
          companyRecord = existing;
        }
      } else {
        companyRecord = insertedCompany;
      }

      companyId = companyRecord?.id || null;
    }

    // 2) Crear contacto
    const [firstName, ...rest] = name.trim().split(' ');
    const lastName = rest.join(' ') || '—';

    const { data: contact, error: contactErr } = await supabase
      .from('contacts')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone: phone || null,
          company_id: companyId,
          preferred_contact_method: 'email',
          tags: ['landing'],
          notes: message || null,
        },
      ])
      .select()
      .single();

    if (contactErr) {
      return res.status(500).json({ error: 'No fue posible crear el contacto', details: contactErr.message });
    }

    // 3) Crear deal en primer stage del pipeline (si existe)
    let stage = null;
    const { data: firstStage, error: stageErr } = await supabase
      .from('stages')
      .select('id, pipeline_id')
      .order('position', { ascending: true })
      .limit(1)
      .single();

    if (!stageErr && firstStage) stage = firstStage;

    if (stage) {
      const title = `Nuevo lead landing - ${company || firstName}`.slice(0, 255);
      await supabase.from('deals').insert([
        {
          title,
          company_id: companyId,
          contact_id: contact.id,
          pipeline_id: stage.pipeline_id,
          stage_id: stage.id,
          value: 0,
          status: 'open',
          labels: ['prioridad'],
          notes: message || null,
          probability: 10,
        },
      ]);
    }

    // 4) Enviar correo de notificación
    try {
      const {
        SMTP_HOST,
        SMTP_PORT,
        SMTP_USER,
        SMTP_PASS,
        EMAIL_TO = "sales@bruckenglobal.com",
        EMAIL_FROM,
      } = process.env;

      if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
        console.warn("SMTP config incompleta; no se envió correo");
      } else {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT),
          secure: Number(SMTP_PORT) === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const from = EMAIL_FROM || `Landing Brucken <${SMTP_USER}>`;
        const subject = `Nuevo lead desde landing: ${name}`;
        const text = `
Nuevo lead recibido desde la landing.

Nombre: ${name}
Email: ${email}
Teléfono: ${phone || "N/A"}
Empresa: ${company || "N/A"}

Mensaje:
${message || "Sin mensaje"}
`;
        await transporter.sendMail({
          from,
          to: EMAIL_TO,
          subject,
          text,
        });
      }
    } catch (mailErr) {
      console.error("No se pudo enviar el correo de aviso", mailErr);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('submit-lead error', err);
    return res.status(500).json({ error: 'Error interno al registrar el lead' });
  }
}
