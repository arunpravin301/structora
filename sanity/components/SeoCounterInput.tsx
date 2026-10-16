'use client'

import React from 'react'
import type { StringInputProps, TextInputProps } from 'sanity'

type SeoCounterProps = (StringInputProps | TextInputProps) & {
  maxChars: number
  minOptimalChars: number
}

function SeoCounterBase(props: SeoCounterProps) {
  const { value = '', maxChars, minOptimalChars, renderDefault } = props
  const text = typeof value === 'string' ? value : ''
  const charCount = text.length
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const pct = Math.min(100, Math.round((charCount / maxChars) * 100))

  // Color state:
  // - Over maxChars (> 60 or > 160): Red (#DC2626)
  // - Optimal range (minOptimalChars..maxChars): Green (#16A34A)
  // - Under optimal (< minOptimalChars): Yellow/Amber (#D97706)
  const isOver = charCount > maxChars
  const isOptimal = charCount >= minOptimalChars && charCount <= maxChars

  const barColor = isOver
    ? '#DC2626' // Red
    : isOptimal
      ? '#16A34A' // Green (optimal)
      : '#EAB308' // Yellow (under recommended)

  const badgeBg = isOver
    ? 'rgba(220, 38, 38, 0.12)'
    : isOptimal
      ? 'rgba(22, 163, 74, 0.12)'
      : 'rgba(234, 179, 8, 0.15)'

  const badgeText = isOver
    ? '#DC2626'
    : isOptimal
      ? '#15803D'
      : '#B45309'

  const statusLabel =
    charCount === 0
      ? `Recommended: ${minOptimalChars}–${maxChars} characters`
      : isOver
        ? `Too long (+${charCount - maxChars} over limit — Google may truncate)`
        : isOptimal
          ? 'Optimal SEO length'
          : 'Under recommended length'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {renderDefault(props)}

      {/* Progress Bar */}
      <div
        style={{
          width: '100%',
          height: '6px',
          backgroundColor: '#E4E4E7',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: barColor,
            transition: 'width 0.2s ease, background-color 0.2s ease',
          }}
        />
      </div>

      {/* Counter & Status Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '12px',
          lineHeight: 1.4,
        }}
      >
        <span style={{ color: badgeText, fontWeight: 500 }}>{statusLabel}</span>
        <span
          style={{
            backgroundColor: badgeBg,
            color: badgeText,
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {charCount} / {maxChars} chars · {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
      </div>
    </div>
  )
}

export function SeoTitleInput(props: StringInputProps) {
  return <SeoCounterBase {...props} maxChars={60} minOptimalChars={45} />
}

export function SeoDescriptionInput(props: TextInputProps) {
  return <SeoCounterBase {...props} maxChars={160} minOptimalChars={120} />
}
