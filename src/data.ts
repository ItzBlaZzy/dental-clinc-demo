import { ServiceItem, DentistProfile, Testimonial, FAQItem, MembershipPlan, ClinicRoom } from './types';

export const CLINIC_SERVICES: ServiceItem[] = [
  {
    id: 'whitening',
    name: 'Precision Teeth Whitening',
    icon: 'Sparkles',
    description: 'Enlighten-grade medical bleaching utilizing state-of-the-art blue-laser light acceleration.',
    longDescription: 'Our signature clinical teeth whitening uses laser activation to gently penetrate tooth structure, safely oxidizing years of deep coffee, tea, and tobacco staining. With our dual-action desensitizing serum overlay, we offer custom-shade results with zero post-operative pain or enamel abrasion.',
    duration: '45 - 60 minutes',
    startingPrice: '$299',
    benefits: ['Immediate 6-8 shade brightening', 'Custom clinical desensitizing layers', 'Enamel-safe cold laser activation', 'Take-home precision maintenance kit included'],
    category: 'cosmetic'
  },
  {
    id: 'implants',
    name: 'State-of-the-Art Dental Implants',
    icon: 'Award',
    description: 'Perfect titanium dental roots topped with custom, hand-crafted aesthetic porcelain crowns.',
    longDescription: 'Using precision 3D cone-beam navigation, our certified oral implantologists place bio-compatible grade-5 titanium anchors directly into bone tissue with microscopic accuracy. Once integrated, each titanium base is fitted with a hand-sculpted ceramic crown matched to your natural facial contours.',
    duration: '2 - 3 visits over 3 months',
    startingPrice: '$1,999',
    benefits: ['100% stable, biocompatible anchors', 'Fully preserves healthy adjacent teeth', 'Prevents clinical bone recession', 'High-end aesthetic ceramic craftsmanship'],
    category: 'restorative'
  },
  {
    id: 'veneers',
    name: 'Signature Porcelain Veneers',
    icon: 'Layers',
    description: 'Elite ultra-thin porcelain shells designed individually to shape and shade a celebrity-grade smile.',
    longDescription: 'Hand-milled from top-tier Swiss ceramic blocks, our signature micro-thin porcelain veneers are custom-glazed to mask alignment errors, chips, uneven sizes, and stubborn internal mineral staining. Each shell is beautifully contoured to coordinate with your natural lip-line outline.',
    duration: '2 appointments (7-10 days apart)',
    startingPrice: '$999',
    benefits: ['Completely stain-resistant premium dental porcelain', 'Individually layered color grading for realistic glow', 'Minimally-invasive preparation', 'Guaranteed durability for 15+ years'],
    category: 'cosmetic'
  },
  {
    id: 'invisalign',
    name: 'Invisalign® Clear Aligners',
    icon: 'Activity',
    description: 'Virtually invisible orthodontic therapy mapping orthodontic alignment without visual metallic brackets.',
    longDescription: 'Ditch clinical wires for comfort. Our clear aligners are thermo-formed using proprietary SmartTrack® medical polymer. Designed chronologically using elite virtual shift algorithms, our patients enjoy a progressive, comfortable orthodontic path that is entirely removable.',
    duration: '6 - 12 months',
    startingPrice: '$3,499',
    benefits: ['100% custom, completely clear medical-polymer aligners', 'Easily removable for meals, brushing, and events', 'Minimal discomfort compared to metal brackets', 'Free cosmetic whitening touch-up at completion'],
    category: 'cosmetic'
  },
  {
    id: 'rootcanal',
    name: 'Gentle Laser Endodontics',
    icon: 'ShieldAlert',
    description: 'Microscopic root therapy eliminating acute infections painlessly using dental irrigation lasers.',
    longDescription: 'Forget legacy dental root canal horror stories. Using professional medical microscopes and gentle dental irrigation lasers, our specialists decontaminate complex nerve canals without pain. Canals are sealed using premium biocompatible gutta-percha to fully restore structural stability.',
    duration: '1 - 2 hours (usually 1 visit)',
    startingPrice: '$699',
    benefits: ['99% success rate in saving natural tooth structure', 'Advanced digital laser irrigation sterilizes canals', 'Immediate alleviation of acute tooth pain', 'Fully safe dental sedation protocols available'],
    category: 'restorative'
  },
  {
    id: 'cosmetic',
    name: 'Aesthetic Dental Restorations',
    icon: 'Sun',
    description: 'Bespoke composite bonding and full-porcelain dental crowns matching pure organic teeth.',
    longDescription: 'We merge physics and artistry. Whether replacing ancient silver amalgam crowns with pure lithium-disilicate (E.max) porcelain, or curing micro-filled hybrid aesthetic resin to repair worn edges, we restore visual and structural integrity effortlessly with flawless biological bounds.',
    duration: '1 - 2 hours',
    startingPrice: '$499',
    benefits: ['Metal-free, safe materials used exclusively', 'Perfect structural and visual light refraction', 'Chemically bonds and strengthens weak tooth structures', 'No dark metallic margin lines near gum boundaries'],
    category: 'cosmetic'
  },
  {
    id: 'pediatric',
    name: 'Comfort First Pediatric Suite',
    icon: 'Smile',
    description: 'Playful, calm, and nurturing dental introduction designed specifically to keep young smiles cavity-free.',
    longDescription: 'We make visits incredibly fun! Our customized pediatric suite utilizes virtual-reality distraction screens, warm water syringes to prevent hot/cold shock, and pain-free preventative dental sealants. We emphasize absolute trust, establishing lifetime positive habits early.',
    duration: '30 - 45 minutes',
    startingPrice: '$149',
    benefits: ['Ultra-gentle plaque removal and polish', 'Protective modern mineral fluoride seals', 'VR entertainment goggles during therapy', 'Prizes, clinical games, and customized education'],
    category: 'general'
  },
  {
    id: 'emergency',
    name: 'Priority Emergency Dental Care',
    icon: 'HeartHandshake',
    description: 'Immediate sameday triaging for dental pain, knocked-out teeth, or sudden crown damage.',
    longDescription: 'When dental misfortune strikes, every second matters. We retain dedicated clinical slots daily for urgent patients experiencing severe swelling, crown fractures, intense throbbing pain, or dental trauma. We promise to diagnose and alleviate pain within minutes of arrival.',
    duration: 'Immediate scheduling preference',
    startingPrice: '$199',
    benefits: ['Guaranteed sameday booking priority', 'Immediate digital X-ray diagnostics', 'Dedicated dental pain containment protocol', 'Direct priority access to on-call surgeons'],
    category: 'emergency'
  }
];

