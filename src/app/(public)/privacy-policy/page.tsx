import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Marla Cabs",
  description: "Privacy Policy for Marla Cabs. Learn how we handle and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-12 md:py-24">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted-foreground">Information about how we handle your data.</p>
    </div>
  );
}
