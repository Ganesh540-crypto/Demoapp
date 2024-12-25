import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Pill } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface MedicationInventory {
  name: string;
  currentCount: number;
  totalCount: number;
  lowStockThreshold: number;
}

interface InventoryTrackerProps {
  medications?: MedicationInventory[];
}

const defaultMedications: MedicationInventory[] = [
  {
    name: "Aspirin",
    currentCount: 15,
    totalCount: 30,
    lowStockThreshold: 10,
  },
  {
    name: "Lisinopril",
    currentCount: 5,
    totalCount: 30,
    lowStockThreshold: 7,
  },
  {
    name: "Metformin",
    currentCount: 20,
    totalCount: 30,
    lowStockThreshold: 8,
  },
];

const InventoryTracker: React.FC<InventoryTrackerProps> = ({
  medications = defaultMedications,
}) => {
  return (
    <Card className="w-full md:w-[300px] h-auto min-h-[200px] max-h-[400px] bg-white shadow-lg animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-black">
            Medication Inventory
          </CardTitle>
          <Badge
            variant="outline"
            className="bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20"
          >
            {
              medications.filter(
                (med) => med.currentCount <= med.lowStockThreshold,
              ).length
            }{" "}
            Low
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-6">
            {medications.map((med, index) => {
              const percentage = (med.currentCount / med.totalCount) * 100;
              const isLowStock = med.currentCount <= med.lowStockThreshold;
              const isVeryLow = med.currentCount <= med.lowStockThreshold / 2;

              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-lg p-4 space-y-3 transition-all duration-300",
                    isLowStock ? "bg-red-50" : "bg-gray-50",
                    "transform hover:scale-[1.02] cursor-pointer",
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Pill
                        className={cn(
                          "w-4 h-4",
                          isLowStock ? "text-red-500" : "text-[#007AFF]",
                          isVeryLow && "animate-pulse",
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isLowStock ? "text-red-700" : "text-gray-700",
                        )}
                      >
                        {med.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={cn(
                          "text-sm",
                          isLowStock ? "text-red-600" : "text-gray-500",
                        )}
                      >
                        {med.currentCount}/{med.totalCount}
                      </span>
                      {isLowStock && (
                        <AlertCircle
                          className={cn(
                            "w-4 h-4 text-red-500",
                            isVeryLow && "animate-pulse",
                          )}
                        />
                      )}
                    </div>
                  </div>

                  <Progress
                    value={percentage}
                    className={cn(
                      "h-2 transition-all duration-300",
                      isLowStock
                        ? isVeryLow
                          ? "bg-red-200 [&>div]:bg-red-600"
                          : "bg-red-100 [&>div]:bg-red-500"
                        : "bg-blue-100 [&>div]:bg-[#007AFF]",
                    )}
                  />

                  {isLowStock && (
                    <div
                      className={cn(
                        "text-xs font-medium",
                        isVeryLow ? "text-red-600" : "text-red-500",
                      )}
                    >
                      {isVeryLow
                        ? "Critical: Immediate refill required"
                        : "Low stock: Please refill soon"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default InventoryTracker;
