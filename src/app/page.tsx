"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Award,
  Users,
  Target,
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="w-6 h-6" />,
  users: <Users className="w-6 h-6" />,
  target: <Target className="w-6 h-6" />,
  "shield-check": <ShieldCheck className="w-6 h-6" />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Badge
                variant="secondary"
                className="mb-4 px-3 py-1 text-xs font-medium"
              >
                <Trophy className="w-3 h-3 mr-1" />
                Summer 2025 Registration Open
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              {siteConfig.tagline}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl"
            >
              {siteConfig.description}
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild>
                <Link href="/register">
                  Register Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#programs">View Programs</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Why Choose {siteConfig.businessName}?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              We are committed to developing well-rounded athletes in a
              positive, challenging environment.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {siteConfig.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full bg-card/50 border-border hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-2">
                      {iconMap[feature.icon] || (
                        <Trophy className="w-6 h-6" />
                      )}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Our Programs
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Choose the perfect program for your player. All camps include
              professional coaching, a camp jersey, and end-of-camp awards.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {siteConfig.services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full bg-card/50 border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-1">
                          {service.name}
                        </CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                      <Badge
                        variant="secondary"
                        className="ml-2 shrink-0 text-primary"
                      >
                        ${service.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        {service.dates}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        {service.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        Ages {service.ages}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        {service.location}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Badge variant="outline" className="text-xs">
                        {service.skillLevel}
                      </Badge>
                      <span className="text-xs text-muted-foreground ml-2">
                        Max {service.maxCapacity} players
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/register?service=${service.id}`}>
                        Register for This Camp
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              What Parents Say
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {siteConfig.testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full bg-card/50 border-border">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, j) => (
                          <Star
                            key={j}
                            className="w-4 h-4 fill-yellow-500 text-yellow-500"
                          />
                        )
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground italic mb-4">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              Have questions about our programs? We&apos;d love to hear from
              you.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Card className="text-center bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                    <Phone className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.contactInfo.phone}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Card className="text-center bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                    <Mail className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.contactInfo.email}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Card className="text-center bg-card/50 border-border">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Location
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {siteConfig.contactInfo.address}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="pt-8 pb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Ready to Join?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Spots fill up fast. Secure your player&apos;s spot in our
                  next camp today.
                </p>
                <Button size="lg" asChild>
                  <Link href="/register">
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
