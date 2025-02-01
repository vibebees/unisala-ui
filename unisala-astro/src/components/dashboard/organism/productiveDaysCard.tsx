import { Card, CardContent } from "@/components/ui/card";
import { ProductiveDays } from "@/components/dashboard/weekly/productiveDays";

interface ProductiveDaysCardProps {
  dayCount: { [key: string]: number };
}

export const ProductiveDaysCard = ({ dayCount }: ProductiveDaysCardProps) => (
  <Card className="col-span-2">
    <CardContent className="pt-6">
      <ProductiveDays
        dayCount={dayCount}
        title="Weekly Notes Activity with Targets"
        lineColor="rgb(0, 239, 56)"
        fillColor="rgba(9, 200, 79, 0.2)"
        horizontalLines={[5, 3, 2]}
      />
    </CardContent>
  </Card>
);
