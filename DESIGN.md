---
name: DigiCraft
description: Agence digitale B2B (Bamako) — sites, SaaS, IA, automatisation
colors:
  blue: "#086EBA"
  blue-soft: "#5CB6F9"
  ink: "#0B1022"
  ink-2: "#141A31"
  paper: "#EFEFEF"
  hero-top: "#A3A8AD"
  logo-navy: "#04092F"
  text: "#0E1328"
  muted: "#565C6C"
  ghost: "#7F8592"
typography:
  wordmark:
    fontFamily: "\"Archivo\", sans-serif"
    fontVariation: "wdth 62, wght 800"
  display:
    fontFamily: "\"Inter Tight\", sans-serif"
    fontWeight: 500
    letterSpacing: "-0.05em"
  label:
    fontFamily: "\"Inter Tight\", sans-serif"
    fontSize: "12px"
    textTransform: uppercase
rounded:
  card: "28px"
  pill: "9999px"
---

# Design System: DigiCraft — « Affiche de sport »

## Contrat de direction

**THESIS.** Une agence digitale présentée comme une campagne de marque sportive : un wordmark géant, une personne en mouvement, des chiffres énormes. On refuse le « dark mode + glow bleu + cartes glass » des agences tech.

**OWN-WORLD.** Dégradé studio gris neutre qui fond vers un papier #EFEFEF ; sections encre marine #0B1022 ; un seul accent, le bleu DigiCraft #086EBA (teinte du logo, 206°, en plus profond), utilisé en masse (wordmark, chiffres géants, marquee, astérisques). Grotesque serrée (Inter Tight, tracking négatif) + wordmark Archivo ultra-condensé. Petites capitales justifiées, filets 1px, pilules encre + rond bleu fléché ↱, astérisque ✱ comme signature.

**STORY.** Le visiteur (dirigeant de PME) comprend en une vue : DigiCraft fait sites, SaaS, IA, automatisation ; il voit des produits réels en ligne ; il lit des avis de clients identifiables ; il clique « Démarrer un projet ».

**FIRST VIEWPORT.** « DIGICRAFT » bord à bord en bleu en haut ; une personne détourée en saut passe devant les lettres ; labels services en petites capitales sur le filet ; titre en bas à gauche « Digitalisez plus vite. Grandissez plus loin.✱ » ; 30+ projets avec avatars ; gros bouton rond blanc ↱ en bas à droite (CTA).

**FORM.** Brief épinglé par l'utilisateur (référence « Nemuta »), reproduit fidèlement, accent rouge remplacé par le bleu du logo DigiCraft.

## Couleurs

Toute la palette dérive du logo (bleu ciel `#5CB6F9`, marine `#04092F`).

- **Bleu DigiCraft** `#086EBA` : la couleur de masse (wordmark, chiffres géants, marquee, astérisques, ronds CTA). Même teinte que le bleu du logo (206°), assombrie pour rester lisible : 4,6:1 sur papier, 5,3:1 avec du blanc dessus.
- **Bleu logo** `#5CB6F9` : accents et petit texte sur fond sombre (8,5:1 sur encre).
- **Encre marine** `#0B1022`, carte `#141A31`, filets `rgba(255,255,255,.08)`.
- **Texte** `#0E1328` (marine très sombre), **secondaire** `#565C6C`, **seconde ligne des titres** `#7F8592` (≥ 3:1 en grand corps).
- **Papier** `#EFEFEF`, filets `rgba(0,0,0,.1)`. **Fond du hero** : dégradé neutre `#A3A8AD` → `#EFEFEF` (neutre pour que le bleu ressorte).

Règle : pas de dégradé décoratif, pas de glow, pas de verre. Le seul dégradé est le fond studio du hero.

## Logo

Deux versions horizontales (monogramme D-O + « DIGICRAFT / SOLUTIONS DIGITALES »), couleurs d'origine conservées :
`/logo-light.webp` (marine, pour fonds clairs) et `/logo-dark.webp` (bleu ciel, pour fonds sombres). La nav bascule de l'une à l'autre selon la section ; aucun texte à côté du logo. Sources dans `assets-src/`.

## Typographie

- **Wordmark** Archivo `wdth 62 / wght 800`, ajusté au pixel près à la largeur du conteneur (hook `useFitText`), interligne 0.8.
- **Display** Inter Tight 500, tracking −0.05em, interligne 0.92–1.
- **Labels** Inter Tight 400, 11–12px, MAJUSCULES, souvent justifiés (`text-align-last: justify`) en blocs étroits.
- **Chiffres géants** Inter Tight 500, bleu, rognés par le bord de la carte.

## Composants

- **Carte encre** rayon 28px, ovale photo en haut à gauche + ✱ bleu, titre en haut à droite, filet horizontal, texte en bas à gauche, chiffre géant bleu rogné en bas à droite.
- **Pilule CTA** pilule encre + rond bleu ↱ accolé. **Rond blanc** ↱ bleu pour les CTA isolés.
- **Bande encre active** : liste de noms gris flous, l'élément actif devient une bande encre pleine largeur.
- **Marquee** texte bleu majuscules + ✱, défilement CSS infini.

## Mouvement

Une entrée orchestrée au hero (lettres qui montent depuis un masque, personnage qui se défloute). Au scroll : titre qui se colore mot à mot, cartes services empilées (sticky), liste réalisations pilotée par le scroll. Lenis pour le défilement. Tout est désactivé sous `prefers-reduced-motion`.

## À faire / à ne pas faire

- Faire : accent bleu en grandes surfaces, filets 1px, petites capitales justifiées, chiffres géants rognés.
- Ne pas faire : glassmorphism, halos colorés, dégradés de texte, cartes icône+titre identiques, mode clair/sombre basculable.
