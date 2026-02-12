import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <Card>
          <CardContent className="pt-6 prose prose-sm prose-invert max-w-none">
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using the services provided by{" "}
                  {siteConfig.businessName}, you agree to be bound by these
                  Terms of Service. If you do not agree to these terms, please
                  do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  2. Services
                </h2>
                <p>
                  {siteConfig.businessName} provides youth soccer training
                  programs, camps, and clinics. All programs are subject to
                  availability and may be modified or cancelled at our
                  discretion with reasonable notice.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  3. Registration and Payment
                </h2>
                <p>
                  Registration for programs requires accurate and complete
                  information. Parents or legal guardians must register on
                  behalf of minor participants. Payment is due at the time of
                  registration unless otherwise stated.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  4. Cancellation and Refunds
                </h2>
                <p>
                  Cancellations made 14 or more days before the program start
                  date are eligible for a full refund. Cancellations made 7-13
                  days before are eligible for a 50% refund. No refunds are
                  issued for cancellations made less than 7 days before the
                  program start date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  5. Assumption of Risk
                </h2>
                <p>
                  Participation in soccer activities involves inherent risks
                  including physical injury. By registering, you acknowledge
                  these risks and agree to hold {siteConfig.businessName}
                  harmless from any claims arising from participation.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  6. Code of Conduct
                </h2>
                <p>
                  All participants, parents, and spectators are expected to
                  demonstrate good sportsmanship and respect for coaches,
                  staff, and fellow players. {siteConfig.businessName} reserves
                  the right to remove any individual who violates this code
                  without refund.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  7. Contact
                </h2>
                <p>
                  For questions about these terms, contact us at{" "}
                  {siteConfig.contactInfo.email} or{" "}
                  {siteConfig.contactInfo.phone}.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
