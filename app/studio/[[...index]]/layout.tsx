import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sanity Studio',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh' }}>
      {children}
    </div>
  )
}
