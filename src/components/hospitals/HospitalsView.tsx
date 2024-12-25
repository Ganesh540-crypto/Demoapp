import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Search,
  ArrowLeft,
  Phone,
  Globe,
  Clock,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Hospital {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  specialties: string[];
  phone: string;
  website: string;
  hours: string;
  treatments: string[];
}

const mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "City General Hospital",
    address: "123 Healthcare Ave",
    distance: 2.5,
    rating: 4.5,
    specialties: ["Emergency Care", "Surgery", "Pediatrics"],
    phone: "+1 (555) 123-4567",
    website: "www.citygeneralhospital.com",
    hours: "24/7",
    treatments: ["General Surgery", "Emergency Care", "Pediatric Care"],
  },
  {
    id: "2",
    name: "Memorial Medical Center",
    address: "456 Medical Blvd",
    distance: 3.8,
    rating: 4.2,
    specialties: ["Cardiology", "Oncology"],
    phone: "+1 (555) 987-6543",
    website: "www.memorialmed.com",
    hours: "24/7",
    treatments: ["Cardiac Surgery", "Cancer Treatment", "Rehabilitation"],
  },
];

const treatmentOptions = [
  "All Treatments",
  "General Surgery",
  "Emergency Care",
  "Pediatric Care",
  "Cardiac Surgery",
  "Cancer Treatment",
  "Rehabilitation",
];

const HospitalsView = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [range, setRange] = React.useState([10]);
  const [selectedTreatment, setSelectedTreatment] =
    React.useState("All Treatments");
  const [hospitals] = React.useState(mockHospitals);
  const [selectedHospital, setSelectedHospital] =
    React.useState<Hospital | null>(null);

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRange = hospital.distance <= range[0];
    const matchesTreatment =
      selectedTreatment === "All Treatments" ||
      hospital.treatments.includes(selectedTreatment);
    return matchesSearch && matchesRange && matchesTreatment;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Nearby Hospitals</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hospitals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Treatment Type</Label>
                  <Select
                    value={selectedTreatment}
                    onValueChange={setSelectedTreatment}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      {treatmentOptions.map((treatment) => (
                        <SelectItem key={treatment} value={treatment}>
                          {treatment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Distance ({range}km)</Label>
                  <Slider
                    defaultValue={[10]}
                    max={50}
                    step={1}
                    value={range}
                    onValueChange={setRange}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4">
            {filteredHospitals.map((hospital) => (
              <Card
                key={hospital.id}
                className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedHospital(hospital)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {hospital.address}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hospital.distance} km away
                    </div>
                  </div>
                  <Badge variant="secondary" className="mt-1">
                    {hospital.treatments.length} Treatments
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Dialog
        open={!!selectedHospital}
        onOpenChange={() => setSelectedHospital(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedHospital?.name}</DialogTitle>
          </DialogHeader>
          {selectedHospital && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {selectedHospital.address}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2" />
                    {selectedHospital.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2" />
                    {selectedHospital.website}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    {selectedHospital.hours}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Available Treatments</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedHospital.treatments.map((treatment) => (
                      <Badge key={treatment} variant="secondary">
                        {treatment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Card className="h-[300px] bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Map view coming soon</p>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalsView;
