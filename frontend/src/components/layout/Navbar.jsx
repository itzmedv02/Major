import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { Moon, Sun, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/' },
    { name: 'Predict', path: '/predict' },
    { name: 'History', path: '/history' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <CloudRain className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">AgriRaincast</span>
        </Link>
        
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-foreground/80 ${
                location.pathname === link.path ? 'text-foreground font-semibold' : 'text-foreground/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle Theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
