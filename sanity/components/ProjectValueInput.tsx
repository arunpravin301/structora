'use client'

import React, { useState } from 'react'
import { set, unset, type NumberInputProps } from 'sanity'

type Unit = 'lakhs' | 'crores' | 'thousands'

const MULTIPLIERS: Record<Unit, number> = {
  crores: 10000000,
  lakhs: 100000,
  thousands: 1000,
}

function formatIndianCurrencyPreview(num?: number): string {
  if (typeof num !== 'number' || isNaN(num) || num <= 0) return 'Not set'
  if (num >= 10000000) {
    const cr = num / 10000000
    return `₹${cr.toFixed(2).replace(/\.00$/, '').replace(/(\.[1-9])0$/, '$1')} Cr`
  }
  if (num >= 100000) {
    const lakh = num / 100000
    return `₹${lakh.toFixed(num % 100000 === 0 ? 0 : 2).replace(/\.00$/, '')} Lakhs`
  }
  if (num >= 1000) {
    const k = num / 1000
    return `₹${num.toLocaleString('en-IN')} (${k.toFixed(num % 1000 === 0 ? 0 : 1)}K)`
  }
  return `₹${num.toLocaleString('en-IN')}`
}

export function ProjectValueInput(props: NumberInputProps) {
  const { value, onChange, renderDefault } = props
  const [unit, setUnit] = useState<Unit>(() => {
    if (typeof value === 'number' && value >= 10000000) return 'crores'
    if (typeof value === 'number' && value > 0 && value < 100000) return 'thousands'
    return 'lakhs'
  })

  const unitAmount =
    typeof value === 'number' && value > 0
      ? Number((value / MULTIPLIERS[unit]).toFixed(4))
      : ''

  const handleUnitAmountChange = (rawVal: string, currentUnit: Unit) => {
    if (!rawVal.trim()) {
      onChange(unset())
      return
    }
    const parsed = parseFloat(rawVal)
    if (!isNaN(parsed)) {
      const fullInr = Math.round(parsed * MULTIPLIERS[currentUnit])
      onChange(set(fullInr))
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Quick Unit Converter Bar (Type 65 + Lakhs or 1.25 + Crores) */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          padding: '10px 12px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '6px',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', whiteSpace: 'nowrap' }}>
          Quick Entry: ₹
        </span>
        <input
          type="number"
          step="any"
          placeholder={unit === 'crores' ? 'e.g. 1.25' : unit === 'lakhs' ? 'e.g. 65' : 'e.g. 500'}
          value={unitAmount}
          onChange={(e) => handleUnitAmountChange(e.target.value, unit)}
          style={{
            flex: 1,
            padding: '6px 10px',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
          }}
        />
        <select
          value={unit}
          onChange={(e) => {
            const nextUnit = e.target.value as Unit
            setUnit(nextUnit)
            if (unitAmount !== '') {
              handleUnitAmountChange(String(unitAmount), nextUnit)
            }
          }}
          style={{
            padding: '6px 10px',
            border: '1px solid #CBD5E1',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 600,
            backgroundColor: '#FFFFFF',
            color: '#0F172A',
            cursor: 'pointer',
          }}
        >
          <option value="lakhs">Lakhs</option>
          <option value="crores">Crores</option>
          <option value="thousands">Thousands</option>
        </select>
      </div>

      {/* Native Full INR Input */}
      {renderDefault(props)}

      {/* Live Website Preview Badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        <span style={{ color: '#64748B' }}>
          Full INR stored: {typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : '—'}
        </span>
        <span
          style={{
            backgroundColor: 'rgba(214, 0, 0, 0.1)',
            color: '#D60000',
            padding: '3px 10px',
            borderRadius: '4px',
            fontWeight: 700,
          }}
        >
          Displays on site as: {formatIndianCurrencyPreview(value)}
        </span>
      </div>
    </div>
  )
}
