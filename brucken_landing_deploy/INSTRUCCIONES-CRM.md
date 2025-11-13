# 🚀 INSTRUCCIONES PARA ACTIVAR EL CRM

## ✅ Todo está listo excepto la base de datos

### 📊 PASO 1: Ejecutar SQL en Supabase (OBLIGATORIO)

1. **Ve a Supabase SQL Editor:**
   https://supabase.com/dashboard/project/wjlxodpbmndmvxwzhefr/sql

2. **Click en "New query"**

3. **Copia TODO el contenido del archivo:**
   `supabase-schema.sql`

4. **Pégalo en el editor SQL**

5. **Click en "Run" (o Ctrl/Cmd + Enter)**

6. **Espera el mensaje:** "Success. No rows returned"

✅ Esto creará:
- 7 tablas (companies, contacts, pipelines, stages, deals, activities, notes)
- Índices para performance
- Seguridad (Row Level Security)
- Pipeline inicial con 6 etapas

---

## 🎯 PASO 2: Crear tu primer usuario (OPCIONAL si ya tienes)

1. **Ve a Authentication → Users:**
   https://supabase.com/dashboard/project/wjlxodpbmndmvxwzhefr/auth/users

2. **Click "Add user" → "Create new user"**

3. **Completa:**
   - Email: tu email
   - Password: tu contraseña
   - ✅ Marca "Auto Confirm User"

4. **Click "Create user"**

---

## 🌐 PASO 3: Probar el CRM

1. **Inicia el servidor local:**
   ```bash
   npm run dev
   ```

2. **Abre el navegador en:**
   - Login: http://localhost:4102/login
   - Ingresa con tu email y contraseña

3. **Explora el CRM:**
   - Dashboard: http://localhost:4102/intranet
   - Contactos: http://localhost:4102/intranet/contacts
   - Empresas: http://localhost:4102/intranet/companies
   - Pipeline: http://localhost:4102/intranet/pipeline
   - Actividades: http://localhost:4102/intranet/activities
   - Analytics: http://localhost:4102/intranet/analytics

---

## 📋 FUNCIONALIDADES COMPLETAS

### ✅ Módulo de Contactos
- ✅ Crear, editar, eliminar contactos
- ✅ Búsqueda en tiempo real
- ✅ Asociar contactos a empresas
- ✅ Campos: nombre, email, teléfono, cargo, LinkedIn, notas

### ✅ Módulo de Empresas
- ✅ Crear, editar, eliminar empresas
- ✅ Búsqueda por nombre, industria, ciudad
- ✅ Campos: nombre, industria, website, dirección, empleados, revenue

### ✅ Módulo de Pipeline Visual
- ✅ Vista Kanban estilo Pipedrive
- ✅ Drag & drop entre etapas
- ✅ 6 etapas predefinidas (Lead Nuevo → Cerrado Ganado)
- ✅ Totales por etapa
- ✅ Actualización automática en Supabase

### ✅ Dashboard
- ✅ Métricas en tiempo real (contactos, deals, revenue, actividades)
- ✅ Acciones rápidas
- ✅ Navegación completa

### 🔜 Próximamente (placeholders creados)
- Actividades y tareas
- Analytics y reportes BI

---

## 🐛 Troubleshooting

### Error: "relation companies does not exist"
👉 **Solución:** No ejecutaste el SQL. Ve al PASO 1.

### Error: "No se puede conectar a Supabase"
👉 **Solución:** Verifica que el archivo `.env.local` tenga las credenciales correctas:
```
VITE_SUPABASE_URL=https://wjlxodpbmndmvxwzhefr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Error: "Invalid login credentials"
👉 **Solución:** Crea el usuario en Supabase (PASO 2).

---

## 🚀 Deployment a Producción

Cuando estés listo para desplegar:

```bash
git add .
git commit -m "Agregar CRM completo con Supabase"
git push
```

Vercel detectará los cambios y desplegará automáticamente.

**IMPORTANTE:** Asegúrate de agregar las variables de entorno en Vercel:
1. Ve a: https://vercel.com/dashboard
2. Proyecto → Settings → Environment Variables
3. Agrega:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 📦 Archivos Creados

```
src/
├── pages/
│   ├── Login.jsx ✅
│   └── intranet/
│       ├── Dashboard.jsx ✅
│       ├── Pipeline.jsx ✅
│       ├── Contacts.jsx ✅ (Formulario completo)
│       ├── Companies.jsx ✅ (Formulario completo)
│       ├── Activities.jsx ✅ (Placeholder)
│       └── Analytics.jsx ✅ (Placeholder)
├── components/
│   ├── ProtectedRoute.jsx ✅
│   └── intranet/
│       ├── IntranetLayout.jsx ✅
│       ├── DealCard.jsx ✅
│       └── StageColumn.jsx ✅
└── lib/
    └── supabase.js ✅

supabase-schema.sql ✅ (BASE DE DATOS - EJECUTAR EN SUPABASE)
.env.local ✅ (Credenciales configuradas)
```

---

¡TODO LISTO! Solo ejecuta el SQL y empieza a usar tu CRM 🎉
