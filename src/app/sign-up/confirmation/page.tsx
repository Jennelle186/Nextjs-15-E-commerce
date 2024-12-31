import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";

const EmailConfirmation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight text-center">
            Check Your Email
          </CardTitle>
          <CardDescription className="text-center text-base">
            We&apos;ve sent you a confirmation link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4 animate-pulse">
              <Mail className="h-12 w-12 text-primary" />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            We&apos;ve sent a confirmation link to your email address. Please
            check your inbox and click on the link to complete your sign-up
            process.
          </p>
          <div className="space-y-2">
            <p className="text-xs text-center text-muted-foreground">
              Didn&apos;t receive an email? Check your spam folder.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailConfirmation;
