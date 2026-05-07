import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="mt-3 border-destructive/50 bg-destructive/5">
      <CardContent className="flex items-center gap-2 p-3">
        <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
        <span className="text-sm text-destructive">{message}</span>
      </CardContent>
    </Card>
  );
}
