-- ============================================================
-- SalaireMètre — Schéma BDD
-- ============================================================

-- Énumérations
CREATE TYPE education_level AS ENUM (
  'bac',
  'bac2',
  'bac3',
  'bac5',
  'doctorat'
);

CREATE TYPE study_domain AS ENUM (
  'ingenierie_informatique',
  'ingenierie_autre',
  'commerce_gestion',
  'finance_compta',
  'droit',
  'sante_pharma',
  'rh',
  'marketing_communication',
  'sciences_humaines',
  'autre'
);

CREATE TYPE company_size AS ENUM (
  'tpe',    -- < 10 salariés
  'pme',    -- 10–249
  'eti',    -- 250–4999
  'grand_groupe' -- 5000+
);

CREATE TYPE region_category AS ENUM (
  'idf',       -- Île-de-France
  'province'   -- Reste de la France
);

-- ============================================================
-- Table principale : grille des salaires de référence
-- ============================================================
CREATE TABLE salary_reference (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Critères de filtrage
  job_title         TEXT NOT NULL,
  sector            TEXT NOT NULL,
  education_level   education_level NOT NULL,
  study_domain      study_domain NOT NULL,
  experience_min    SMALLINT NOT NULL CHECK (experience_min >= 0),
  experience_max    SMALLINT NOT NULL CHECK (experience_max >= experience_min),
  company_size      company_size NOT NULL,
  region            region_category NOT NULL,

  -- Données salariales (brut annuel en euros)
  salary_min        INTEGER NOT NULL,
  salary_median     INTEGER NOT NULL,
  salary_max        INTEGER NOT NULL,

  -- Facteurs d'impact (en pourcentage, ex: 8 = +8%)
  impact_management   SMALLINT DEFAULT 0,  -- prime si manager
  impact_mobility     SMALLINT DEFAULT 0,  -- prime si déplacements fréquents
  impact_remote       SMALLINT DEFAULT 0,  -- impact du télétravail (peut être négatif)
  impact_language     SMALLINT DEFAULT 0,  -- prime anglais / langue étrangère

  -- Méta
  source            TEXT NOT NULL,         -- 'dares', 'insee', 'apec', 'manual'
  reference_year    SMALLINT NOT NULL,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_salary_ref_lookup ON salary_reference (
  sector, education_level, experience_min, experience_max, region, company_size
);

-- ============================================================
-- Table : rapports générés (avant paiement = statut pending)
-- ============================================================
CREATE TABLE reports (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Données du formulaire soumis (stockées en JSON brut)
  form_data         JSONB NOT NULL,

  -- Résultat du calcul (pré-généré au moment de la soumission)
  salary_min        INTEGER,
  salary_median     INTEGER,
  salary_max        INTEGER,
  teaser_range      TEXT,       -- ex: "entre 32k et 48k€"
  report_content    JSONB,      -- détail complet du rapport (rempli après paiement)
  pdf_url           TEXT,       -- URL Supabase Storage du PDF généré

  -- Paiement
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'paid', 'failed')),
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,

  -- Contact (optionnel, pour renvoyer le rapport par email)
  email             TEXT,

  created_at        TIMESTAMPTZ DEFAULT NOW(),
  paid_at           TIMESTAMPTZ
);

CREATE INDEX idx_reports_stripe_session ON reports (stripe_session_id);
CREATE INDEX idx_reports_status ON reports (status);

-- ============================================================
-- Trigger : updated_at automatique sur salary_reference
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_salary_reference_updated_at
  BEFORE UPDATE ON salary_reference
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================
ALTER TABLE salary_reference ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- La grille est publique en lecture (le calcul se fait côté serveur de toute façon)
CREATE POLICY "salary_reference_read_all" ON salary_reference
  FOR SELECT USING (true);

-- Les rapports ne sont accessibles qu'en écriture/lecture via service role
-- (toutes les opérations passent par l'API Next.js avec la service key)
CREATE POLICY "reports_service_only" ON reports
  USING (false);
