import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  gradient: string;
}

export const StatsCard = ({ title, value, icon, gradient }: StatsCardProps) => {
  return (
    <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn("p-3 rounded-xl bg-gradient-to-br text-white", gradient)}>
          {icon}
        </div>
      </div>
    </Card>
  );
};
