import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, FileText, Share2, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HealthRecord {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

interface HealthRecordsSectionProps {
  records?: HealthRecord[];
  onUpload?: (file: File) => void;
  onShare?: (recordId: string) => void;
}

const defaultRecords: HealthRecord[] = [
  {
    id: "1",
    name: "Blood Test Results.pdf",
    date: "2024-01-15",
    type: "Lab Report",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Vaccination Record.pdf",
    date: "2024-01-10",
    type: "Immunization",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Annual Checkup.pdf",
    date: "2023-12-20",
    type: "Medical Report",
    size: "3.2 MB",
  },
];

const HealthRecordsSection: React.FC<HealthRecordsSectionProps> = ({
  records = defaultRecords,
  onUpload = () => {},
  onShare = () => {},
}) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = React.useState(false);

  return (
    <Card className="w-full bg-white shadow-lg animate-fade-in">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-xl font-semibold text-black">
          Health Records
        </CardTitle>
        <div className="flex w-full sm:w-auto gap-2">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none text-[#007AFF]"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Dialog
            open={isUploadDialogOpen}
            onOpenChange={setIsUploadDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none bg-[#007AFF] hover:bg-[#007AFF]/90 transition-colors duration-300">
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Health Record</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Input
                    id="file"
                    type="file"
                    className="cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onUpload(file);
                    }}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 gap-3 sm:gap-4"
              >
                <div className="flex items-start space-x-3 min-w-0">
                  <div className="rounded-lg bg-[#007AFF]/10 p-2">
                    <FileText className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {record.name}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      <p className="text-xs text-gray-500">{record.date}</p>
                      <p className="text-xs text-gray-500">{record.type}</p>
                      <p className="text-xs text-gray-500">{record.size}</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onShare(record.id)}
                  className="hover:text-[#007AFF] transition-colors duration-300"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HealthRecordsSection;
