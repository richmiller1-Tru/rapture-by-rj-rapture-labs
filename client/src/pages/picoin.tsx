import { Link } from "wouter";
import { ArrowLeft, Coins, Smartphone, Globe, Shield, Users, TrendingUp, HelpCircle, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "Is Pi coin real money right now?",
    answer:
      "Not yet in most places. Pi coin is currently in the enclosed mainnet phase, meaning it cannot be freely traded on major exchanges. The Pi Network team is working toward open mainnet, where Pi could be exchanged like other cryptocurrencies. Until then, think of mined Pi as a future asset, not spendable cash.",
  },
  {
    question: "Do I need to buy anything to get Pi?",
    answer:
      "No. Pi coin is mined for free on your phone. You never need to invest money to participate in mining Pi.",
  },
  {
    question: "Will Pi coin be worth a lot someday?",
    answer:
      "Nobody knows for certain. Like all cryptocurrencies, its value will depend on adoption, demand, and the success of the Pi Network ecosystem. Treat it as a long-term, speculative asset rather than a guaranteed investment.",
  },
  {
    question: "Is Pi coin a scam?",
    answer:
      "Pi Network is a real project founded by Stanford PhDs and has millions of active users globally. However, since it has not yet launched on open markets, it is wise to stay cautious, do your own research, and never send money to anyone claiming to sell Pi early.",
  },
  {
    question: "How often do I need to check the app to mine?",
    answer:
      "You tap a button in the app once every 24 hours to keep your mining session active. You do not need to leave the app open — Pi mines passively in the background after each tap.",
  },
];

const steps = [
  { icon: "📱", title: "Download the Pi Network App", description: "Search 'Pi Network' in the App Store or Google Play and install the free app." },
  { icon: "✍️", title: "Create Your Account", description: "Sign up with your real name and phone number. Pi requires identity verification to keep the network human-only." },
  { icon: "🔑", title: "Enter an Invitation Code", description: "Pi is invite-only. You need a referral code from an existing member to join (this is free)." },
  { icon: "⚡", title: "Tap to Start Mining", description: "Tap the lightning bolt button in the app. Pi will now mine passively. Come back every 24 hours to tap again and keep earning." },
  { icon: "🛡️", title: "Build Your Security Circle", description: "Add trusted people to your Security Circle to increase your mining rate and help secure the Pi blockchain." },
  { icon: "✅", title: "Complete KYC Verification", description: "When prompted, verify your identity through the KYC (Know Your Customer) process. This is required before Pi can be transferred to your wallet." },
];

