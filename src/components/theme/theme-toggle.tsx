'use client'

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useThemeStore } from "@/store/theme-store";
import { useTheme } from "next-themes";
import { useEffect } from "react";

function ThemeToggle() {

    const { isDarkMode, toggleTheme } = useThemeStore()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        if ( theme === "dark" && !isDarkMode ) {
            useThemeStore.setState({ isDarkMode: true })
        } else if (theme === 'light' && isDarkMode) {
            useThemeStore.setState({ isDarkMode })
        }
    }, [theme, isDarkMode])

    const handleThemeToggle = () => {
        toggleTheme();
        setTheme(isDarkMode ? 'light' : 'dark')
    }
    return ( 
        <Button variant={'ghost'} size={'icon'} onClick={handleThemeToggle} className="cursor-pointer rounded-full">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
        </Button>
     );
}

export default ThemeToggle;