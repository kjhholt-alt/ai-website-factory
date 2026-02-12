"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FullRegistration } from "@/lib/schemas";

interface Props {
  data: Partial<FullRegistration>;
  onChange: (data: Partial<FullRegistration>) => void;
  errors: Record<string, string>;
}

export function StepEmergencyContact({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Provide an emergency contact (someone other than the parent/guardian
        listed above).
      </p>

      <div>
        <Label htmlFor="emergencyContactName">Contact Name *</Label>
        <Input
          id="emergencyContactName"
          value={data.emergencyContactName || ""}
          onChange={(e) => onChange({ emergencyContactName: e.target.value })}
          placeholder="Full name"
          className={errors.emergencyContactName ? "border-destructive" : ""}
        />
        {errors.emergencyContactName && (
          <p className="text-xs text-destructive mt-1">
            {errors.emergencyContactName}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
        <Input
          id="emergencyContactPhone"
          value={data.emergencyContactPhone || ""}
          onChange={(e) => onChange({ emergencyContactPhone: e.target.value })}
          placeholder="(555) 987-6543"
          className={errors.emergencyContactPhone ? "border-destructive" : ""}
        />
        {errors.emergencyContactPhone && (
          <p className="text-xs text-destructive mt-1">
            {errors.emergencyContactPhone}
          </p>
        )}
      </div>

      <div>
        <Label>Relationship to Player *</Label>
        <Select
          value={data.emergencyRelationship || ""}
          onValueChange={(v) => onChange({ emergencyRelationship: v })}
        >
          <SelectTrigger
            className={
              errors.emergencyRelationship ? "border-destructive" : ""
            }
          >
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="grandparent">Grandparent</SelectItem>
            <SelectItem value="aunt-uncle">Aunt/Uncle</SelectItem>
            <SelectItem value="sibling">Sibling (18+)</SelectItem>
            <SelectItem value="family-friend">Family Friend</SelectItem>
            <SelectItem value="neighbor">Neighbor</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.emergencyRelationship && (
          <p className="text-xs text-destructive mt-1">
            {errors.emergencyRelationship}
          </p>
        )}
      </div>
    </div>
  );
}
