import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ValidationErrorProps {
  message?: string;
  show?: boolean;
}

export function ValidationError({ message, show = true }: ValidationErrorProps) {
  if (!show || !message) {
    return null;
  }

  return (
    <Alert variant="destructive" className="mt-3 border-destructive/50 bg-destructive/5">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="ml-2">
        {message}
      </AlertDescription>
    </Alert>
  );
}