export default function PiCoinPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Rapture</span>
              </button>
            </Link>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-black text-xs font-black">π</div>
              <span className="font-black text-white text-sm tracking-tight">Pi Coin Guide</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Beginner's Edition</span>
            </div>
          </div>
          {!user && (
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex font-bold bg-purple-600 hover:bg-purple-500 border-0 text-xs"
            >
              <Link href="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-14">

        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-bold mb-2">
            <Coins className="w-3.5 h-3.5" />
            Novice-Friendly Overview
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            What Is <span className="text-yellow-400">Pi Coin?</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A plain-English guide to Pi Network and its native cryptocurrency — no technical background required.
          </p>
        </section>

        {/* What is Pi Coin */}
        <section className="rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4"
          style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,27,75,0.8) 100%)" }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <Coins className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-xl font-black text-white">What Is Pi Coin?</h2>
          </div>
          <p className="text-white/75 leading-relaxed">
            <strong className="text-white">Pi coin (π)</strong> is the digital currency of the{" "}
            <strong className="text-white">Pi Network</strong> — a cryptocurrency project founded in
            2019 by a team of Stanford University graduates. Unlike Bitcoin or Ethereum, which require
            expensive hardware and lots of electricity to mine, Pi coin is designed to be mined using nothing
            more than your smartphone.
          </p>
          <p className="text-white/75 leading-relaxed">
            The idea is simple: everyday people should be able to participate in the crypto economy without
            needing technical expertise or a large investment. Pi Network lets you accumulate Pi coin for
            free by tapping a button in the mobile app once a day.
          </p>
        </section>

        {/* Key Concepts */}
        <section className="space-y-5">
          <h2 className="text-xl font-black text-white">Key Concepts — Simply Explained</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Smartphone className="w-5 h-5 text-blue-400" />,
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                title: "Mobile Mining",
                body: "Traditional crypto mining burns electricity and requires specialized computers. Pi mining runs silently on your phone without draining your battery or data — it's more like a passive check-in than real computational work.",
              },
              {
                icon: <Globe className="w-5 h-5 text-green-400" />,
                bg: "bg-green-500/10",
                border: "border-green-500/20",
                title: "Blockchain",
                body: "A blockchain is a shared digital record book that no single person controls. Every Pi coin transaction is recorded on the Pi blockchain, making it transparent and hard to tamper with.",
              },
              {
                icon: <Shield className="w-5 h-5 text-purple-400" />,
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
                title: "Security Circle",
                body: "Your Security Circle is a group of 3–5 people you trust (friends, family). Adding trusted members increases your mining rate and helps the network verify that each account belongs to a real human.",
              },
              {
                icon: <Users className="w-5 h-5 text-pink-400" />,
                bg: "bg-pink-500/10",
                border: "border-pink-500/20",
                title: "Invite-Only Network",
                body: "Pi Network grows through referrals. You need an invitation code from an existing member to join. This helps keep the community verified and limits bot accounts.",
              },
              {
                icon: <TrendingUp className="w-5 h-5 text-amber-400" />,
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
                title: "Mainnet & Open Mainnet",
                body: "The Pi blockchain is live (mainnet), but Pi cannot yet be freely traded on exchanges — this is the 'enclosed mainnet' phase. 'Open mainnet' is the future milestone when Pi will be exchangeable on the open market.",
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-teal-400" />,
                bg: "bg-teal-500/10",
                border: "border-teal-500/20",
                title: "KYC Verification",
                body: "KYC stands for 'Know Your Customer.' Pi Network requires identity verification before you can transfer mined Pi to your wallet. This is a standard security measure used by banks and crypto platforms.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl border ${item.border} ${item.bg} p-5 space-y-2`}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h3 className="font-black text-white text-sm">{item.title}</h3>
                </div>
                <p className="text-white/65 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Get Started */}
        <section className="space-y-5">
          <h2 className="text-xl font-black text-white">How to Get Started (Step by Step)</h2>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/3 p-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-muted-foreground">STEP {i + 1}</span>
                  </div>
                  <h3 className="font-black text-white text-sm">{step.title}</h3>
                  <p className="text-white/60 text-sm mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pros & Cautions */}
        <section className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <h3 className="font-black text-white">Why People Are Excited</h3>
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                "Completely free to join and mine",
                "No expensive hardware or electricity costs",
                "Backed by a Stanford-educated founding team",
                "Tens of millions of active users worldwide",
                "Could have real value once open mainnet launches",
                "Builds an inclusive, global crypto community",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-white">Things to Keep in Mind</h3>
            </div>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                "Pi cannot be sold or traded on open markets yet",
                "Future value is uncertain — it's speculative",
                "Open mainnet launch date is not confirmed",
                "Never pay anyone claiming to sell you Pi early",
                "KYC verification is required before transferring Pi",
                "Do your own research before making any decisions",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">!</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-black text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/3 p-5 space-y-2">
                <h3 className="font-black text-white text-sm">{faq.question}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="rounded-xl border border-white/10 bg-white/3 p-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-white">Disclaimer:</strong> This page is provided for educational purposes only and does not constitute
            financial advice. Cryptocurrency investments carry risk. Always conduct your own research and consult a
            qualified financial advisor before making investment decisions. Rapture by RJ Rapture Labs is not affiliated
            with Pi Network.
          </p>
        </section>

        {/* Back to home */}
        <div className="text-center pb-4">
          <Link href="/">
            <Button variant="outline" className="border-white/10 text-muted-foreground hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Rapture Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
