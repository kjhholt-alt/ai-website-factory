import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <Card>
          <CardContent className="pt-6 prose prose-sm prose-invert max-w-none">
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  1. Information We Collect
                </h2>
                <p>
                  When you register for {siteConfig.businessName} programs, we
                  collect the following information:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Parent/guardian name, email, phone, and address</li>
                  <li>Player name, date of birth, age, and gender</li>
                  <li>Medical information, allergies, and medications</li>
                  <li>Emergency contact details</li>
                  <li>Digital waiver signatures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  2. How We Use Your Information
                </h2>
                <p>We use collected information to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Process and manage camp registrations</li>
                  <li>Communicate about programs and schedules</li>
                  <li>
                    Ensure player safety and access medical information in
                    emergencies
                  </li>
                  <li>Send important announcements and updates</li>
                  <li>Improve our programs and services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  3. Information Sharing
                </h2>
                <p>
                  We do not sell, trade, or share your personal information
                  with third parties except as necessary to provide our
                  services (e.g., email delivery services) or as required by
                  law. Coaches and staff have access only to information
                  necessary for program operation and player safety.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  4. Data Security
                </h2>
                <p>
                  We implement reasonable security measures to protect your
                  personal information. However, no method of electronic
                  storage is 100% secure. We strive to use commercially
                  acceptable means to protect your data.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  5. Data Retention
                </h2>
                <p>
                  We retain registration data for the duration of the program
                  and for a reasonable period afterward for administrative
                  purposes. You may request deletion of your data by
                  contacting us.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  6. Your Rights
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of non-essential communications</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  7. Contact Us
                </h2>
                <p>
                  For privacy-related inquiries, contact us at{" "}
                  {siteConfig.contactInfo.email} or{" "}
                  {siteConfig.contactInfo.phone}.
                </p>
                <p className="mt-2">{siteConfig.contactInfo.address}</p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
