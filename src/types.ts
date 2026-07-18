import { z } from 'zod';

export interface ModuleItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  category: 'core' | 'admin' | 'academic' | 'operations';
  color: string; // CSS class for colors or gradient
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  review: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
}

// Zod schema for Contact / Book Demo validation
export const demoFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  department: z.string().min(2, { message: 'Department must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  message: z.string().optional(),
});

export type DemoFormData = z.infer<typeof demoFormSchema>;
