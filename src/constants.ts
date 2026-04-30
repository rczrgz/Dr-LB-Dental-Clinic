import type { Branch, Service, Testimonial, Leader } from './types';

export const CLINIC_NAME = "Dr. LB Dental Clinic";

export const BRANCHES: Branch[] = [
  {
    id: "1",
    name: "Pasig Blvd, Kapitolyo Branch",
    address: "Elements @ Rosemarie, Pasig Blvd. Kapitolyo Pasig, Pasig, Philippines",
    phone: "+63 917 123 4567",
    facebookUrl: "https://www.facebook.com/profile.php?id=100089088542985",
    imageUrl: "https://picsum.photos/seed/dental1/800/600"
  },
  {
    id: "2",
    name: "Amang Rodriguez Ave, Pasig Branch",
    address: "92 Eugolio Amang Rodriguez Ave, Pasig, Philippines",
    phone: "+63 917 234 5678",
    facebookUrl: "https://www.facebook.com/profile.php?id=100089019756176",
    imageUrl: "https://picsum.photos/seed/dental2/800/600"
  },
  {
    id: "3",
    name: "Regalado Ave, Fairview Branch",
    address: "3 Regalado Avenue West Fairview, Quezon City, Philippines",
    phone: "+63 917 345 6789",
    facebookUrl: "https://www.facebook.com/profile.php?id=100088640181008",
    imageUrl: "https://picsum.photos/seed/dental3/800/600"
  },
  {
    id: "4",
    name: "Congressional Ave, Quezon City Branch",
    address: "Unit 1A 2nd Floor, 652-C Congressional Avenue Extension corner Visayas Avenue, Barangay Pasong Tamo, Quezon City, Philippines",
    phone: "+63 917 456 7890",
    facebookUrl: "https://www.facebook.com/profile.php?id=100064279714433",
    imageUrl: "https://picsum.photos/seed/dental4/800/600"
  },
  {
    id: "5",
    name: "Marikina – Malanday Branch",
    address: "Unit 1B, E & J Commercial Building, 721 Jp Rizal Street, Marikina City, Philippines",
    phone: "+63 917 567 8901",
    facebookUrl: "https://www.facebook.com/DrLBDentalClinicMalandayMarikina",
    imageUrl: "https://picsum.photos/seed/dental5/800/600"
  },
  {
    id: "6",
    name: "Parang, Marikina Branch",
    address: "BG Molina Street NGI Parang, Marikina City, Philippines",
    phone: "+63 917 678 9012",
    facebookUrl: "https://www.facebook.com/DrLBDentalParang",
    imageUrl: "https://picsum.photos/seed/dental6/800/600"
  },
  {
    id: "7",
    name: "Tanauan Branch",
    address: "RegaOne Building, Tanauan",
    phone: "+63 917 789 0123",
    facebookUrl: "https://www.facebook.com/LibuitBirungDentalClinic",
    imageUrl: "https://picsum.photos/seed/dental7/800/600"
  }
];

export const SERVICES: Service[] = [
  {
    id: "gen",
    title: "General Dentistry",
    description: "Routine check-ups, cleaning, and preventive care for a healthy smile.",
    icon: "Stethoscope"
  },
  {
    id: "cos",
    title: "Cosmetic Dentistry",
    description: "Whitening, veneers, and smile makeovers to boost your confidence.",
    icon: "Sparkles"
  },
  {
    id: "surg",
    title: "Oral Surgery",
    description: "Expert surgical procedures including wisdom tooth extraction.",
    icon: "Scissors"
  },
  {
    id: "impl",
    title: "Dental Implants",
    description: "Permanent solutions for missing teeth with advanced implant technology.",
    icon: "Anchor"
  },
  {
    id: "ortho",
    title: "Orthodontics",
    description: "Braces and clear aligners to straighten your teeth perfectly.",
    icon: "Grid"
  },
  {
    id: "tmj",
    title: "TMJ Management",
    description: "Specialized treatment for jaw pain and bite alignment issues.",
    icon: "Activity"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Maria Santos",
    rating: 5,
    text: "The best dental experience I've ever had. The clinic is so clean and the staff are very professional."
  },
  {
    id: "t2",
    name: "James Wilson",
    rating: 5,
    text: "Dr. LB is amazing. I had my implants done here and the process was smooth and painless."
  },
  {
    id: "t3",
    name: "Elena Cruz",
    rating: 4,
    text: "Very modern equipment and a very welcoming atmosphere. Highly recommended for families."
  }
];

export const LEADERS: Leader[] = [
  {
    id: "ceo",
    name: "Dr. Leonora B. Dela Cruz",
    title: "CEO & Founder",
    quote: "Our mission is to provide world-class dental care that prioritizes patient comfort and long-term oral health.",
    imageUrl: "https://picsum.photos/seed/ceo/400/400",
    isCeo: true
  }
];

export const GALLERY_IMAGES = [
  "https://picsum.photos/seed/clinic1/800/600",
  "https://picsum.photos/seed/clinic2/800/600",
  "https://picsum.photos/seed/clinic3/800/600",
  "https://picsum.photos/seed/clinic4/800/600",
  "https://picsum.photos/seed/clinic5/800/600",
  "https://picsum.photos/seed/clinic6/800/600"
];