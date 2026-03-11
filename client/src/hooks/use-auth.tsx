import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type User = { id: string; username: string };

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  loginMutation: ReturnType<typeof useMutation>;
  registerMutation: ReturnType<typeof useMutation>;
  logoutMutation: ReturnType<typeof useMutation>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      const res = await fetch("/api/user", { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: Infinity,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", data);
      return res.json();
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData(["/api/user"], data);
      toast({ title: "Welcome back!", description: `Signed in as ${data.username}` });
    },
    onError: (err: Error) => {
      toast({ title: "Login failed", description: err.message.replace(/^\d+:\s*/, ""), variant: "destructive" });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/register", data);
      return res.json();
    },
    onSuccess: (data: User) => {
      queryClient.setQueryData(["/api/user"], data);
      toast({ title: "Account created!", description: `Welcome to Rapture, ${data.username}` });
    },
    onError: (err: Error) => {
      toast({ title: "Registration failed", description: err.message.replace(/^\d+:\s*/, ""), variant: "destructive" });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({ title: "Signed out" });
    },
  });

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, loginMutation, registerMutation, logoutMutation }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
