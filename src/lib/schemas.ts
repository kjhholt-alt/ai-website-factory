import { z } from "zod";

export const campSelectionSchema = z.object({
  serviceId: z.string().min(1, "Please select a camp session"),
});

export const parentInfoSchema = z.object({
  parentFirstName: z.string().min(1, "First name is required"),
  parentLastName: z.string().min(1, "Last name is required"),
  parentEmail: z.string().email("Please enter a valid email"),
  parentPhone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-()+ ]+$/, "Please enter a valid phone number"),
  parentAddress: z.string().min(1, "Address is required"),
  parentCity: z.string().min(1, "City is required"),
  parentState: z.string().min(1, "State is required"),
  parentZip: z
    .string()
    .min(5, "Please enter a valid ZIP code")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
});

export const playerInfoSchema = z.object({
  playerFirstName: z.string().min(1, "Player first name is required"),
  playerLastName: z.string().min(1, "Player last name is required"),
  playerDateOfBirth: z.string().min(1, "Date of birth is required"),
  playerAge: z.coerce
    .number()
    .min(5, "Player must be at least 5 years old")
    .max(18, "Player must be 18 or younger"),
  playerGender: z.string().min(1, "Please select a gender"),
  playerSkillLevel: z.string().min(1, "Please select a skill level"),
  medicalConditions: z.string().optional().default(""),
  allergies: z.string().optional().default(""),
  medications: z.string().optional().default(""),
});

export const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-()+ ]+$/, "Please enter a valid phone number"),
  emergencyRelationship: z.string().min(1, "Relationship is required"),
});

export const waiverSchema = z.object({
  agreedToTerms: z.literal(true, {
    error: "You must agree to the waiver to continue",
  }),
  signedName: z.string().min(1, "Please type your full name as signature"),
});

export const fullRegistrationSchema = campSelectionSchema
  .merge(parentInfoSchema)
  .merge(playerInfoSchema)
  .merge(emergencyContactSchema)
  .merge(waiverSchema);

export type CampSelection = z.infer<typeof campSelectionSchema>;
export type ParentInfo = z.infer<typeof parentInfoSchema>;
export type PlayerInfo = z.infer<typeof playerInfoSchema>;
export type EmergencyContact = z.infer<typeof emergencyContactSchema>;
export type WaiverInfo = z.infer<typeof waiverSchema>;
export type FullRegistration = z.infer<typeof fullRegistrationSchema>;
