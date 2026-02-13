"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FullRegistration } from "@/lib/schemas";

interface Props {
  data: Partial<FullRegistration>;
  onChange: (data: Partial<FullRegistration>) => void;
  errors: Record<string, string>;
}

export function StepParentInfo({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Enter the parent or guardian&apos;s information.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="parentFirstName">First Name *</Label>
          <Input
            id="parentFirstName"
            value={data.parentFirstName || ""}
            onChange={(e) => onChange({ parentFirstName: e.target.value })}
            placeholder="First name"
            className={errors.parentFirstName ? "border-destructive" : ""}
          />
          {errors.parentFirstName && (
            <p className="text-xs text-destructive mt-1">
              {errors.parentFirstName}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="parentLastName">Last Name *</Label>
          <Input
            id="parentLastName"
            value={data.parentLastName || ""}
            onChange={(e) => onChange({ parentLastName: e.target.value })}
            placeholder="Last name"
            className={errors.parentLastName ? "border-destructive" : ""}
          />
          {errors.parentLastName && (
            <p className="text-xs text-destructive mt-1">
              {errors.parentLastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="parentEmail">Email *</Label>
          <Input
            id="parentEmail"
            type="email"
            value={data.parentEmail || ""}
            onChange={(e) => onChange({ parentEmail: e.target.value })}
            placeholder="you@example.com"
            className={errors.parentEmail ? "border-destructive" : ""}
          />
          {errors.parentEmail && (
            <p className="text-xs text-destructive mt-1">
              {errors.parentEmail}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="parentPhone">Phone *</Label>
          <Input
            id="parentPhone"
            value={data.parentPhone || ""}
            onChange={(e) => onChange({ parentPhone: e.target.value })}
            placeholder="(555) 123-4567"
            className={errors.parentPhone ? "border-destructive" : ""}
          />
          {errors.parentPhone && (
            <p className="text-xs text-destructive mt-1">
              {errors.parentPhone}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="parentAddress">Street Address *</Label>
        <Input
          id="parentAddress"
          value={data.parentAddress || ""}
          onChange={(e) => onChange({ parentAddress: e.target.value })}
          placeholder="123 Main St"
          className={errors.parentAddress ? "border-destructive" : ""}
        />
        {errors.parentAddress && (
          <p className="text-xs text-destructive mt-1">
            {errors.parentAddress}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="parentCity">City *</Label>
          <Input
            id="parentCity"
            value={data.parentCity || ""}
            onChange={(e) => onChange({ parentCity: e.target.value })}
            placeholder="East Moline"
            className={errors.parentCity ? "border-destructive" : ""}
          />
          {errors.parentCity && (
            <p className="text-xs text-destructive mt-1">
              {errors.parentCity}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="parentState">State *</Label>
          <Input
            id="parentState"
            value={data.parentState || ""}
            onChange={(e) => onChange({ parentState: e.target.value })}
            placeholder="IL"
            className={errors.parentState ? "border-destructive" : ""}
          />
          {errors.parentState && (
            <p className="text-xs text-destructive mt-1">
              {errors.parentState}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="parentZip">ZIP Code *</Label>
          <Input
            id="parentZip"
            value={data.parentZip || ""}
            onChange={(e) => onChange({ parentZip: e.target.value })}
            placeholder="78701"
            className={errors.parentZip ? "border-destructive" : ""}
          />
          {errors.parentZip && (
            <p className="text-xs text-destructive mt-1">
              {errors.parentZip}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
