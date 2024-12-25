import React, { useEffect, useState } from "react";
import MedicationSection from "./dashboard/MedicationSection";
import HealthRecordsSection from "./dashboard/HealthRecordsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pill,
  FileText,
  Users,
  User,
  Settings,
  LogOut,
  Bell,
  Building2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditProfileDialog from "./profile/EditProfileDialog";
import SettingsDialog from "./settings/SettingsDialog";
import { getTheme, setTheme } from "@/lib/theme";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  activeTab?: string;
}

const Home = ({ activeTab = "medications" }: HomeProps) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState(activeTab);
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = React.useState({
    name: "Sarah",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  });

  useEffect(() => {
    setTheme(getTheme());

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleProfileUpdate = (newData: { name: string; email: string }) => {
    setUserData({ ...userData, ...newData });
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleTabChange = (value: string) => {
    switch (value) {
      case "community":
        navigate("/community");
        break;
      case "hospitals":
        navigate("/hospitals");
        break;
      default:
        setCurrentTab(value);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-16 sm:pb-0">
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            {!scrolled ? (
              <>
                <div className="bg-black rounded-lg p-1.5 md:p-2">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 4v16M4 12h16" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl md:text-2xl font-bold">
                    MedTrack<span className="text-[#007AFF]">.</span>
                  </h1>
                </div>
              </>
            ) : (
              <h1 className="text-xl font-bold">
                {currentTab === "medications" ? "Medications" : "Records"}
              </h1>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <Button
              variant="ghost"
              className="p-0 hover:bg-transparent"
              onClick={() => setIsProfileOpen(true)}
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </div>

          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Profile</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={userData.avatar} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{userData.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {userData.email}
                  </p>
                </div>
                <div className="w-full space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsEditProfileOpen(true);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsSettingsOpen(true);
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <EditProfileDialog
        open={isEditProfileOpen}
        onOpenChange={setIsEditProfileOpen}
        currentUser={userData}
        onSave={handleProfileUpdate}
      />

      <SettingsDialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen} />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 pb-6">
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="mt-4">
            <TabsContent
              value="medications"
              className="space-y-4 md:space-y-6 m-0"
            >
              <MedicationSection />
            </TabsContent>

            <TabsContent value="records" className="space-y-4 md:space-y-6 m-0">
              <HealthRecordsSection />
            </TabsContent>
          </div>
        </Tabs>

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border sm:hidden">
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsList className="w-full h-16 grid grid-cols-4 gap-1 p-2 bg-transparent">
              <TabsTrigger
                value="medications"
                className="flex flex-col items-center justify-center space-y-1 h-full data-[state=active]:bg-[#007AFF]/10 rounded-lg"
              >
                <Pill className="w-5 h-5 data-[state=active]:text-[#007AFF]" />
                <span className="text-xs font-medium">Meds</span>
              </TabsTrigger>
              <TabsTrigger
                value="records"
                className="flex flex-col items-center justify-center space-y-1 h-full data-[state=active]:bg-[#007AFF]/10 rounded-lg"
              >
                <FileText className="w-5 h-5 data-[state=active]:text-[#007AFF]" />
                <span className="text-xs font-medium">Records</span>
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="flex flex-col items-center justify-center space-y-1 h-full data-[state=active]:bg-[#007AFF]/10 rounded-lg"
              >
                <Users className="w-5 h-5 data-[state=active]:text-[#007AFF]" />
                <span className="text-xs font-medium">Community</span>
              </TabsTrigger>
              <TabsTrigger
                value="hospitals"
                className="flex flex-col items-center justify-center space-y-1 h-full data-[state=active]:bg-[#007AFF]/10 rounded-lg"
              >
                <Building2 className="w-5 h-5 data-[state=active]:text-[#007AFF]" />
                <span className="text-xs font-medium">Hospitals</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Home;
