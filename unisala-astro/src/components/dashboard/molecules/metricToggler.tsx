import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MetricTogglerProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const MetricToggler = ({ isCollapsed, onToggle }: MetricTogglerProps) => (
  <Button
    onClick={onToggle}
    variant="outline"
    size="sm"
    className="w-full justify-between"
  >
    <span>Metrics</span>
    {isCollapsed ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronUp className="h-4 w-4" />
    )}
  </Button>
);