export const SPECIALIST_DENTISTS: DentistProfile[] = [
  {
    id: 'mercer',
    name: 'Dr. Alexander Mercer, DDS',
    role: 'Clinical Director & Lead Cosmetic Sculptor',
    experience: '16+ Years Experience',
    specialties: ['Porcelain Smile Redesign', 'Full-Arch Dental Rehabilitation', 'CAD/CAM Laser Dentistry'],
    credentials: ['Doctor of Dental Surgery, Columbia University', 'Fellow, American Academy of Cosmetic Dentistry (AACD)', 'Master of Oral Implantology (Loma Linda University)'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop',
    bio: 'With an artist’s eye and surgeon’s precision, Dr. Mercer has pioneered custom porcelain cosmetic overlays. He believes that a perfect smile is not just bright—it is a harmonious extension of an individual’s unique facial anatomy, lip kinetics, and personal character.'
  },
  {
    id: 'chen',
    name: 'Dr. Evelyn Chen, DDS, MS',
    role: 'Chief of Aesthetic Orthodontics & Pediatrics',
    experience: '12+ Years Experience',
    specialties: ['Invisible Aligner Systems (Invisalign Gold Partner)', 'Neuromuscular Bite Correction', 'Pediatric Specialized Sedation'],
    credentials: ['Doctor of Dental Surgery, Harvard School of Dental Medicine', 'Master of Science in Orthodontics, UCLA', 'Board Member, American Association of Orthodontists'],
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop',
    bio: 'Dr. Chen is dedicated to crafting perfect bites and healthy airways. Recognizing that dental anxiety is often established in childhood, her comforting clinical style and virtual orthodontic simulation workflows make alignment therapy an exceptionally inspiring, positive life milestone.'
  },
  {
    id: 'vance',
    name: 'Dr. Marcus Vance, DDS, PhD',
    role: 'Board-Certified Specialist Endodontist',
    experience: '14+ Years Experience',
    specialties: ['Micro-Surgical Root Therapy', '3D Cone-Beam Diagnostic Imaging', 'Severe Dental Trauma Recovery'],
    credentials: ['Doctor of Dental Surgery, NYU Dentistry', 'Ph.D. in Biomaterials & Regenerative Endodontics', 'Diplomate, American Board of Endodontics'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop',
    bio: 'Dr. Vance focuses exclusively on saving teeth that others recommend extracting. Utilizing custom Zeiss high-powered endodontic surgical microscopes and laser hydro-activation, his ultra-gentle inner canal root therapies consistently average a near-perfect comfort rating.'
  }
];

export const PATIENT_REFLECTIONS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Gabriella Thorne',
    review: 'I spent years hiding my smile in photos due to dark discoloration and chips. Dr. Mercer designed 8 custom ceramic porcelain veneers for me. The entire experience felt like a ultra-luxurious spa. They used a 3D scanner to model my face, and the result is absolutely mind-blowing. Truly elite work!',
    rating: 5,
    date: '3 weeks ago',
    treatmentReceived: 'Signature Porcelain Veneers',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'test-2',
    patientName: 'Julian Sterling',
    review: 'I was utterly terrified of root canal therapy, but Dr. Vance and his dental laser completely changed my perspective. I did not feel a single drop of discomfort. The clinical suite features custom active noise-canceling headphones and warm ambient lighting. Absolute medical-grade prestige.',
    rating: 5,
    date: '1 month ago',
    treatmentReceived: 'Gentle Laser Endodontics',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'test-3',
    patientName: 'Hillary Vance-Duval',
    review: 'Bringing my 6-year old here was the best decision. The dedicated children’s dental suite resembles an interactive science lobby rather than a dental clinic. My daughter wore virtual goggles to watch aquatic animation during her exam. Zero tears, only pure smiles and confidence!',
    rating: 5,
    date: '2 months ago',
    treatmentReceived: 'Comfort First Pediatric Suite',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 'test-4',
    patientName: 'Alexander Hayes',
    review: 'My lower implant was placed with incredible speed using Dr. Mercer’s 3D-guided navigation. No swelling, minimal soreness the next day, and I was back to business immediately. The high-end dental technology they have here outperforms traditional clinics by lightyears.',
    rating: 5,
    date: '10 days ago',
    treatmentReceived: 'Dental Implants',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop'
  }
];

