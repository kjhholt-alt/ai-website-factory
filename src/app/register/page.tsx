"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { StepCampSelection } from "@/components/register/step-camp-selection";
import { StepParentInfo } from "@/components/register/step-parent-info";
import { StepPlayerInfo } from "@/components/register/step-player-info";
import { StepEmergencyContact } from "@/components/register/step-emergency-contact";
import { StepWaiver } from "@/components/register/step-waiver";
import { StepReview } from "@/components/register/step-review";
import {
  campSelectionSchema,
  parentInfoSchema,
  playerInfoSchema,
  emergencyContactSchema,
  waiverSchema,
  type FullRegistration,
} from "@/lib/schemas";

const STEPS = [
  { title: "Select Camp", description: "Choose your program" },
  { title: "Parent Info", description: "Guardian details" },
  { title: "Player Info", description: "Athlete details" },
  { title: "Emergency", description: "Emergency contact" },
  { title: "Waiver", description: "Liability waiver" },
  { title: "Review", description: "Confirm & submit" },
];

const stepSchemas = [
  campSelectionSchema,
  parentInfoSchema,
  playerInfoSchema,
  emergencyContactSchema,
  waiverSchema,
  null, // Review step has no additional validation
];

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [registrationId, setRegistrationId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Partial<FullRegistration>>({
    serviceId: "",
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    parentAddress: "",
    parentCity: "",
    parentState: "",
    parentZip: "",
    playerFirstName: "",
    playerLastName: "",
    playerDateOfBirth: "",
    playerAge: 0,
    playerGender: "",
    playerSkillLevel: "",
    medicalConditions: "",
    allergies: "",
    medications: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyRelationship: "",
    agreedToTerms: false as unknown as true,
    signedName: "",
  });

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, serviceId: serviceParam }));
    }
  }, [searchParams]);

  const updateFormData = (data: Partial<FullRegistration>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setErrors({});
  };

  const validateCurrentStep = (): boolean => {
    const schema = stepSchemas[currentStep];
    if (!schema) return true;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = String(issue.path[0]);
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    setErrors({});
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const service = siteConfig.services.find(
        (s) => s.id === formData.serviceId
      );

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceName: service?.name || "",
          totalAmount: service?.price || 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      const data = await res.json();
      setRegistrationId(data.id);
      setIsComplete(true);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center">
              <CardContent className="pt-10 pb-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Registration Complete!
                </h2>
                <p className="text-muted-foreground mb-4">
                  Thank you for registering{" "}
                  <span className="font-semibold text-foreground">
                    {formData.playerFirstName} {formData.playerLastName}
                  </span>{" "}
                  for{" "}
                  <span className="font-semibold text-foreground">
                    {siteConfig.services.find(
                      (s) => s.id === formData.serviceId
                    )?.name}
                  </span>
                  .
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  A confirmation email has been sent to{" "}
                  <span className="font-medium">{formData.parentEmail}</span>.
                  Your registration ID is{" "}
                  <span className="font-mono text-primary">
                    {registrationId}
                  </span>
                  .
                </p>
                <Button asChild>
                  <a href="/">Return to Home</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    i < currentStep
                      ? "bg-primary text-primary-foreground"
                      : i === currentStep
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={`text-xs mt-1 hidden sm:block ${
                    i <= currentStep
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {STEPS[currentStep].title}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 0 && (
                  <StepCampSelection
                    data={formData}
                    onChange={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep === 1 && (
                  <StepParentInfo
                    data={formData}
                    onChange={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep === 2 && (
                  <StepPlayerInfo
                    data={formData}
                    onChange={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep === 3 && (
                  <StepEmergencyContact
                    data={formData}
                    onChange={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep === 4 && (
                  <StepWaiver
                    data={formData}
                    onChange={updateFormData}
                    errors={errors}
                  />
                )}
                {currentStep === 5 && (
                  <StepReview data={formData} errors={errors} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {currentStep < STEPS.length - 1 ? (
                <Button onClick={handleNext}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              )}
            </div>

            {errors.submit && (
              <p className="text-sm text-destructive text-center mt-4">
                {errors.submit}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
