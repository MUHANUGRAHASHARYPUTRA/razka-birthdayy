export const EVENT_CONFIG = {
  childNameFirst: 'RAZKA',
  childNameLast: '',
  age: 3,
  eventTitle: 'BIRTHDAY',
  eventDate: '2026-10-10T16:00:00+08:00', // 10 Oktober 2026 jam 4 sore
  event_date: '2026-10-10T16:00:00+08:00', // Variabel statis tanggal & jam acara (10 Okt 2026 16:00 WITA)
  eventDateDisplay: {
    month: 'OCT',
    day: '10',
    dayOfWeek: 'SAT',
    year: '2026'
  },
  ceremony: {
    name: 'Ulang Tahun ke-3',
    location: 'Jl Borong Raya Inspeksi Kanal No.2',
    mapLink: 'https://maps.google.com/?q=Jl+Borong+Raya+Inspeksi+Kanal+No.2'
  },
  reception: {
    name: 'Acara Utama',
    location: 'Jl Borong Raya Inspeksi Kanal No.2',
    mapLink: 'https://maps.google.com/?q=Jl+Borong+Raya+Inspeksi+Kanal+No.2'
  },
  godparents: [
    'John Doe', 'Jane Doe', 'Peter Parker', 'Mary Jane', 'Tony Stark', 'Pepper Potts'
  ],
  dressCode: 'Wear your favorite shade of BLUE and join us as we swing into an amazing Spider-Man celebration!',
  giftGuide: [
    { name: 'Clothes', icon: '👕' },
    { name: 'Diaper', icon: '🧷' },
    { name: 'Formula', icon: '🍼' },
    { name: 'Cash', icon: '💵' },
    { name: 'Toys', icon: '🧩' },
  ],
  healthProtocol: [
    { label: 'No Kissing Baby', icon: '🚫' },
    { label: 'Sanitize Hands', icon: '🧴' },
    { label: 'Wear Mask if Unwell', icon: '😷' },
  ]
};

export const event_date = EVENT_CONFIG.event_date;
export const EVENT_DATE = EVENT_CONFIG.eventDate;
