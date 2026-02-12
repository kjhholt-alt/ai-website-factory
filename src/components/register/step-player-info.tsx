"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export function StepPlayerInfo({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Enter the player&apos;s information.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="playerFirstName">Player First Name *</Label>
          <Input
            id="playerFirstName"
            value={data.playerFirstName || ""}
            onChange={(e) => onChange({ playerFirstName: e.target.value })}
            placeholder="Player first name"
            className={errors.playerFirstName ? "border-destructive" : ""}
          />
          {errors.playerFirstName && (
            <p className="text-xs text-destructive mt-1">
              {errors.playerFirstName}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="playerLastName">Player Last Name *</Label>
          <Input
            id="playerLastName"
            value={data.playerLastName || ""}
            onChange={(e) => onChange({ playerLastName: e.target.value })}
            placeholder="Player last name"
            className={errors.playerLastName ? "border-destructive" : ""}
          />
          {errors.playerLastName && (
            <p className="text-xs text-destructive mt-1">
              {errors.playerLastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="playerDateOfBirth">Date of Birth *</Label>
          <Input
            id="playerDateOfBirth"
            type="date"
            value={data.playerDateOfBirth || ""}
            onChange={(e) => {
              const dob = e.target.value;
              const age = dob
                ? Math.floor(
                    (Date.now() - new Date(dob).getTime()) /
                      (365.25 * 24 * 60 * 60 * 1000)
                  )
                : 0;
              onChange({ playerDateOfBirth: dob, playerAge: age });
            }}
            className={errors.playerDateOfBirth ? "border-destructive" : ""}
          />
          {errors.playerDateOfBirth && (
            <p className="text-xs text-destructive mt-1">
              {errors.playerDateOfBirth}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="playerAge">Age</Label>
          <Input
            id="playerAge"
            type="number"
            value={data.playerAge || ""}
            readOnly
            className="bg-muted"
          />
          {errors.playerAge && (
            <p className="text-xs text-destructive mt-1">{errors.playerAge}</p>
          )}
        </div>

        <div>
          <Label>Gender *</Label>
          <Select
            value={data.playerGender || ""}
            onValueChange={(v) => onChange({ playerGender: v })}
          >
            <SelectTrigger
              className={errors.playerGender ? "border-destructive" : ""}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="prefer-not-to-say">
                Prefer not to say
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.playerGender && (
            <p className="text-xs text-destructive mt-1">
              {errors.playerGender}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label>Skill Level *</Label>
        <Select
          value={data.playerSkillLevel || ""}
          onValueChange={(v) => onChange({ playerSkillLevel: v })}
        >
          <SelectTrigger
            className={errors.playerSkillLevel ? "border-destructive" : ""}
          >
            <SelectValue placeholder="Select skill level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner - New to soccer</SelectItem>
            <SelectItem value="intermediate">
              Intermediate - Some experience
            </SelectItem>
            <SelectItem value="advanced">
              Advanced - Club/travel team experience
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.playerSkillLevel && (
          <p className="text-xs text-destructive mt-1">
            {errors.playerSkillLevel}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="medicalConditions">
          Medical Conditions (if any)
        </Label>
        <Textarea
          id="medicalConditions"
          value={data.medicalConditions || ""}
          onChange={(e) => onChange({ medicalConditions: e.target.value })}
          placeholder="Asthma, diabetes, seizures, etc."
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="allergies">Allergies (if any)</Label>
          <Input
            id="allergies"
            value={data.allergies || ""}
            onChange={(e) => onChange({ allergies: e.target.value })}
            placeholder="Bee stings, peanuts, etc."
          />
        </div>

        <div>
          <Label htmlFor="medications">Current Medications (if any)</Label>
          <Input
            id="medications"
            value={data.medications || ""}
            onChange={(e) => onChange({ medications: e.target.value })}
            placeholder="Inhaler, EpiPen, etc."
          />
        </div>
      </div>
    </div>
  );
}
