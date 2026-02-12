"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Calendar,
  Send,
  Search,
  Download,
  Loader2,
  Lock,
  LogOut,
  ChevronDown,
  FileText,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { siteConfig } from "@/lib/site-config";

interface Registration {
  id: string;
  createdAt: string;
  serviceId: string;
  serviceName: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  parentCity: string;
  parentState: string;
  parentZip: string;
  playerFirstName: string;
  playerLastName: string;
  playerDateOfBirth: string;
  playerAge: number;
  playerGender: string;
  playerSkillLevel: string;
  medicalConditions: string;
  allergies: string;
  medications: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyRelationship: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  waiver?: {
    signedName: string;
    agreedToTerms: boolean;
    createdAt: string;
  };
}

interface Stats {
  totalRegistrations: number;
  totalRevenue: number;
  registrationsByService: {
    serviceId: string;
    serviceName: string;
    count: number;
    revenue: number;
  }[];
  recentRegistrations: {
    id: string;
    playerFirstName: string;
    playerLastName: string;
    serviceName: string;
    createdAt: string;
    status: string;
    totalAmount: number;
  }[];
}

interface Message {
  id: string;
  createdAt: string;
  subject: string;
  body: string;
  sentTo: string;
  status: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [stats, setStats] = useState<Stats | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterService, setFilterService] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Message compose state
  const [msgSubject, setMsgSubject] = useState("");
  const [msgBody, setMsgBody] = useState("");
  const [msgServiceFilter, setMsgServiceFilter] = useState("");
  const [isSending, setIsSending] = useState(false);

  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [statsRes, regsRes, msgsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch(
          `/api/admin/registrations?search=${searchQuery}&serviceId=${filterService}`
        ),
        fetch("/api/admin/messages"),
      ]);

      if (statsRes.status === 401) {
        setIsLoggedIn(false);
        return;
      }

      const [statsData, regsData, msgsData] = await Promise.all([
        statsRes.json(),
        regsRes.json(),
        msgsRes.json(),
      ]);

      setStats(statsData);
      setRegistrations(regsData.registrations || []);
      setMessages(msgsData.messages || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filterService]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        setPassword("");
      } else {
        setLoginError("Invalid password");
      }
    } catch {
      setLoginError("Login failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    document.cookie =
      "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setIsLoggedIn(false);
  };

  const handleSendMessage = async () => {
    if (!msgSubject || !msgBody) return;
    setIsSending(true);

    try {
      const res = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: msgSubject,
          body: msgBody,
          serviceId: msgServiceFilter,
        }),
      });

      if (res.ok) {
        setMsgSubject("");
        setMsgBody("");
        setMsgServiceFilter("");
        fetchData();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      "ID",
      "Date",
      "Camp",
      "Player",
      "Age",
      "Parent",
      "Email",
      "Phone",
      "Status",
      "Amount",
    ];
    const rows = registrations.map((r) => [
      r.id,
      new Date(r.createdAt).toLocaleDateString(),
      r.serviceName,
      `${r.playerFirstName} ${r.playerLastName}`,
      r.playerAge,
      `${r.parentFirstName} ${r.parentLastName}`,
      r.parentEmail,
      r.parentPhone,
      r.status,
      r.totalAmount,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="w-[380px]">
            <CardHeader className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <CardTitle>Admin Dashboard</CardTitle>
              <CardDescription>
                Enter the admin password to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoFocus
                  />
                </div>
                {loginError && (
                  <p className="text-sm text-destructive">{loginError}</p>
                )}
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              {siteConfig.businessName} Management
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : stats ? (
              <div className="space-y-6">
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {stats.totalRegistrations}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total Registrations
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            ${stats.totalRevenue.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total Revenue
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {siteConfig.services.length}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Active Programs
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Per-Service Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Registrations by Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {siteConfig.services.map((service) => {
                        const serviceStats =
                          stats.registrationsByService.find(
                            (r) => r.serviceId === service.id
                          );
                        const count = serviceStats?.count || 0;
                        const pct = (count / service.maxCapacity) * 100;

                        return (
                          <div key={service.id}>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-foreground font-medium">
                                {service.name}
                              </span>
                              <span className="text-muted-foreground">
                                {count}/{service.maxCapacity} spots filled
                              </span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  pct >= 90
                                    ? "bg-red-500"
                                    : pct >= 70
                                    ? "bg-yellow-500"
                                    : "bg-primary"
                                }`}
                                style={{ width: `${Math.min(pct, 100)}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Registrations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Recent Registrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {stats.recentRegistrations.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No registrations yet
                      </p>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Player</TableHead>
                            <TableHead>Program</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {stats.recentRegistrations.map((reg) => (
                            <TableRow key={reg.id}>
                              <TableCell className="font-medium">
                                {reg.playerFirstName} {reg.playerLastName}
                              </TableCell>
                              <TableCell>{reg.serviceName}</TableCell>
                              <TableCell>
                                {new Date(reg.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    reg.status === "confirmed"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {reg.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </div>
            ) : null}
          </TabsContent>

          {/* Registrations Tab */}
          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg">All Registrations</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-[200px]"
                      />
                    </div>
                    <Select
                      value={filterService}
                      onValueChange={setFilterService}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Programs" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=" ">All Programs</SelectItem>
                        {siteConfig.services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={exportCSV}
                      disabled={registrations.length === 0}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                ) : registrations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-10">
                    No registrations found
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead>Parent</TableHead>
                          <TableHead>Program</TableHead>
                          <TableHead>Age</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registrations.map((reg) => (
                          <TableRow key={reg.id}>
                            <TableCell className="font-medium">
                              {reg.playerFirstName} {reg.playerLastName}
                            </TableCell>
                            <TableCell>
                              {reg.parentFirstName} {reg.parentLastName}
                              <br />
                              <span className="text-xs text-muted-foreground">
                                {reg.parentEmail}
                              </span>
                            </TableCell>
                            <TableCell>{reg.serviceName}</TableCell>
                            <TableCell>{reg.playerAge}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  reg.status === "confirmed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {reg.status}
                              </Badge>
                            </TableCell>
                            <TableCell>${reg.totalAmount}</TableCell>
                            <TableCell>
                              {new Date(reg.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      setSelectedRegistration(reg)
                                    }
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Registration Details
                                    </DialogTitle>
                                    <DialogDescription>
                                      ID: {reg.id}
                                    </DialogDescription>
                                  </DialogHeader>
                                  {selectedRegistration && (
                                    <div className="space-y-4 text-sm">
                                      <div>
                                        <h4 className="font-semibold mb-1">
                                          Player
                                        </h4>
                                        <p>
                                          {selectedRegistration.playerFirstName}{" "}
                                          {selectedRegistration.playerLastName} |
                                          Age {selectedRegistration.playerAge} |{" "}
                                          {selectedRegistration.playerSkillLevel}
                                        </p>
                                        {selectedRegistration.medicalConditions && (
                                          <p className="text-muted-foreground">
                                            Medical:{" "}
                                            {
                                              selectedRegistration.medicalConditions
                                            }
                                          </p>
                                        )}
                                        {selectedRegistration.allergies && (
                                          <p className="text-muted-foreground">
                                            Allergies:{" "}
                                            {selectedRegistration.allergies}
                                          </p>
                                        )}
                                      </div>
                                      <Separator />
                                      <div>
                                        <h4 className="font-semibold mb-1">
                                          Parent/Guardian
                                        </h4>
                                        <p>
                                          {selectedRegistration.parentFirstName}{" "}
                                          {selectedRegistration.parentLastName}
                                        </p>
                                        <p className="text-muted-foreground">
                                          {selectedRegistration.parentEmail} |{" "}
                                          {selectedRegistration.parentPhone}
                                        </p>
                                        <p className="text-muted-foreground">
                                          {selectedRegistration.parentAddress},{" "}
                                          {selectedRegistration.parentCity},{" "}
                                          {selectedRegistration.parentState}{" "}
                                          {selectedRegistration.parentZip}
                                        </p>
                                      </div>
                                      <Separator />
                                      <div>
                                        <h4 className="font-semibold mb-1">
                                          Emergency Contact
                                        </h4>
                                        <p>
                                          {
                                            selectedRegistration.emergencyContactName
                                          }{" "}
                                          (
                                          {
                                            selectedRegistration.emergencyRelationship
                                          }
                                          )
                                        </p>
                                        <p className="text-muted-foreground">
                                          {
                                            selectedRegistration.emergencyContactPhone
                                          }
                                        </p>
                                      </div>
                                      <Separator />
                                      <div>
                                        <h4 className="font-semibold mb-1">
                                          Waiver
                                        </h4>
                                        {selectedRegistration.waiver ? (
                                          <p>
                                            Signed by:{" "}
                                            <span className="font-serif italic">
                                              {
                                                selectedRegistration.waiver
                                                  .signedName
                                              }
                                            </span>{" "}
                                            on{" "}
                                            {new Date(
                                              selectedRegistration.waiver.createdAt
                                            ).toLocaleString()}
                                          </p>
                                        ) : (
                                          <p className="text-destructive">
                                            Not signed
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compose */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Send Message</CardTitle>
                  <CardDescription>
                    Send an announcement to registered families
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Send To</Label>
                    <Select
                      value={msgServiceFilter}
                      onValueChange={setMsgServiceFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Registered Families" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=" ">
                          All Registered Families
                        </SelectItem>
                        {siteConfig.services.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name} Families
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="msgSubject">Subject</Label>
                    <Input
                      id="msgSubject"
                      value={msgSubject}
                      onChange={(e) => setMsgSubject(e.target.value)}
                      placeholder="Message subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="msgBody">Message</Label>
                    <Textarea
                      id="msgBody"
                      value={msgBody}
                      onChange={(e) => setMsgBody(e.target.value)}
                      placeholder="Write your message here..."
                      rows={6}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={isSending || !msgSubject || !msgBody}
                    className="w-full"
                  >
                    {isSending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Message History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  {messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                      No messages sent yet
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-3 rounded-lg bg-muted/50 border border-border"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium text-foreground">
                              {msg.subject}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(msg.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {msg.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
