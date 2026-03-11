import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Sparkles, ArrowLeft, Shield, Users, Trophy, Swords } from "lucide-react";
import { Link } from "wouter";

const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine(d => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;

const highlights = [
  { icon: Swords, text: "10 Epic Scripture Battles" },
  { icon: Shield, text: "6 Playable Biblical Heroes" },
  { icon: Users, text: "Growing Creator Community" },
  { icon: Trophy, text: "Challenges & Exclusive Rewards" },
];

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { user, isLoading, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });

  useEffect(() => {
    if (user && !isLoading) navigate("/");
  }, [user, isLoading, navigate]);

  const handleLogin = (data: LoginData) => {
    loginMutation.mutate(data, { onSuccess: () => navigate("/") });
  };

  const handleRegister = (data: RegisterData) => {
    registerMutation.mutate({ username: data.username, password: data.password }, { onSuccess: () => navigate("/") });
  };

  if (isLoading) return null;
  if (user) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex flex-col justify-center flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 80% at 30% 50%, rgba(124,58,237,0.25) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-amber-400/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-48 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 px-12 max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-sm font-black">R</div>
            <span className="font-black text-white text-xl tracking-tight">RAPTURE</span>
          </div>

          <h1 className="text-4xl font-black text-white leading-tight mb-4">
            Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Chronicles Reborn</span> Community
          </h1>
          <p className="text-white/60 text-base leading-relaxed mb-8">
            Create an account to post content, join challenges, earn rewards, and become a founding member of the Chronicles universe.
          </p>

          <div className="space-y-3">
            {highlights.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-sm text-white/80 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-md mx-auto w-full lg:max-w-lg">
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-black">R</div>
          <span className="font-black text-white tracking-tight">RAPTURE</span>
        </div>

        <div className="w-full">
          <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/10 mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 text-sm font-bold rounded transition-all ${mode === "login" ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-white"}`}
              data-testid="auth-tab-login"
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 text-sm font-bold rounded transition-all ${mode === "register" ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-white"}`}
              data-testid="auth-tab-register"
            >
              Create Account
            </button>
          </div>

          {mode === "login" ? (
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Welcome Back</h2>
              <p className="text-sm text-muted-foreground mb-6">Sign in to your Rapture account</p>

              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <FormField control={loginForm.control} name="username" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your username" className="bg-white/5 border-white/10 text-white h-11" data-testid="login-username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={loginForm.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Your password" className="bg-white/5 border-white/10 text-white h-11" data-testid="login-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    className="w-full font-bold bg-gradient-to-r from-purple-600 to-purple-500 border-0 h-11 text-base"
                    disabled={loginMutation.isPending}
                    data-testid="login-submit"
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Become a Founding Member</h2>
              <p className="text-sm text-muted-foreground mb-6">Create your Rapture account and join the Chronicles community</p>

              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  <FormField control={registerForm.control} name="username" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Username</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Choose a username" className="bg-white/5 border-white/10 text-white h-11" data-testid="register-username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={registerForm.control} name="password" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="At least 6 characters" className="bg-white/5 border-white/10 text-white h-11" data-testid="register-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={registerForm.control} name="confirmPassword" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Confirm Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" placeholder="Confirm your password" className="bg-white/5 border-white/10 text-white h-11" data-testid="register-confirm-password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button
                    type="submit"
                    className="w-full font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 h-11 text-base"
                    disabled={registerMutation.isPending}
                    data-testid="register-submit"
                  >
                    {registerMutation.isPending ? "Creating account..." : "Create Account"}
                  </Button>

                  <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-300 leading-relaxed">
                      Founding members get early access to exclusive rewards and permanent recognition in the Chronicles community.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/">
              <button className="text-xs text-muted-foreground hover:text-white transition-colors flex items-center gap-1 mx-auto" data-testid="auth-back-home">
                <ArrowLeft className="w-3 h-3" /> Back to Rapture
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
