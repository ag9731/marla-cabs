import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4.01c-1 .49-1.98.68-3 .99-1.12-1.27-2.74-2.06-4.5-2-2.67 0-5 2.5-5 5.5 0 .43.04.85.12 1.25C7.03 9.3 4.19 7.4 2.2 4.9c-1 1.7-.2 3.8 1.4 4.9-.8-.02-1.6-.26-2.3-.65v.06c0 2.2 1.5 4.1 3.5 4.5-.4.1-1.1.2-1.7.1.6 1.8 2.3 3.1 4.3 3.1-2 1.6-4.6 2.5-7.3 2.5-.4 0-.9-.03-1.3-.08C2.5 21.2 5.1 22 8 22c9.5 0 14.8-7.9 14.8-14.8v-.6c1-.7 1.9-1.6 2.6-2.6z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-accent">Marla Cabs</h3>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted travel partner in India. Offering reliable, comfortable, and affordable cab services for all your transportation needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <span className="sr-only">Instagram</span>
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/20 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Our Services</Link></li>
              <li><Link href="/fleet" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Our Fleet</Link></li>
              <li><Link href="/blog" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/20 pb-2 inline-block">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/airport-transfer" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Airport Transfers</Link></li>
              <li><Link href="/services/outstation" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Outstation Cabs</Link></li>
              <li><Link href="/services/local-city" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Local City Rides</Link></li>
              <li><Link href="/services/corporate" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Corporate Travel</Link></li>
              <li><Link href="/services/wedding" className="text-primary-foreground/80 hover:text-accent text-sm transition-colors">Wedding Cars</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-primary-foreground/20 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">123 Travel Hub, MG Road, Bangalore, India 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+91 63668 19755</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span className="text-primary-foreground/80 text-sm">booking@marlacabs.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Marla Cabs. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-primary-foreground/60">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
