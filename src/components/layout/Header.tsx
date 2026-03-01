'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, UserCircle, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'Beranda', href: '/', id: 'beranda' },
  { label: 'Tentang', href: '/#tentang', id: 'tentang' },
  { label: 'Fitur', href: '/#fitur', id: 'fitur' },
  { label: 'Statistik', href: '/#statistik', id: 'statistik' },
  { label: 'FAQ', href: '/#faq', id: 'faq' },
  { label: 'Artikel', href: '/article' },
  { label: 'Cara Pemakaian', href: '/cara-pemakaian' },
  { label: 'Kontributor', href: '/contributor' },
];

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const sectionIds = navLinks.map(link => link.id).filter(Boolean) as string[];
      let currentActive = 'beranda'; 

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const elementTop = el.getBoundingClientRect().top + window.scrollY;
          
          if (window.scrollY >= elementTop - 150) {
            currentActive = id;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const [targetPath, hash] = href.split('#');
    const isTargetRoot = targetPath === '' || targetPath === '/';

    if (pathname === '/' && href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (pathname === '/' && isTargetRoot && hash) {
      e.preventDefault();
      const el = document.getElementById(hash);
      
      if (el) {
        const headerOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        window.history.pushState(null, '', href);
        setActiveSection(hash); 
      }
      return;
    }
  };

  const isActive = (href: string, id?: string) => {
    if (pathname === '/' && id) {
      return activeSection === id;
    }
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary" onClick={(e) => handleNavClick(e, '/')}>
          <ShieldCheck className="h-6 w-6" />
          VeriFakta
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((navItem) => (
            <Link
              key={navItem.href}
              href={navItem.href}
              onClick={(e) => handleNavClick(e, navItem.href)}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(navItem.href, navItem.id)
                  ? 'text-primary font-bold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {navItem.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions (Login/Signup) */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <UserCircle className="h-4 w-4" />
            Login / Signup
          </Link>
        </div>

        {/* Mobile Navigation (Sheet) */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-foreground" aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          
          <SheetContent side="right" className="bg-background w-72">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu Navigasi Mobile</SheetTitle>
              <SheetDescription>
                Daftar tautan untuk menavigasi halaman VeriFakta.
              </SheetDescription>
            </SheetHeader>

            <nav className="mt-8 flex flex-col gap-1">
              {navLinks.map((navItem) => (
                <SheetClose asChild key={navItem.href}>
                  <Link
                    href={navItem.href}
                    onClick={(e) => handleNavClick(e, navItem.href)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-accent ${
                      isActive(navItem.href, navItem.id)
                        ? 'text-primary font-bold bg-accent/50'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {navItem.label}
                  </Link>
                </SheetClose>
              ))}
              
              <SheetClose asChild>
                <Link
                  href="/login"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <UserCircle className="h-4 w-4" />
                  Login / Signup
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}