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

  export const Root: React.FC<AccordionSingleProps | AccordionMultipleProps>;
  export const Item: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { value: string } & React.RefAttributes<HTMLDivElement>>;
  export const Header: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'> & React.RefAttributes<HTMLButtonElement>>;
  export const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
}

declare module '@radix-ui/react-navigation-menu' {
  import * as React from 'react';

  export const Root: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'nav'> & { value?: string; onValueChange?: (value: string) => void } & React.RefAttributes<HTMLElement>>;
  export const List: React.FC<React.ComponentPropsWithoutRef<'ul'>>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'li'>>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Link: React.FC<React.ComponentPropsWithoutRef<'a'> & { asChild?: boolean; active?: boolean }>;
  export const Viewport: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
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

  export const Root: React.FC<{ children?: React.ReactNode; open?: boolean; onOpenChange?(open: boolean): void }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Portal: React.FC<{ children?: React.ReactNode }>;
  export const Overlay: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Title: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'h2'> & React.RefAttributes<HTMLHeadingElement>>;
  export const Description: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'p'> & React.RefAttributes<HTMLParagraphElement>>;
  export const Close: React.FC<React.ComponentPropsWithoutRef<'button'>>;
}

declare module '@radix-ui/react-dropdown-menu' {
  import * as React from 'react';

  export const Root: React.FC<{ children?: React.ReactNode }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Portal: React.FC<{ children?: React.ReactNode }>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Separator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Label: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Group: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Sub: React.FC<{ children?: React.ReactNode }>;
  export const SubTrigger: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const SubContent: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-label' {
  import * as React from 'react';

  export const Root: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'label'> & React.RefAttributes<HTMLLabelElement>>;
}

declare module '@radix-ui/react-select' {
  import * as React from 'react';

  export const Root: React.FC<{ children?: React.ReactNode; value?: string; onValueChange?(value: string): void; open?: boolean; onOpenChange?(open: boolean): void }>;
  export const Group: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'> & React.RefAttributes<HTMLButtonElement>>;
  export const Value: React.FC<{ placeholder?: string }>;
  export const Icon: React.FC<React.ComponentPropsWithoutRef<'span'> & { asChild?: boolean }>;
  export const Portal: React.FC<{ children?: React.ReactNode }>;
  export const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { position?: string } & React.RefAttributes<HTMLDivElement>>;
  export const Viewport: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Item: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { value: string } & React.RefAttributes<HTMLDivElement>>;
  export const ItemText: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'span'> & React.RefAttributes<HTMLSpanElement>>;
  export const ItemIndicator: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const ScrollUpButton: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const ScrollDownButton: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Label: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Separator: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
}

declare module '@radix-ui/react-separator' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-tabs' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'> & { value?: string; onValueChange?(value: string): void }>;
  export const List: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & React.RefAttributes<HTMLDivElement>>;
  export const Trigger: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'button'> & { value: string } & React.RefAttributes<HTMLButtonElement>>;
  export const Content: React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<'div'> & { value: string } & React.RefAttributes<HTMLDivElement>>;
}

declare module '@radix-ui/react-tooltip' {
  import * as React from 'react';

  export const Provider: React.FC<{ children?: React.ReactNode; delayDuration?: number; skipDelayDuration?: number }>;
  export const Root: React.FC<{ children?: React.ReactNode; open?: boolean; onOpenChange?(open: boolean): void }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Portal: React.FC<{ children?: React.ReactNode }>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Arrow: React.FC<React.ComponentPropsWithoutRef<'svg'>>;
}

declare module '@radix-ui/react-popover' {
  import * as React from 'react';

  export const Root: React.FC<{ children?: React.ReactNode; open?: boolean; onOpenChange?(open: boolean): void }>;
  export const Trigger: React.FC<React.ComponentPropsWithoutRef<'button'>>;
  export const Portal: React.FC<{ children?: React.ReactNode }>;
  export const Content: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Anchor: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Close: React.FC<React.ComponentPropsWithoutRef<'button'>>;
}

declare module '@radix-ui/react-avatar' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Image: React.FC<React.ComponentPropsWithoutRef<'img'>>;
  export const Fallback: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-checkbox' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'button'> & { checked?: boolean; onCheckedChange?(checked: boolean): void }>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-radio-group' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'> & { value?: string; onValueChange?(value: string): void }>;
  export const Item: React.FC<React.ComponentPropsWithoutRef<'button'> & { value: string }>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-switch' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'button'> & { checked?: boolean; onCheckedChange?(checked: boolean): void }>;
  export const Thumb: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-slider' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'span'> & { value?: number[]; onValueChange?(value: number[]): void; min?: number; max?: number; step?: number }>;
  export const Track: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Range: React.FC<React.ComponentPropsWithoutRef<'span'>>;
  export const Thumb: React.FC<React.ComponentPropsWithoutRef<'span'>>;
}

declare module '@radix-ui/react-progress' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'> & { value?: number; max?: number }>;
  export const Indicator: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}

declare module '@radix-ui/react-scroll-area' {
  import * as React from 'react';

  export const Root: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Viewport: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Scrollbar: React.FC<React.ComponentPropsWithoutRef<'div'> & { orientation?: 'horizontal' | 'vertical' }>;
  export const Thumb: React.FC<React.ComponentPropsWithoutRef<'div'>>;
  export const Corner: React.FC<React.ComponentPropsWithoutRef<'div'>>;
}
