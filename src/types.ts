export interface ServiceItem {
  id: string;
  name: string;
  icon: string; // lucide icon name
  description: string;
  longDescription: string;
  duration: string;
  startingPrice: string;
  benefits: string[];
  category: 'cosmetic' | 'restorative' | 'general' | 'emergency';
}

export interface DentistProfile {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialties: string[];
  credentials: string[];
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  review: string;
  rating: number;
  date: string;
  treatmentReceived: string;
  image: string;
  videoUrl?: string; // Mock video url trigger
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number; // monthly fee
  billing: string;
  description: string;
  inclusions: string[];
  savingsValue: string;
  insuranceAlternative: string;
  isPopular?: boolean;
}

export interface ClinicRoom {
  id: string;
  name: string;
  description: string;
  image: string;
  highlight: string;
}

export interface SavedAppointment {
  name: string;
  phone: string;
  service: string;
  preferredDate: string;
  timeSlot: string;
  isEmergency: boolean;
  message?: string;
  bookedAt: string;
}
