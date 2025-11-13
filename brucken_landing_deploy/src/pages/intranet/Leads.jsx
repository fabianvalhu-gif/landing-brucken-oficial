import { useEffect, useMemo, useState } from "react";
import IntranetLayout from "../../components/intranet/IntranetLayout";
import { supabase } from "../../lib/supabase";

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [
        l.first_name,
        l.last_name,
        l.email,
        l.phone,
        l.company_name,
        l.notes,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [leads, query]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      // Companies (for selector)
      const { data: comps } = await supabase
        .from("companies")
        .select("id,name")
        .order("name", { ascending: true });
      setCompanies(comps || []);

      // Contacts with tag 'landing'
      const { data: contacts, error } = await supabase
        .from("contacts")
        .select("id, first_name, last_name, email, phone, company_id, notes, created_at")
        .contains("tags", ["landing"])
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) {
        console.error("Error cargando leads", error);
        setLeads([]);
        setLoading(false);
        return;
      }

      // Join company names
      const companyMap = new Map((comps || []).map((c) => [c.id, c.name]));
      const leadIds = (contacts || []).map((c) => c.id);

      // Fetch deals for these contacts to know if they already have an opportunity
      let dealsByContact = new Map();
      if (leadIds.length) {
        const { data: deals } = await supabase
          .from("deals")
          .select("id, contact_id")
          .in("contact_id", leadIds);
        (deals || []).forEach((d) => {
          dealsByContact.set(d.contact_id, true);
        });
      }

      const shaped = (contacts || []).map((c) => ({
        ...c,
        company_name: c.company_id ? companyMap.get(c.company_id) || "—" : "—",
        hasDeal: dealsByContact.get(c.id) || false,
      }));

      setLeads(shaped);
      setLoading(false);
    };

    run();
  }, []);

  const updateContact = async (id, changes) => {
    setSavingId(id);
    const { error } = await supabase.from("contacts").update(changes).eq("id", id);
    if (error) console.error("No se pudo guardar", error);
    setSavingId(null);
    // refresh local state
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...changes } : l)));
  };

  const createDeal = async (lead) => {
    try {
      setSavingId(lead.id);
      // find first stage
      const { data: firstStage } = await supabase
        .from("stages")
        .select("id, pipeline_id")
        .order("position", { ascending: true })
        .limit(1)
        .single();

      if (!firstStage) return;
      const title = `Lead - ${lead.first_name} ${lead.last_name}`.slice(0, 255);
      await supabase.from("deals").insert([
        {
          title,
          company_id: lead.company_id || null,
          contact_id: lead.id,
          pipeline_id: firstStage.pipeline_id,
          stage_id: firstStage.id,
          value: 0,
          status: "open",
          labels: ["landing"],
          notes: lead.notes || null,
          probability: 10,
        },
      ]);

      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, hasDeal: true } : l)));
    } catch (e) {
      console.error(e);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <IntranetLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 grid gap-3 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-petrol">Leads del formulario</h1>
            <p className="text-neutral-500 text-sm">Registros creados desde el sitio (tag: landing). Edita datos y crea oportunidades.</p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar lead..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-sm w-64 bg-white border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric/40"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px] bg-white rounded-2xl shadow-soft border border-neutral-100">
            <div className="grid grid-cols-12 px-4 py-3 text-xs font-semibold text-neutral-500 border-b">
              <div className="col-span-2">Fecha</div>
              <div className="col-span-2">Nombre</div>
              <div className="col-span-2">Email</div>
              <div className="col-span-2">Teléfono</div>
              <div className="col-span-2">Empresa</div>
              <div className="col-span-2 text-right">Acciones</div>
            </div>
            {loading ? (
              <div className="p-6 text-sm text-neutral-500">Cargando...</div>
            ) : filtered.length === 0 ? (
              <div className="p-6 text-sm text-neutral-500">No hay leads</div>
            ) : (
              filtered.map((l) => (
                <div key={l.id} className="grid grid-cols-12 items-center px-4 py-3 border-b last:border-b-0">
                  <div className="col-span-2 text-sm text-neutral-500">{new Date(l.created_at).toLocaleString()}</div>
                  <div className="col-span-2 font-medium">{l.first_name} {l.last_name}</div>
                  <div className="col-span-2">
                    <input
                      className="text-sm w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric/40"
                      value={l.email || ""}
                      onChange={(e) => setLeads((prev) => prev.map((x) => (x.id === l.id ? { ...x, email: e.target.value } : x)))}
                      onBlur={() => updateContact(l.id, { email: l.email || null })}
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      className="text-sm w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric/40"
                      value={l.phone || ""}
                      onChange={(e) => setLeads((prev) => prev.map((x) => (x.id === l.id ? { ...x, phone: e.target.value } : x)))}
                      onBlur={() => updateContact(l.id, { phone: l.phone || null })}
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      className="text-sm w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-electric/40"
                      value={l.company_id || ""}
                      onChange={(e) => {
                        const val = e.target.value || null;
                        setLeads((prev) => prev.map((x) => (x.id === l.id ? { ...x, company_id: val, company_name: companyLabel(val) } : x)));
                        updateContact(l.id, { company_id: val });
                      }}
                    >
                      <option value="">— Sin empresa —</option>
                      {companies.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 flex justify-end gap-2">
                    {l.hasDeal ? (
                      <span className="px-3 py-1 rounded-full text-xs bg-green-50 text-green-700 border border-green-200">Con oportunidad</span>
                    ) : (
                      <button
                        className="btn-primary text-xs px-3 py-1"
                        disabled={savingId === l.id}
                        onClick={() => createDeal(l)}
                      >
                        {savingId === l.id ? "Creando..." : "Crear oportunidad"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </IntranetLayout>
  );

  function companyLabel(id) {
    if (!id) return "—";
    const found = companies.find((c) => c.id === id);
    return found ? found.name : "—";
  }
}
