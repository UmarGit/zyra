"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Github, Star, GitFork, Eye } from "lucide-react";
import RotatingText from "@/components/rotating-text";
import LightRays from "@/components/light-rays";
import CountUp from "@/components/count-up";
import { useEffect, useState } from "react";

interface GitHubStats {
  stars: number;
  forks: number;
  watchers: number;
}

export default function LandingPage() {
  const [githubStats, setGithubStats] = useState<GitHubStats>({
    stars: 100,
    forks: 200,
    watchers: 5000,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('/api/github-stats');
        if (response.ok) {
          const data = await response.json();
          setGithubStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#252525"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-muted/10 rounded-full blur-2xl animate-bounce" />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-neutral-600 rounded-full text-accent-foreground text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Powered by Gemini 2.5 Flash Image
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-balance leading-tight flex items-center justify-center gap-4">
              <RotatingText
                texts={["Create", "Merge", "Inspire", "Imagine"]}
                mainClassName="text-black overflow-hidden justify-center"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
              <RotatingText
                texts={[
                  "🐱 + 🦋 = 🧚‍♀️",
                  "🌊 + 🔥 = 🌋",
                  "🤖 + 🎨 = ✨",
                  "🏠 + 🚀 = 🏰",
                ]}
                mainClassName="text-black overflow-hidden justify-center"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Unleash endless creativity with our open-source, node-based AI
              image generation platform. Collaborate, innovate, and help shape
              the future of visual creativity on GitHub.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 py-4 md:flex-row flex-col">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg w-38 justify-center">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-xs font-medium text-foreground flex items-center gap-2">
                <CountUp
                  from={0}
                  to={githubStats.stars}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />{" "}
                Stars
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg w-38 justify-center">
              <GitFork className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium text-foreground flex items-center gap-2">
                <CountUp
                  from={0}
                  to={githubStats.forks}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />{" "}
                Forks
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg w-38 justify-center">
              <Eye className="h-4 w-4 text-green-500" />
              <span className="text-xs font-medium text-foreground flex items-center gap-2">
                <CountUp
                  from={0}
                  to={githubStats.watchers}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />{" "}
                Watching
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link href="/playground">
              <Button
                size="sm"
                className="text-sm !px-6 !py-2 rounded-lg bg-slate-900 hover:bg-slate-800 transition-all duration-300 text-white font-medium border-0"
              >
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              size="sm"
              variant="outline"
              className="text-sm !px-6 !py-2 rounded-lg border hover:bg-card/50 transition-all duration-300 bg-transparent text-foreground"
              asChild
            >
              <a
                href="https://github.com/UmarGit/zyra"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
          </div>

          <div className="mt-8 space-y-4">
            <p className="text-sm text-foreground/80">
              ⭐{" "}
              <span className="font-semibold text-foreground">
                Support the movement
              </span>{" "}
              star Zyra on GitHub and power open-source AI creativity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
