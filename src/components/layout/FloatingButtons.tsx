"use client";

import { Phone } from "lucide-react";

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Instagram Button */}
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer group relative"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        <span className="absolute right-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Follow us
        </span>
      </a>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/916366819755" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer group relative"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        <span className="absolute right-16 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* Phone Button */}
      <a 
        href="tel:+916366819755" 
        className="w-14 h-14 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer group relative"
        aria-label="Call Us"
      >
        <Phone className="w-7 h-7" />
        <span className="absolute right-16 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call us now
        </span>
      </a>
    </div>
  );
}
