export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  facebookUrl: string;
  imageUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
}

export interface Leader {
  id: string;
  name: string;
  title: string;
  quote: string;
  imageUrl: string;
  isCeo?: boolean;
}
