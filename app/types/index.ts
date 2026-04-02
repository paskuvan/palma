export type EmergencyType = {
  id: string
  label: string
  description: string
  number: string  // número de emergencia chileno
}

export type Contact = {
  id: string
  name: string
  phone: string
  initials: string
  color: string
}

export type AppScreen = 'home' | 'type' | 'sending' | 'sent'

export const EMERGENCY_TYPES: EmergencyType[] = [
  {
    id: 'accidente',
    label: 'Accidente de tránsito',
    description: 'Choque, atropello, volcamiento',
    number: '133',
  },
  {
    id: 'medica',
    label: 'Emergencia médica',
    description: 'Desmayo, dolor agudo, convulsión',
    number: '131',
  },
  {
    id: 'seguridad',
    label: 'Seguridad / delito',
    description: 'Robo, agresión, amenaza',
    number: '133',
  },
  {
    id: 'incendio',
    label: 'Incendio',
    description: 'Fuego en edificio o vehículo',
    number: '132',
  },
]

export const DEFAULT_CONTACTS: Contact[] = [
  { id: '1', name: 'Mamá',  phone: '+56 9 1234 5678', initials: 'MA', color: '#FAECE7' },
  { id: '2', name: 'Amiga', phone: '+56 9 8765 4321', initials: 'AM', color: '#E1F5EE' },
]

export const SENDING_STEPS = [
  'Accediendo al GPS...',
  'Ubicación obtenida',
  'Preparando mensaje...',
  'Enviando a Carabineros...',
  'Notificando contactos...',
]
