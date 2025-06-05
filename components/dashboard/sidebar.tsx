"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  PlusSquare, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  X
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pathname: string;
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  collapsed: boolean;
}

function SidebarLink({ href, icon, label, isActive, collapsed }: SidebarLinkProps) {
  return (
    <Link href={href} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 p-3 mb-1 h-auto",
          isActive 
            ? "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900 dark:hover:text-blue-300" 
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        )}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
}

export default function Sidebar({ open, setOpen, pathname }: SidebarProps) {
  // For mobile: render in a Sheet component
  const sidebarContent = (collapsed: boolean = false) => (
    <div className={cn(
      "h-full flex flex-col",
      collapsed ? "items-center" : "items-stretch"
    )}>
      <div className={cn(
        "flex h-16 items-center",
        collapsed ? "justify-center" : "px-4"
      )}>
        {!collapsed && (
          <Link href="/\" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">InfraNorm</span>
          </Link>
        )}
      </div>
      <div className="flex-1 py-4 px-2">
        <nav className="space-y-2">
          <SidebarLink 
            href="/dashboard" 
            icon={<LayoutDashboard className="h-5 w-5" />} 
            label="Dashboard" 
            isActive={pathname === '/dashboard'} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/create-project" 
            icon={<PlusSquare className="h-5 w-5" />} 
            label="Skapa projekt" 
            isActive={pathname === '/create-project'} 
            collapsed={collapsed}
          />
          <SidebarLink 
            href="/settings" 
            icon={<Settings className="h-5 w-5" />} 
            label="Inställningar" 
            isActive={pathname === '/settings'} 
            collapsed={collapsed}
          />
        </nav>
      </div>
      {!collapsed && (
        <div className="px-3 py-4">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center"
            onClick={() => setOpen(false)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <span>Dölj</span>
          </Button>
        </div>
      )}
      {collapsed && (
        <div className="px-3 py-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-72 sm:max-w-xs lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
          {sidebarContent()}
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className={cn(
        "fixed top-0 bottom-0 left-0 z-40 hidden lg:block transition-all duration-300",
        open ? "w-64" : "w-20"
      )}>
        <div className="h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
          {sidebarContent(!open)}
        </div>
      </div>
    </>
  );
}