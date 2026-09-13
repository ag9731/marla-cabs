import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You | Marla Cabs",
  description: "Your booking request has been received.",
};

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Your booking request has been successfully received. Our team will contact you shortly on your provided mobile number to confirm the details and fare.
        </p>
        <Link 
          href="/" 
          className="inline-flex h-12 w-full items-center justify-center rounded-md bg-accent px-8 py-2 text-base font-bold text-accent-foreground shadow-sm transition-transform hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
