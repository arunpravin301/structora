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
      <svg
        width="28"
        height="28"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, borderRadius: '6px' }}
        aria-hidden="true"
      >
        <rect width="512" height="512" rx="96" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="12" />
        <g transform="translate(44, 170) scale(1.7593)">
          <path
            fill="#0F0F10"
            d="M 16,0 H 85 A 16,16 0 0 1 101,16 V 34 H 76 V 24 H 28 A 3,3 0 0 0 25,27 V 35 A 3,3 0 0 0 28,38 L 85,40 A 16,16 0 0 1 101,56 V 82 A 16,16 0 0 1 85,98 H 16 A 16,16 0 0 1 0,82 V 64 H 25 V 74 H 73 A 3,3 0 0 0 76,71 V 62 A 3,3 0 0 0 73,59 L 16,57 A 16,16 0 0 1 0,41 V 16 A 16,16 0 0 1 16,0 Z"
          />
          <path
            fill="#D60000"
            stroke="#D60000"
            strokeWidth="3"
            strokeLinejoin="round"
            d="M 150.5,39 L 184,96.5 L 117,96.5 Z"
          />
          <polygon fill="#0F0F10" points="157,0 185,0 241,98 213,98" />
        </g>
      </svg>
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
