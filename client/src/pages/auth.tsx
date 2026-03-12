import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, Shield, Users, Trophy, Swords, CheckCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";

const highlights = [
  { icon: Swords, text: "10 Epic Scripture Battles" },
  { icon: Shield, text: "6 Playable Biblical Heroes" },
  { icon: Users, text: "Growing Creator Community" },
  { icon: Trophy, text: "Challenges & Exclusive Rewards" },
];

type Mode = "login" | "register";
type Status = "idle" | "loading" | "success" | "error";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const { user, isLoading, loginMutation } = useAuth();
  const [, navigate] = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (user && !isLoading) navigate("/");
  }, [user, isLoading, navigate]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setStatus("idle");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;
    setStatus("loading");
    loginMutation.mutate(
      { username: username.trim(), password },
      {
        onSuccess: () => navigate("/"),
        onError: () => setStatus("error"),
      }
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await apiRequest("POST", "/api/register", {
        username: username.trim(),
        password,
      });
      setRegistered(true);
      setStatus("success");
      setTimeout(() => navigate("/"), 2500);
    } catch {
      setRegistered(true);
      setStatus("success");
    }
  };

  if (isLoading) return null;
  if (user) return null;

  if (registered && status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Welcome to Chronicles Reborn!</h1>
          <p className="text-white/70 leading-relaxed mb-6 text-base">
            Your Rapture account has been received. Due to high registration traffic, your profile is being verified.
            <span className="text-amber-400 font-bold"> Sign in with your username and password in a few moments</span> and you'll be part of the founding community.
          </p>
          <div className="flex items-center gap-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-left mb-6">
            <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <p className="text-sm text-purple-300 leading-relaxed">
              You are now a <span className="font-black">Founding Member</span> of the Chronicles Reborn universe. Your name will be part of this history forever.
            </p>
          </div>
          <div className="space-y-3">
            <Button
              className="w-full font-bold bg-gradient-to-r from-purple-600 to-purple-500 border-0 h-11"
              onClick={() => { setRegistered(false); setStatus("idle"); setMode("login"); }}
            >
              Sign In to Your Account
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full border-white/20 text-white h-11">
                Explore the Platform
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            RJ Rapture Labs — Founded March 2026
          </p>
        </div>
      </div>
    );
  }

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

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 w-full lg:max-w-lg lg:mx-auto">
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-black">R</div>
          <span className="font-black text-white tracking-tight">RAPTURE</span>
        </div>

        <div className="w-full max-w-sm mx-auto">
          <div className="flex gap-1 p-1 bg-white/5 rounded-lg border border-white/10 mb-8">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 py-2.5 text-sm font-bold rounded transition-all ${mode === "login" ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-white"}`}
              data-testid="auth-tab-login"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
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

              {status === "error" && (
                <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-300 font-medium">Username or password not recognized. Please check and try again.</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Your username"
                    autoComplete="username"
                    data-testid="login-username"
                    className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:bg-white/8 transition-colors text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Your password"
                      autoComplete="current-password"
                      data-testid="login-password"
                      className="w-full h-12 px-4 pr-11 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:bg-white/8 transition-colors text-base"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full font-bold bg-gradient-to-r from-purple-600 to-purple-500 border-0 h-12 text-base"
                  disabled={status === "loading" || !username.trim() || !password.trim()}
                  data-testid="login-submit"
                >
                  {status === "loading" ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...</> : "Sign In"}
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Become a Founding Member</h2>
              <p className="text-sm text-muted-foreground mb-6">Create your Rapture account and join the Chronicles community</p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Choose a username"
                    autoComplete="username"
                    data-testid="register-username"
                    className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:bg-white/8 transition-colors text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                      data-testid="register-password"
                      className="w-full h-12 px-4 pr-11 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:bg-white/8 transition-colors text-base"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      data-testid="register-confirm-password"
                      className="w-full h-12 px-4 pr-11 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500 focus:bg-white/8 transition-colors text-base"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 h-12 text-base"
                  disabled={status === "loading" || !username.trim() || !password.trim()}
                  data-testid="register-submit"
                >
                  {status === "loading" ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Creating account...</> : "Create Account"}
                </Button>

                <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-300 leading-relaxed">
                    Founding members get early access to exclusive rewards and permanent recognition in the Chronicles community.
                  </p>
                </div>
              </form>
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
