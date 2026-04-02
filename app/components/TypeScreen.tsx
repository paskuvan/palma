'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { EmergencyType, EMERGENCY_TYPES } from '../types'

type Props = {
  onSelect: (type: EmergencyType) => void
  onCancel: () => void
}

export default function TypeScreen({ onSelect, onCancel }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  const chosen = EMERGENCY_TYPES.find(t => t.id === selected)

  return (
    <motion.div
      key="type"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col p-6 gap-5 min-h-full"
    >
      <div>
        <p className="text-xs font-semibold tracking-wide mb-1" style={{ color: '#D85A30' }}>
          PASO 1 DE 2
        </p>
        <h2 className="text-xl font-medium text-gray-900">¿Qué tipo de emergencia?</h2>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {EMERGENCY_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => setSelected(type.id)}
            className="text-left p-3 rounded-xl border transition-all"
            style={{
              borderColor: selected === type.id ? '#D85A30' : '#e5e7eb',
              background: selected === type.id ? '#FAECE7' : 'white',
            }}
          >
            <p className="font-medium text-sm" style={{ color: selected === type.id ? '#712B13' : '#111827' }}>
              {type.label}
            </p>
            <p className="text-xs mt-0.5" style={{ color: selected === type.id ? '#993C1D' : '#9ca3af' }}>
              {type.description}
            </p>
          </button>
        ))}
      </div>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm text-gray-500"
        >
          Cancelar
        </button>
        <button
          onClick={() => chosen && onSelect(chosen)}
          disabled={!selected}
          className="flex-2 py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
          style={{
            background: '#D85A30',
            opacity: selected ? 1 : 0.4,
            cursor: selected ? 'pointer' : 'not-allowed',
          }}
        >
          Continuar
        </button>
      </div>
    </motion.div>
  )
}
