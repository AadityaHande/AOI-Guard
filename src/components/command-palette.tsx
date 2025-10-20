'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action: () => void;
  category: 'navigation' | 'action' | 'settings';
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      description: 'View overview and statistics',
      icon: '📊',
      category: 'navigation',
      action: () => {
        router.push('/dashboard');
        setOpen(false);
      },
    },
    {
      id: 'nav-detect',
      label: 'Go to IC Detection',
      description: 'Upload and scan IC images for authenticity',
      icon: '🔍',
      category: 'navigation',
      action: () => {
        router.push('/detect');
        setOpen(false);
      },
    },
    {
      id: 'nav-analytics',
      label: 'Go to Analytics',
      description: 'View detailed analytics and trends',
      icon: '📈',
      category: 'navigation',
      action: () => {
        router.push('/dashboard/analytics');
        setOpen(false);
      },
    },
    {
      id: 'nav-tools',
      label: 'Go to Tools',
      description: 'Batch comparison and utilities',
      icon: '🔧',
      category: 'navigation',
      action: () => {
        router.push('/dashboard/tools');
        setOpen(false);
      },
    },
    {
      id: 'nav-audit',
      label: 'Go to Audit Log',
      description: 'View system activity history',
      icon: '📋',
      category: 'navigation',
      action: () => {
        router.push('/dashboard/audit');
        setOpen(false);
      },
    },
    {
      id: 'nav-oem-data',
      label: 'Go to OEM Data',
      description: 'Manage OEM reference data',
      icon: '💾',
      category: 'navigation',
      action: () => {
        router.push('/dashboard/oem-data');
        setOpen(false);
      },
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      description: 'Configure system settings',
      icon: '⚙️',
      category: 'navigation',
      action: () => {
        router.push('/dashboard/settings');
        setOpen(false);
      },
    },
    {
      id: 'nav-help',
      label: 'Go to Help',
      description: 'View FAQ and documentation',
      icon: '❓',
      category: 'navigation',
      action: () => {
        router.push('/dashboard/help');
        setOpen(false);
      },
    },
    // Actions
    {
      id: 'action-upload',
      label: 'Upload IC Images',
      description: 'Start a new batch scan',
      icon: '📤',
      category: 'action',
      action: () => {
        router.push('/dashboard');
        setOpen(false);
        setTimeout(() => {
          document.querySelector('[data-upload-trigger]')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      },
    },
    {
      id: 'action-export',
      label: 'Export Analytics',
      description: 'Download analytics data',
      icon: '💾',
      category: 'action',
      action: () => {
        router.push('/dashboard/analytics');
        setOpen(false);
      },
    },
    {
      id: 'action-retrain',
      label: 'Retrain Model',
      description: 'Trigger model retraining',
      icon: '🔄',
      category: 'action',
      action: () => {
        router.push('/dashboard/settings');
        setOpen(false);
      },
    },
    // Settings
    {
      id: 'settings-theme',
      label: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: '🎨',
      category: 'settings',
      action: () => {
        const themeToggle = document.querySelector('[data-theme-toggle]') as HTMLButtonElement;
        themeToggle?.click();
        setOpen(false);
      },
    },
    {
      id: 'settings-notifications',
      label: 'View Notifications',
      description: 'Check your notifications',
      icon: '🔔',
      category: 'settings',
      action: () => {
        const notificationBell = document.querySelector('[data-notifications]') as HTMLButtonElement;
        notificationBell?.click();
        setOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(search.toLowerCase()) ||
    command.description?.toLowerCase().includes(search.toLowerCase())
  );

  const groupedCommands = {
    navigation: filteredCommands.filter((c) => c.category === 'navigation'),
    action: filteredCommands.filter((c) => c.category === 'action'),
    settings: filteredCommands.filter((c) => c.category === 'settings'),
  };

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback((command: CommandItem) => {
    command.action();
    setSearch('');
  }, []);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-background/50 backdrop-blur-sm border border-border/40 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200"
      >
        <Command className="h-4 w-4" />
        <span>Search</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Command Palette Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg max-w-2xl border-primary/20">
          <VisuallyHidden>
            <DialogTitle>Command Palette</DialogTitle>
          </VisuallyHidden>
          <div className="flex items-center border-b border-border/40 px-4">
            <Command className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a command or search..."
              className="flex h-14 w-full rounded-none border-0 bg-transparent px-0 py-3 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredCommands.length === 0 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            )}

            {groupedCommands.navigation.length > 0 && (
              <div className="mb-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Navigation
                </div>
                {groupedCommands.navigation.map((command) => (
                  <button
                    key={command.id}
                    onClick={() => handleSelect(command)}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-150 text-left"
                  >
                    <span className="text-xl">{command.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{command.label}</div>
                      {command.description && (
                        <div className="text-xs text-muted-foreground">
                          {command.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {groupedCommands.action.length > 0 && (
              <div className="mb-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Actions
                </div>
                {groupedCommands.action.map((command) => (
                  <button
                    key={command.id}
                    onClick={() => handleSelect(command)}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-150 text-left"
                  >
                    <span className="text-xl">{command.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{command.label}</div>
                      {command.description && (
                        <div className="text-xs text-muted-foreground">
                          {command.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {groupedCommands.settings.length > 0 && (
              <div>
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  Settings
                </div>
                {groupedCommands.settings.map((command) => (
                  <button
                    key={command.id}
                    onClick={() => handleSelect(command)}
                    className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-150 text-left"
                  >
                    <span className="text-xl">{command.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{command.label}</div>
                      {command.description && (
                        <div className="text-xs text-muted-foreground">
                          {command.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border/40 px-4 py-2 text-xs text-muted-foreground bg-muted/30">
            <div className="flex items-center justify-between">
              <span>Press ↵ to select, ↑↓ to navigate</span>
              <span>ESC to close</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
