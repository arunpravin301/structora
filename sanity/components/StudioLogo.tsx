'use client'

import React from 'react'

export function StudioLogo() {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '2px 4px',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          backgroundColor: '#D60000',
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: '13px',
          letterSpacing: '0.04em',
        }}
      >
        S
      </span>
      <span
        style={{
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'inherit',
        }}
      >
        Structora
      </span>
      <span
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '2px 6px',
          borderRadius: '3px',
          backgroundColor: 'rgba(214, 0, 0, 0.14)',
          color: '#D60000',
          border: '1px solid rgba(214, 0, 0, 0.3)',
        }}
      >
        CMS
      </span>
    </div>
  )
}
