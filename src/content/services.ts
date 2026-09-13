export type ServiceContent = {
  id: string;
  title: string;
  shortDescription: string;
  heroImage: string;
  heroPhotographer: string;
  introParagraphs: string[];
  benefits: { title: string; description: string }[];
  inclusions: string[];
  pricing?: string;
  pricingGuidance: string;
  popularDestinations?: ({ name: string; image: string } | string)[];
  faqs: { question: string; answer: string }[];
  secondaryImage: string;
  secondaryPhotographer: string;
};

export const servicesData: Record<string, ServiceContent> = {
  "airport-transfers": {
    id: "airport-transfers",
    title: "Reliable Airport Transfers Across India",
    shortDescription: "Punctual, stress-free pickups and drop-offs to ensure you never miss a flight. Available 24/7.",
    heroImage: "/images/cars/hero-innova.jpg",
    heroPhotographer: "Phil Mosley",
    secondaryImage: "/images/destinations/mysore.jpg",
    secondaryPhotographer: "American Public Power Association",
    introParagraphs: [
      "Navigating through city traffic to catch a flight can be one of the most stressful parts of traveling. At Marla Cabs, our dedicated Airport Transfer service is designed to eliminate that anxiety completely. Whether you are traveling for a crucial business meeting, heading out on a much-awaited family vacation, or returning home after a long trip, our professional chauffeurs ensure that your journey to and from the airport is seamless, comfortable, and absolutely punctual.",
      "We actively monitor your flight status in real-time. This means that if your flight is delayed or arriving early, we adjust our pickup times accordingly without any extra charges. Our drivers will be waiting for you at the designated pickup points or the arrivals hall, ready to assist you with your luggage. We operate 24 hours a day, 7 days a week, catering to late-night red-eye flights and early morning departures alike.",
      "Our fleet features a diverse range of vehicles, from economical sedans for solo travelers to spacious SUVs that can easily accommodate large families and bulky luggage. Every car in our airport transfer fleet undergoes rigorous daily cleaning and maintenance checks to guarantee a pristine environment for your ride."
    ],
    benefits: [
      { title: "Real-time Flight Tracking", description: "We monitor your flight status so our driver is always there exactly when you land, adjusting for delays automatically." },
      { title: "Meet and Greet Service", description: "For international arrivals, our drivers can wait at the arrivals gate with a placard for immediate identification." },
      { title: "24/7 Availability", description: "No matter how odd the hour, our cabs are available round the clock to ensure you are never stranded." },
      { title: "Spacious Boot Space", description: "We provide vehicles with ample luggage capacity so you never have to cramp your style or your bags." }
    ],
    inclusions: [
      "Toll taxes and airport parking fees for up to 30 minutes",
      "Complimentary waiting time (45 mins for domestic, 60 mins for international)",
      "Assistance with loading and unloading luggage",
      "Free bottled water and reading materials"
    ],
    pricing: "Starting at ₹1,600 for airport drops (Sedan). Tolls & Parking Extra.",
    pricingGuidance: "Our airport transfer prices are strictly fixed with zero surge pricing. Sedan drops start from ₹800, and SUV drops start from ₹1,200 depending on the city and distance to the airport.",
    faqs: [
      { question: "What happens if my flight is delayed?", answer: "We track your flight in real-time using your flight number. Our driver will adjust the arrival time accordingly, and you will not be charged any extra waiting fees." },
      { question: "Can the driver pick me up from inside the terminal?", answer: "Yes, we offer a Meet & Greet service where the driver waits at the arrival hall with a name board. Standard parking charges apply." },
      { question: "How much luggage can I bring?", answer: "A standard Sedan accommodates 2 large suitcases. If you have more luggage, we strongly recommend booking an SUV or an Innova." },
      { question: "Are toll charges included in the fare?", answer: "Yes, standard route toll charges are included in the upfront fare shown during booking." },
      { question: "Do you provide child seats?", answer: "Child seats can be provided upon prior request during the booking process, subject to availability in your city." }
    ]
  },
  "outstation-cabs": {
    id: "outstation-cabs",
    title: "Outstation Cabs for Memorable Getaways",
    shortDescription: "Travel intercity with complete peace of mind. Whether you are heading for a weekend getaway, a pilgrimage, or a corporate offsite, our premium outstation fleet guarantees a smooth journey.",
    heroImage: "/images/destinations/kerala.jpg",
    heroPhotographer: "Dino Reichmuth",
    secondaryImage: "/images/cars/toyota-hybrid.jpg",
    secondaryPhotographer: "Mikes Photos",
    introParagraphs: [
      "There is nothing quite like hitting the open highway for a weekend escape, a pilgrimage, or a visit to your hometown. Marla Cabs offers premium outstation cab services that make long-distance road travel an absolute pleasure. Forget the hassle of driving through unpredictable highway traffic, navigating unknown routes, or dealing with the exhaustion of long hours behind the wheel. Sit back, relax, and let our expert highway-trained drivers take the wheel.",
      "We offer both one-way drops and round-trip packages to suit your specific travel itinerary. Our one-way service is perfect if you only need a drop to another city, ensuring you don't pay for a return trip you aren't taking. For vacations and multi-city tours, our round-trip rentals provide you with a dedicated vehicle and driver at your disposal for the entire duration of your trip.",
      "Safety on highways is our paramount concern. All our outstation vehicles are equipped with GPS tracking, speed governors, and comprehensive emergency kits. Our drivers undergo specialized training for highway driving, night driving, and fatigue management. They are also well-versed with popular inter-city routes, highway dhabas (eateries), and clean rest stops to make your journey comfortable."
    ],
    benefits: [
      { title: "One-Way & Round-Trip", description: "Flexible booking options. Pay only for the drop with our one-way service, or keep the car for your entire vacation." },
      { title: "Expert Highway Drivers", description: "Drivers specifically trained for long-distance driving, night driving, and route navigation." },
      { title: "Unlimited Stops", description: "Take as many breaks as you want for photography, food, or simply stretching your legs during round-trips." },
      { title: "Well-Maintained Vehicles", description: "Vehicles undergo strict mechanical checks before every outstation trip to prevent breakdowns." }
    ],
    inclusions: [
      "State permits and border crossing taxes (for round trips)",
      "Driver allowance and night halting charges (if specified in package)",
      "GPS tracking and 24/7 on-road support helpline",
      "Flexible itinerary management"
    ],
    pricing: "Starting at ₹13/km for Sedans, ₹16/km for SUVs.",
    popularDestinations: [
      { name: "Ooty", image: "/images/destinations/ooty.jpg" },
      { name: "Madikeri (Coorg)", image: "/images/destinations/madikeri.jpg" },
      { name: "Wayanad / Kerala", image: "/images/destinations/kerala.jpg" },
      { name: "Gokarna", image: "/images/destinations/gokarna.jpg" },
      { name: "Chikmagalur", image: "/images/destinations/chikmagalur.jpg" },
      { name: "Thiruvananthapuram", image: "/images/destinations/thiruvananthapuram.jpg" },
      { name: "Mysore", image: "/images/destinations/mysore.jpg" },
      { name: "Pondicherry", image: "/images/destinations/pondicherry.jpg" }
    ],
    pricingGuidance: "Outstation round trips are typically billed per kilometer with a minimum average of 250-300 kms per day. Sedan rates start at ₹10/km, while SUVs like Innova Crysta start at ₹16/km. One-way drops have fixed all-inclusive fares.",
    faqs: [
      { question: "Do I have to pay for the driver's food and accommodation?", answer: "A daily driver allowance is included in your bill to cover their food. For multi-day trips, drivers typically arrange their own accommodation, usually sleeping in the vehicle if secure parking is available." },
      { question: "Are toll taxes and state taxes included?", answer: "For one-way drops, all taxes are included. For round-trips, tolls and state taxes are usually paid directly by the customer as actuals, unless you opt for an all-inclusive package." },
      { question: "Can I change my destination during the trip?", answer: "Yes, for round-trip bookings, you can change your itinerary. The final billing will be adjusted based on the total kilometers driven and days taken." },
      { question: "Is night driving safe?", answer: "Yes, our drivers are trained for night driving. However, for extreme long distances, we recommend taking proper rest stops to ensure maximum safety." },
      { question: "How is the minimum daily kilometer calculated?", answer: "Most outstation trips have a minimum billing of 250 km or 300 km per calendar day to cover the operational costs and driver's time." }
    ]
  },
  "local-city-rides": {
    id: "local-city-rides",
    title: "Local City Cabs & Sightseeing Packages",
    shortDescription: "Navigate the busy city traffic effortlessly. Hire a cab for 4 hours, 8 hours, or the whole day, and travel to multiple locations without the hassle of re-booking.",
    heroImage: "/images/cars/ertiga.jpg",
    heroPhotographer: "Eutah Mizushima",
    secondaryImage: "/images/cars/tempo-traveller.jpg",
    secondaryPhotographer: "Saurabh Raj",
    introParagraphs: [
      "Whether you have a day packed with back-to-back business meetings, a long list of shopping errands, or a plan to show your visiting relatives around the city's famous tourist spots, booking multiple point-to-point cabs can be frustrating. Marla Cabs offers half-day and full-day local rental packages that put a dedicated car and driver at your disposal.",
      "With our local city rides, you don't have to worry about finding parking, navigating congested city traffic, or waiting for a new ride after every stop. Your driver will wait for you wherever you go, allowing you to leave your shopping bags or laptops securely in the car.",
      "Our drivers are local experts who know the city inside out. They know the shortcuts to avoid peak-hour traffic, the best local places to eat, and the optimal routes for a city sightseeing tour. Experience your city like never before, from the comfort of an air-conditioned, premium vehicle."
    ],
    benefits: [
      { title: "Keep the Car With You", description: "The car stays with you for the entire duration of your booking. No need to book multiple rides." },
      { title: "Local Expert Drivers", description: "Our drivers know the fastest routes, best local spots, and how to avoid city traffic." },
      { title: "Leave Your Belongings", description: "Safely leave your shopping bags or business materials in the car while you step out." },
      { title: "Flexible Packages", description: "Choose from 4hrs/40kms, 8hrs/80kms, or 12hrs/120kms packages based on your need." }
    ],
    inclusions: [
      "Fuel costs for the allocated kilometers",
      "Driver allowance for the package duration",
      "Unlimited stops within the city limits",
      "Air-conditioned comfort"
    ],
    pricing: "Packages start from ₹2,300 for 8 Hrs/80 Kms (Sedan).",
    popularDestinations: [
      "Airport transfers within city",
      "Electronic City",
      "Whitefield",
      "Koramangala",
      "Indiranagar",
      "MG Road / Brigade Road",
      "Manyata Tech Park",
      "Bannerghatta",
      "Nandi Hills",
      "Local sightseeing packages",
      "Hebbal",
      "Yelahanka",
      "Sarjapur",
      "Marathahalli",
      "Jayanagar"
    ],
    pricingGuidance: "Our 8-hour / 80-kilometer local rental packages start at just ₹1,800 for Sedans and ₹2,500 for SUVs. Extra kilometers and extra hours are charged at nominal rates.",
    faqs: [
      { question: "What are the standard local rental packages?", answer: "We offer 4 hours/40 km, 8 hours/80 km, and 12 hours/120 km packages." },
      { question: "What happens if I cross the kilometer or time limit?", answer: "Any usage beyond the package limits will be charged on a per-kilometer and per-hour basis at predefined rates mentioned during booking." },
      { question: "Can the driver act as a tour guide?", answer: "While our drivers are very knowledgeable about local routes and tourist spots, they are not certified tour guides. However, they can certainly recommend great places to visit and eat." },
      { question: "Do I have to pay for parking?", answer: "Yes, parking fees at malls, monuments, or commercial buildings must be paid by the customer directly." },
      { question: "Can I travel outside city limits on a local package?", answer: "No, local packages are strictly for travel within the city limits. For inter-city travel, please select our Outstation service." }
    ]
  },
  "corporate-travel": {
    id: "corporate-travel",
    title: "Premium Corporate Travel Solutions",
    shortDescription: "Professional chauffeur-driven cars for business meetings, executive travel, and corporate events.",
    heroImage: "/images/cars/urbania.jpg",
    heroPhotographer: "Sean Pollock",
    secondaryImage: "/images/destinations/pondicherry.jpg",
    secondaryPhotographer: "Campbell",
    introParagraphs: [
      "In the corporate world, punctuality, professionalism, and presentation are everything. Marla Cabs provides an elite corporate travel service tailored to meet the exacting standards of executives, VIP clients, and business professionals. We understand that your travel experience should be an extension of your business values—seamless, efficient, and sophisticated.",
      "We offer customized billing solutions, dedicated account managers, and priority booking for our corporate partners. Whether it is an airport pickup for a visiting delegate, a daily commute solution for top executives, or transportation logistics for a large corporate event, we have the fleet and the expertise to handle it flawlessly.",
      "Our corporate fleet includes premium sedans and luxury vehicles that offer a quiet, comfortable environment, allowing you to prepare for meetings or take conference calls on the go. Our chauffeurs are uniformly dressed, strictly adhere to non-disclosure protocols, and are trained to provide a discreet, unobtrusive service."
    ],
    benefits: [
      { title: "Priority Support & Booking", description: "Dedicated account managers and a 24/7 priority helpline for our corporate clients." },
      { title: "Postpaid & Monthly Billing", description: "Streamlined corporate invoicing with GST compliance and monthly credit facilities." },
      { title: "Executive Fleet", description: "Access to high-end sedans and luxury cars maintained to the highest standards." },
      { title: "Professional Chauffeurs", description: "Uniformed, well-spoken drivers trained in corporate etiquette and route confidentiality." }
    ],
    inclusions: [
      "Complimentary Wi-Fi and mobile charging in premium vehicles",
      "Daily newspaper and premium bottled water",
      "Umbrella service during monsoons",
      "Detailed trip MIS reports for corporate admins"
    ],
    pricingGuidance: "Corporate rates are highly customized based on volume, vehicle type, and billing cycle. Please fill out our enquiry form to get a tailored corporate rate card.",
    faqs: [
      { question: "How do we set up a corporate account?", answer: "You can submit an enquiry through our contact form. Our corporate sales team will reach out to discuss your requirements and set up an account with customized billing." },
      { question: "Do you provide GST invoices?", answer: "Yes, we provide fully compliant B2B GST invoices for all corporate bookings to help you claim input tax credit." },
      { question: "Can you handle transportation for large corporate events?", answer: "Absolutely. We can provide a fleet of SUVs, Tempo Travellers, and luxury cars, along with an on-ground coordinator for large events." },
      { question: "Are your drivers background verified?", answer: "Yes, every driver undergoes a rigorous background check, police verification, and behavioral training before joining our corporate fleet." },
      { question: "Is there a portal for admins to track bookings?", answer: "Yes, corporate partners get access to a centralized dashboard to track active rides, manage bookings, and download invoices." }
    ]
  },
  "wedding-cars": {
    id: "wedding-cars",
    title: "Luxury Wedding Car Rentals",
    shortDescription: "Make a grand entrance on your special day with our premium and luxury wedding cars.",
    heroImage: "/images/cars/hero-innova.jpg",
    heroPhotographer: "Thomas William",
    secondaryImage: "/images/cars/toyota-hybrid.jpg",
    secondaryPhotographer: "Oliur",
    introParagraphs: [
      "Your wedding day is one of the most important days of your life, and every detail should be absolutely perfect—including your transportation. Marla Cabs offers an exclusive selection of luxury and premium vehicles to ensure you arrive at your venue in style, comfort, and absolute elegance.",
      "We understand the logistical complexities of Indian weddings. From the arrival of the groom (Baraat), the elegant departure of the bride (Vidaai), to picking up VIP guests from the airport, our wedding transportation team handles it all with impeccable timing and coordination. Our luxury fleet is maintained in showroom condition, ensuring flawless photographs and a majestic presence.",
      "Our wedding chauffeurs are specially trained for event duties. They are immaculately dressed, extremely patient, and experienced in driving decorated vehicles. We can also coordinate with your event planners or florists to allow for vehicle decoration prior to the ceremonies."
    ],
    benefits: [
      { title: "Premium Luxury Fleet", description: "Choose from Audi, BMW, Mercedes, or premium SUVs to match the grandeur of your wedding." },
      { title: "Immaculate Presentation", description: "All vehicles are thoroughly polished, deep-cleaned, and sanitized before arriving at your venue." },
      { title: "Guest Transportation", description: "We offer Tempo Travellers and spacious SUVs to comfortably transport your extended family and guests." },
      { title: "Patient & Courteous Drivers", description: "Drivers who understand the dynamic timing of wedding ceremonies and patiently accommodate delays." }
    ],
    inclusions: [
      "Time allowed for floral decorations by your vendor",
      "Red carpet assistance (upon request)",
      "Uniformed, professional chauffeur",
      "Flexible hourly packages tailored for wedding schedules"
    ],
    pricingGuidance: "Wedding car rentals start at ₹5,000 for premium sedans and can go up to ₹25,000+ per day for luxury German marques. We offer attractive package deals for booking multiple vehicles for guests.",
    faqs: [
      { question: "Do you provide floral decorations for the car?", answer: "We do not provide floral decorations directly, but we allocate time before the pickup for your own florist/decorator to adorn the vehicle." },
      { question: "How early should I book the wedding car?", answer: "Wedding seasons in India get extremely busy. We highly recommend booking at least 1-2 months in advance to secure the vehicle of your choice." },
      { question: "Can I inspect the car before booking?", answer: "Yes, you can request a vehicle inspection at our designated hubs before making the final booking, subject to vehicle availability." },
      { question: "Do you provide transportation for wedding guests?", answer: "Yes, we have a large fleet of Innovas, Ertigas, and Tempo Travellers perfect for shuttling guests between the hotel, venue, and airport." },
      { question: "What happens if a ceremony runs late?", answer: "We completely understand that Indian weddings rarely run strictly on time. Our packages are flexible, and any extra hours will simply be billed at standard overtime rates." }
    ]
  }
};
