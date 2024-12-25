import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Shield,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ContentCardProps {
  title?: string;
  author?: {
    name: string;
    avatar: string;
  };
  content?: string;
  isVerified?: boolean;
  likes?: number;
  comments?: number;
  category?: string;
  timestamp?: string;
}

const ContentCard = ({
  title = "Understanding Blood Pressure Readings",
  author = {
    name: "Dr. Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor",
  },
  content = "Learn about what your blood pressure numbers mean and what levels you should aim for to maintain good heart health.",
  isVerified = true,
  likes: initialLikes = 245,
  comments: initialComments = 42,
  category = "Heart Health",
  timestamp = "2 hours ago",
}: ContentCardProps) => {
  const [likes, setLikes] = React.useState(initialLikes);
  const [comments, setComments] = React.useState(initialComments);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = React.useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      setComments(comments + 1);
      setCommentText("");
      setIsCommentDialogOpen(false);
    }
  };

  return (
    <Card className="w-full bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="bg-[#007AFF]/10 text-[#007AFF] border-[#007AFF]/20"
          >
            {category}
          </Badge>
          {isVerified ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Shield className="w-5 h-5 text-[#007AFF]" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Verified Medical Content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Community Content - Not Medically Verified</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <CardTitle className="text-lg font-semibold text-black line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <Avatar className="w-6 h-6">
            <img src={author.avatar} alt={author.name} />
          </Avatar>
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium truncate">{author.name}</span>
            <span className="mx-1.5">•</span>
            <span className="text-gray-400">{timestamp}</span>
          </div>
        </div>
        <CardDescription className="line-clamp-2 text-gray-600">
          {content}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`flex-1 transition-colors duration-300 ${isLiked ? "text-[#007AFF]" : "text-gray-600 hover:text-[#007AFF]"}`}
        >
          <ThumbsUp className="w-4 h-4 mr-1.5" />
          {likes}
        </Button>

        <Dialog
          open={isCommentDialogOpen}
          onOpenChange={setIsCommentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-gray-600 hover:text-[#007AFF] transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              {comments}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Comment</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Textarea
                placeholder="Write your comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button onClick={handleComment} disabled={!commentText.trim()}>
                Post Comment
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-gray-600 hover:text-[#007AFF] transition-colors duration-300"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Post</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex justify-around">
                <Button
                  variant="outline"
                  className="w-full mx-2"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}`,
                      "_blank",
                    )
                  }
                >
                  Share on Twitter
                </Button>
                <Button
                  variant="outline"
                  className="w-full mx-2"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                      "_blank",
                    )
                  }
                >
                  Share on Facebook
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
