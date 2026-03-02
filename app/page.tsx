"use client";

import { useState, useEffect } from "react";

type IndustryId = "beaute" | "food" | "mode" | "finance" | "sante" | "btp" | "luxe" | "tech" | "education" | "sport";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  tag: string;
  tagClass: string;
}

const FLYER_ITEMS: ChecklistItem[] = [
  { id: "f1", label: "Titre accrocheur — Display ou H1", description: "Message principal court, percutant, lisible en 2 secondes", tag: "Contenu", tagClass: "t-c" },
  { id: "f2", label: "Sous-titre / accroche — H2", description: "Détail ou bénéfice clé, 1–2 lignes max", tag: "Contenu", tagClass: "t-c" },
  { id: "f3", label: "Informations essentielles", description: "Date, lieu, horaire, prix — tout ce que le lecteur doit retenir", tag: "Contenu", tagClass: "t-c" },
  { id: "f4", label: "Call to action (CTA)", description: "URL, QR code, numéro de téléphone, lien réseaux sociaux", tag: "Contenu", tagClass: "t-c" },
  { id: "f5", label: "Logo & identité de marque", description: "Logo vectoriel haute résolution (AI/EPS/SVG)", tag: "Contenu", tagClass: "t-c" },
  { id: "f6", label: "Format — A5 (148×210mm) ou A4", description: "Fond perdu 3mm pour impression · Vérifier dimensions imprimeur", tag: "Technique", tagClass: "t-t" },
  { id: "f7", label: "Hiérarchie typographique", description: "Titre ≥32px · Sous-titre 20–24px · Corps 14–16px · Max 2 polices", tag: "Visuel", tagClass: "t-v" },
  { id: "f8", label: "Palette — règle 60-30-10", description: "60% dominante · 30% secondaire · 10% accent · Max 4 couleurs", tag: "Visuel", tagClass: "t-v" },
  { id: "f9", label: "Image / visuel fort — 300 dpi min", description: "Print 300dpi · Digital PNG/WebP 72dpi · Libre de droits", tag: "Visuel", tagClass: "t-v" },
  { id: "f10", label: "Contraste WCAG ≥ 4.5:1", description: "Texte toujours lisible — vérifier avec Colour Contrast Analyser", tag: "Visuel", tagClass: "t-v" },
  { id: "f11", label: "Grille 4 col · Zone sécurité 5mm", description: "Espacement base 8px · Marges 10mm · Gouttière 5mm", tag: "Visuel", tagClass: "t-v" },
  { id: "f12", label: "Mode CMJN — export PDF haute res", description: "Convertir RGB → CMJN · PDF/X-1a pour imprimeur", tag: "Technique", tagClass: "t-t" },
];

const BROCHURE_ITEMS: ChecklistItem[] = [
  { id: "b1", label: "Couverture percutante", description: "Titre (Display/H1), visuel fort, logo — premier contact avec le lecteur", tag: "Contenu", tagClass: "t-c" },
  { id: "b2", label: "Structure narrative claire", description: "Introduction → Contenu → Conclusion / CTA", tag: "Contenu", tagClass: "t-c" },
  { id: "b3", label: "Textes validés & relus", description: "Contenu approuvé client — zéro faute", tag: "Contenu", tagClass: "t-c" },
  { id: "b4", label: "Contacts & mentions légales", description: "Adresse, site web, mentions obligatoires si requis", tag: "Contenu", tagClass: "t-c" },
  { id: "b5", label: "Format de pliage défini", description: "Tri-fold · Bi-fold · Z-fold — dimensions vérifiées imprimeur", tag: "Technique", tagClass: "t-t" },
  { id: "b6", label: "Grille 4–6 colonnes — alignements stricts", description: "Gouttières cohérentes sur toutes les pages", tag: "Visuel", tagClass: "t-v" },
  { id: "b7", label: "Hiérarchie typographique constante", description: "H1 24px · H2 18–20px · Corps 12–14pt · même style toutes pages", tag: "Visuel", tagClass: "t-v" },
  { id: "b8", label: "Images 300 dpi · libres de droits", description: "Vérifier licence avant usage commercial", tag: "Visuel", tagClass: "t-v" },
  { id: "b9", label: "Mode CMJN — profil ICC imprimeur", description: "Convertir en CMJN · demander le profil couleur à l'imprimeur", tag: "Technique", tagClass: "t-t" },
  { id: "b10", label: "Fond perdu 3mm · zone sécurité 5mm", description: "Pour tous les éléments importants proches des bords", tag: "Technique", tagClass: "t-t" },
];

const CARTE_ITEMS: ChecklistItem[] = [
  { id: "c1", label: "Nom complet & titre / poste", description: "Prénom Nom — Fonction officielle", tag: "Contenu", tagClass: "t-c" },
  { id: "c2", label: "Coordonnées complètes", description: "Téléphone, email, site web, adresse si nécessaire", tag: "Contenu", tagClass: "t-c" },
  { id: "c3", label: "Logo vectoriel de l'entreprise", description: "SVG/EPS/AI — pas de pixellisation possible", tag: "Contenu", tagClass: "t-c" },
  { id: "c4", label: "Réseaux sociaux / QR code", description: "LinkedIn, Instagram ou QR code vers portfolio/site", tag: "Contenu", tagClass: "t-c" },
  { id: "c5", label: "Format 85×55mm · fond perdu 2mm", description: "Standard Europe · zone de sécurité 3mm", tag: "Technique", tagClass: "t-t" },
  { id: "c6", label: "Typo petit format — police claire", description: "Nom 11–14pt · Titre 9–10pt · Coord. 7–9pt · non condensée", tag: "Visuel", tagClass: "t-v" },
  { id: "c7", label: "Recto / verso structuré", description: "Recto : identité visuelle · Verso : coordonnées ou message", tag: "Visuel", tagClass: "t-v" },
  { id: "c8", label: "Grille 3 col · espacement 4mm min", description: "Aucun élément ne touche les bords · respiration suffisante", tag: "Visuel", tagClass: "t-v" },
  { id: "c9", label: "CMJN · finition prévue", description: "Vernis UV · dorure · pelliculage mat/brillant selon positionnement", tag: "Technique", tagClass: "t-t" },
];

