-- ============================================================
-- SalaireMètre — Données de référence initiales
-- Sources : DARES 2023, APEC 2023, INSEE 2022
-- ============================================================

INSERT INTO salary_reference (
  job_title, sector, education_level, study_domain,
  experience_min, experience_max, company_size, region,
  salary_min, salary_median, salary_max,
  impact_management, impact_mobility, impact_remote, impact_language,
  source, reference_year
) VALUES

-- ============================================================
-- TECH / INFORMATIQUE
-- ============================================================

-- Développeur Full Stack — Junior
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 0, 2, 'pme', 'idf',
  32000, 38000, 44000, 12, 5, -3, 8, 'apec', 2023),
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 0, 2, 'pme', 'province',
  28000, 33000, 38000, 12, 5, -2, 8, 'apec', 2023),
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 0, 2, 'grand_groupe', 'idf',
  35000, 41000, 47000, 12, 5, -3, 8, 'apec', 2023),

-- Développeur Full Stack — Confirmé
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 3, 6, 'pme', 'idf',
  42000, 52000, 62000, 15, 5, -2, 8, 'apec', 2023),
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 3, 6, 'pme', 'province',
  36000, 44000, 54000, 15, 5, -2, 8, 'apec', 2023),
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 3, 6, 'grand_groupe', 'idf',
  46000, 56000, 68000, 15, 5, -2, 8, 'apec', 2023),

-- Développeur Full Stack — Senior
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 7, 99, 'pme', 'idf',
  55000, 68000, 85000, 18, 5, -2, 10, 'apec', 2023),
('Développeur Full Stack', 'tech', 'bac5', 'ingenierie_informatique', 7, 99, 'grand_groupe', 'idf',
  60000, 76000, 95000, 18, 5, -2, 10, 'apec', 2023),

-- Data Scientist
('Data Scientist', 'tech', 'bac5', 'ingenierie_informatique', 0, 2, 'pme', 'idf',
  36000, 43000, 50000, 12, 3, -2, 10, 'apec', 2023),
('Data Scientist', 'tech', 'bac5', 'ingenierie_informatique', 3, 6, 'pme', 'idf',
  46000, 56000, 68000, 15, 3, -2, 12, 'apec', 2023),
('Data Scientist', 'tech', 'bac5', 'ingenierie_informatique', 7, 99, 'grand_groupe', 'idf',
  62000, 78000, 100000, 18, 3, -2, 12, 'apec', 2023),

-- Chef de Projet IT
('Chef de Projet IT', 'tech', 'bac5', 'ingenierie_informatique', 3, 6, 'pme', 'idf',
  42000, 52000, 63000, 15, 8, 0, 10, 'apec', 2023),
('Chef de Projet IT', 'tech', 'bac5', 'ingenierie_informatique', 7, 99, 'grand_groupe', 'idf',
  55000, 68000, 82000, 18, 8, 0, 10, 'apec', 2023),

-- DevOps / SRE
('DevOps / SRE', 'tech', 'bac5', 'ingenierie_informatique', 0, 2, 'pme', 'idf',
  38000, 45000, 53000, 12, 3, -2, 12, 'apec', 2023),
('DevOps / SRE', 'tech', 'bac5', 'ingenierie_informatique', 3, 6, 'grand_groupe', 'idf',
  52000, 63000, 76000, 15, 3, -2, 12, 'apec', 2023),

-- ============================================================
-- FINANCE / BANQUE
-- ============================================================

-- Analyste Financier
('Analyste Financier', 'finance', 'bac5', 'finance_compta', 0, 2, 'grand_groupe', 'idf',
  38000, 46000, 55000, 10, 5, -5, 15, 'apec', 2023),
('Analyste Financier', 'finance', 'bac5', 'finance_compta', 3, 6, 'grand_groupe', 'idf',
  50000, 62000, 78000, 12, 5, -5, 15, 'apec', 2023),
('Analyste Financier', 'finance', 'bac5', 'finance_compta', 7, 99, 'grand_groupe', 'idf',
  65000, 82000, 110000, 15, 5, -5, 15, 'apec', 2023),

-- Contrôleur de Gestion
('Contrôleur de Gestion', 'finance', 'bac5', 'finance_compta', 0, 2, 'pme', 'idf',
  33000, 40000, 47000, 10, 3, -3, 8, 'apec', 2023),
('Contrôleur de Gestion', 'finance', 'bac5', 'finance_compta', 3, 6, 'pme', 'province',
  34000, 41000, 50000, 12, 3, -3, 8, 'apec', 2023),
('Contrôleur de Gestion', 'finance', 'bac5', 'finance_compta', 7, 99, 'grand_groupe', 'idf',
  54000, 67000, 82000, 15, 3, -3, 10, 'apec', 2023),

-- ============================================================
-- RESSOURCES HUMAINES
-- ============================================================

