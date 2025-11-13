-- =============================================
-- BRUCKEN CRM - Database Schema (IDEMPOTENT)
-- Se puede ejecutar múltiples veces sin errores
-- Ejecutar en Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- COMPANIES (Empresas/Organizaciones)
-- =============================================
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  legal_name VARCHAR(255),
  tax_id VARCHAR(100), -- RUT, Tax ID, EIN
  industry VARCHAR(100),
  company_type VARCHAR(100), -- S.A., S.R.L., LLC, etc.
  founded_year INTEGER,
  website VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  employees_count INTEGER,
  annual_revenue DECIMAL(15, 2),
  linkedin_url VARCHAR(255),
  twitter_url VARCHAR(255),
  facebook_url VARCHAR(255),
  primary_contact_name VARCHAR(255),
  primary_contact_email VARCHAR(255),
  primary_contact_phone VARCHAR(50),
  tags TEXT[], -- Array de tags personalizados
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =============================================
-- CONTACTS (Personas/Contactos)
-- =============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  title VARCHAR(150), -- Mr., Mrs., Dr., etc.
  position VARCHAR(100),
  department VARCHAR(100),
  email VARCHAR(255),
  email_secondary VARCHAR(255),
  phone VARCHAR(50),
  phone_secondary VARCHAR(50),
  mobile VARCHAR(50),
  birth_date DATE,
  linkedin_url VARCHAR(255),
  twitter_url VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  languages TEXT[], -- Array: ['Español', 'Inglés']
  interests TEXT[], -- Array de intereses
  tags TEXT[], -- Array de tags personalizados
  preferred_contact_method VARCHAR(50), -- email, phone, whatsapp
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =============================================
-- PIPELINES (Pipelines de ventas)
-- =============================================
CREATE TABLE IF NOT EXISTS pipelines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- STAGES (Etapas del pipeline)
-- =============================================
CREATE TABLE IF NOT EXISTS stages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  position INTEGER NOT NULL,
  probability INTEGER DEFAULT 0, -- % de probabilidad de cierre
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- DEALS (Oportunidades de negocio)
-- =============================================
CREATE TABLE IF NOT EXISTS deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  pipeline_id UUID REFERENCES pipelines(id) ON DELETE CASCADE,
  stage_id UUID REFERENCES stages(id) ON DELETE SET NULL,
  value DECIMAL(15, 2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'USD',
  expected_close_date DATE,
  status VARCHAR(50) DEFAULT 'open', -- open, won, lost
  probability INTEGER DEFAULT 0,
  notes TEXT,
  labels TEXT[],
  lost_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id)
);

-- =============================================
-- ACTIVITIES (Actividades: llamadas, reuniones, tareas)
-- =============================================
CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(50) NOT NULL, -- call, meeting, task, email
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  duration INTEGER, -- minutos
  is_done BOOLEAN DEFAULT FALSE,
  done_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =============================================
-- NOTES (Notas generales)
-- =============================================
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =============================================
-- BOARDS (Tableros de proyecto estilo Asana)
-- =============================================
CREATE TABLE IF NOT EXISTS boards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(50) DEFAULT 'blue',
  is_archived BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =============================================
-- TASKS (Tareas en boards)
-- =============================================
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  board_id UUID REFERENCES boards(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'backlog', -- backlog, todo, in_progress, review, done
  priority VARCHAR(50) DEFAULT 'medium', -- low, medium, high
  category VARCHAR(50) DEFAULT 'tarea', -- tarea, minuta, seguimiento
  assignee VARCHAR(255), -- Nombre del asignado
  due_date DATE,
  tags TEXT[], -- Array de tags
  comments_count INTEGER DEFAULT 0,
  attachments_count INTEGER DEFAULT 0,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- =============================================
-- INDEXES para performance (crear solo si no existen)
-- =============================================
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);
CREATE INDEX IF NOT EXISTS idx_contacts_company ON contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage_id);
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);