export const CLINIC_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Does the porcelain veneers treatment hurt?',
    answer: 'Absolutely not. Our clinic specializes in pain-free, biological dental preparation. We administer computerized precise local anesthesia to completely numb the treatment region. Additionally, we provide custom nitrous oxide sedation or gentle oral sedative pills to keep you in a state of tranquil calm. Most patients describe feeling nothing more than gentle, relaxing vibrations.',
    category: 'cosmetic'
  },
  {
    id: 'faq-2',
    question: 'How long do Aeterna porcelain veneers typically last?',
    answer: 'With proper micro-care and routine hygiene, our hand-milled Swiss porcelain veneers are clinically engineered to last between 15 to 25 years. Because they are highly glazed and fully non-porous, they are completely resistant to staining from coffee, red wines, and green tea.',
    category: 'cosmetic'
  },
  {
    id: 'faq-3',
    question: 'Do you accept private medical or dental insurance?',
    answer: 'Yes, we coordinate directly with major premier dental insurance providers to maximize your plan benefits. Our dedicated insurance suite handles all the complex claim submissions on your behalf, so you do not have to stress over paperwork. We also offer standard pre-approvals so you know exactly what is covered before sitting in the chair.',
    category: 'financial'
  },
  {
    id: 'faq-4',
    question: 'What is your rapid response dental emergency policy?',
    answer: 'We guarantee same-day priority appointments for any patient experiencing acute dental trauma, heavy bleeding, or severe toothache. We retain dedicated surgery hours solely for emergency intake. If you are experiencing an absolute emergency, press the specialized button on our contact panel to connect to our direct on-call nurse pager.',
    category: 'clinical'
  },
  {
    id: 'faq-5',
    question: 'How does the Virtual Smile Preview concept work?',
    answer: 'By uploading a standard selfie or photo of your teeth, our custom AI dental engine processes your visual tooth contours and outputs a simulated cosmetic result representing perfect veneers or clear Invisalign aligner corrections. This allows you to explore visual enhancements dynamically before ever committing to a clinical treatment plan.',
    category: 'technology'
  }
];

