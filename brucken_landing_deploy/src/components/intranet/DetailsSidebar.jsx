import { X, Edit, Trash2, Mail, Phone, Building2, MapPin, Calendar, Globe, Linkedin, Twitter, Facebook, UserPlus } from "lucide-react";

export default function DetailsSidebar({ isOpen, onClose, data, type, onEdit, onDelete, onAddContact }) {
  if (!isOpen || !data) return null;

  const isCompany = type === 'company';
  const isContact = type === 'contact';

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white rounded-l-[32px] shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-cream to-sand text-petrol p-6 flex items-start justify-between border-b border-neutral-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isCompany && <Building2 className="w-6 h-6 text-petrol" />}
              {isContact && (
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl font-bold text-petrol shadow-soft">
                  {data.first_name?.[0]}{data.last_name?.[0]}
                </div>
              )}
              <h2 className="text-2xl font-bold">
                {isCompany ? data.name : `${data.first_name} ${data.last_name}`}
              </h2>
            </div>
            {isCompany && data.legal_name && (
              <p className="text-neutral-500 text-sm">{data.legal_name}</p>
            )}
            {isContact && data.position && (
              <p className="text-neutral-500">{data.position}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/60 rounded-xl transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-white">
          {/* Action Buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onEdit(data)}
              className="flex-1 min-w-[150px] px-4 py-3 bg-electric text-white rounded-2xl hover:bg-petrol transition-colors flex items-center justify-center gap-2 font-medium shadow-soft"
            >
              <Edit className="w-5 h-5" />
              Editar
            </button>
            <button
              onClick={() => onDelete(data.id)}
              className="flex-1 min-w-[150px] px-4 py-3 bg-red-100 text-red-700 rounded-2xl hover:bg-red-200 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Trash2 className="w-5 h-5" />
              Eliminar
            </button>
          </div>

          {/* Add Contact Button (only for companies) */}
          {isCompany && onAddContact && (
            <button
              onClick={() => onAddContact(data)}
              className="w-full px-4 py-3 bg-neutral-100 text-petrol rounded-2xl hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 font-medium shadow-soft"
            >
              <UserPlus className="w-5 h-5" />
              Agregar Contacto a esta Empresa
            </button>
          )}

          {/* Contact Information */}
          {isCompany && (
            <>
              <Section title="Información de Contacto">
                {data.email && <InfoRow icon={Mail} label="Email" value={data.email} />}
                {data.phone && <InfoRow icon={Phone} label="Teléfono" value={data.phone} />}
                {data.website && (
                  <InfoRow 
                    icon={Globe} 
                    label="Sitio Web" 
                    value={data.website}
                    link={data.website.startsWith('http') ? data.website : `https://${data.website}`}
                  />
                )}
              </Section>

              <Section title="Información Legal">
                {data.tax_id && <InfoRow label="RUT/Tax ID" value={data.tax_id} />}
                {data.company_type && <InfoRow label="Tipo de Empresa" value={data.company_type} />}
                {data.founded_year && <InfoRow label="Año de Fundación" value={data.founded_year} />}
              </Section>

              <Section title="Información Empresarial">
                {data.industry && <InfoRow label="Industria" value={data.industry} />}
                {data.employees_count && <InfoRow label="Empleados" value={data.employees_count.toLocaleString()} />}
                {data.annual_revenue && <InfoRow label="Revenue Anual" value={`$${parseFloat(data.annual_revenue).toLocaleString()}`} />}
              </Section>

              <Section title="Ubicación">
                {data.address && <InfoRow icon={MapPin} label="Dirección" value={data.address} />}
                {data.city && <InfoRow label="Ciudad" value={data.city} />}
                {data.state && <InfoRow label="Estado/Región" value={data.state} />}
                {data.country && <InfoRow label="País" value={data.country} />}
                {data.postal_code && <InfoRow label="Código Postal" value={data.postal_code} />}
              </Section>

              <Section title="Contacto Principal">
                {data.primary_contact_name && <InfoRow label="Nombre" value={data.primary_contact_name} />}
                {data.primary_contact_email && <InfoRow icon={Mail} label="Email" value={data.primary_contact_email} />}
                {data.primary_contact_phone && <InfoRow icon={Phone} label="Teléfono" value={data.primary_contact_phone} />}
              </Section>

              <Section title="Redes Sociales">
                {data.linkedin_url && (
                  <InfoRow 
                    icon={Linkedin} 
                    label="LinkedIn" 
                    value="Ver perfil"
                    link={data.linkedin_url}
                  />
                )}
                {data.twitter_url && (
                  <InfoRow 
                    icon={Twitter} 
                    label="Twitter" 
                    value="Ver perfil"
                    link={data.twitter_url}
                  />
                )}
                {data.facebook_url && (
                  <InfoRow 
                    icon={Facebook} 
                    label="Facebook" 
                    value="Ver perfil"
                    link={data.facebook_url}
                  />
                )}
              </Section>
            </>
          )}

          {isContact && (
            <>
              <Section title="Información de Contacto">
                {data.email && <InfoRow icon={Mail} label="Email Principal" value={data.email} />}
                {data.email_secondary && <InfoRow icon={Mail} label="Email Secundario" value={data.email_secondary} />}
                {data.phone && <InfoRow icon={Phone} label="Teléfono" value={data.phone} />}
                {data.phone_secondary && <InfoRow icon={Phone} label="Teléfono Secundario" value={data.phone_secondary} />}
                {data.mobile && <InfoRow icon={Phone} label="Móvil" value={data.mobile} />}
                {data.preferred_contact_method && (
                  <InfoRow label="Método Preferido" value={data.preferred_contact_method} />
                )}
              </Section>

              <Section title="Información Profesional">
                {data.title && <InfoRow label="Título" value={data.title} />}
                {data.position && <InfoRow label="Cargo" value={data.position} />}
                {data.department && <InfoRow label="Departamento" value={data.department} />}
              </Section>

              <Section title="Información Personal">
                {data.birth_date && (
                  <InfoRow 
                    icon={Calendar} 
                    label="Fecha de Nacimiento" 
                    value={new Date(data.birth_date).toLocaleDateString('es-ES')} 
                  />
                )}
                {data.languages && data.languages.length > 0 && (
                  <InfoRow label="Idiomas" value={data.languages.join(', ')} />
                )}
                {data.interests && data.interests.length > 0 && (
                  <InfoRow label="Intereses" value={data.interests.join(', ')} />
                )}
              </Section>

              <Section title="Ubicación">
                {data.address && <InfoRow icon={MapPin} label="Dirección" value={data.address} />}
                {data.city && <InfoRow label="Ciudad" value={data.city} />}
                {data.country && <InfoRow label="País" value={data.country} />}
              </Section>

              <Section title="Redes Sociales">
                {data.linkedin_url && (
                  <InfoRow 
                    icon={Linkedin} 
                    label="LinkedIn" 
                    value="Ver perfil"
                    link={data.linkedin_url}
                  />
                )}
                {data.twitter_url && (
                  <InfoRow 
                    icon={Twitter} 
                    label="Twitter" 
                    value="Ver perfil"
                    link={data.twitter_url}
                  />
                )}
              </Section>
            </>
          )}

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <Section title="Etiquetas">
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Notes */}
          {data.notes && (
            <Section title="Notas">
              <p className="text-neutral-700 whitespace-pre-wrap">{data.notes}</p>
            </Section>
          )}

          {/* Metadata */}
          <Section title="Información del Sistema">
            <InfoRow 
              icon={Calendar} 
              label="Creado" 
              value={new Date(data.created_at).toLocaleString('es-ES')} 
            />
            {data.updated_at && (
              <InfoRow 
                icon={Calendar} 
                label="Última Actualización" 
                value={new Date(data.updated_at).toLocaleString('es-ES')} 
              />
            )}
          </Section>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="border-b border-neutral-200 pb-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, link }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && (
        <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-neutral-600" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-neutral-500 mb-1">{label}</div>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
          >
            {value}
          </a>
        ) : (
          <div className="text-neutral-900 font-medium break-words">{value}</div>
        )}
      </div>
    </div>
  );
}
