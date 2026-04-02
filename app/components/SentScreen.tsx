'use client'
import { motion } from 'framer-motion'
import { Contact, EmergencyType } from '../types'

type Coords = { lat: number; lng: number } | null

type Props = {
  emergencyType: EmergencyType
  contacts: Contact[]
  coords: Coords
  onReset: () => void
}

const recipients = [
  { label: 'Carabineros 133', color: '#EAF3DE', textColor: '#27500A' },
  { label: 'Mamá',            color: '#EAF3DE', textColor: '#27500A' },
  { label: 'Amiga',           color: '#EAF3DE', textColor: '#27500A' },
]

export default function SentScreen({ emergencyType, coords, onReset }: Props) {
  const formatCoords = (c: Coords) =>
    c ? `${c.lat.toFixed(4)}° S, ${Math.abs(c.lng).toFixed(4)}° O` : '—'

  return (
    <motion.div
      key="sent"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center p-7 gap-5 min-h-full"
    >
      {/* Check animado */}
      <div className="check-circle w-16 h-16 rounded-full flex items-center justify-center mt-4" style={{ background: '#EAF3DE' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="#27500A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-medium text-gray-900 mb-1">Alerta enviada</h2>
        <p className="text-sm text-gray-500 leading-relaxed">
          Carabineros y tus contactos<br/>ya recibieron tu ubicación
        </p>
      </div>

      {/* Destinatarios */}
      <div className="w-full flex flex-col gap-2">
        {recipients.map((r, i) => (
          <motion.div
            key={r.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: r.color }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke={r.textColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span className="text-sm font-medium" style={{ color: r.textColor }}>{r.label}</span>
          </motion.div>
        ))}
      </div>

      {/* GPS info */}
      <div className="w-full p-3 border border-gray-100 rounded-xl text-center">
        <p className="text-xs text-gray-500">
          Tipo: <span className="font-medium text-gray-700">{emergencyType.label}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          GPS: <span className="text-gray-400">{formatCoords(coords)}</span>
        </p>
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl border border-gray-200 text-sm text-gray-500 mt-auto"
      >
        Volver al inicio
      </button>
    </motion.div>
  )
}
