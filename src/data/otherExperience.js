// ── Other Experience Data ─────────────────────────────────────────────────────
// To add a certificate or activity: append an entry to `experiences`.
// Set `image` to the certificate asset, or leave it null to show a placeholder.
import { asset } from '../utils/asset'

export const categories = {
  community: { color: '#00E5A0' },
  training: { color: '#4FACFE' },
}

export const freelance = {
  image: asset('other-experience/upwork-profile.png'),
  highlights: [
    { key: 'topRated', label: 'Top Rated Freelancer on Upwork', labelFr: 'Freelance Top Rated sur Upwork' },
    { key: 'jobSuccess', label: '100% Job Success Score on Upwork', labelFr: 'Score de Réussite de 100% sur Upwork' },
    { key: 'experience', label: '3+ years of freelance experience', labelFr: 'Plus de 3 ans d\'expérience freelance' },
    { key: 'editing', label: 'Professional video editing experience', labelFr: 'Expérience professionnelle en montage vidéo' },
    { key: 'international', label: 'Experience with international clients', labelFr: 'Expérience avec des clients internationaux' },
    { key: 'production', label: 'Project management & creative production', labelFr: 'Gestion de projet & production créative' },
  ],
}

export const experiences = [
  {
    id: 'ethics-innovation-digital-technology',
    category: 'training',
    title: 'Ethics, Innovation & Digital Technology',
    titleFr: 'Éthique, Innovation & Technologie Numérique',
    organization: 'École Polytechnique Sousse',
    date: '17 April 2026',
    dateFr: '17 avril 2026',
    description: 'Participated in the first edition of “Ethics, Innovation & Digital Technology,” exploring cybercrime, entrepreneurship, freelancing, and ethical challenges in the digital age.',
    descriptionFr: 'Participation à la première édition de « Éthique, Innovation & Technologie Numérique », explorant la cybercriminalité, l\'entrepreneuriat, le freelancing et les enjeux éthiques de l\'ère numérique.',
    topics: ['Cybercrime', 'Rise of startups', 'Freelancing in Tunisia', 'Ethics in the digital age', 'Tunisia\'s evolving legal and digital landscape'],
    topicsFr: ['Cybercriminalité', 'Essor des startups', 'Freelancing en Tunisie', 'Éthique à l\'ère numérique', 'Évolution du paysage juridique et numérique tunisien'],
    image: asset('other-experience/ethics-innovation-digital-technology.png'),
  },
  {
    id: 'bal-psc-2k25',
    category: 'community',
    title: 'Bal PSC 2k25 — Socio-Cultural Project',
    titleFr: 'Bal PSC 2k25 — Projet Socio-Culturel',
    organization: 'École Polytechnique Sousse',
    date: '23 May 2025',
    dateFr: '23 mai 2025',
    location: 'Campus GFI Sousse',
    description: 'As part of a first-year socio-cultural project, my group organized a robotics competition for primary-school students, contributing to the success of the 10th edition of Bal PSC 2k25 under the theme “Engineering Impact, Empowering Humanity.”',
    descriptionFr: 'Dans le cadre d\'un projet socio-culturel de première année, notre groupe a organisé une compétition de robotique pour les élèves du primaire, contribuant au succès de la 10ème édition du Bal PSC 2k25 sous le thème « Engineering Impact, Empowering Humanity ».',
    topics: ['Robotics', 'Education', 'Organization', 'Teamwork', 'Primary-school students'],
    topicsFr: ['Robotique', 'Éducation', 'Organisation', 'Travail d\'équipe', 'Élèves du primaire'],
    image: asset('other-experience/bal-psc-2k25.png'),
  },
  {
    id: 'first-aid-les-gestes-qui-sauvent',
    category: 'training',
    title: 'First Aid Training — “Les gestes qui sauvent”',
    titleFr: 'Formation aux Premiers Secours — « Les gestes qui sauvent »',
    organization: 'STAR Assurances',
    date: '1 October 2024',
    dateFr: '1 octobre 2024',
    location: 'GFI Sousse',
    description: 'Completed the citizen training program “Les gestes qui sauvent,” covering essential emergency response and first-aid actions.',
    descriptionFr: 'Formation citoyenne « Les gestes qui sauvent », couvrant les réflexes essentiels de réponse d\'urgence et de premiers secours.',
    image: asset('other-experience/first-aid-les-gestes-qui-sauvent.png'),
  },
]
