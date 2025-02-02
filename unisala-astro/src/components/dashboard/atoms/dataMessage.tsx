import { cn } from "@/utils/lib/utils";

interface DataMessageProps {
  message?: string;
  className?: string;
}

export const DataMessage = ({ 
  message = "No data available", 
  className 
}: DataMessageProps) => (
  <p className={cn("text-muted-foreground text-sm", className)}>
    {message}
  </p>
);