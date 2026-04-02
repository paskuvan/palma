'use client'
import { motion } from 'framer-motion'
import { Contact } from '../types'

type Props = {
  contacts: Contact[]
  onSOS: () => void
  onSettings: () => void
}

export default function HomeScreen({ contacts, onSOS, onSettings }: Props) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center justify-between p-8 min-h-full gap-6"
    >
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold tracking-widest" style={{ color: '#D85A30' }}>PALMA</p>
          <p className="text-xs text-gray-400">Emergencias para personas sordas</p>
        </div>
        <button
          onClick={onSettings}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          aria-label="Configurar contactos"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/>
            <line x1="22" y1="11" x2="16" y2="11"/>
          </svg>
        </button>
      </div>

      {/* Botón SOS */}
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="pulse-ring" />
          <div className="pulse-ring pulse-ring-2" />
          <button
            onClick={onSOS}
            className="relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
            style={{ background: '#D85A30' }}
            aria-label="Botón de emergencia"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span className="text-white text-base font-semibold">SOS</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          Presiona en caso de emergencia
        </p>
      </div>

      {/* Contactos */}
      <div className="w-full border-t border-gray-100 pt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-400">Contactos de emergencia</p>
          <button onClick={onSettings} className="text-xs font-medium" style={{ color: '#D85A30' }}>
            Editar
          </button>
        </div>
        {contacts.length === 0 ? (
          <button
            onClick={onSettings}
            className="w-full py-3 rounded-xl border border-dashed border-gray-200 text-sm text-gray-400 text-center"
          >
            Agregar contacto de emergencia
          </button>
        ) : (
          contacts.map(c => (
            <div key={c.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                style={{ background: c.color, color: '#712B13' }}
              >
                {c.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{c.name}</p>
                <p className="text-xs text-gray-400">{c.phone}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}
