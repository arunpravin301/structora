// PROTECTED ZONE — Phase 2 (client portal).
// In Phase 2: check the Supabase session here and redirect to /login if absent.
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-mist">{children}</div>;
}
