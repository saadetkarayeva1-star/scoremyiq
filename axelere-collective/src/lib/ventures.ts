export interface Venture {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: 'Active' | 'In Development' | 'Completed';
  accentColor: string;
}

export const ventures: Venture[] = [
  {
    id: 'arc-studio',
    title: 'Arc Studio',
    category: 'Design & Architecture',
    year: '2024',
    tagline: 'Space as language.',
    description: 'Reimagining spatial design through a lens of restraint and material honesty.',
    longDescription:
      'Arc Studio is an architecture and interior design practice built on the principle that space is the most powerful form of communication. We design environments that speak without noise — where every surface, material, and proportion carries meaning. Our work spans private residences, hospitality, and cultural institutions.',
    status: 'Active',
    accentColor: '#c9b99a',
  },
  {
    id: 'void-technology',
    title: 'Void Technology',
    category: 'Deep Tech',
    year: '2024',
    tagline: 'Dissolving the interface.',
    description: 'Building next-generation interfaces that dissolve the boundary between human and machine.',
    longDescription:
      'Void is a deep technology venture developing ambient computing systems that disappear into everyday life. We believe the best interface is no interface — technology that anticipates and serves without demanding attention. Our research spans neuromorphic computing, spatial computing, and bio-signal integration.',
    status: 'In Development',
    accentColor: '#8a9ea8',
  },
  {
    id: 'maison-one',
    title: 'Maison One',
    category: 'Fashion',
    year: '2023',
    tagline: 'Fewer things, made well.',
    description: 'A fashion house defined by obsessive craft and an unwillingness to compromise.',
    longDescription:
      'Maison One is a fashion house built on one conviction: the world has enough clothes. What it needs are fewer garments, made with extraordinary care. We produce two collections per year, each a distillation of a single material idea explored across form, proportion, and construction.',
    status: 'Active',
    accentColor: '#b8a89a',
  },
  {
    id: 'signal-journal',
    title: 'Signal Journal',
    category: 'Publishing & Media',
    year: '2025',
    tagline: 'Writing worth reading.',
    description: 'A curated editorial platform for long-form culture, design, and technology writing.',
    longDescription:
      'Signal is our editorial arm — a slow, considered publication that publishes one long-form piece per week. We believe in depth over frequency. Our contributors are practitioners: designers writing about process, engineers writing about ethics, architects writing about cities.',
    status: 'Active',
    accentColor: '#a8b4c0',
  },
  {
    id: 'material-research',
    title: 'Material Research Lab',
    category: 'Research & Innovation',
    year: '2025',
    tagline: 'Understanding what things are made of.',
    description: 'A materials research laboratory exploring sustainable luxury at the molecular level.',
    longDescription:
      'The Material Research Lab is our most speculative venture — a laboratory exploring the frontier of sustainable and regenerative materials for luxury applications. We work with bio-fabricated textiles, mycelium composites, and ancient craft techniques reinterpreted through contemporary science.',
    status: 'In Development',
    accentColor: '#c4b8a4',
  },
  {
    id: 'twenty-four-seven',
    title: 'Twenty Four Seven',
    category: 'Hospitality',
    year: '2026',
    tagline: 'A place to be still.',
    description: 'A members-only hospitality concept designed around depth, not novelty.',
    longDescription:
      'Twenty Four Seven is a hospitality concept under development — a series of small, carefully curated spaces designed for deep work, creative retreat, and meaningful exchange. Not a hotel, not a club. Something quieter and more lasting.',
    status: 'In Development',
    accentColor: '#b0aa9e',
  },
];
