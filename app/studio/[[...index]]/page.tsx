export function generateStaticParams() {
  return [{ index: [] }]
}

export const dynamic = 'force-static'

import { Studio } from './Studio'

export default function AdminPage() {
  return <Studio />
}
