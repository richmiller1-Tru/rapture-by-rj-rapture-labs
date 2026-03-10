import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChroniclesPost } from "@shared/schema";
import { PostCard } from "@/components/chronicles/PostCard";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertChroniclesPostSchema } from "@shared/schema";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Plus, Filter } from "lucide-react";

const CATEGORIES = [
  "Fan Art", "Gameplay Clip", "Theory / Lore", "Strategy Guide",
  "Character Edit", "Bible Reflection", "Battle Reaction", "Animation",
  "Music Inspired by Chronicles",
];

const HEROES = ["David", "Samson", "Joshua", "Gideon", "Elijah", "Holy Spirit"];
const BATTLES = ["David vs Goliath", "Fall of Jericho", "Crossing the Red Sea", "Elijah vs Prophets of Baal", "Samson and the Philistines", "Gideon's 300"];

const FILTERS = [
  { id: "latest", label: "Latest" },
  { id: "trending", label: "Trending" },
  { id: "featured", label: "Featured" },
];
const CATEGORY_FILTERS = [
  { id: "", label: "All" },
  { id: "Fan Art", label: "Fan Art" },
  { id: "Gameplay Clip", label: "Gameplay" },
  { id: "Strategy Guide", label: "Strategy" },
  { id: "Theory / Lore", label: "Lore" },
  { id: "Bible Reflection", label: "Reflections" },
];

const postFormSchema = insertChroniclesPostSchema.extend({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
});

type PostFormData = z.infer<typeof postFormSchema>;

export function CommunityTab() {
  const [filter, setFilter] = useState("latest");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts", { filter, category: categoryFilter }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filter) params.set("filter", filter);
      if (categoryFilter) params.set("category", categoryFilter);
      const res = await fetch(`/api/chronicles/posts?${params}`);
      return res.json();
    },
  });

  const form = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      authorName: "Community Member",
      tags: [],
      moderationStatus: "approved",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: PostFormData) => apiRequest("POST", "/api/chronicles/posts", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chronicles/posts"] });
      toast({ title: "Post created!", description: "Your Chronicles post is live in the community." });
      setShowCreate(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create post. Please try again.", variant: "destructive" });
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <SectionHeader
          title="Chronicles Community"
          subtitle="Fan art, gameplay clips, strategies, and faith reflections from the community."
          badge="Community Feed"
        />
        <Button
          onClick={() => setShowCreate(true)}
          className="font-bold bg-gradient-to-r from-purple-600 to-purple-500 border-0 flex-shrink-0"
          data-testid="create-post-button"
        >
          <Plus className="w-4 h-4 mr-2" /> Create Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10 flex-shrink-0">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${filter === f.id ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-white"}`}
              data-testid={`filter-${f.id}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10 flex-shrink-0">
          {CATEGORY_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setCategoryFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${categoryFilter === f.id ? "bg-blue-600 text-white" : "text-muted-foreground hover:text-white"}`}
              data-testid={`category-filter-${f.label.toLowerCase()}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
      ) : !posts || posts.length === 0 ? (
        <EmptyState
          icon="📝"
          title="No posts yet"
          description="Be the first to share your Chronicles content with the community."
          action={
            <Button onClick={() => setShowCreate(true)} className="font-bold bg-purple-600">
              <Plus className="w-4 h-4 mr-2" /> Create First Post
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}

      {/* Create Post Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg bg-card border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white font-black text-xl">Share Your Chronicles Content</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(data => createMutation.mutate(data))} className="space-y-4">
              <FormField control={form.control} name="authorName" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your name or handle" className="bg-white/5 border-white/10 text-white" data-testid="post-author-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Post Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Give your post a powerful title" className="bg-white/5 border-white/10 text-white" data-testid="post-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white" data-testid="post-category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Share your story, thoughts, or description..." rows={4} className="bg-white/5 border-white/10 text-white resize-none" data-testid="post-content" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="heroTag" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Hero Tag (optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Tag a hero" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {HEROES.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />

                <FormField control={form.control} name="battleTag" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Battle Tag (optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Tag a battle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {BATTLES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="mediaUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Image/Media URL (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="https://..." className="bg-white/5 border-white/10 text-white" data-testid="post-media-url" />
                  </FormControl>
                </FormItem>
              )} />

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1 border-white/10" onClick={() => setShowCreate(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 font-bold bg-purple-600 hover:bg-purple-500" disabled={createMutation.isPending} data-testid="post-submit">
                  {createMutation.isPending ? "Posting..." : "Post to Community"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
