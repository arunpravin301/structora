export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/919677770797" target="_blank" rel="noopener" aria-label="WhatsApp us"
      className="fixed right-6 bottom-6 z-[120] bg-wa text-white rounded-full pl-4 pr-5 py-3 text-sm font-semibold inline-flex items-center gap-2.5 shadow-[0_8px_28px_rgba(37,211,102,.4)] hover:bg-[#1FB857] transition">
      <svg viewBox="0 0 32 32" fill="currentColor" className="w-[22px] h-[22px]">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.2 1.6 6L4 29l8.2-1.6c1.7.9 3.7 1.4 5.8 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.9 1 1-4.7-.3-.5C5.5 18 5 16.5 5 15c0-6.1 4.9-11 11-11s11 4.9 11 11-4.9 10.8-11 10.8zm6.1-7.9c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z" />
      </svg>
      <span className="max-[600px]:hidden">WhatsApp us</span>
    </a>
  );
}
