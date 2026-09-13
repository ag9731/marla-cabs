import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Marla Cabs",
  description: "Terms and conditions for using Marla Cabs services.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-muted-foreground">Rules and guidelines for using our services.</p>
    </div>
  );
}
