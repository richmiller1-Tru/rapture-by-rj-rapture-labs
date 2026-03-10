import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChroniclesChallenge } from "@shared/schema";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { ChallengeCard } from "@/components/chronicles/ChallengeCard";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Trophy, Clock, CheckCircle } from "lucide-react";

const submissionSchema = z.object({
  authorName: z.string().min(1, "Name required"),
  title: z.string().min(3, "Title required"),
  content: z.string().min(10, "Please write at least 10 characters"),
  mediaUrl: z.string().optional(),
});

type SubmissionData = z.infer<typeof submissionSchema>;

export function ChallengesTab() {
  const [selectedChallenge, setSelectedChallenge] = useState<ChroniclesChallenge | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: activeChallenges, isLoading: activeLoading } = useQuery<ChroniclesChallenge[]>({
    queryKey: ["/api/chronicles/challenges", { status: "active" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/challenges?status=active");
      return res.json();
    },
  });

  const { data: upcomingChallenges } = useQuery<ChroniclesChallenge[]>({
    queryKey: ["/api/chronicles/challenges", { status: "upcoming" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/challenges?status=upcoming");
      return res.json();
    },
  });

  const { data: closedChallenges } = useQuery<ChroniclesChallenge[]>({
    queryKey: ["/api/chronicles/challenges", { status: "closed" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/challenges?status=closed");
      return res.json();
    },
  });

  const form = useForm<SubmissionData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: { authorName: "", title: "", content: "", mediaUrl: "" },
  });

  const submitMutation = useMutation({
    mutationFn: (data: SubmissionData) =>
      apiRequest("POST", `/api/chronicles/challenges/${selectedChallenge?.id}/submit`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chronicles/challenges"] });
      setSubmitted(true);
      toast({ title: "Submitted!", description: "Your entry has been submitted. Good luck!" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit. Please try again.", variant: "destructive" });
    },
  });

  const handleDialogClose = () => {
    setSelectedChallenge(null);
    setSubmitted(false);
    form.reset();
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <SectionHeader
        title="Chronicles Challenges"
        subtitle="Weekly challenges to inspire the best Chronicles content. Submit your entry to win exclusive rewards."
        badge="Events & Challenges"
      />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Clock, label: "Active Now", value: activeChallenges?.length || 0, color: "#22c55e" },
          { icon: Trophy, label: "Upcoming", value: upcomingChallenges?.length || 0, color: "#f59e0b" },
          { icon: CheckCircle, label: "Closed", value: closedChallenges?.length || 0, color: "#6b7280" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-card p-4 text-center">
            <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
            <div className="text-2xl font-black text-white">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      {/* Active Challenges */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </div>
          <h3 className="text-lg font-black text-white">Active Challenges</h3>
        </div>
        {activeLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
          </div>
        ) : !activeChallenges || activeChallenges.length === 0 ? (
          <EmptyState icon="⚔️" title="No active challenges" description="Check back soon for new challenges." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeChallenges.map(ch => (
              <ChallengeCard key={ch.id} challenge={ch} onSubmit={setSelectedChallenge} />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Challenges */}
      {upcomingChallenges && upcomingChallenges.length > 0 && (
        <div>
          <h3 className="text-lg font-black text-white mb-5">Upcoming Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingChallenges.map(ch => (
              <ChallengeCard key={ch.id} challenge={ch} />
            ))}
          </div>
        </div>
      )}

      {/* Submit Dialog */}
      <Dialog open={!!selectedChallenge} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-lg bg-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white font-black">
              {submitted ? "Entry Submitted!" : `Submit: ${selectedChallenge?.title}`}
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-black text-white mb-2">You're In!</h3>
              <p className="text-muted-foreground mb-6">Your entry has been submitted to the challenge. Winners are announced when the challenge closes.</p>
              <div className="p-4 rounded-lg bg-amber-400/10 border border-amber-400/20 mb-6">
                <Trophy className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                <p className="text-sm text-amber-300 font-medium">{selectedChallenge?.rewardText}</p>
              </div>
              <Button onClick={handleDialogClose} className="w-full font-bold bg-purple-600">Close</Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(data => submitMutation.mutate(data))} className="space-y-4">
                {selectedChallenge?.rewardText && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-400/10 border border-amber-400/20">
                    <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <p className="text-xs text-amber-300">{selectedChallenge.rewardText}</p>
                  </div>
                )}

                <FormField control={form.control} name="authorName" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Your Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Display name or handle" className="bg-white/5 border-white/10 text-white" data-testid="submission-author" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Entry Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title your submission" className="bg-white/5 border-white/10 text-white" data-testid="submission-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="content" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Description / Content</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Describe your entry..." rows={4} className="bg-white/5 border-white/10 text-white resize-none" data-testid="submission-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="mediaUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">Media URL (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} placeholder="Link to image, video, or content" className="bg-white/5 border-white/10 text-white" data-testid="submission-media" />
                    </FormControl>
                  </FormItem>
                )} />

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1 border-white/10" onClick={handleDialogClose}>Cancel</Button>
                  <Button type="submit" className="flex-1 font-bold bg-green-600 hover:bg-green-500" disabled={submitMutation.isPending} data-testid="submit-entry-button">
                    {submitMutation.isPending ? "Submitting..." : "Submit Entry"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
