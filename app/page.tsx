'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import HomeScreen     from './components/HomeScreen'
import TypeScreen     from './components/TypeScreen'
import SendingScreen  from './components/SendingScreen'
import SentScreen     from './components/SentScreen'
import ContactsScreen from './components/ContactsScreen'
import NavDots        from './components/NavDots'
import { AppScreen, EmergencyType, Contact, DEFAULT_CONTACTS } from './types'

type Coords = { lat: number; lng: number } | null

type ExtendedScreen = AppScreen | 'contacts'

const SCREEN_INDEX: Record<ExtendedScreen, number> = {
  home: 0, type: 1, sending: 2, sent: 3, contacts: 0,
}

export default function Page() {
  const [screen, setScreen] = useState<ExtendedScreen>('home')
  const [eType,  setEType]  = useState<EmergencyType | null>(null)
  const [coords, setCoords] = useState<Coords>(null)
  const [contacts, setContacts] = useState<Contact[]>(DEFAULT_CONTACTS)

  // Persistir contactos en localStorage
  useEffect(() => {
    const stored = localStorage.getItem('palma-contacts')
    if (stored) setContacts(JSON.parse(stored))
  }, [])

  const saveContacts = (updated: Contact[]) => {
    setContacts(updated)
    localStorage.setItem('palma-contacts', JSON.stringify(updated))
  }

  return (
    <main className="min-h-dvh flex items-center justify-center p-4"
      style={{ background: '#f5f5f0' }}>
      <div className="w-full max-w-sm flex flex-col gap-3">

        {screen !== 'contacts' && (
          <NavDots current={SCREEN_INDEX[screen]} total={4} />
        )}

        <div className="w-full bg-white rounded-3xl overflow-hidden"
          style={{ minHeight: 540, border: '0.5px solid #e5e7eb' }}>
          <AnimatePresence mode="wait">

            {screen === 'home' && (
              <HomeScreen
                contacts={contacts}
                onSOS={() => setScreen('type')}
                onSettings={() => setScreen('contacts')}
              />
            )}

            {screen === 'type' && (
              <TypeScreen
                onSelect={t => { setEType(t); setScreen('sending') }}
                onCancel={() => setScreen('home')}
              />
            )}

            {screen === 'sending' && eType && (
              <SendingScreen
                emergencyType={eType}
                onSent={c => { setCoords(c); setScreen('sent') }}
              />
            )}

            {screen === 'sent' && eType && (
              <SentScreen
                emergencyType={eType}
                contacts={contacts}
                coords={coords}
                onReset={() => { setScreen('home'); setEType(null); setCoords(null) }}
              />
            )}

            {screen === 'contacts' && (
              <ContactsScreen
                contacts={contacts}
                onChange={saveContacts}
                onBack={() => setScreen('home')}
              />
            )}

          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-gray-400 mt-1">
          Palma · emergencias para personas sordas · Chile
        </p>
      </div>
    </main>
  )
}
