import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Check, CheckCircle2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface MedicationCardProps {
  drugName?: string;
  dosage?: string;
  time?: string;
  onTake?: () => void;
  showConfirmDialog?: boolean;
  taken?: boolean;
}

const MedicationCard = ({
  drugName = "Aspirin",
  dosage = "100mg",
  time = "8:00 AM",
  onTake = () => {},
  showConfirmDialog = true,
  taken = false,
}: MedicationCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleTake = () => {
    if (showConfirmDialog) {
      setIsDialogOpen(true);
    } else {
      onTake();
    }
  };

  const handleConfirm = () => {
    onTake();
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card
        className={cn(
          "w-full md:w-[300px] h-[180px] bg-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-in",
          taken && "bg-gray-50 border-green-200",
        )}
      >
        <CardHeader className="pb-2">
          <h3 className="text-xl font-semibold text-blue-600">{drugName}</h3>
          <p className="text-gray-600">{dosage}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>{time}</span>
          </div>
        </CardContent>
        <CardFooter>
          {taken ? (
            <Button
              disabled
              className="w-full bg-green-100 hover:bg-green-100 text-green-700 cursor-default"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Taken
            </Button>
          ) : (
            <Button
              onClick={handleTake}
              className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300"
            >
              <Check className="w-4 h-4 mr-2" />
              Take Medication
            </Button>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Medication</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to mark {drugName} ({dosage}) as taken?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MedicationCard;
