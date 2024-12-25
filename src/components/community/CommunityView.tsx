import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Home,
  PlusSquare,
  Compass,
  Bell,
  AlertTriangle,
  ArrowLeft,
  X,
  ImageIcon,
  VideoIcon,
  FileIcon,
} from "lucide-react";
import ContentCard from "../dashboard/ContentCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const categories = [
  "Heart Health",
  "Diabetes",
  "Mental Health",
  "Nutrition",
  "Exercise",
  "General Health",
];

const CommunityView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("feed");
  const [isPostDialogOpen, setIsPostDialogOpen] = React.useState(false);
  const [newPost, setNewPost] = React.useState({
    title: "",
    content: "",
    category: "",
    isHealthProfessional: false,
    media: [] as File[],
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const postingGuidelines = [
    "Only share factual, evidence-based health information",
    "Do not provide medical diagnosis or treatment advice",
    "Respect privacy and confidentiality",
    "Be supportive and constructive in discussions",
    "Cite reliable sources when sharing health information",
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewPost((prev) => ({
      ...prev,
      media: [...prev.media, ...files],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Community</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pb-24">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="feed" className="space-y-4">
            <ContentCard />
            <ContentCard />
          </TabsContent>

          <TabsContent value="explore" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Trending Topics</h3>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Community Guidelines</h3>
              <div className="space-y-4">
                {postingGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{guideline}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
            <div className="max-w-2xl mx-auto px-4">
              <TabsList className="grid w-full grid-cols-5 h-16 bg-transparent">
                <TabsTrigger
                  value="feed"
                  className="flex flex-col items-center py-2 gap-1"
                >
                  <Home className="h-5 w-5" />
                  <span className="text-xs">Feed</span>
                </TabsTrigger>
                <TabsTrigger
                  value="explore"
                  className="flex flex-col items-center py-2 gap-1"
                >
                  <Compass className="h-5 w-5" />
                  <span className="text-xs">Explore</span>
                </TabsTrigger>
                <Dialog
                  open={isPostDialogOpen}
                  onOpenChange={setIsPostDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button className="flex flex-col items-center py-2 gap-1 w-full">
                      <PlusSquare className="h-5 w-5" />
                      <span className="text-xs">Post</span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-[95%] sm:w-full max-w-[500px] h-[90vh] sm:h-auto overflow-hidden">
                    <DialogHeader className="flex flex-row items-center justify-between">
                      <DialogTitle>Create Post</DialogTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setIsPostDialogOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto px-1 py-4 space-y-4">
                      <Alert variant="warning">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          Please review our posting guidelines before sharing
                          health-related content.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={newPost.title}
                          onChange={(e) =>
                            setNewPost({ ...newPost, title: e.target.value })
                          }
                          placeholder="Enter post title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newPost.category}
                          onValueChange={(value) =>
                            setNewPost({ ...newPost, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          value={newPost.content}
                          onChange={(e) =>
                            setNewPost({ ...newPost, content: e.target.value })
                          }
                          placeholder="Share your health insights or questions..."
                          rows={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Media</Label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          multiple
                          accept="image/*,video/*"
                          onChange={handleFileSelect}
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <ImageIcon className="h-5 w-5" />
                            <span className="text-xs">Image</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <VideoIcon className="h-5 w-5" />
                            <span className="text-xs">Video</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <FileIcon className="h-5 w-5" />
                            <span className="text-xs">Document</span>
                          </Button>
                        </div>
                        {newPost.media.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              {newPost.media.length} file(s) selected
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 border-t mt-4">
                      <Button
                        className="w-full"
                        disabled={
                          !newPost.title ||
                          !newPost.content ||
                          !newPost.category
                        }
                      >
                        Post
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <TabsTrigger
                  value="notifications"
                  className="flex flex-col items-center py-2 gap-1"
                >
                  <Bell className="h-5 w-5" />
                  <span className="text-xs">Activity</span>
                </TabsTrigger>
                <TabsTrigger
                  value="saved"
                  className="flex flex-col items-center py-2 gap-1"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-xs">Guidelines</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityView;
