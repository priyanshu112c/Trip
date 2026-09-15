export const extraTrips = [
  {
    id: 't4',
    title: 'Kyoto: Lanterns & Stillness',
    destination: 'Kyoto',
    destinationId: 'kyoto',
    category: 'Culture',
    duration: '6 days / 5 nights',
    days: 6,
    price: 4120,
    rating: 4.9,
    reviews: 97,
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa8d64?w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524413840807-0c3cb6fa8d64?w=1200&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80'
    ],
    description: 'Kaiseki, moss gardens and moon-viewing pavilions — Japan refined.',
    availability: 'Limited — Mar-May, Oct-Nov',
    included: ['Ryokan (5 nights)', 'Tea ceremony', 'Garden entries'],
    excluded: ['Flights'],
    itinerary: [
      { day: 1, title: 'Gion Evening', desc: 'Lantern walk and kaiseki dinner.' },
      { day: 2, title: 'Arashiyama Dawn', desc: 'Bamboo grove before opening hours.' },
      { day: 3, title: 'Temple Stay', desc: 'Zen meditation and shojin cuisine.' }
    ],
    hotel: 'Hoshinoya Kyoto — Riverside Villa',
    activities: ['Tea Ceremony','Zen Meditation']
  },
  {
    id: 't5',
    title: 'Iceland: Fire, Ice & Night Light',
    destination: 'Iceland',
    destinationId: 'iceland',
    category: 'Adventure',
    duration: '7 days / 6 nights',
    days: 7,
    price: 5620,
    rating: 4.8,
    reviews: 54,
    image: 'https://images.unsplash.com/photo-1474696123208-1946a54d84bf?w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1474696123208-1946a54d84bf?w=1200&q=80',
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80'
    ],
    description: 'Super Jeeps, glacial lagoons and a glass roof for the aurora.',
    availability: 'Limited — Sep-Mar',
    included: ['Lodge (6 nights)', 'Super Jeep', 'Glacier guide'],
    excluded: ['Flights'],
    itinerary: [
      { day: 1, title: 'Reykjavik to Highlands', desc: 'Enter the interior by Super Jeep.' },
      { day: 2, title: 'Ice Lagoon', desc: 'Jokulsarlon under pale sun.' }
    ],
    hotel: 'ION Adventure — Aurora View',
    activities: ['Glacier Hike','Aurora Watch']
  },
  {
    id: 't6',
    title: 'Amalfi: La Dolce Luce',
    destination: 'Amalfi Coast',
    destinationId: 'amalfi',
    category: 'Beach',
    duration: '6 days / 5 nights',
    days: 6,
    price: 3980,
    rating: 4.9,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80'
    ],
    description: 'Pastel harbors, lemon terraces and yacht days between Positano and Capri.',
    availability: 'Open — May-Sep',
    included: ['Sea-view suite (5 nights)', 'Private yacht', 'Cooking class'],
    excluded: ['Flights'],
    itinerary: [
      { day: 1, title: 'Positano', desc: 'Arrival and lemon grove aperitivo.' },
      { day: 2, title: 'Capri by Yacht', desc: 'Grotta Azzurra and cliff swimming.' },
      { day: 3, title: 'Ravello', desc: 'Villa gardens at sunset.' }
    ],
    hotel: 'Il San Pietro di Positano',
    activities: ['Yacht Day','Cooking Atelier']
  }
]

export const testimonials = [
  { name: 'Elise Moreau', location: 'Paris — Kyoto Journey', quote: 'VOYAGE edited Japan down to its essence — no queues, no noise. Just stillness, precisely arranged.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', trip: 'Lanterns & Stillness' },
  { name: 'James Whitaker', location: 'New York — Swiss Alps', quote: 'We woke above the clouds every day. It felt less like a trip and more like a private mountain residence.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', trip: 'The Quiet Heights' },
  { name: 'Sofia Alvarez', location: 'Barcelona — Amalfi', quote: 'The yacht day, the lemons, the lunch that lasted until sunset — perfection without ever feeling staged.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', trip: 'La Dolce Luce' }
]

export const tripTypes = ['Adventure','Luxury','Beach','Mountains','Cultural','Romantic','Family']
