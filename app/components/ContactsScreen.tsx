'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Contact } from '../types'

type Props = {
  contacts: Contact[]
  onChange: (contacts: Contact[]) => void
  onBack: () => void
}

const COLORS = [
  { bg: '#FAECE7', text: '#712B13', initBg: '#F5C4B3' },
  { bg: '#E1F5EE', text: '#085041', initBg: '#9FE1CB' },
  { bg: '#E6F1FB', text: '#0C447C', initBg: '#B5D4F4' },
  { bg: '#EEEDFE', text: '#3C3489', initBg: '#CECBF6' },
  { bg: '#FAEEDA', text: '#633806', initBg: '#FAC775' },
]

function getInitials(name: string) {
  return name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

type FormState = { name: string; phone: string }
const EMPTY: FormState = { name: '', phone: '' }

export default function ContactsScreen({ contacts, onChange, onBack }: Props) {
  const [editing, setEditing] = useState<string | null>(null)
  const [adding,  setAdding]  = useState(false)
  const [form,    setForm]    = useState<FormState>(EMPTY)
  const [error,   setError]   = useState('')

  const validate = () => {
    if (!form.name.trim()) { setError('Ingresa un nombre'); return false }
    if (!form.phone.trim()) { setError('Ingresa un teléfono'); return false }
    return true
  }

  const handleAdd = () => {
    if (!validate()) return
    const colorIdx = contacts.length % COLORS.length
    const c = COLORS[colorIdx]
    const newContact: Contact = {
      id: Date.now().toString(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      initials: getInitials(form.name),
      color: c.bg,
    }
    onChange([...contacts, newContact])
    setAdding(false)
    setForm(EMPTY)
    setError('')
  }

  const handleEdit = () => {
    if (!validate()) return
    onChange(contacts.map(c =>
      c.id === editing
        ? { ...c, name: form.name.trim(), phone: form.phone.trim(), initials: getInitials(form.name) }
        : c
    ))
    setEditing(null)
    setForm(EMPTY)
    setError('')
  }

  const handleDelete = (id: string) => {
    onChange(contacts.filter(c => c.id !== id))
  }

  const openEdit = (c: Contact) => {
    setEditing(c.id)
    setAdding(false)
    setForm({ name: c.name, phone: c.phone })
    setError('')
  }

  const openAdd = () => {
    setAdding(true)
    setEditing(null)
    setForm(EMPTY)
    setError('')
  }

  const cancel = () => {
    setAdding(false)
    setEditing(null)
    setForm(EMPTY)
    setError('')
  }

  const colorFor = (c: Contact) => {
    const idx = contacts.indexOf(c) % COLORS.length
    return COLORS[idx]
  }

  return (
    <motion.div
      key="contacts"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col min-h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4 border-b border-gray-100">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <h2 className="text-lg font-medium text-gray-900 flex-1">Contactos de emergencia</h2>
        {contacts.length < 5 && !adding && !editing && (
          <button
            onClick={openAdd}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: '#FAECE7' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#D85A30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Lista */}
      <div className="flex-1 px-5 py-4 flex flex-col gap-2 overflow-y-auto">
        <AnimatePresence>
          {contacts.map(c => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {editing === c.id ? (
                <ContactForm
                  form={form}
                  error={error}
                  onChange={f => { setForm(f); setError('') }}
                  onSave={handleEdit}
                  onCancel={cancel}
                  saveLabel="Guardar"
                />
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                    style={{ background: colorFor(c).initBg, color: colorFor(c).text }}
                  >
                    {c.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{c.name}</p>
                    <p className="text-xs text-gray-400">{c.phone}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(c)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="#f09595" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Formulario agregar */}
        {adding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ContactForm
              form={form}
              error={error}
              onChange={f => { setForm(f); setError('') }}
              onSave={handleAdd}
              onCancel={cancel}
              saveLabel="Agregar"
            />
          </motion.div>
        )}

        {/* Estado vacío */}
        {contacts.length === 0 && !adding && (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Agrega hasta 5 contactos<br/>que recibirán tu alerta
            </p>
            <button
              onClick={openAdd}
              className="text-sm font-medium px-4 py-2 rounded-xl"
              style={{ background: '#FAECE7', color: '#993C1D' }}
            >
              Agregar contacto
            </button>
          </div>
        )}

        {/* Límite */}
        {contacts.length >= 5 && (
          <p className="text-xs text-gray-400 text-center py-2">
            Máximo 5 contactos
          </p>
        )}
      </div>

      {/* Info footer */}
      <div className="px-5 pb-5 pt-2">
        <p className="text-xs text-gray-400 leading-relaxed text-center">
          Estos contactos recibirán tu ubicación<br/>junto a Carabineros en caso de emergencia
        </p>
      </div>
    </motion.div>
  )
}

function ContactForm({
  form, error, onChange, onSave, onCancel, saveLabel
}: {
  form: FormState
  error: string
  onChange: (f: FormState) => void
  onSave: () => void
  onCancel: () => void
  saveLabel: string
}) {
  return (
    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nombre"
          value={form.name}
          onChange={e => onChange({ ...form, name: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-orange-300"
        />
        <input
          type="tel"
          placeholder="+56 9 1234 5678"
          value={form.phone}
          onChange={e => onChange({ ...form, phone: e.target.value })}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:border-orange-300"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg border border-gray-200 text-sm text-gray-500 bg-white"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="flex-1 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: '#D85A30' }}
        >
          {saveLabel}
        </button>
      </div>
    </div>
  )
}
