# Brucken Landing + Intranet CRM

Landing oficial y panel Intranet/CRM de Brucken AG Global.

## Contenido
- **Landing page** oscura con secciones: Hero, Value Proposition, Servicios, Software Factory, Representación, Podcast, Galería, Contacto.
- **Intranet CRM** (diseño claro) con: Pipeline de deals, Boards (tareas/minutas), Companies, Contacts, Dashboard base.
- **Integración Supabase** para autenticación y datos (empresas, contactos, deals, tareas).

## Stack
- Vite + React
- Tailwind CSS (tema oscuro landing / tema claro CRM)
- Framer Motion (animaciones)
- Supabase JS

## Scripts
En la carpeta `brucken_landing_deploy/`:
```bash
npm install
npm run dev
npm run build
```
Output de build: `dist/`

## Variables de entorno (ejemplo)
Crear `.env` (o `.env.local`) en `brucken_landing_deploy/`:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

## Deploy Vercel
Configurar proyecto apuntando al directorio `brucken_landing_deploy`:
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: `vite`
- Rewrites definidos en `vercel.json` para SPA.

## Estructura
```
brucken_landing_deploy/
  index.html
  src/
    pages/ (Landing + Intranet)
    components/
    styles/
    lib/
    utils/
```

## Licencia
MIT (pendiente de añadir archivo LICENSE si se requiere).

---
Mantener ramas limpias: `main` como producción. El contenido anterior se migró aquí.
