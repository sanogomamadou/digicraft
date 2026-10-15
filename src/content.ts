import type { AvatarSpec } from './components/Avatar';

// Contenu du site. Sources des images générées : assets-src/.

export const services = [
  {
    title: 'Sites Web & E-commerce',
    body: 'Des sites vitrines et boutiques en ligne ultra-rapides, pensés pour le référencement et la conversion.',
    image: '/people/service-1.webp',
    imagePos: '25% 35%',
  },
  {
    title: 'Applications & SaaS',
    body: 'Des logiciels sur-mesure, web et mobile, qui digitalisent votre caisse, vos stocks et vos dossiers clients.',
    image: '/people/service-2.webp',
    imagePos: '45% 25%',
  },
  {
    title: 'Agents IA & Chatbots',
    body: 'Des assistants intelligents qui répondent à vos clients 24h/24 et qualifient vos prospects.',
    image: '/people/service-3.webp',
    imagePos: '62% 30%',
  },
  {
    title: 'Automatisation n8n',
    body: 'Des workflows qui relient vos outils et suppriment les tâches répétitives, sans intervention.',
    image: '/people/service-4.webp',
    imagePos: '35% 30%',
  },
  {
    title: 'Design & Branding',
    body: 'Logos, flyers et identités visuelles qui marquent les esprits et assoient votre crédibilité.',
    image: '/people/service-5.webp',
    imagePos: '45% 35%',
  },
  {
    title: 'Data & Tableaux de bord',
    body: 'Vos chiffres clés visualisés en temps réel pour décider vite. Ne naviguez plus à vue.',
    image: '/people/service-6.webp',
    imagePos: '60% 35%',
  },
];

export type Project = {
  name: string;
  tag: string;
  kind: string;
  body: string;
  image?: string;
  url?: string;
  owned?: boolean;
};

export const projects: Project[] = [
  {
    name: 'ClinixPro',
    tag: 'SaaS',
    kind: 'Logiciel de gestion de clinique',
    body: 'Dossiers patients, rendez-vous, ordonnances PDF, pharmacie et caisse. Un SaaS conçu et édité par DigiCraft pour les cliniques d’Afrique de l’Ouest.',
    image: '/work/clinixpro.webp',
    url: 'https://clinixpro.digicraftso.com/',
    owned: true,
  },
  {
    name: 'eDjago',
    tag: 'SaaS',
    kind: 'Caisse & gestion de boutique',
    body: 'La caisse de votre boutique, même sans Internet : ventes, stock, crédits clients et fournisseurs depuis un téléphone. Un produit DigiCraft.',
    image: '/work/edjago.webp',
    url: 'https://edjago.digicraftso.com/decouvrir',
    owned: true,
  },
  {
    name: 'OG Shop',
    tag: 'Shop',
    kind: 'E-commerce sneakers',
    body: 'La boutique en ligne d’une enseigne de sneakers à Bamako : catalogue, panier et commande, pensés pour le mobile.',
    image: '/work/ogshop.webp',
    url: 'https://ogshop.digicraftso.com/',
  },
  {
    name: 'H2 Design',
    tag: 'Web',
    kind: 'Site vitrine architecture',
    body: 'Le site d’une entreprise d’architecture et de construction présente au Mali, en Guinée et en Côte d’Ivoire.',
    image: '/work/h2design.webp',
    url: 'https://h2designml.com/',
  },
  {
    name: 'TAT Mali',
    tag: 'Web',
    kind: 'Landing page produit',
    body: 'La landing page de la tomate concentrée TAT pour BMK Group : produit, recettes et points de vente.',
    image: '/work/tatmali.webp',
    url: 'https://tatmali.vercel.app/',
  },
  {
    name: 'Lead Engine',
    tag: 'n8n',
    kind: 'Automatisation de prospection',
    body: 'Un workflow n8n de génération de leads pour un cabinet de recrutement : collecte, qualification et relance, sans intervention humaine.',
  },
];

// Avatars illustrés : ajustez coiffure / barbe / lunettes / tenue pour chaque client.
export const testimonials: { text: string; name: string; role: string; avatar: AvatarSpec }[] = [
  {
    text: 'DigiCraft a complètement transformé notre présence en ligne. Le site est élégant, fonctionnel et met vraiment en valeur notre travail.',
    name: 'Mr Keita',
    role: 'CEO, H2 Design',
    avatar: { skin: '#6b4330', hair: 'fade', beard: true, outfit: '#0b1022', collar: 'shirt' },
  },
  {
    text: 'Notre nouveau site est vraiment magnifique. Design moderne, expérience fluide, intégration parfaite. Merci DigiCraft !',
    name: 'Boubacar Mariko',
    role: 'CEO, BMK Group',
    avatar: { skin: '#5a3726', hair: 'bald', beard: true, glasses: true, outfit: '#2b3a55', collar: 'blazer' },
  },
  {
    text: 'L’application SaaS nous permet de gérer nos dossiers clients et de digitaliser nos services. L’équipe a su traduire nos besoins en solution intuitive.',
    name: 'Dr. Hawa Sangaré',
    role: 'CEO, Cabinet Tata Sylla',
    avatar: { skin: '#7a4b33', hair: 'wrap', wrapColor: '#086eba', earrings: true, outfit: '#f4f4f4', collar: 'blazer' },
  },
  {
    text: 'Leur niveau d’expertise est impressionnant. Le logo réalisé est magnifique et correspond parfaitement à mon image de marque.',
    name: 'Dre',
    role: 'Founder, Raw Dre Store',
    avatar: { skin: '#63402d', hair: 'locs', outfit: '#086eba', collar: 'crew' },
  },
];

export const steps = [
  {
    title: 'Consultation & Stratégie',
    body: 'Nous écoutons vos besoins, analysons votre marché et définissons ensemble la stratégie digitale adaptée à votre PME.',
  },
  {
    title: 'Design & Développement',
    body: 'Nous concevons l’interface et développons votre solution sur-mesure avec les technologies les plus adaptées.',
  },
  {
    title: 'Déploiement & Suivi',
    body: 'Nous lançons votre projet et assurons un suivi continu pour des performances optimales dans la durée.',
  },
];

export const plans = [
  {
    name: 'Starter',
    price: '150 000 F',
    priceInfo: 'À partir de',
    tagline: 'Idéal pour lancer votre présence en ligne.',
    features: ['Site vitrine responsive', 'Design personnalisé', 'Optimisation SEO de base', 'Formulaire de contact'],
    footer: 'Support technique 1 mois',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '450 000 F',
    priceInfo: 'À partir de',
    tagline: 'Pour les entreprises en pleine croissance.',
    features: ['Site e-commerce ou web app', 'Intégration CMS', 'Automatisations de base', 'Tableau de bord analytique'],
    footer: 'Support technique 3 mois',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    priceInfo: 'Adapté à votre projet',
    tagline: 'Solutions sur-mesure avec IA.',
    features: ['Application SaaS sur-mesure', 'Intégration d’agents IA', 'Analyse de données avancée', 'Infrastructure cloud dédiée'],
    footer: 'Support prioritaire 24/7',
    highlighted: false,
  },
];