('Chargé(e) RH', 'rh', 'bac3', 'rh', 0, 2, 'pme', 'idf',
  26000, 30000, 36000, 8, 2, -2, 5, 'dares', 2023),
('Chargé(e) RH', 'rh', 'bac5', 'rh', 3, 6, 'pme', 'idf',
  33000, 40000, 48000, 10, 2, -2, 8, 'dares', 2023),
('HRBP / RRH', 'rh', 'bac5', 'rh', 5, 10, 'grand_groupe', 'idf',
  48000, 58000, 72000, 15, 5, -2, 12, 'apec', 2023),
('DRH', 'rh', 'bac5', 'rh', 10, 99, 'grand_groupe', 'idf',
  75000, 95000, 130000, 20, 5, -3, 12, 'apec', 2023),

-- ============================================================
-- MARKETING / COMMUNICATION
-- ============================================================

('Chef de Projet Marketing', 'marketing', 'bac5', 'marketing_communication', 0, 2, 'pme', 'idf',
  28000, 34000, 40000, 10, 5, -2, 8, 'apec', 2023),
('Chef de Projet Marketing', 'marketing', 'bac5', 'marketing_communication', 3, 6, 'grand_groupe', 'idf',
  40000, 50000, 62000, 12, 5, -2, 10, 'apec', 2023),
('Responsable Marketing Digital', 'marketing', 'bac5', 'marketing_communication', 3, 6, 'pme', 'idf',
  38000, 47000, 58000, 15, 5, -2, 10, 'apec', 2023),

-- ============================================================
-- SANTÉ
-- ============================================================

('Médecin salarié (hôpital)', 'sante', 'doctorat', 'sante_pharma', 0, 5, 'grand_groupe', 'province',
  48000, 60000, 80000, 10, 8, -8, 5, 'dares', 2023),
('Médecin salarié (hôpital)', 'sante', 'doctorat', 'sante_pharma', 5, 99, 'grand_groupe', 'idf',
  55000, 72000, 100000, 12, 8, -8, 5, 'dares', 2023),
('Infirmier(e)', 'sante', 'bac3', 'sante_pharma', 0, 5, 'grand_groupe', 'province',
  22000, 26000, 32000, 5, 5, -8, 0, 'dares', 2023),
('Pharmacien(ne)', 'sante', 'doctorat', 'sante_pharma', 0, 5, 'pme', 'province',
  36000, 44000, 55000, 8, 3, -5, 5, 'dares', 2023),

-- ============================================================
-- INDUSTRIE / INGÉNIERIE
-- ============================================================

('Ingénieur Mécanique', 'industrie', 'bac5', 'ingenierie_autre', 0, 2, 'eti', 'province',
  30000, 36000, 42000, 10, 10, -5, 8, 'apec', 2023),
('Ingénieur Mécanique', 'industrie', 'bac5', 'ingenierie_autre', 3, 6, 'eti', 'province',
  38000, 46000, 56000, 12, 10, -5, 8, 'apec', 2023),
('Ingénieur Qualité', 'industrie', 'bac5', 'ingenierie_autre', 0, 2, 'eti', 'province',
  30000, 36000, 43000, 10, 8, -5, 8, 'apec', 2023),
('Ingénieur Qualité', 'industrie', 'bac5', 'ingenierie_autre', 3, 6, 'grand_groupe', 'idf',
  42000, 52000, 63000, 12, 8, -5, 10, 'apec', 2023),

-- ============================================================
-- COMMERCE / VENTE
-- ============================================================

('Commercial(e) B2B', 'commerce', 'bac2', 'commerce_gestion', 0, 2, 'pme', 'province',
  25000, 30000, 38000, 8, 15, 0, 5, 'dares', 2023),
('Commercial(e) B2B', 'commerce', 'bac5', 'commerce_gestion', 3, 6, 'grand_groupe', 'idf',
  38000, 48000, 62000, 10, 15, 0, 10, 'apec', 2023),
('Responsable Commercial', 'commerce', 'bac5', 'commerce_gestion', 5, 99, 'grand_groupe', 'idf',
  52000, 65000, 85000, 20, 15, 0, 12, 'apec', 2023),

-- ============================================================
-- DROIT
-- ============================================================

('Juriste d''entreprise', 'droit', 'bac5', 'droit', 0, 2, 'pme', 'idf',
  32000, 38000, 46000, 8, 3, -3, 12, 'apec', 2023),
('Juriste d''entreprise', 'droit', 'bac5', 'droit', 3, 6, 'grand_groupe', 'idf',
  45000, 56000, 70000, 10, 3, -3, 15, 'apec', 2023),
('Avocat salarié', 'droit', 'doctorat', 'droit', 0, 3, 'pme', 'idf',
  35000, 44000, 58000, 8, 5, -3, 20, 'apec', 2023);
