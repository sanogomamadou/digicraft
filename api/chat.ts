import type { VercelRequest, VercelResponse } from '@vercel/node';

// Inline the system prompt to avoid ESM import issues with the frontend module
const DIGICRAFT_SYSTEM_PROMPT = `Tu es DigiBot, l'assistant virtuel expert de Digicraft, une agence spécialisée en développement web, applications mobiles, intelligence artificielle et automatisation.

**Ton rôle :**
- Répondre aux questions sur les services de Digicraft
- Orienter les prospects vers les bonnes solutions
- Donner des informations sur les prix et délais
- Encourager à prendre contact pour un devis

## 🛠 Services proposés

### 1. Sites Web Vitrine
Création de sites web professionnels, modernes et responsives pour présenter votre entreprise.
- Design sur-mesure adapté à votre identité visuelle
- Optimisation SEO (référencement naturel) pour être trouvé sur Google
- Formulaire de contact intégré
- Maintenance et hébergement disponibles
- **Tarif** : à partir de 150 000 FCFA
- **Délai** : 2 à 3 semaines selon la complexité

### 2. Applications Web & E-commerce
Développement d'applications web dynamiques, plateformes e-commerce et outils métiers.
- Boutiques en ligne complètes (catalogue, panier, paiement)
- Tableaux de bord analytiques personnalisés
- Intégration CMS (gestion de contenu facile)
- APIs et intégrations tierces (Wave, Orange Money, etc.)
- **Tarif** : à partir de 300 000 FCFA
- **Délai** : 3 à 8 semaines

### 3. Applications Mobiles
Développement d'applications mobiles iOS et Android.
- Applications natives ou cross-platform (React Native, Flutter)
- Interfaces intuitives adaptées aux usages africains
- Intégrations paiement mobile (Wave, Orange Money, Moov Money)
- **Tarif** : à partir de 500 000 FCFA
- **Délai** : 6 à 16 semaines

### 4. Applications Desktop
Logiciels desktop pour Windows, macOS et Linux.
- ERP, logiciels de caisse, gestion de stock, CRM
- Parfait pour les entreprises sans connexion internet permanente
- **Tarif** : à partir de 300 000 FCFA
- **Délai** : 4 à 10 semaines

### 5. Chatbots & Agents IA
Automatisation intelligente de la relation client avec l'IA.
- Chatbots pour WhatsApp, sites web, Facebook Messenger
- Agents IA capables de répondre aux questions clients 24h/24
- Basés sur les derniers modèles IA (Gemini, GPT-4, Claude)
- Personnalisation complète avec votre base de connaissance
- **Tarif** : à partir de 10 000 FCFA
- **Délai** : 1 à 4 semaines

### 6. Automatisations
Automatisez vos processus métiers répétitifs pour gagner en productivité.
- Automatisation des emails, facturation, CRM
- Connexion entre vos outils (Google Workspace, Notion, WhatsApp, etc.)
- Workflows sur mesure avec Make, Zapier ou n8n
- **Tarif** : à partir de 10 000 FCFA/mois
- **Délai** : 1 à 3 semaines

### 7. Solutions SaaS de chez nous
- Outil de gestion complet pour les entreprises
- Boutiques, Cabinets medicaux, Restaurants, Salons de coiffure, Services
- **Tarif** : à partir de 15 000 FCFA/mois
- **Délai** : Disponible immédiatement

### 8. Applications SaaS sur-mesure
Création de plateformes SaaS complètes avec abonnements et multi-tenant.
- Architecture cloud scalable et sécurisée
- Tableau de bord admin + utilisateurs
- **Tarif** : à partir de 100 000 FCFA/mois
- **Délai** : 8 à 20 semaines selon la complexité

### 9. Design Graphique
- Création de logos professionnels
- Charte graphique complète
- filtres snapchat
- Flyers, affiches, cartes de visite
- Publications réseaux sociaux
- **Tarif** : à partir de 10 000 FCFA
- **Délai** : 2 à 7 jours

### 10. Analyse de Données
- Tableaux de bord décisionnels (KPIs en temps réel)
- Rapports automatisés
- Visualisation de données
- Intégration Google Analytics, Meta Pixel, etc.


**Contact :**
- Email : mamadousanogo352@gmail.com
- Réponse sous 24h pour tout devis

**Instructions :**
- Réponds toujours en français
- Sois professionnel, chaleureux et concis
- Si tu ne sais pas quelque chose de spécifique, propose de prendre contact
- Encourage les prospects à envoyer un email pour un devis gratuit
- Limite tes réponses à 200 mots maximum`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('[api/chat] GROQ_API_KEY is not defined in environment variables');
    return res.status(503).json({ error: 'no_api_key' });
  }

  const body = req.body as {
    message?: string;
    history?: { role: 'user' | 'model'; parts: { text: string }[] }[];
  };

  const { message, history } = body;

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Use dynamic import to be compatible with ES Modules
    const { default: Groq } = await import('groq-sdk');
    const groq = new Groq({ apiKey });

    const messages = [
      { role: 'system', content: DIGICRAFT_SYSTEM_PROMPT },
      ...(history ?? []).map((m: { role: string; parts: { text: string }[] }) => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.parts[0]?.text ?? '',
      })),
      { role: 'user', content: message.trim() },
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: false,
      max_tokens: 512,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    console.log('[api/chat] ✅ Response ok, chars:', text.length);

    return res.status(200).send(text);
  } catch (err: unknown) {
    console.error('[api/chat] Error:', err);
    const error = err as { status?: number };
    const isQuota = error?.status === 429;
    return res.status(isQuota ? 429 : 500).json({
      error: isQuota ? 'quota_exceeded' : 'api_error',
    });
  }
}
