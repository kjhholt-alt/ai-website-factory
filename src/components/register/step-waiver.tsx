"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import type { FullRegistration } from "@/lib/schemas";

interface Props {
  data: Partial<FullRegistration>;
  onChange: (data: Partial<FullRegistration>) => void;
  errors: Record<string, string>;
}

export function StepWaiver({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Please read the waiver below carefully, then sign by typing your full
        legal name.
      </p>

      <Card className="bg-muted/50">
        <CardContent className="pt-4 pb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Liability Waiver & Release Form
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
            {siteConfig.registration.waiverText}
          </p>
        </CardContent>
      </Card>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="agreedToTerms"
          checked={!!data.agreedToTerms}
          onCheckedChange={(checked: boolean | "indeterminate") =>
            onChange({ agreedToTerms: checked === true ? true : (false as never) })
          }
          className={errors.agreedToTerms ? "border-destructive" : ""}
        />
        <Label
          htmlFor="agreedToTerms"
          className="text-sm leading-relaxed cursor-pointer"
        >
          I have read, understand, and agree to the above waiver and release
          of liability. I confirm that all information provided in this
          registration is accurate.
        </Label>
      </div>
      {errors.agreedToTerms && (
        <p className="text-xs text-destructive">{errors.agreedToTerms}</p>
      )}

      <div>
        <Label htmlFor="signedName">
          Digital Signature (type your full legal name) *
        </Label>
        <Input
          id="signedName"
          value={data.signedName || ""}
          onChange={(e) => onChange({ signedName: e.target.value })}
          placeholder="Type your full legal name"
          className={`font-serif italic text-lg ${
            errors.signedName ? "border-destructive" : ""
          }`}
        />
        {errors.signedName && (
          <p className="text-xs text-destructive mt-1">{errors.signedName}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          By typing your name above, you are providing a legally binding
          electronic signature.
        </p>
      </div>
    </div>
  );
}
