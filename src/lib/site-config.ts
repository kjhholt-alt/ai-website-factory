import siteData from "../../site.json";

export interface Service {
  id: string;
  name: string;
  description: string;
  dates: string;
  time: string;
  ages: string;
  skillLevel: string;
  price: number;
  maxCapacity: number;
  location: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  description: string;
  logo: {
    text: string;
    icon: string;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    font: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    address: string;
    mapUrl: string;
  };
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  pages: {
    home: boolean;
    register: boolean;
    schedule: boolean;
    about: boolean;
    contact: boolean;
    admin: boolean;
  };
  services: Service[];
  testimonials: Testimonial[];
  features: Feature[];
  registration: {
    enabled: boolean;
    waiverText: string;
    requiredFields: {
      parent: string[];
      player: string[];
      emergency: string[];
    };
  };
  admin: {
    password: string;
    email: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const siteConfig: SiteConfig = siteData as SiteConfig;
