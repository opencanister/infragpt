import { Project } from '@/types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Stockholm Fiber Expansion Q2/2025',
    description: 'Installation av fiber i Stockholms nordöstra förorter med anslutning till huvudstammen.',
    infraType: 'Tele & Datakabel',
    location: 'Stockholm',
    region: 'Mälardalen',
    createdAt: '2023-05-10T14:32:00.000Z',
    selectedNorms: ['1', '4'],
    quizAnswers: [
      { questionKey: 'installationType', answerValue: 'Fiber underground' }
    ]
  },
  {
    id: '2',
    name: 'Skåne 10kV Cable Upgrade',
    description: 'Uppgradering av 10 kV-nät i södra Skåne.',
    infraType: 'El',
    location: 'Lund',
    region: 'Skåne',
    createdAt: '2023-04-20T09:15:00.000Z',
    selectedNorms: ['1', '2'],
    quizAnswers: [
      { questionKey: 'voltageLevel', answerValue: '10 kV' },
      { questionKey: 'networkType', answerValue: 'Distribution' }
    ]
  },
  {
    id: '3',
    name: 'Göteborg VA-Renovering Centrum',
    description: 'Renovering av vattenledningar i centrala Göteborg med fokus på hållbara lösningar.',
    infraType: 'VA',
    location: 'Göteborg',
    region: 'Västra Götaland',
    createdAt: '2023-06-01T11:00:00.000Z',
    selectedNorms: ['3', '6'],
    quizAnswers: [
      { questionKey: 'pipeType', answerValue: 'Plastic' },
      { questionKey: 'diameter', answerValue: '200mm' }
    ]
  }
];

export const normCategories = [
  { id: '1', name: 'El', description: 'Normer för elektrisk infrastruktur' },
  { id: '2', name: 'Gata & Väg', description: 'Normer för vägar, gator och gatubelysning' },
  { id: '3', name: 'VA', description: 'Normer för VA-installationer' },
  { id: '4', name: 'Byggnad & Anläggning', description: 'Konstruktionsnormer för byggnader' },
  { id: '5', name: 'Tele & Datakabel', description: 'Normer för tele- och datakablar' },
  { id: '6', name: 'Miljö, Buller & Markförorening', description: 'Normer för miljö och mark' },
];

export const regions = [
  'Mälardalen',
  'Skåne',
  'Västra Götaland',
  'Norrbotten',
  'Västerbotten',
  'Jämtland',
  'Dalarna',
  'Gävleborg',
  'Västernorrland',
  'Uppsala',
  'Örebro',
  'Östergötland',
  'Jönköping',
  'Kronoberg',
  'Kalmar',
  'Gotland',
  'Blekinge',
  'Halland',
];

export const infraTypes = [
  'El',
  'Gata & Väg',
  'VA',
  'Byggnad & Anläggning',
  'Tele & Datakabel',
  'Miljö, Buller & Markförorening'
];