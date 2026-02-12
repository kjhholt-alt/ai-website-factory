"use client";

import { Calendar, Clock, Users, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";
import type { FullRegistration } from "@/lib/schemas";

interface Props {
  data: Partial<FullRegistration>;
  onChange: (data: Partial<FullRegistration>) => void;
  errors: Record<string, string>;
}

export function StepCampSelection({ data, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Select the camp session you&apos;d like to register for.
      </p>

      <div className="grid gap-3">
        {siteConfig.services.map((service) => (
          <Card
            key={service.id}
            className={`cursor-pointer transition-all ${
              data.serviceId === service.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onChange({ serviceId: service.id })}
          >
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </div>
                <Badge
                  variant={
                    data.serviceId === service.id ? "default" : "secondary"
                  }
                  className="ml-3 shrink-0"
                >
                  ${service.price}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  {service.dates}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {service.time}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                  Ages {service.ages}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  {service.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {errors.serviceId && (
        <p className="text-sm text-destructive">{errors.serviceId}</p>
      )}
    </div>
  );
}
