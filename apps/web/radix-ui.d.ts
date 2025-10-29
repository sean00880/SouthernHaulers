declare module '@radix-ui/react-accordion' {
  import * as React from 'react';

  export interface AccordionSingleProps extends React.ComponentPropsWithoutRef<'div'> {
    type: 'single';
    value?: string;
    defaultValue?: string;
    onValueChange?(value: string): void;
    collapsible?: boolean;
  }

  export interface AccordionMultipleProps extends React.ComponentPropsWithoutRef<'div'> {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?(value: string[]): void;
  }

  export const Accordion: React.FC<AccordionSingleProps | AccordionMultipleProps>;
  export const AccordionItem: React.FC<React.ComponentPropsWithoutRef<'div'> & { value: string }>;
  export const AccordionTrigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const AccordionContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-navigation-menu' {
  import * as React from 'react';

  export const NavigationMenu: React.FC<React.ComponentPropsWithoutRef<'nav'>>;
  export const NavigationMenuList: React.FC<React.ComponentPropsWithoutRef<'ul'>>;
  export const NavigationMenuItem: React.FC<React.ComponentPropsWithoutRef<'li'>>;
  export const NavigationMenuTrigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const NavigationMenuContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const NavigationMenuLink: React.FC<React.ComponentPropsWithoutRef<'a'>>;
  export const navigationMenuTriggerStyle: () => string;
}

declare module '@radix-ui/react-slot' {
  import * as React from 'react';

  export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
  }

  export const Slot: React.FC<SlotProps>;
}

declare module '@radix-ui/react-dialog' {
  import * as React from 'react';

  export const Dialog: React.FC<{ children?: React.ReactNode; open?: boolean; onOpenChange?(open: boolean): void }>;
  export const DialogTrigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const DialogPortal: React.FC<{ children?: React.ReactNode }>;
  export const DialogOverlay: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DialogContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DialogHeader: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DialogFooter: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DialogTitle: React.FC<React.ComponentPropsWithoutRef<'h2'>>;
  export const DialogDescription: React.FC<React.ComponentPropsWithoutRef<'p'>>;
}

declare module '@radix-ui/react-dropdown-menu' {
  import * as React from 'react';

  export const DropdownMenu: React.FC<{ children?: React.ReactNode }>;
  export const DropdownMenuTrigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const DropdownMenuContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DropdownMenuItem: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DropdownMenuSeparator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const DropdownMenuLabel: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-label' {
  import * as React from 'react';

  export const Label: React.FC<React.ComponentPropsWithoutRef<'label'>>;
}

declare module '@radix-ui/react-select' {
  import * as React from 'react';

  export const Select: React.FC<{ children?: React.ReactNode; value?: string; onValueChange?(value: string): void }>;
  export const SelectTrigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const SelectValue: React.FC<{ placeholder?: string }>;
  export const SelectContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const SelectItem: React.FC<React.ComponentPropsWithoutRef<'div'> & { value: string }>;
}

declare module '@radix-ui/react-separator' {
  import * as React from 'react';

  export const Separator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-tabs' {
  import * as React from 'react';

  export const Tabs: React.FC<React.ComponentPropsWithoutRef<'div'> & { value?: string; onValueChange?(value: string): void }>;
  export const TabsList: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const TabsTrigger: React.FC<React.ComponentPropsWithoutRef<'button'> & { value: string }>;
  export const TabsContent: React.FC<React.ComponentPropsWithoutRef<'div'> & { value: string }>;
}

declare module '@radix-ui/react-tooltip' {
  import * as React from 'react';

  export const TooltipProvider: React.FC<{ children?: React.ReactNode }>;
  export const Tooltip: React.FC<{ children?: React.ReactNode }>;
  export const TooltipTrigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const TooltipContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-popover' {
  import * as React from 'react';

  export const Popover: React.FC<{ children?: React.ReactNode }>;
  export const PopoverTrigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const PopoverContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-avatar' {
  import * as React from 'react';

  export const Avatar: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const AvatarImage: React.FC<React.ComponentPropsWithoutRef<'img'>>;
  export const AvatarFallback: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}
