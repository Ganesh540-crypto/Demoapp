import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Link } from "lucide-react";
import { cn } from "@/lib/utils";

interface Medication {
  id: string;
  drugName: string;
  dosage: string;
  time: string;
  taken?: boolean;
}

interface MedicationSectionProps {
  medications?: Medication[];
}

const defaultMedications: Medication[] = [
  {
    id: "1",
    drugName: "Aspirin",
    dosage: "100mg",
    time: "08:00",
    taken: true,
  },
  {
    id: "2",
    drugName: "Vitamin D",
    dosage: "1000IU",
    time: "09:30",
  },
  {
    id: "3",
    drugName: "Omega-3",
    dosage: "1000mg",
    time: "13:00",
  },
];

const MedicationSection = ({
  medications: initialMedications = defaultMedications,
}: MedicationSectionProps) => {
  const [medications] = React.useState<Medication[]>(initialMedications);
  const totalMeds = medications.length;
  const takenMeds = medications.filter((med) => med.taken).length;
  const nextMed = medications.find((med) => !med.taken);
  const nextDoseTime = nextMed ? nextMed.time : null;
  const [hours, minutes] = nextDoseTime ? nextDoseTime.split(":") : [];
  const nextDoseIn = nextDoseTime ? `${hours}h ${minutes}m` : "No doses left";

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">
            Welcome back,
            <br />
            Sarah
          </h2>
          <p className="text-blue-100">
            You have {medications.filter((m) => !m.taken).length} medications
            scheduled for today
          </p>
          <Button
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 w-full justify-between group"
          >
            Add New Medication
            <Plus className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </Button>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <p className="text-sm text-muted-foreground">Total Medications</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{totalMeds}</span>
            <span className="text-sm text-green-500">+1 this week</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <p className="text-sm text-muted-foreground">Adherence Rate</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">
              {Math.round((takenMeds / totalMeds) * 100)}%
            </span>
            <span className="text-sm text-green-500">+5% from last week</span>
          </div>
        </Card>

        <Card className="p-4 space-y-1">
          <p className="text-sm text-muted-foreground">Next Dose</p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{nextDoseIn}</span>
            <span className="text-sm text-muted-foreground">
              {nextMed?.drugName}
            </span>
          </div>
        </Card>
      </div>

      {/* Today's Schedule */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Today's Schedule</h3>
        <div className="space-y-3">
          {medications.map((med) => (
            <Card key={med.id} className={cn("p-4", med.taken && "bg-muted")}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Link className="w-4 h-4 text-blue-500" />
                    <p className="font-medium">{med.drugName}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{med.dosage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-500">
                    {med.time}
                  </p>
                  {med.taken ? (
                    <p className="text-sm text-green-500">✓ Taken</p>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-sm text-muted-foreground hover:text-blue-500"
                    >
                      Mark as Taken
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicationSection;
