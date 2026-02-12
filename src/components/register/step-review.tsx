"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site-config";
import type { FullRegistration } from "@/lib/schemas";

interface Props {
  data: Partial<FullRegistration>;
  errors: Record<string, string>;
}

export function StepReview({ data, errors }: Props) {
  const service = siteConfig.services.find((s) => s.id === data.serviceId);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Please review all information below before submitting. Click
        &quot;Back&quot; to make changes.
      </p>

      {/* Camp Selection */}
      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Camp Session
          </h4>
          {service ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground">
                  {service.dates} | {service.time}
                </p>
              </div>
              <Badge>${service.price}</Badge>
            </div>
          ) : (
            <p className="text-sm text-destructive">No camp selected</p>
          )}
        </CardContent>
      </Card>

      {/* Parent Info */}
      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Parent/Guardian
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Name: </span>
              <span className="text-foreground">
                {data.parentFirstName} {data.parentLastName}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Email: </span>
              <span className="text-foreground">{data.parentEmail}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Phone: </span>
              <span className="text-foreground">{data.parentPhone}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Address: </span>
              <span className="text-foreground">
                {data.parentAddress}, {data.parentCity}, {data.parentState}{" "}
                {data.parentZip}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Player Info */}
      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Player
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Name: </span>
              <span className="text-foreground">
                {data.playerFirstName} {data.playerLastName}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Age: </span>
              <span className="text-foreground">{data.playerAge}</span>
            </div>
            <div>
              <span className="text-muted-foreground">DOB: </span>
              <span className="text-foreground">{data.playerDateOfBirth}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Skill: </span>
              <span className="text-foreground capitalize">
                {data.playerSkillLevel}
              </span>
            </div>
          </div>
          {(data.medicalConditions || data.allergies || data.medications) && (
            <>
              <Separator className="my-2" />
              <div className="text-sm space-y-1">
                {data.medicalConditions && (
                  <p>
                    <span className="text-muted-foreground">Medical: </span>
                    <span className="text-foreground">
                      {data.medicalConditions}
                    </span>
                  </p>
                )}
                {data.allergies && (
                  <p>
                    <span className="text-muted-foreground">Allergies: </span>
                    <span className="text-foreground">{data.allergies}</span>
                  </p>
                )}
                {data.medications && (
                  <p>
                    <span className="text-muted-foreground">
                      Medications:{" "}
                    </span>
                    <span className="text-foreground">{data.medications}</span>
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Emergency Contact
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Name: </span>
              <span className="text-foreground">
                {data.emergencyContactName}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Phone: </span>
              <span className="text-foreground">
                {data.emergencyContactPhone}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Relationship: </span>
              <span className="text-foreground capitalize">
                {data.emergencyRelationship}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Waiver */}
      <Card className="bg-muted/30">
        <CardContent className="pt-4 pb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Waiver
          </h4>
          <div className="text-sm">
            <p>
              <span className="text-muted-foreground">Signed by: </span>
              <span className="text-foreground font-serif italic">
                {data.signedName}
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">Terms accepted: </span>
              <Badge variant={data.agreedToTerms ? "default" : "destructive"}>
                {data.agreedToTerms ? "Yes" : "No"}
              </Badge>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Total */}
      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
        <span className="text-lg font-semibold text-foreground">Total Due</span>
        <span className="text-2xl font-bold text-primary">
          ${service?.price || 0}
        </span>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Payment will be collected separately. By clicking &quot;Submit
        Registration&quot; you are confirming your enrollment.
      </p>
    </div>
  );
}
