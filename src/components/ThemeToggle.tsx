import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    // Mount state to avoid hydration mismatch
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
        // If not mounted or view transitions not supported, just toggle
        if (!mounted || !document.startViewTransition) {
            setTheme(theme === "dark" ? "light" : "dark");
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            // Resolve the effective theme to toggle
            const current = theme === "system" ? systemTheme : theme;
            const next = current === "dark" ? "light" : "dark";
            setTheme(next);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: clipPath,
                },
                {
                    duration: 400,
                    easing: "ease-in",
                    pseudoElement: "::view-transition-new(root)",
                }
            );
        });
    };

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 opacity-0">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        )
    }

    // Determine current icon
    const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");

    return (
        <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9 transition-all hover:bg-accent hover:text-accent-foreground"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {isDark ? (
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            )}
        </Button>
    );
}