const FIDELITE_ITEMS: ChecklistItem[] = [
  { id: "fi1", label: "Nom de l'enseigne & logo", description: "Identité de marque clairement visible au recto", tag: "Contenu", tagClass: "t-c" },
  { id: "fi2", label: "Nombre de cases / tampons défini", description: "Combien de points / tampons pour déclencher la récompense", tag: "Contenu", tagClass: "t-c" },
  { id: "fi3", label: "Description claire de l'offre", description: "\"10ème café offert\" · \"-20% dès 5 achats\" — bien mis en valeur", tag: "Contenu", tagClass: "t-c" },
  { id: "fi4", label: "Conditions d'utilisation", description: "Date d'expiration, restrictions — verso en légende 7–8pt", tag: "Contenu", tagClass: "t-c" },
  { id: "fi5", label: "Coordonnées & contact", description: "Adresse, site web ou app si programme digital associé", tag: "Contenu", tagClass: "t-c" },
  { id: "fi6", label: "Format 85.6×54mm · fond perdu 2mm", description: "Standard carte bancaire · zone sécurité 3mm", tag: "Technique", tagClass: "t-t" },
  { id: "fi7", label: "Cases tampons bien dimensionnées", description: "Min 8×8mm · cohérentes avec l'identité de marque", tag: "Visuel", tagClass: "t-v" },
  { id: "fi8", label: "Hiérarchie typo claire", description: "Enseigne 12–14pt · Offre 10–12pt · Conditions 7–8pt · 1–2 polices", tag: "Visuel", tagClass: "t-v" },
  { id: "fi9", label: "Identité visuelle forte & mémorable", description: "Couleurs de marque dominantes — reconnaissable immédiatement", tag: "Visuel", tagClass: "t-v" },
  { id: "fi10", label: "QR code min 2×2cm si digital", description: "Taille minimum pour être scannable par téléphone", tag: "Technique", tagClass: "t-t" },
  { id: "fi11", label: "Carton 350g · finition adaptée", description: "Plastification mat ou brillant — durabilité assurée", tag: "Technique", tagClass: "t-t" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("system");
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryId | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, Record<string, boolean>>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Calculator State
  const [calcDocType, setCalcDocType] = useState("flyer");
  const [calcWidth, setCalcWidth] = useState<number>(210);
  const [calcHeight, setCalcHeight] = useState<number>(297);
  const [calcUnit, setCalcUnit] = useState<"mm" | "px">("mm");

  useEffect(() => {
    const saved = localStorage.getItem("dsp-v4");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved state", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleCheck = (tabId: string, itemIdx: number) => {
    const newState = {
      ...checkedItems,
      [tabId]: {
        ...(checkedItems[tabId] || {}),
        [itemIdx]: !(checkedItems[tabId]?.[itemIdx] || false),
      },
    };
    setCheckedItems(newState);
    localStorage.setItem("dsp-v4", JSON.stringify(newState));
  };

  const resetTab = (tabId: string) => {
    const newState = { ...checkedItems, [tabId]: {} };
    setCheckedItems(newState);
    localStorage.setItem("dsp-v4", JSON.stringify(newState));
  };

  const getProgress = (tabId: string, total: number) => {
    if (!isLoaded) return { checked: 0, total, pct: 0 };
    const checked = Object.values(checkedItems[tabId] || {}).filter(Boolean).length;
    return {
      checked,
      total,
      pct: total ? (checked / total) * 100 : 0
    };
  };

  const calculateSpecs = (w: number, h: number, unit: "mm" | "px") => {
    const minDim = Math.min(w, h);
    const diagonal = Math.sqrt(w * w + h * h);

    if (unit === "mm") {
      const body = Math.max(7, Math.min(12, 8 + Math.round(diagonal / 100)));
      return {
        bleed: 3,
        safety: Math.max(4, Math.round(minDim * 0.04)),
        margin: Math.max(8, Math.round(minDim * 0.08)),
        typo: {
          display: Math.round(body * 4),
          h1: Math.round(body * 2.5),
          h2: Math.round(body * 1.8),
          body: body,
          sm: Math.round(body * 0.8)
        }
      };
    } else {
      const body = Math.max(12, Math.min(24, 14 + Math.round(diagonal / 80)));
      return {
        bleed: 0,
        safety: Math.max(10, Math.round(minDim * 0.04)),
        margin: Math.max(20, Math.round(minDim * 0.08)),
        typo: {
          display: Math.round(body * 3.5),
          h1: Math.round(body * 2.4),
          h2: Math.round(body * 1.6),
          body: body,
          sm: Math.round(body * 0.8)
        }
      };
    }
  };

  const specs = calculateSpecs(calcWidth, calcHeight, calcUnit);

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-title">Design System <span>Pro</span></div>
          <nav className="main-nav">
            <button className={`nav-tab ${activeTab === "system" ? "active" : ""}`} onClick={() => setActiveTab("system")}>Système</button>
            <button className={`nav-tab ${activeTab === "theories" ? "active" : ""}`} onClick={() => setActiveTab("theories")}>Théories</button>
            <button className={`nav-tab ${activeTab === "industry" ? "active" : ""}`} onClick={() => setActiveTab("industry")}>Industries</button>
            <button className={`nav-tab ${activeTab === "flyer" ? "active" : ""}`} onClick={() => setActiveTab("flyer")}>Flyer</button>
            <button className={`nav-tab ${activeTab === "brochure" ? "active" : ""}`} onClick={() => setActiveTab("brochure")}>Brochure</button>
            <button className={`nav-tab ${activeTab === "carte" ? "active" : ""}`} onClick={() => setActiveTab("carte")}>Cartes</button>
            <button className={`nav-tab ${activeTab === "fidelite" ? "active" : ""}`} onClick={() => setActiveTab("fidelite")}>Fidélité</button>
            <button className={`nav-tab ${activeTab === "calc" ? "active" : ""}`} onClick={() => setActiveTab("calc")}>Calculateur</button>
          </nav>
        </div>
      </header>

      <main>

        {/* --- SYSTEM PAGE --- */}
        <div className={`page-content ${activeTab === "system" ? "active" : ""}`}>
          <div className="card">
            <div className="card-header"><div className="card-title">🔤 Hiérarchie Typographique</div></div>
            <div className="card-body">
              <div className="type-row"><div className="type-meta"><div className="type-role">Display</div><div className="type-spec">32px · 700 · -0.5px</div></div><div className="type-preview t-display">Grande Accroche</div></div>
              <div className="type-row"><div className="type-meta"><div className="type-role">H1 — Titre</div><div className="type-spec">24px · 700 · -0.3px</div></div><div className="type-preview t-h1">Titre Principal</div></div>
              <div className="type-row"><div className="type-meta"><div className="type-role">H2 — Sous-titre</div><div className="type-spec">20px · 600</div></div><div className="type-preview t-h2">Sous-titre de Section</div></div>
              <div className="type-row"><div className="type-meta"><div className="type-role">H3 — Rubrique</div><div className="type-spec">17px · 600</div></div><div className="type-preview t-h3">Titre de Paragraphe</div></div>
              <div className="type-row"><div className="type-meta"><div className="type-role">Corps</div><div className="type-spec">14–16px · 400 · 1.5</div></div><div className="type-preview t-body">Texte courant, descriptions et contenu principal du support</div></div>
              <div className="type-row"><div className="type-meta"><div className="type-role">Légende</div><div className="type-spec">12px · 400 · 1.4</div></div><div className="type-preview t-sm">Mention légale, note, crédit image, conditions</div></div>
              <div className="type-row"><div className="type-meta"><div className="type-role">Label</div><div className="type-spec">11px · 700 · CAPS</div></div><div className="type-preview t-label">Catégorie · Tag · Étiquette</div></div>
            </div>
            <div className="card-footer">
              <div className="t-label mb-2">Règles typographiques universelles</div>
              <div className="do-dont">
                <div className="do-card do"><div className="do-label">✅ À faire</div>
                  <div className="do-item"><span>→</span> Max 2 familles de polices par support</div>
                  <div className="do-item"><span>→</span> Contraste fort entre niveaux (3× minimum)</div>
                  <div className="do-item"><span>→</span> Interligne 1.4–1.6 pour le corps de texte</div>
                  <div className="do-item"><span>→</span> Aligner le texte à gauche (lecture naturelle)</div>
                </div>
                <div className="do-card dont"><div className="do-label">❌ À éviter</div>
                  <div className="do-item"><span>→</span> Plus de 3 tailles sur un même visuel</div>
                  <div className="do-item"><span>→</span> Texte en italique pour le corps entier</div>
                  <div className="do-item"><span>→</span> Centrer les longs paragraphes</div>
                  <div className="do-item"><span>→</span> Taille inférieure à 7pt en print</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">🎨 Système de Couleurs</div></div>
            <div className="card-body">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(105px,1fr))] gap-2 mb-4">
                {[
                  { name: "Primaire", hex: "#1D1D1F", desc: "Titres, texte" },
                  { name: "Secondaire", hex: "#86868B", desc: "Corps, notes" },
                  { name: "Background", hex: "#F5F5F7", desc: "Fond neutre" },
                  { name: "Accent", hex: "#0071E3", desc: "CTA, liens" },
                  { name: "Succès", hex: "#28CD41", desc: "Validation" },
                  { name: "Alerte", hex: "#FF9F0A", desc: "Avertissement" },
                  { name: "Erreur", hex: "#FF3B30", desc: "Urgence" },
                  { name: "Blanc", hex: "#FFFFFF", desc: "Surface" },
                ].map(c => (
                  <div key={c.hex} className="rounded-xl overflow-hidden border border-[var(--border)]">
                    <div style={{ height: "46px", background: c.hex }} className={c.hex === "#FFFFFF" || c.hex === "#F5F5F7" ? "border-b border-[var(--border)]" : ""}></div>
                    <div className="p-3 bg-white">
                      <div className="text-[13px] font-600">{c.name}</div>
                      <div className="text-[11px] font-mono opacity-60 mb-1">{c.hex}</div>
                      <div className="text-[10px] leading-tight opacity-60">{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="infobox orange"><strong>Règle 60 – 30 – 10 :</strong> <span className="opacity-70">60% dominante · 30% secondaire · 10% accent · Max 4 couleurs par support</span></div>
              <div className="infobox blue mt-2"><strong>Contraste WCAG :</strong> <span className="opacity-70">Texte normal ≥ 4.5:1 · Texte large ≥ 3:1 · Vérifier avec Colour Contrast Analyser</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">📐 Échelle d'Espacement</div></div>
            <div className="card-body">
              {[
                { px: "4px", w: "8px", t: "xs", u: "Icône/texte, séparateur fin" },
                { px: "8px", w: "16px", t: "sm", u: "Padding bouton, gap éléments proches" },
                { px: "12px", w: "24px", t: "md", u: "Espacement standard entre composants" },
                { px: "16px", w: "32px", t: "lg", u: "Padding section, marges internes carte" },
                { px: "24px", w: "48px", t: "xl", u: "Séparation entre blocs de contenu" },
                { px: "32px", w: "64px", t: "2xl", u: "Marges latérales, espacement sections" },
                { px: "48px", w: "90px", t: "3xl", u: "Zones de respiration, padding page" },
                { px: "64px", w: "120px", t: "4xl", u: "Espaces vides importants, hero" },
              ].map(s => (
                <div key={s.px} className="sp-row">
                  <div className="sp-px">{s.px}</div>
                  <div className="sp-bar-wrap"><div className="sp-bar" style={{ width: s.w }}></div></div>
                  <div className="sp-token">{s.t}</div>
                  <div className="sp-use">{s.u}</div>
                </div>
              ))}
            </div>
            <div className="card-footer t-sm">💡 <strong>Base 8px</strong> — tous les espacements sont multiples de 4 ou 8 pour une cohérence parfaite</div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">🔲 Systèmes de Grille</div></div>
            <div className="card-body">
              <div className="t-label mb-2">Print — A4 / Flyer</div>
              <div className="grid-preview">
                <div className="grid-cols"><div className="grid-col"></div><div className="grid-col"></div><div className="grid-col"></div><div className="grid-col"></div></div>
                <div className="grid-meta">
                  <div><div className="gm-label">Colonnes</div><div className="gm-value">4</div></div>
                  <div><div className="gm-label">Gouttière</div><div className="gm-value">5mm</div></div>
                  <div><div className="gm-label">Marges</div><div className="gm-value">10mm</div></div>
                  <div><div className="gm-label">Fond perdu</div><div className="gm-value">3mm</div></div>
                  <div><div className="gm-label">Sécurité</div><div className="gm-value">5mm</div></div>
                </div>
              </div>
              <div className="t-label my-4">Digital — Web</div>
              <div className="grid-preview">
                <div className="grid-cols">
                  {Array(12).fill(0).map((_, i) => <div key={i} className="grid-col"></div>)}
                </div>
                <div className="grid-meta">
                  <div><div className="gm-label">Colonnes</div><div className="gm-value">12</div></div>
                  <div><div className="gm-label">Gouttière</div><div className="gm-value">16px</div></div>
                  <div><div className="gm-label">Marges</div><div className="gm-value">24px</div></div>
                  <div><div className="gm-label">Max-width</div><div className="gm-value">1280px</div></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">🖨 Print vs 💻 Digital</div></div>
            <div className="card-body">
              <div className="compare-grid">
                <div className="compare-card print">
                  <div className="compare-title">🖨 Print</div>
                  <div className="cr"><span className="ck">Résolution</span><span className="cv">300 dpi min</span></div>
                  <div className="cr"><span className="ck">Mode couleur</span><span className="cv">CMJN (CMYK)</span></div>
                  <div className="cr"><span className="ck">Fond perdu</span><span className="cv">3mm (cartes 2mm)</span></div>
                  <div className="cr"><span className="ck">Zone sécurité</span><span className="cv">5mm du bord</span></div>
                  <div className="cr"><span className="ck">Typo min</span><span className="cv">7pt</span></div>
                  <div className="cr"><span className="ck">Export</span><span className="cv">PDF/X-1a ou -3</span></div>
                  <div className="cr"><span className="ck">Polices</span><span className="cv">Incorporées/vectorisées</span></div>
                  <div className="cr"><span className="ck">Noir riche</span><span className="cv">C40 M30 Y30 K100</span></div>
                </div>
                <div className="compare-card digital">
                  <div className="compare-title">💻 Digital</div>
                  <div className="cr"><span className="ck">Résolution</span><span className="cv">72–96 dpi</span></div>
                  <div className="cr"><span className="ck">Mode couleur</span><span className="cv">RVB / HEX / HSL</span></div>
                  <div className="cr"><span className="ck">Fond perdu</span><span className="cv">Non requis</span></div>
                  <div className="cr"><span className="ck">Safe zone</span><span className="cv">Padding CSS</span></div>
                  <div className="cr"><span className="ck">Typo min</span><span className="cv">12px écran</span></div>
                  <div className="cr"><span className="ck">Export</span><span className="cv">PNG · SVG · WebP</span></div>
                  <div className="cr"><span className="ck">Polices</span><span className="cv">Google Fonts / web</span></div>
                  <div className="cr"><span className="ck">Contraste</span><span className="cv">WCAG AA ≥ 4.5:1</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header"><div className="card-title">📲 Formats Digitaux Standards</div></div>
            <div className="card-body">
              <div className="format-grid">
                {[
                  { p: "Instagram Post", s: "1080×1080", r: "Carré 1:1" },
                  { p: "Instagram Story", s: "1080×1920", r: "Vertical 9:16" },
                  { p: "Facebook Post", s: "1200×630", r: "Paysage 1.91:1" },
                  { p: "Facebook Cover", s: "820×312", r: "Panoramique" },
                  { p: "LinkedIn Post", s: "1200×627", r: "Paysage" },
                  { p: "LinkedIn Banner", s: "1584×396", r: "4:1" },
                  { p: "YouTube Thumb", s: "1280×720", r: "HD 16:9" },
                  { p: "Email Header", s: "600×200", r: "Horizontal" },
                  { p: "Google Display", s: "300×250", r: "Rectangle" },
                  { p: "Leaderboard", s: "728×90", r: "Bannière web" },
                  { p: "OG / Meta", s: "1200×630", r: "Partage web" },
                  { p: "TikTok / Reels", s: "1080×1920", r: "9:16 vertical" },
                ].map(f => (
                  <div key={f.p} className="format-card">
                    <div className="format-platform">{f.p}</div>
                    <div className="format-size">{f.s}</div>
                    <div className="format-ratio">{f.r}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- THEORIES PAGE --- */}
        <div className={`page-content ${activeTab === "theories" ? "active" : ""}`}>

          {/* GOLDEN RATIO */}
          <div className="card">
            <div className="card-header"><div className="card-title">📐 Le Nombre d'Or — φ 1.618</div></div>
            <div className="card-body">
              <p className="theory-intro">Le nombre d'or (φ = 1.618…) est un ratio mathématique que l'on retrouve dans la nature, l'architecture et l'art. Il crée des proportions naturellement harmonieuses et agréables à l'œil.</p>

              <div className="theory-section">
                <div className="theory-subtitle">🌀 La Spirale de Fibonacci</div>
                <p className="theory-text">La suite de Fibonacci (1, 1, 2, 3, 5, 8, 13, 21…) converge vers φ. Chaque nombre est la somme des deux précédents. La spirale qui en résulte guide naturellement le regard.</p>
                <div className="golden-spiral-demo">
                  <svg viewBox="0 0 340 210" className="golden-svg">
                    <rect x="0" y="0" width="130" height="130" fill="rgba(0,113,227,0.06)" stroke="rgba(0,113,227,0.2)" strokeWidth="1" rx="2" />
                    <rect x="130" y="0" width="80" height="80" fill="rgba(191,90,242,0.06)" stroke="rgba(191,90,242,0.2)" strokeWidth="1" rx="2" />
                    <rect x="130" y="80" width="80" height="50" fill="rgba(255,159,10,0.06)" stroke="rgba(255,159,10,0.2)" strokeWidth="1" rx="2" />
                    <rect x="130" y="80" width="50" height="50" fill="rgba(40,205,65,0.06)" stroke="rgba(40,205,65,0.2)" strokeWidth="1" rx="2" />
                    <rect x="180" y="80" width="30" height="30" fill="rgba(255,55,95,0.06)" stroke="rgba(255,55,95,0.2)" strokeWidth="1" rx="2" />
                    <text x="65" y="70" textAnchor="middle" fontSize="18" fill="var(--blue)" fontWeight="600" opacity="0.6">13</text>
                    <text x="170" y="45" textAnchor="middle" fontSize="14" fill="var(--purple)" fontWeight="600" opacity="0.6">8</text>
                    <text x="165" y="110" textAnchor="middle" fontSize="11" fill="var(--orange)" fontWeight="600" opacity="0.6">5</text>
                    <text x="148" y="109" textAnchor="middle" fontSize="9" fill="var(--green)" fontWeight="600" opacity="0.6">3</text>
                    <text x="195" y="99" textAnchor="middle" fontSize="8" fill="var(--pink)" fontWeight="600" opacity="0.6">2</text>
                  </svg>
                  <div className="golden-legend">
                    <div className="golden-ratio-badge">φ = 1.618034…</div>
                    <div className="theory-text">Chaque rectangle est φ fois plus grand que le suivant</div>
                  </div>
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">📏 Application en Design</div>
                <div className="theory-grid-3">
                  <div className="theory-tip-card">
                    <div className="theory-tip-icon">📄</div>
                    <div className="theory-tip-title">Mise en Page</div>
                    <div className="theory-tip-desc">Diviser la largeur par φ pour créer une colonne principale (62%) et une sidebar (38%)</div>
                  </div>
                  <div className="theory-tip-card">
                    <div className="theory-tip-icon">🔤</div>
                    <div className="theory-tip-title">Typographie</div>
                    <div className="theory-tip-desc">Multiplier la taille du corps par φ pour obtenir le titre : 16px × 1.618 ≈ 26px</div>
                  </div>
                  <div className="theory-tip-card">
                    <div className="theory-tip-icon">🖼</div>
                    <div className="theory-tip-title">Images</div>
                    <div className="theory-tip-desc">Cadrer les images en ratio 1:1.618 — dimensions harmonieuses naturellement</div>
                  </div>
                  <div className="theory-tip-card">
                    <div className="theory-tip-icon">📐</div>
                    <div className="theory-tip-title">Espacement</div>
                    <div className="theory-tip-desc">Marges et paddings en progression φ : 8 → 13 → 21 → 34 → 55px</div>
                  </div>
                  <div className="theory-tip-card">
                    <div className="theory-tip-icon">🎯</div>
                    <div className="theory-tip-title">Point Focal</div>
                    <div className="theory-tip-desc">Placer l'élément clé à l'intersection de la spirale dorée</div>
                  </div>
                  <div className="theory-tip-card">
                    <div className="theory-tip-icon">📊</div>
                    <div className="theory-tip-title">Hiérarchie</div>
                    <div className="theory-tip-desc">Ratio entre niveaux de taille : H1 ÷ H2 ÷ H3 ≈ φ à chaque étape</div>
                  </div>
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">🔢 Règle des Tiers</div>
                <p className="theory-text">Simplification pratique du nombre d'or : diviser l'espace en 3×3. Les points d'intersection sont les zones de tension visuelle — idéales pour placer les éléments importants.</p>
                <div className="thirds-demo">
                  <div className="thirds-grid">
                    <div className="thirds-line thirds-h" style={{ top: '33.3%' }}></div>
                    <div className="thirds-line thirds-h" style={{ top: '66.6%' }}></div>
                    <div className="thirds-line thirds-v" style={{ left: '33.3%' }}></div>
                    <div className="thirds-line thirds-v" style={{ left: '66.6%' }}></div>
                    <div className="thirds-point" style={{ top: '33.3%', left: '33.3%' }}></div>
                    <div className="thirds-point" style={{ top: '33.3%', left: '66.6%' }}></div>
                    <div className="thirds-point" style={{ top: '66.6%', left: '33.3%' }}></div>
                    <div className="thirds-point" style={{ top: '66.6%', left: '66.6%' }}></div>
                    <div className="thirds-label" style={{ top: '28%', left: '28%' }}>⭐</div>
                    <div className="thirds-label" style={{ top: '28%', left: '62%' }}>⭐</div>
                    <div className="thirds-label" style={{ top: '61%', left: '28%' }}>⭐</div>
                    <div className="thirds-label" style={{ top: '61%', left: '62%' }}>⭐</div>
                  </div>
                  <div className="theory-text" style={{ marginTop: '12px', textAlign: 'center' }}>⭐ = Points de tension — placer ici les éléments clés (titre, CTA, logo)</div>
                </div>
              </div>

              <div className="infobox blue">
                <strong>En pratique :</strong> <span className="opacity-70">Le nombre d'or n'est pas une règle stricte, mais un guide. Les designs les plus réussis l'utilisent comme point de départ, puis ajustent visuellement.</span>
              </div>
            </div>
          </div>

          {/* COLOR THEORY */}
          <div className="card">
            <div className="card-header"><div className="card-title">🎨 Théorie des Couleurs</div></div>
            <div className="card-body">
              <p className="theory-intro">La théorie des couleurs est un ensemble de principes qui régissent l'utilisation harmonieuse des couleurs. Comprendre le cercle chromatique et les relations entre couleurs est essentiel pour tout designer.</p>

              <div className="theory-section">
                <div className="theory-subtitle">🔵 Le Cercle Chromatique</div>
                <p className="theory-text">Le cercle chromatique organise les couleurs selon leur relation. Les couleurs primaires (rouge, jaune, bleu) se combinent pour former les secondaires, puis les tertiaires.</p>
                <div className="color-wheel-demo">
                  <svg viewBox="0 0 240 240" className="color-wheel-svg">
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                      const hue = angle;
                      const r = 100;
                      const cx = 120 + r * Math.cos((angle - 90) * Math.PI / 180);
                      const cy = 120 + r * Math.sin((angle - 90) * Math.PI / 180);
                      return <circle key={i} cx={cx} cy={cy} r="18" fill={`hsl(${hue}, 75%, 55%)`} opacity="0.85" />;
                    })}
                    <circle cx="120" cy="120" r="35" fill="white" stroke="var(--border)" strokeWidth="1" />
                    <text x="120" y="124" textAnchor="middle" fontSize="10" fill="var(--text2)" fontWeight="600">CERCLE</text>
                  </svg>
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">🎯 Harmonies de Couleurs</div>
                <p className="theory-text">Les harmonies sont des combinaisons de couleurs basées sur leur position sur le cercle chromatique. Chaque harmonie crée une ambiance différente.</p>
                <div className="harmony-grid">
                  <div className="harmony-card">
                    <div className="harmony-title">Complémentaire</div>
                    <div className="harmony-desc">Couleurs opposées sur le cercle. Contraste maximal, dynamique.</div>
                    <div className="harmony-swatches">
                      <div className="h-swatch" style={{ background: '#0071E3' }}></div>
                      <div className="h-swatch" style={{ background: '#E37100' }}></div>
                    </div>
                    <div className="harmony-use">CTA · Headlines · Accents forts</div>
                  </div>
                  <div className="harmony-card">
                    <div className="harmony-title">Analogue</div>
                    <div className="harmony-desc">Couleurs voisines. Harmonieux, naturel, apaisant.</div>
                    <div className="harmony-swatches">
                      <div className="h-swatch" style={{ background: '#0071E3' }}></div>
                      <div className="h-swatch" style={{ background: '#007AFF' }}></div>
                      <div className="h-swatch" style={{ background: '#5856D6' }}></div>
                    </div>
                    <div className="harmony-use">Illustrations · Fonds · Ambiance</div>
                  </div>
                  <div className="harmony-card">
                    <div className="harmony-title">Triadique</div>
                    <div className="harmony-desc">3 couleurs équidistantes (120°). Vibrant, équilibré.</div>
                    <div className="harmony-swatches">
                      <div className="h-swatch" style={{ background: '#FF3B30' }}></div>
                      <div className="h-swatch" style={{ background: '#34C759' }}></div>
                      <div className="h-swatch" style={{ background: '#007AFF' }}></div>
                    </div>
                    <div className="harmony-use">Identité visuelle · Infographies</div>
                  </div>
                  <div className="harmony-card">
                    <div className="harmony-title">Split-Complémentaire</div>
                    <div className="harmony-desc">1 couleur + 2 voisines de sa complémentaire. Contraste nuancé.</div>
                    <div className="harmony-swatches">
                      <div className="h-swatch" style={{ background: '#0071E3' }}></div>
                      <div className="h-swatch" style={{ background: '#FF9500' }}></div>
                      <div className="h-swatch" style={{ background: '#FF3B30' }}></div>
                    </div>
                    <div className="harmony-use">Web design · Print premium</div>
                  </div>
                  <div className="harmony-card">
                    <div className="harmony-title">Monochromatique</div>
                    <div className="harmony-desc">Une seule teinte, variations de luminosité et saturation.</div>
                    <div className="harmony-swatches">
                      <div className="h-swatch" style={{ background: '#004FB1' }}></div>
                      <div className="h-swatch" style={{ background: '#0071E3' }}></div>
                      <div className="h-swatch" style={{ background: '#64B5F6' }}></div>
                      <div className="h-swatch" style={{ background: '#BBDEFB' }}></div>
                    </div>
                    <div className="harmony-use">Élégance · Minimalisme · Luxe</div>
                  </div>
                  <div className="harmony-card">
                    <div className="harmony-title">Tétradique</div>
                    <div className="harmony-desc">4 couleurs en rectangle. Riche et complexe.</div>
                    <div className="harmony-swatches">
                      <div className="h-swatch" style={{ background: '#FF3B30' }}></div>
                      <div className="h-swatch" style={{ background: '#FF9500' }}></div>
                      <div className="h-swatch" style={{ background: '#007AFF' }}></div>
                      <div className="h-swatch" style={{ background: '#34C759' }}></div>
                    </div>
                    <div className="harmony-use">Dashboards · Apps · Illustrations</div>
                  </div>
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">🧠 Psychologie des Couleurs</div>
                <p className="theory-text">Chaque couleur véhicule des émotions et des messages inconscients. Le choix des couleurs influence directement la perception de la marque.</p>
                <div className="psych-grid">
                  {[
                    { color: '#FF3B30', name: 'Rouge', emotions: 'Passion · Urgence · Énergie', usage: 'CTA, promotions, food' },
                    { color: '#FF9500', name: 'Orange', emotions: 'Enthousiasme · Chaleur · Créativité', usage: 'E-commerce, jeunesse' },
                    { color: '#FFCC00', name: 'Jaune', emotions: 'Optimisme · Joie · Attention', usage: 'Alertes, enfance, solaire' },
                    { color: '#34C759', name: 'Vert', emotions: 'Nature · Santé · Confiance', usage: 'Bio, finance, santé' },
                    { color: '#007AFF', name: 'Bleu', emotions: 'Confiance · Sérénité · Professionnalisme', usage: 'Tech, finance, corporate' },
                    { color: '#AF52DE', name: 'Violet', emotions: 'Luxe · Mystère · Créativité', usage: 'Luxe, beauté, spirituel' },
                    { color: '#FF375F', name: 'Rose', emotions: 'Féminité · Douceur · Romance', usage: 'Beauté, mariage, mode' },
                    { color: '#1D1D1F', name: 'Noir', emotions: 'Élégance · Pouvoir · Mystère', usage: 'Luxe, mode, tech premium' },
                  ].map(c => (
                    <div key={c.name} className="psych-card">
                      <div className="psych-dot" style={{ background: c.color }}></div>
                      <div className="psych-name">{c.name}</div>
                      <div className="psych-emotions">{c.emotions}</div>
                      <div className="psych-usage">{c.usage}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">⚖️ La Règle 60 – 30 – 10</div>
                <p className="theory-text">Principe de décoration intérieure appliqué au design graphique. Garantit un équilibre visuel optimal.</p>
                <div className="rule-demo">
                  <div className="rule-bar">
                    <div className="rule-segment rule-60" style={{ width: '60%' }}>
                      <span>60%</span>
                      <small>Dominante</small>
                    </div>
                    <div className="rule-segment rule-30" style={{ width: '30%' }}>
                      <span>30%</span>
                      <small>Secondaire</small>
                    </div>
                    <div className="rule-segment rule-10" style={{ width: '10%' }}>
                      <span>10%</span>
                    </div>
                  </div>
                  <div className="rule-legend">
                    <div className="rule-item"><div className="rule-dot" style={{ background: '#F5F5F7' }}></div><strong>60% Dominante</strong> — Fond, espaces vides, base neutre</div>
                    <div className="rule-item"><div className="rule-dot" style={{ background: '#1D1D1F' }}></div><strong>30% Secondaire</strong> — Texte, sections, structure</div>
                    <div className="rule-item"><div className="rule-dot" style={{ background: '#0071E3' }}></div><strong>10% Accent</strong> — CTA, liens, éléments interactifs</div>
                  </div>
                </div>
              </div>

              <div className="do-dont">
                <div className="do-card do"><div className="do-label">✅ À faire</div>
                  <div className="do-item"><span>→</span> Max 4 couleurs par support</div>
                  <div className="do-item"><span>→</span> Toujours vérifier le contraste WCAG</div>
                  <div className="do-item"><span>→</span> Utiliser une palette cohérente sur tous les supports</div>
                  <div className="do-item"><span>→</span> Tester en niveaux de gris pour la hiérarchie</div>
                </div>
                <div className="do-card dont"><div className="do-label">❌ À éviter</div>
                  <div className="do-item"><span>→</span> Couleurs pures saturées sur de grandes surfaces</div>
                  <div className="do-item"><span>→</span> Rouge + vert ensemble (daltonisme)</div>
                  <div className="do-item"><span>→</span> Trop de couleurs vives en même temps</div>
                  <div className="do-item"><span>→</span> Texte coloré sur fond coloré sans contraste</div>
                </div>
              </div>
            </div>
          </div>

          {/* TYPOGRAPHY THEORY */}
          <div className="card">
            <div className="card-header"><div className="card-title">🔤 Théorie Typographique</div></div>
            <div className="card-body">
              <p className="theory-intro">La typographie est l'art de rendre le texte lisible, beau et fonctionnel. Elle représente 95% du design web et imprimé — la maîtriser est essentiel.</p>

              <div className="theory-section">
                <div className="theory-subtitle">🔬 Anatomie d'une Lettre</div>
                <p className="theory-text">Connaître le vocabulaire typographique permet de choisir, comparer et ajuster les polices avec précision.</p>
                <div className="anatomy-grid">
                  {[
                    { term: 'Ascendante', desc: 'Partie au-dessus de la hauteur x (b, d, h, l)', color: 'var(--blue)' },
                    { term: 'Descendante', desc: 'Partie en-dessous de la ligne de base (g, p, q, y)', color: 'var(--purple)' },
                    { term: 'Hauteur x', desc: 'Hauteur des minuscules sans ascendante — affecte la lisibilité', color: 'var(--green)' },
                    { term: 'Empattement (Serif)', desc: 'Petites extensions aux extrémités des caractères', color: 'var(--orange)' },
                    { term: 'F\u00fbt / Hampe', desc: "Trait vertical principal d\u2019une lettre", color: 'var(--red)' },
                    { term: 'Contreforme', desc: "Espace int\u00e9rieur ferm\u00e9 (o, d, p) \u2014 affecte la lisibilit\u00e9", color: 'var(--teal)' },
                    { term: 'Graisse', desc: 'Épaisseur du trait : Light → Regular → Bold → Black', color: 'var(--pink)' },
                    { term: 'Chasse', desc: "Largeur d\u2019un caract\u00e8re \u2014 condens\u00e9e, r\u00e9guli\u00e8re ou \u00e9tendue", color: 'var(--text2)' },
                  ].map(a => (
                    <div key={a.term} className="anatomy-item">
                      <div className="anatomy-dot" style={{ background: a.color }}></div>
                      <div>
                        <div className="anatomy-term">{a.term}</div>
                        <div className="anatomy-desc">{a.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">📂 Classification des Polices</div>
                <p className="theory-text">Les grandes familles typographiques et leurs usages recommandés.</p>
                <div className="font-class-grid">
                  {[
                    { family: 'Serif', examples: 'Times, Garamond, Merriweather', personality: 'Classique · Fiable · Élégant', usage: 'Éditorial, luxe, finance, print', icon: '🏛' },
                    { family: 'Sans-Serif', examples: 'Helvetica, Inter, DM Sans', personality: 'Moderne · Neutre · Lisible', usage: 'Tech, startup, web, UI', icon: '💎' },
                    { family: 'Slab Serif', examples: 'Rockwell, Museo Slab, Roboto Slab', personality: 'Solide · Confiant · Impactant', usage: 'Titres, affiches, branding', icon: '🏗' },
                    { family: 'Display', examples: 'Bebas Neue, Abril Fatface, Playfair', personality: 'Expressif · Décoratif · Unique', usage: 'Titres uniquement, logos, héros', icon: '✨' },
                    { family: 'Monospace', examples: 'Fira Code, JetBrains Mono, SF Mono', personality: 'Technique · Précis · Codeur', usage: 'Code, données, badges techniques', icon: '⌨️' },
                    { family: 'Script / Handwritten', examples: 'Pacifico, Dancing Script, Caveat', personality: 'Personnel · Artisanal · Chaleureux', usage: 'Invitations, logos, accents', icon: '✍️' },
                  ].map(f => (
                    <div key={f.family} className="font-class-card">
                      <div className="font-class-icon">{f.icon}</div>
                      <div className="font-class-name">{f.family}</div>
                      <div className="font-class-examples">{f.examples}</div>
                      <div className="font-class-personality">{f.personality}</div>
                      <div className="font-class-usage">{f.usage}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">🤝 Règles d'Appariement (Pairing)</div>
                <p className="theory-text">Combiner les polices est un art. Les meilleures combinaisons créent du contraste tout en maintenant la cohérence.</p>
                <div className="pairing-grid">
                  {[
                    { title: 'Serif + Sans-Serif', rule: 'La combinaison classique universelle', ex: 'Playfair Display + DM Sans', verdict: 'good' },
                    { title: 'Display + Neutre', rule: 'Titre expressif + corps lisible', ex: 'Bebas Neue + Roboto', verdict: 'good' },
                    { title: 'Même superfamille', rule: 'Variations de la même police (poids, style)', ex: 'Inter Light + Inter Bold', verdict: 'good' },
                    { title: 'Serif + Serif', rule: 'Deux serif = conflit, manque de contraste', ex: 'Times + Georgia', verdict: 'bad' },
                    { title: 'Script + Script', rule: 'Illisible et chaotique', ex: 'Pacifico + Dancing Script', verdict: 'bad' },
                    { title: '3+ familles', rule: 'Incohérent — max 2 familles par support', ex: 'Playfair + Roboto + Oswald', verdict: 'bad' },
                  ].map(p => (
                    <div key={p.title} className={`pairing-card ${p.verdict}`}>
                      <div className="pairing-verdict">{p.verdict === 'good' ? '✅' : '❌'}</div>
                      <div className="pairing-title">{p.title}</div>
                      <div className="pairing-rule">{p.rule}</div>
                      <div className="pairing-example">{p.ex}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">📏 Échelle Typographique Modulaire</div>
                <p className="theory-text">Une échelle modulaire utilise un ratio constant entre chaque niveau de taille. Les ratios les plus courants :</p>
                <div className="scale-grid">
                  {[
                    { name: 'Minor Second', ratio: '1.067', feel: 'Subtil, dense' },
                    { name: 'Major Second', ratio: '1.125', feel: 'Sobre, éditorial' },
                    { name: 'Minor Third', ratio: '1.200', feel: 'Équilibré, polyvalent' },
                    { name: 'Major Third', ratio: '1.250', feel: 'Classique, lisible' },
                    { name: 'Perfect Fourth', ratio: '1.333', feel: 'Dynamique, contrasté' },
                    { name: 'Golden Ratio', ratio: '1.618', feel: 'Harmonieux, naturel' },
                  ].map(s => (
                    <div key={s.name} className="scale-card">
                      <div className="scale-name">{s.name}</div>
                      <div className="scale-ratio">{s.ratio}</div>
                      <div className="scale-feel">{s.feel}</div>
                    </div>
                  ))}
                </div>
                <div className="infobox blue mt-4">
                  <strong>Méthode de calcul :</strong> <span className="opacity-70">Base (16px) × ratio = niveau suivant. Exemple avec Major Third (1.250) : 16 → 20 → 25 → 31 → 39 → 49px</span>
                </div>
              </div>

              <div className="theory-section">
                <div className="theory-subtitle">📐 Règles de Lisibilité</div>
                <div className="readability-grid">
                  <div className="readability-card">
                    <div className="readability-metric">45–75</div>
                    <div className="readability-label">Caractères par ligne</div>
                    <div className="readability-desc">Longueur idéale pour le confort de lecture. 66 = optimum.</div>
                  </div>
                  <div className="readability-card">
                    <div className="readability-metric">1.4–1.6</div>
                    <div className="readability-label">Interligne (line-height)</div>
                    <div className="readability-desc">× la taille du corps. Titres : 1.1–1.3. Corps : 1.5.</div>
                  </div>
                  <div className="readability-card">
                    <div className="readability-metric">16px</div>
                    <div className="readability-label">Taille minimum web</div>
                    <div className="readability-desc">En dessous, la lecture devient fatigante sur écran.</div>
                  </div>
                  <div className="readability-card">
                    <div className="readability-metric">3×</div>
                    <div className="readability-label">Contraste entre niveaux</div>
                    <div className="readability-desc">Le titre doit être au moins 3× plus visible que le corps.</div>
                  </div>
                </div>
              </div>

              <div className="do-dont">
                <div className="do-card do"><div className="do-label">✅ À faire</div>
                  <div className="do-item"><span>→</span> Max 2 familles de polices par support</div>
                  <div className="do-item"><span>→</span> Hiérarchie claire : taille + graisse + couleur</div>
                  <div className="do-item"><span>→</span> Texte aligné à gauche (sauf titres centrés)</div>
                  <div className="do-item"><span>→</span> Tester la lisibilité sur mobile</div>
                </div>
                <div className="do-card dont"><div className="do-label">❌ À éviter</div>
                  <div className="do-item"><span>→</span> Justifier le texte sans césure automatique</div>
                  <div className="do-item"><span>→</span> Texte en majuscules pour les paragraphes</div>
                  <div className="do-item"><span>→</span> Italic pour le corps entier</div>
                  <div className="do-item"><span>→</span> Polices décoratives pour le contenu</div>
                </div>
              </div>
            </div>
          </div>

          {/* DESIGN LAWS */}
          <div className="card">
            <div className="card-header"><div className="card-title">⚡ Lois Fondamentales du Design</div></div>
            <div className="card-body">
              <p className="theory-intro">Ces principes universels s'appliquent à tout type de design — print, web, UI, branding. Les connaître permet de créer des compositions plus efficaces et intentionnelles.</p>
              <div className="laws-grid">
                {[
                  { name: 'Proximité', icon: '⊞', desc: 'Les éléments liés doivent être proches. La distance crée la séparation logique.', law: 'Gestalt' },
                  { name: 'Alignement', icon: '⊡', desc: 'Rien ne doit être placé au hasard. Chaque élément doit avoir une connexion visuelle.', law: 'Composition' },
                  { name: 'Répétition', icon: '❖', desc: 'Répéter les éléments visuels (couleurs, polices, formes) pour créer la cohérence.', law: 'Unité' },
                  { name: 'Contraste', icon: '◐', desc: 'Si deux éléments sont différents, les rendre TRÈS différents — pas presque pareils.', law: 'Hiérarchie' },
                  { name: 'Hiérarchie Visuelle', icon: '△', desc: 'Guider le regard : le plus important en premier, le secondaire ensuite.', law: 'Composition' },
                  { name: 'Balance', icon: '⚖️', desc: 'Symétrique = formel. Asymétrique = dynamique. Les deux doivent être intentionnels.', law: 'Composition' },
                  { name: 'Espace Négatif', icon: '☐', desc: "L'espace vide n'est pas gaspillé — il donne de l'air et met en valeur le contenu.", law: 'Respiration' },
                  { name: 'Loi de Hick', icon: '⏱', desc: 'Plus il y a de choix, plus la décision est lente. Simplifier les options.', law: 'UX / Cognitif' },
                  {
                    name: 'Loi de Fitts', icon: '\ud83c\udfaf', desc: "Les cibles (boutons, CTA) doivent \u00eatre grandes et proches du point d\u2019action.", law: 'UX / Ergonomie'
                  },
                  { name: 'Effet Von Restorff', icon: '\ud83d\udca1', desc: "L'\u00e9l\u00e9ment qui se d\u00e9marque est celui qu'on retient. Utiliser pour le CTA principal.", law: 'Cognitif' },
                  {
                    name: 'Loi de Miller', icon: '7\ufe0f\u20e3', desc: "La m\u00e9moire de travail retient 7\u00b12 \u00e9l\u00e9ments. Grouper l\u2019information en blocs.", law: 'Cognitif'
                  },
                  { name: 'Principe de Pareto', icon: '\ud83d\udcca', desc: "80% des r\u00e9sultats viennent de 20% des efforts. Concentrer le design sur l\u2019essentiel.", law: 'Strat\u00e9gie' },
                ].map(l => (
                  <div key={l.name} className="law-card">
                    <div className="law-icon">{l.icon}</div>
                    <div className="law-name">{l.name}</div>
                    <div className="law-desc">{l.desc}</div>
                    <div className="law-tag">{l.law}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- INDUSTRY PAGE --- */}
        <div className={`page-content ${activeTab === "industry" ? "active" : ""}`}>
          {!selectedIndustry ? (
            <div className="card">
              <div className="card-header"><div className="card-title">🏭 Choisir une Industrie</div></div>
              <div className="card-body">
                <p className="t-sm mb-4">Sélectionne ton secteur pour obtenir des recommandations typographies et couleurs spécifiques.</p>
                <div className="industry-grid">
                  {[
                    { id: "beaute", e: "💄", n: "Beauté", s: "& Bien-être" },
                    { id: "food", e: "🍕", n: "Restauration", s: "Food & Café" },
                    { id: "mode", e: "👗", n: "Mode", s: "& Retail" },
                    { id: "finance", e: "💼", n: "Finance", s: "& Conseil" },
                    { id: "sante", e: "🏥", n: "Santé", s: "& Médical" },
                    { id: "btp", e: "🏗", n: "BTP", s: "& Artisanat" },
                    { id: "luxe", e: "🏨", n: "Luxe", s: "& Hôtellerie" },
                    { id: "tech", e: "💻", n: "Tech", s: "& Startup" },
                    { id: "education", e: "🎓", n: "Éducation", s: "& Formation" },
                    { id: "sport", e: "⚡", n: "Sport", s: "& Fitness" },
                  ].map(i => (
                    <div key={i.id} className="industry-card" onClick={() => setSelectedIndustry(i.id as IndustryId)}>
                      <div className="industry-emoji">{i.e}</div>
                      <div className="industry-name">{i.n}</div>
                      <div className="industry-sub">{i.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="industry-detail">
              <button className="back-btn" onClick={() => setSelectedIndustry(null)}>← Retour</button>

              {renderIndustryDetail(selectedIndustry)}
            </div>
          )}
        </div>

        {/* --- CALCULATOR PAGE --- */}
        <div className={`page-content ${activeTab === "calc" ? "active" : ""}`}>
          <div className="card">
            <div className="card-header"><div className="card-title">🧮 Calculateur de Layout</div></div>
            <div className="card-body">
              <div className="input-grid">
                <div className="input-group">
                  <label className="input-label">Type de Support</label>
                  <select className="select-field" value={calcDocType} onChange={(e) => {
                    const val = e.target.value;
                    setCalcDocType(val);
                    if (val === "flyer") { setCalcUnit("mm"); setCalcWidth(210); setCalcHeight(297); }
                    else if (val === "poster") { setCalcUnit("mm"); setCalcWidth(420); setCalcHeight(594); }
                    else if (val === "card") { setCalcUnit("mm"); setCalcWidth(85); setCalcHeight(55); }
                    else if (val === "social") { setCalcUnit("px"); setCalcWidth(1080); setCalcHeight(1080); }
                  }}>
                    <option value="flyer">Flyer / A4 / A5</option>
                    <option value="poster">Affiche / Grand Format</option>
                    <option value="card">Carte de Visite</option>
                    <option value="social">Réseaux Sociaux</option>
                    <option value="custom">Format Personnalisé</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Unité</label>
                  <select className="select-field" value={calcUnit} onChange={(e) => {
                    const nextUnit = e.target.value as "mm" | "px";
                    if (nextUnit !== calcUnit) {
                      if (nextUnit === "px") {
                        setCalcWidth(Math.round(calcWidth * 3.7795275591));
                        setCalcHeight(Math.round(calcHeight * 3.7795275591));
                      } else {
                        setCalcWidth(Math.round(calcWidth * 0.2645833333));
                        setCalcHeight(Math.round(calcHeight * 0.2645833333));
                      }
                      setCalcUnit(nextUnit);
                      setCalcDocType("custom");
                    }
                  }}>
                    <option value="mm">Millimètres (mm)</option>
                    <option value="px">Pixels (px)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Largeur ({calcUnit})</label>
                  <input type="number" className="input-field" value={calcWidth} onChange={(e) => setCalcWidth(Number(e.target.value))} />
                </div>
                <div className="input-group">
                  <label className="input-label">Hauteur ({calcUnit})</label>
                  <input type="number" className="input-field" value={calcHeight} onChange={(e) => setCalcHeight(Number(e.target.value))} />
                </div>
              </div>

              <div className="t-label mt-6 mb-3">📐 Marges et Espacements</div>
              <div className="res-grid">
                <div className="res-card">
                  <div className="res-title">Fond Perdu (Bleed)</div>
                  <div className="res-value">{specs.bleed}<span className="res-unit">{calcUnit}</span></div>
                </div>
                <div className="res-card">
                  <div className="res-title">Zone de Sécurité</div>
                  <div className="res-value">{specs.safety}<span className="res-unit">{calcUnit}</span></div>
                </div>
                <div className="res-card">
                  <div className="res-title">Marge Interne Rec.</div>
                  <div className="res-value">{specs.margin}<span className="res-unit">{calcUnit}</span></div>
                </div>
              </div>

              <div className="t-label mt-8 mb-3">🔤 Hiérarchie Typographique</div>
              <div className="res-grid">
                <div className="res-card">
                  <div className="res-title">Display / Hero</div>
                  <div className="res-value">{specs.typo.display}<span className="res-unit">{calcUnit === "mm" ? "pt" : "px"}</span></div>
                </div>
                <div className="res-card">
                  <div className="res-title">H1 — Titre</div>
                  <div className="res-value">{specs.typo.h1}<span className="res-unit">{calcUnit === "mm" ? "pt" : "px"}</span></div>
                </div>
                <div className="res-card">
                  <div className="res-title">H2 — Sous-titre</div>
                  <div className="res-value">{specs.typo.h2}<span className="res-unit">{calcUnit === "mm" ? "pt" : "px"}</span></div>
                </div>
                <div className="res-card">
                  <div className="res-title">Corps de Texte</div>
                  <div className="res-value">{specs.typo.body}<span className="res-unit">{calcUnit === "mm" ? "pt" : "px"}</span></div>
                </div>
                <div className="res-card">
                  <div className="res-title">Légende / Small</div>
                  <div className="res-value">{specs.typo.sm}<span className="res-unit">{calcUnit === "mm" ? "pt" : "px"}</span></div>
                </div>
              </div>

              <div className="infobox blue mt-8">
                <strong>Méthode de calcul :</strong> Ces valeurs sont générées dynamiquement selon une échelle modulaire basée sur la diagonale ({Math.round(Math.sqrt(calcWidth ** 2 + calcHeight ** 2))}{calcUnit}) de votre document.
              </div>
            </div>
          </div>
        </div>

        {/* --- CHECKLIST PAGES --- */}
        {renderChecklist("flyer", "📄 Checklist Flyer", FLYER_ITEMS, activeTab, toggleCheck, resetTab, getProgress, checkedItems)}
        {renderChecklist("brochure", "📖 Checklist Brochure", BROCHURE_ITEMS, activeTab, toggleCheck, resetTab, getProgress, checkedItems)}
        {renderChecklist("carte", "💳 Carte de Visite", CARTE_ITEMS, activeTab, toggleCheck, resetTab, getProgress, checkedItems)}
        {renderChecklist("fidelite", "⭐ Carte de Fidélité", FIDELITE_ITEMS, activeTab, toggleCheck, resetTab, getProgress, checkedItems)}

      </main>
    </div>
  );
}

function renderChecklist(id: string, title: string, items: ChecklistItem[], activeTab: string, onToggle: (id: string, idx: number) => void, onReset: (id: string) => void, getProgress: (id: string, total: number) => any, checkedItems: any) {
  const progress = getProgress(id, items.length);
  return (
    <div className={`page-content ${activeTab === id ? "active" : ""}`}>
      <div className="card">
        <div className="card-header">
          <div><div className="card-title">{title}</div><div className="t-sm">{progress.checked} / {progress.total} complété{progress.checked > 1 ? "s" : ""}</div></div>
          <button className="reset-btn" onClick={() => onReset(id)}>↺ Reset</button>
        </div>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress.pct}%`, background: id === "flyer" ? "var(--orange)" : id === "brochure" ? "var(--teal)" : id === "carte" ? "var(--green)" : "var(--purple)" }}></div></div>

        {items.map((item, idx) => (
          <div key={item.id} className={`check-item ${checkedItems[id]?.[idx] ? "checked" : ""}`} onClick={() => onToggle(id, idx)}>
            <div className="cb"><span className="cb-tick">✓</span></div>
            <div className="it">
              <div className="il">{item.label}</div>
              <div className="id">{item.description}</div>
            </div>
            <span className={`itag ${item.tagClass}`}>{item.tag}</span>
          </div>
        ))}

        <div className="card-footer">
          <div className="tools-bar">
            {id === "flyer" || id === "brochure" ? (
              <>
                <div className="tool-badge">🖥 Illustrator</div>
                <div className="tool-badge">🖼 Photoshop</div>
                {id === "flyer" && <div className="tool-badge">✦ Figma</div>}
              </>
            ) : (
              <>
                <div className="tool-badge">🖥 Illustrator</div>
                <div className="tool-badge">✦ Figma</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function renderIndustryDetail(id: IndustryId) {
  const data: Record<IndustryId, any> = {
    beaute: {
      title: "Beauté & Bien-être",
      sub: "Salon · Spa · Cosmétique · Esthétique",
      emoji: "💄",
      typo: {
        primary: ["Cormorant Garamond", "Playfair Display"],
        secondary: ["DM Sans", "Lato", "Raleway"],
        avoid: ["Impact", "Arial Bold", "Futura Heavy"],
        desc: "Serif élégante pour les titres + sans-serif fine pour le corps. Éviter les polices trop grasses ou agressives."
      },
      colors: [
        { hex: "#f5e6d8", name: "Rose poudré" },
        { hex: "#c9a882", name: "Beige doré" },
        { hex: "#2d2d2d", name: "Noir doux" },
        { hex: "#ffffff", name: "Blanc pur" }
      ],
      desc: "Élégant, doux, féminin. Beaucoup d'espace blanc. Photos lumineuses, haute qualité. Formes organiques, arrondies."
    },
    food: {
      title: "Restauration & Food",
      sub: "Restaurant · Café · Fast-food · Traiteur",
      emoji: "🍕",
      typo: {
        primary: ["Libre Baskerville", "Abril Fatface"],
        secondary: ["Josefin Sans", "Nunito"],
        avoid: ["Comic Sans", "Times New Roman"],
        desc: "Gastronomique : serif classique. Fast-food : sans-serif bold, impactante. Café : handwritten + sans-serif."
      },
      colors: [
        { hex: "#e63946", name: "Rouge" },
        { hex: "#f4a261", name: "Orange" },
        { hex: "#4a7c59", name: "Vert Bio" },
        { hex: "#1d1d1d", name: "Noir" }
      ],
      desc: "Photos de plats appétissantes en lumière naturelle. Textures authentiques (bois, kraft). Ambiance chaleureuse."
    },
    mode: {
      title: "Mode & Retail",
      sub: "Boutique · Prêt-à-porter · Accessoires",
      emoji: "👗",
      typo: {
        primary: ["Bodoni Moda", "Didact Gothic"],
        secondary: ["Futura PT", "Helvetica Neue"],
        avoid: [],
        desc: "Luxe : contrastes forts. Streetwear : Bold condensed, caps. Casual : Futura, Helvetica épuré."
      },
      colors: [
        { hex: "#000000", name: "Noir" },
        { hex: "#c9a53a", name: "Or" },
        { hex: "#e8dcc8", name: "Sable" },
        { hex: "#ffffff", name: "Blanc" }
      ],
      desc: "Photos de mode soignées. Beaucoup d'espace vide. Le produit est la star. Éviter les fonds chargés."
    },
    finance: {
      title: "Finance & Conseil",
      sub: "Cabinet · Comptabilité · Assurance",
      emoji: "💼",
      typo: {
        primary: ["Merriweather", "Source Serif Pro"],
        secondary: ["IBM Plex Sans", "Inter"],
        avoid: ["Handwritten"],
        desc: "Sérieuse, lisible, professionnelle. Serif pour les titres = crédibilité. Sans-serif pour le corps = lisibilité."
      },
      colors: [
        { hex: "#003087", name: "Bleu marine" },
        { hex: "#c9a53a", name: "Or" },
        { hex: "#f7f7f7", name: "Gris clair" },
        { hex: "#1c1c1e", name: "Noir" }
      ],
      desc: "Sobre, structuré, rigoureux. Grille stricte. Iconographie simple. La rigueur inspire la confiance."
    },
    sante: {
      title: "Santé & Médical",
      sub: "Médecin · Pharmacie · Dentiste",
      emoji: "🏥",
      typo: {
        primary: ["Nunito", "Open Sans"],
        secondary: ["Lato", "Roboto"],
        avoid: [],
        desc: "Polices rondes et lisibles = accessibilité et douceur. Clarté avant tout."
      },
      colors: [
        { hex: "#0077b6", name: "Bleu ciel" },
        { hex: "#90e0ef", name: "Bleu clair" },
        { hex: "#ffffff", name: "Blanc" },
        { hex: "#4caf50", name: "Vert santé" }
      ],
      desc: "Rassurant, clair, accessible. Photos humaines bienveillantes. Beaucoup d'espace blanc = propreté."
    },
    btp: {
      title: "BTP & Artisanat",
      sub: "Construction · Menuiserie · Électricité",
      emoji: "🏗",
      typo: {
        primary: ["Oswald", "Barlow Condensed"],
        secondary: ["Roboto", "Source Sans Pro"],
        avoid: [],
        desc: "Polices condensées bold = force, efficacité. Lisibles à distance (panneaux, véhicules)."
      },
      colors: [
        { hex: "#f4a261", name: "Orange" },
        { hex: "#1d3557", name: "Bleu marine" },
        { hex: "#e9c46a", name: "Jaune" },
        { hex: "#2c2c2c", name: "Anthracite" }
      ],
      desc: "Direct, solide, efficace. Photos de réalisations concrètes. Mettre en avant le savoir-faire."
    },
    luxe: {
      title: "Luxe & Hôtellerie",
      sub: "Hôtel · Resort · Prestige",
      emoji: "🏨",
      typo: {
        primary: ["Didot", "Cormorant Garamond"],
        secondary: ["Optima", "Garamond"],
        avoid: ["Bold aggressive"],
        desc: "Serif à forts contrastes = prestige absolu. Finesse = luxe. Moins c'est plus."
      },
      colors: [
        { hex: "#000000", name: "Noir absolu" },
        { hex: "#c9a53a", name: "Or" },
        { hex: "#f5f5f0", name: "Ivoire" },
        { hex: "#8b7355", name: "Bronze" }
      ],
      desc: "Minimalisme absolu. Photos ultra-léchées. Le luxe, c'est ce qu'on ne montre pas."
    },
    tech: {
      title: "Tech & Startup",
      sub: "SaaS · App · Innovation",
      emoji: "💻",
      typo: {
        primary: ["Satoshi", "Plus Jakarta Sans"],
        secondary: ["DM Sans", "Space Grotesk"],
        avoid: ["Traditional Serif"],
        desc: "Sans-serif géométriques modernes. Caractère fort, contemporain."
      },
      colors: [
        { hex: "#6366f1", name: "Indigo" },
        { hex: "#0f172a", name: "Dark navy" },
        { hex: "#22d3ee", name: "Cyan" },
        { hex: "#f8fafc", name: "Off-white" }
      ],
      desc: "Moderne, audacieux, dynamique. Dark mode recommandé. Maquettes de produit en contexte."
    },
    education: {
      title: "Éducation & Formation",
      sub: "École · Formation pro · Coaching",
      emoji: "🎓",
      typo: {
        primary: ["Nunito", "Poppins"],
        secondary: ["Open Sans", "Quicksand"],
        avoid: [],
        desc: "Polices rondes et accessibles = approchable et bienveillant."
      },
      colors: [
        { hex: "#3b82f6", name: "Bleu vif" },
        { hex: "#f59e0b", name: "Jaune" },
        { hex: "#10b981", name: "Vert" },
        { hex: "#ffffff", name: "Blanc" }
      ],
      desc: "Dynamique, optimiste, inclusif. Iconographie claire. Photos de personnes en apprentissage."
    },
    sport: {
      title: "Sport & Fitness",
      sub: "Salle de sport · Coach",
      emoji: "⚡",
      typo: {
        primary: ["Bebas Neue", "Barlow Condensed"],
        secondary: ["Oswald Bold", "Anton"],
        avoid: ["Light Serif"],
        desc: "Condensed bold = énergie, puissance, impact. Caps très utilisées."
      },
      colors: [
        { hex: "#ff3b30", name: "Rouge" },
        { hex: "#000000", name: "Noir" },
        { hex: "#ff9500", name: "Orange" },
        { hex: "#ffffff", name: "Blanc" }
      ],
      desc: "Agressif, énergique, motivant. Photos d'action dynamiques. Contrastes extrêmes."
    }
  };

  const item = data[id];
  if (!item) return null;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">{item.emoji} {item.title}</div>
        <div className="t-sm">{item.sub}</div>
      </div>
      <div className="card-body">
        <div className="spec-row"><div className="spec-icon">🔤</div><div className="spec-content"><div className="spec-title">Typographies recommandées</div>
          <div className="pill-group">
            {item.typo.primary.map((t: string) => <span key={t} className="pill primary">{t}</span>)}
            {item.typo.secondary.map((t: string) => <span key={t} className="pill secondary">{t}</span>)}
          </div>
          <div className="t-sm mt-2">{item.typo.desc}</div>
          {item.typo.avoid.length > 0 && (
            <div className="pill-group mt-1.5">
              {item.typo.avoid.map((t: string) => <span key={t} className="pill avoid">❌ {t}</span>)}
            </div>
          )}
        </div></div>
        <div className="spec-row"><div className="spec-icon">🎨</div><div className="spec-content"><div className="spec-title">Palette de couleurs</div>
          <div className="swatch-row">
            {item.colors.map((c: any) => (
              <div key={c.hex} className="swatch-chip"><div className="swatch-dot" style={{ background: c.hex, border: c.hex === "#ffffff" ? "1px solid #ddd" : "none" }}></div> {c.hex.toUpperCase()} <span className="t-label opacity-60 m-0">{c.name}</span></div>
            ))}
          </div>
        </div></div>
        <div className="spec-row"><div className="spec-icon">✨</div><div className="spec-content"><div className="spec-title">Style & Ton</div><div className="spec-desc">{item.desc}</div></div></div>
      </div>
    </div>
  );
}