export const MEMBERSHIP_SCHEMES: MembershipPlan[] = [
  {
    id: 'plan-essential',
    name: 'Standard Radiance Membership',
    price: 49,
    billing: 'monthly',
    description: 'Perfect for local professionals demanding pristine preventative hygiene and baseline clinical care.',
    inclusions: [
      '2 Comprehensive Clinical Polish sessions / year',
      '2 Specialist Dental Examinations & Oral Cancer screenings',
      'All diagnostic 3D Digital X-rays & intraoral scans',
      '1 Complimentary Cosmetic Teeth Whitening Treatment',
      '15% direct discount on any advanced cosmetic & root canal treatments',
      'On-demand emergency clinic triage (no booking fee)'
    ],
    savingsValue: 'Est. annual savings: $420+',
    insuranceAlternative: 'Ideal zero-deductible modern dental insurance alternative',
    isPopular: false
  },
  {
    id: 'plan-luxury',
    name: 'Aura Luxury Complete Care',
    price: 89,
    billing: 'monthly',
    description: 'Our most sought-after plan, detailing advanced maintenance, aesthetic perks, and family-grade priority.',
    inclusions: [
      '3 Deep Dental Polish & Advanced Fluoride treatments/year',
      'Unlimited diagnostic X-rays & visual smile blueprints',
      '2 Custom At-Home Laser Whitening Syphons & Trays',
      '25% direct discount on advanced Porcelain Veneers & Implants',
      'Priority next-day scheduling and unlimited emergency pages',
      'Dedicated private VIP treatment suite with aromatherapy options',
      'Free consultations & dental wellness workshops for children'
    ],
    savingsValue: 'Est. annual savings: $890+',
    insuranceAlternative: 'Top tier VIP support with zero co-pays or waiting limits',
    isPopular: true
  },
  {
    id: 'plan-ortho',
    name: 'Elite Ortho Align Subscription',
    price: 199,
    billing: 'monthly',
    description: 'Fully designed for those undergoing active Invisalign therapies, including comprehensive aligner management.',
    inclusions: [
      'All Invisalign clear aligners & progressive clinical shifting sets',
      'Monthly digital progress tracking and specialist bite diagnostics',
      'Unlimited clinical fit adjustments and urgent tray replacements',
      'Complete post-orthodontic high-impact retainer sets (2 packs)',
      'Clinical whitening treatments included during active therapy',
      '20% coupon discount for immediate family members on and off plan'
    ],
    savingsValue: 'Est. treatment savings: $1,400+',
    insuranceAlternative: 'All-inclusive aligner coverage - No hidden laboratory billing',
    isPopular: false
  }
];

