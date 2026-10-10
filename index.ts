export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export interface ResponsibilityItem {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  tag: string;
  iconName: string;
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  visualMetaphor: string;
  deliverables: string[];
}

export interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

export interface CaseStudyData {
  title: string;
  subtitle: string;
  client: string;
  location: string;
  objective: string;
  contribution: string;
  outcome: string;
  tags: string[];
}

export interface ClientRelationshipData {
  clientName: string;
  headline: string;
  description: string;
  quote: string;
  principles: string[];
}

export interface StrategyNode {
  id: string;
  label: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  color: string;
}

export interface ContactInfoData {
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  instagram: string;
  linkedin: string;
}