-- Retro-compat (solo agrega columnas si faltan)
ALTER TABLE deals ADD COLUMN IF NOT EXISTS labels TEXT[];
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id) ON DELETE SET NULL;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'tarea';
CREATE INDEX IF NOT EXISTS idx_deals_company ON deals(company_id);
CREATE INDEX IF NOT EXISTS idx_activities_deal ON activities(deal_id);
CREATE INDEX IF NOT EXISTS idx_activities_due_date ON activities(due_date);
CREATE INDEX IF NOT EXISTS idx_activities_is_done ON activities(is_done);
CREATE INDEX IF NOT EXISTS idx_tasks_board ON tasks(board_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee ON tasks(assignee);

-- =============================================
-- ROW LEVEL SECURITY (RLS) - Habilitar si no está habilitado
-- =============================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Políticas: Los usuarios autenticados pueden ver y editar todo
-- Usar DROP POLICY IF EXISTS para evitar errores si ya existen
DROP POLICY IF EXISTS "Users can view all companies" ON companies;
CREATE POLICY "Users can view all companies" ON companies FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert companies" ON companies;
CREATE POLICY "Users can insert companies" ON companies FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update companies" ON companies;
CREATE POLICY "Users can update companies" ON companies FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can delete companies" ON companies;
CREATE POLICY "Users can delete companies" ON companies FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all contacts" ON contacts;
CREATE POLICY "Users can view all contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert contacts" ON contacts;
CREATE POLICY "Users can insert contacts" ON contacts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update contacts" ON contacts;
CREATE POLICY "Users can update contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can delete contacts" ON contacts;
CREATE POLICY "Users can delete contacts" ON contacts FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all pipelines" ON pipelines;
CREATE POLICY "Users can view all pipelines" ON pipelines FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert pipelines" ON pipelines;
CREATE POLICY "Users can insert pipelines" ON pipelines FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update pipelines" ON pipelines;
CREATE POLICY "Users can update pipelines" ON pipelines FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all stages" ON stages;
CREATE POLICY "Users can view all stages" ON stages FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert stages" ON stages;
CREATE POLICY "Users can insert stages" ON stages FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update stages" ON stages;
CREATE POLICY "Users can update stages" ON stages FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all deals" ON deals;
CREATE POLICY "Users can view all deals" ON deals FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert deals" ON deals;
CREATE POLICY "Users can insert deals" ON deals FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update deals" ON deals;
CREATE POLICY "Users can update deals" ON deals FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can delete deals" ON deals;
CREATE POLICY "Users can delete deals" ON deals FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all activities" ON activities;
CREATE POLICY "Users can view all activities" ON activities FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert activities" ON activities;
CREATE POLICY "Users can insert activities" ON activities FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update activities" ON activities;
CREATE POLICY "Users can update activities" ON activities FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can delete activities" ON activities;
CREATE POLICY "Users can delete activities" ON activities FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all notes" ON notes;
CREATE POLICY "Users can view all notes" ON notes FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert notes" ON notes;
CREATE POLICY "Users can insert notes" ON notes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update notes" ON notes;
CREATE POLICY "Users can update notes" ON notes FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can delete notes" ON notes;
CREATE POLICY "Users can delete notes" ON notes FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all boards" ON boards;
CREATE POLICY "Users can view all boards" ON boards FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert boards" ON boards;
CREATE POLICY "Users can insert boards" ON boards FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update boards" ON boards;
CREATE POLICY "Users can update boards" ON boards FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can delete boards" ON boards;
CREATE POLICY "Users can delete boards" ON boards FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all tasks" ON tasks;
CREATE POLICY "Users can view all tasks" ON tasks FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can insert tasks" ON tasks;
CREATE POLICY "Users can insert tasks" ON tasks FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update tasks" ON tasks;
CREATE POLICY "Users can update tasks" ON tasks FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can delete tasks" ON tasks;
CREATE POLICY "Users can delete tasks" ON tasks FOR DELETE USING (auth.role() = 'authenticated');

-- =============================================
-- DATOS INICIALES (Pipeline por defecto)
-- Solo insertar si no existe
-- =============================================
DO $$
BEGIN
  -- Insertar pipeline solo si no existe
  IF NOT EXISTS (SELECT 1 FROM pipelines WHERE name = 'Ventas Principal') THEN
    INSERT INTO pipelines (name, description) VALUES 
      ('Ventas Principal', 'Pipeline de ventas estándar');
  END IF;
END $$;

-- Crear etapas del pipeline solo si no existen
DO $$
DECLARE
  v_pipeline_id UUID;
  v_stage_count INTEGER;
BEGIN
  SELECT id INTO v_pipeline_id FROM pipelines WHERE name = 'Ventas Principal';
  
  -- Verificar si ya existen stages para este pipeline
  SELECT COUNT(*) INTO v_stage_count FROM stages WHERE pipeline_id = v_pipeline_id;
  
  -- Solo insertar si no hay stages
  IF v_stage_count = 0 THEN
    INSERT INTO stages (pipeline_id, name, position, probability) VALUES
      (v_pipeline_id, 'Lead Nuevo', 1, 10),
      (v_pipeline_id, 'Contactado', 2, 20),
      (v_pipeline_id, 'Reunión Agendada', 3, 40),
      (v_pipeline_id, 'Propuesta Enviada', 4, 60),
      (v_pipeline_id, 'Negociación', 5, 80),
      (v_pipeline_id, 'Cerrado Ganado', 6, 100);
  END IF;
END $$;

-- =============================================
-- DATOS INICIALES (Board por defecto)
-- =============================================
DO $$
DECLARE
  v_board_id UUID;
BEGIN
  -- Insertar board solo si no existe
  IF NOT EXISTS (SELECT 1 FROM boards WHERE name = 'Desarrollo Web Q4 2025') THEN
    INSERT INTO boards (name, description, color) VALUES 
      ('Desarrollo Web Q4 2025', 'Proyecto de desarrollo del sitio web corporativo', 'blue')
    RETURNING id INTO v_board_id;
    
    -- Insertar tareas de demostración
    INSERT INTO tasks (board_id, title, description, status, priority, assignee, due_date) VALUES
      (v_board_id, 'Diseñar nueva landing page', 'Crear mockups y prototipos para la nueva landing', 'todo', 'high', 'Fabián', '2025-11-20'),
      (v_board_id, 'Implementar autenticación OAuth', 'Integrar Google y GitHub login', 'in_progress', 'medium', 'María', '2025-11-18'),
      (v_board_id, 'Revisar código del módulo de pagos', 'Code review y testing', 'review', 'high', 'Carlos', '2025-11-15'),
      (v_board_id, 'Actualizar documentación API', 'Documentar nuevos endpoints', 'backlog', 'low', 'Ana', '2025-11-25'),
      (v_board_id, 'Deploy a producción v2.0', 'Deployment y monitoreo post-launch', 'done', 'high', 'Fabián', '2025-11-10');
  END IF;
END $$;

-- =============================================
-- FUNCTIONS para actualizar updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers - usar DROP IF EXISTS para evitar errores
DROP TRIGGER IF EXISTS update_companies_updated_at ON companies;
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pipelines_updated_at ON pipelines;
CREATE TRIGGER update_pipelines_updated_at BEFORE UPDATE ON pipelines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_stages_updated_at ON stages;
CREATE TRIGGER update_stages_updated_at BEFORE UPDATE ON stages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_deals_updated_at ON deals;
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_activities_updated_at ON activities;
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_notes_updated_at ON notes;
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_boards_updated_at ON boards;
CREATE TRIGGER update_boards_updated_at BEFORE UPDATE ON boards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