export const VIRTUAL_ROOMS: ClinicRoom[] = [
  {
    id: 'room-lounge',
    name: 'The Zenith Serenity Lounge',
    description: 'Unwind before your appointment in our calm lobby featuring architectural acoustic-dampening, premium refreshments bar, soft mood projection canvases, and rich organic air filtration.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    highlight: 'Acoustic Oasis & Fresh Oxygen'
  },
  {
    id: 'room-suite',
    name: 'The Aura Luxury Care Suite',
    description: 'Each private clinical bay is detailed with premium leather massage chairs, soundproof glass walls, panoramic view skylights, warm essential oil diffusers, and streaming cinema monitors overhead.',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bc7e44?q=80&w=800&auto=format&fit=crop',
    highlight: 'VIP Heated Massage Seating'
  },
  {
    id: 'room-lab',
    name: 'The Lumino 3D Imaging Lab',
    description: 'Where absolute physics converges with smile artistry. We capture micron-precise diagnostic maps using high-speed digital scanner sweeps, circumventing painful messy trays.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    highlight: 'Micron-Precise Digital Scanning'
  }
];

export const COMFORT_EQUIPMENT = [
  {
    name: 'SmartWater™ Hydro-Laser',
    role: 'Decontamination & Painless Shaping',
    details: 'Leverages micro-pulsating water droplets accelerated by cold laser light, safely vaporizing decayed areas without creating drilling heat, sound, or physical vibrations. Zero numbing required in 75% of cases.',
    features: ['No drilling vibrations', 'Virtually zero surgical bleeding', 'Accelerates cellular tissue regeneration']
  },
  {
    name: 'iTero Element 3D Scan Sweeps',
    role: 'Microscopic Bite Modeling',
    details: 'In under two minutes, our high-speed intraoral sensor maps 6,000 reference points per second of your teeth, generating a highly interactive 3D color model. No unpleasant tasting paste or gag triggers.',
    features: ['100% digital & instant modeling', 'Real-time bite simulation comparison', 'Zero radiation exposure']
  },
  {
    name: '3D CBCT Green-CT Scanners',
    role: 'Deep Tissue Anatomical Modeling',
    details: 'Our ultra-low dose Cone Beam computed tomography captures stunning, ultra-high resolution 3D skeletal dental grids in 5.9 seconds. Maps bone densities, sinus tracts, and nerve paths to prevent surgery errors.',
    features: ['90% lower clinical dental radiation', 'Stunning 3D bone densitometry', 'Critical for safe, life-long implant placement']
  }
];

export const TREAT_FLOW = [
  {
    step: '01',
    title: 'The Digital Discovery Visit',
    duration: '60 minutes',
    achievement: 'Completely pain-free diagnostic scan & face mapping',
    description: 'Experience your very first digital smile tour. We capture precision images using our 3D Element sensor, taking standard clinical photographs and charting your exact bite alignment. We discuss aesthetic and health targets in our private consultation room over coffee or herbal tea.'
  },
  {
    step: '02',
    title: 'The Elite Blueprint Setup',
    duration: 'Digital delivery in 3 days',
    achievement: 'Review a stunning virtual visual of your future smile',
    description: 'Our lead ceramists overlay your photography with 3D structural blueprints. We simulate aesthetic transformations dynamically, allowing you to preview and modify your future porcelain veneer or Invisalign alignments before any physical treatment is ever scheduled.'
  },
  {
    step: '03',
    title: 'Comfort First Micro-Prep',
    duration: '1 to 2 hours',
    achievement: 'Temporary diagnostic overlays applied with absolute safety',
    description: 'Under soothing aroma therapy and a temperature-controlled heating blanket, our specialists complete micro-preparations. We utilize gentle dental lasers to condition the tooth margins under perfect computerized sedation. We attach luxury temporary overlays matched to your dynamic scan.'
  },
  {
    step: '04',
    title: 'The Radiant Bond Reveal',
    duration: '60 to 90 minutes',
    achievement: 'Your hand-milled customized teeth are bonded permanently',
    description: 'We remove the high-fidelity temporary overlays and treat the enamel with protective mineral primer. Each custom Swiss porcelain veneer or ceramic crown is aligned with microscopic adhesive matrices. We finalize the bite kinetics to ensure perfect comfort and maximum radiance.'
  }
];
