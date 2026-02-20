import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({
    children,
    defaultTheme = 'system',
    attribute = 'class',
}: {
    children: ReactNode;
    defaultTheme?: Theme;
    attribute?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
}) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return defaultTheme;
        return (localStorage.getItem('theme') as Theme) || defaultTheme;
    });
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // Apply theme class to document
    useEffect(() => {
        const root = document.documentElement;
        const resolvedTheme = theme === 'system' ? systemTheme : theme;

        root.classList.remove('light', 'dark');
        if (attribute === 'class') {
            root.classList.add(resolvedTheme);
        } else {
            root.setAttribute(attribute, resolvedTheme);
        }

        localStorage.setItem('theme', theme);
    }, [theme, systemTheme, attribute]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
