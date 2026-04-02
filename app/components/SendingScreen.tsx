'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EmergencyType, SENDING_STEPS } from '../types'

type Coords = { lat: number; lng: number } | null

type Props = {
  emergencyType: EmergencyType
  onSent: (coords: Coords) => void
}

export default function SendingScreen({ emergencyType, onSent }: Props) {
  const [stepIndex, setStepIndex] = useState(0)
  const [coords, setCoords] = useState<Coords>(null)

  useEffect(() => {
    // Obtener GPS real del dispositivo
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCoords({ lat: -33.4372, lng: -70.6506 }) // fallback Providencia
      )
    } else {
      setCoords({ lat: -33.4372, lng: -70.6506 })
    }

    // Simular pasos de envío
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev >= SENDING_STEPS.length - 1) {
          clearInterval(interval)
          setTimeout(() => onSent(coords), 500)
          return prev
        }
        return prev + 1
      })
    }, 700)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatCoords = (c: Coords) =>
    c ? `${c.lat.toFixed(4)}° S, ${Math.abs(c.lng).toFixed(4)}° O` : 'obteniendo...'

  return (
    <motion.div
      key="sending"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col items-center justify-center p-8 gap-6 min-h-full text-center"
    >
      <div className="spinner" />

      <div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">Enviando alerta...</h2>
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500"
        >
          {SENDING_STEPS[stepIndex]}
        </motion.p>
      </div>

      {/* Preview del mensaje */}
      <div className="w-full bg-gray-50 rounded-xl p-4 text-left">
        <p className="text-xs text-gray-400 mb-2">Mensaje que se enviará:</p>
        <div className="text-sm text-gray-700 leading-relaxed space-y-1">
          <p className="font-semibold text-gray-900">EMERGENCIA — Persona sorda</p>
          <p>Tipo: <span className="font-medium" style={{ color: '#993C1D' }}>{emergencyType.label}</span></p>
          <p>Fono emergencia: <span className="font-medium">{emergencyType.number}</span></p>
          <p>GPS: {formatCoords(coords)}</p>
          <p>Nombre: María José P.</p>
        </div>
      </div>
    </motion.div>
  )
}
