export default function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-wrap px-10 max-[600px]:px-6 ${className}`}>{children}</div>;
}
