import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContentCard from "./ContentCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CommunityFeedProps {
  categories?: string[];
  posts?: Array<{
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isVerified: boolean;
    likes: number;
    comments: number;
    category: string;
    timestamp: string;
  }>;
}

const defaultCategories = [
  "All",
  "Heart Health",
  "Diabetes",
  "Mental Health",
  "Nutrition",
  "Exercise",
];

const defaultPosts = [
  {
    title: "Understanding Blood Pressure Readings",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor1",
    },
    content:
      "Learn about what your blood pressure numbers mean and what levels you should aim for to maintain good heart health.",
    isVerified: true,
    likes: 245,
    comments: 42,
    category: "Heart Health",
    timestamp: "2 hours ago",
  },
  {
    title: "Managing Type 2 Diabetes Through Diet",
    author: {
      name: "Dr. Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor2",
    },
    content:
      "Discover effective dietary strategies to help control blood sugar levels and manage type 2 diabetes.",
    isVerified: true,
    likes: 189,
    comments: 35,
    category: "Diabetes",
    timestamp: "4 hours ago",
  },
  {
    title: "My Journey with Meditation",
    author: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user1",
    },
    content:
      "Personal experience with incorporating meditation into daily routine for better mental health.",
    isVerified: false,
    likes: 156,
    comments: 28,
    category: "Mental Health",
    timestamp: "6 hours ago",
  },
];

const CommunityFeed: React.FC<CommunityFeedProps> = ({
  categories = defaultCategories,
  posts = defaultPosts,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedFilters, setSelectedFilters] = React.useState({
    verifiedOnly: false,
    mostRecent: true,
    mostPopular: false,
  });
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const filteredPosts = posts
    .filter((post) =>
      selectedCategory === "All" ? true : post.category === selectedCategory,
    )
    .filter((post) => !selectedFilters.verifiedOnly || post.isVerified)
    .sort((a, b) => {
      if (selectedFilters.mostRecent) {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
      if (selectedFilters.mostPopular) {
        return b.likes - a.likes;
      }
      return 0;
    });

  return (
    <Card className="w-full bg-card text-card-foreground">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Community Feed
          </CardTitle>

          <div className="flex items-center gap-2">
            {/* Filter Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={selectedFilters.verifiedOnly}
                        onCheckedChange={(checked) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            verifiedOnly: checked as boolean,
                          }))
                        }
                      />
                      <Label htmlFor="verified">Verified posts only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="recent"
                        checked={selectedFilters.mostRecent}
                        onCheckedChange={(checked) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            mostRecent: checked as boolean,
                            mostPopular: checked ? false : prev.mostPopular,
                          }))
                        }
                      />
                      <Label htmlFor="recent">Most recent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="popular"
                        checked={selectedFilters.mostPopular}
                        onCheckedChange={(checked) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            mostPopular: checked as boolean,
                            mostRecent: checked ? false : prev.mostRecent,
                          }))
                        }
                      />
                      <Label htmlFor="popular">Most popular</Label>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Mobile Category Selector */}
            <div className="sm:hidden">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[140px]">
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
          </div>
        </div>
      </CardHeader>

      <Tabs
        value={selectedCategory}
        className="w-full"
        onValueChange={setSelectedCategory}
      >
        {/* Desktop Categories */}
        <div className="hidden sm:flex px-4 mb-4 items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="p-2 hover:bg-muted rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <ScrollArea
            ref={scrollRef}
            className="w-full"
            orientation="horizontal"
          >
            <TabsList className="inline-flex h-auto p-1 bg-transparent w-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-2 whitespace-nowrap rounded-full data-[state=active]:bg-[#007AFF] data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          <button
            onClick={() => handleScroll("right")}
            className="p-2 hover:bg-muted rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map((post, index) => (
              <ContentCard
                key={index}
                title={post.title}
                author={post.author}
                content={post.content}
                isVerified={post.isVerified}
                likes={post.likes}
                comments={post.comments}
                category={post.category}
                timestamp={post.timestamp}
              />
            ))}
          </div>
        </div>
      </Tabs>
    </Card>
  );
};

export default CommunityFeed;
