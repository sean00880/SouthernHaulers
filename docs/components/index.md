# Component Implementation Guide

## Core Components

### Navigation Header
```typescript
// Implementation notes for components/layout.tsx
interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Warehouse', href: '/services/warehouse' },
      { label: 'Containers', href: '/services/containers' },
      { label: 'Refrigerated', href: '/services/refrigerated' }
    ]
  },
  { label: 'Contact', href: '/contact' }
];
```

### Hero Section
```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  ctaText?: string;
  ctaLink?: string;
}
```

Key features:
- Responsive background image with overlay
- Mobile-optimized text positioning
- Accessible contrast ratios
- Optional CTA button

### Service Card Grid
```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}
```

Implementation guidelines:
- CSS Grid for responsive layout
- Consistent card heights
- Hover animations
- Clear typography hierarchy

### Contact Form
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}
```

Features:
- Form validation
- Error handling
- Success feedback
- CSRF protection
- Rate limiting

## Shared Components

### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

### Service Sidebar
```typescript
interface ServiceSidebarProps {
  currentService: string;
  services: {
    title: string;
    href: string;
  }[];
}
```

Implementation:
- Sticky positioning
- Active state indication
- Mobile collapse behavior

## Layout Components

### Page Container
```typescript
interface PageContainerProps {
  maxWidth?: 'default' | 'wide' | 'full';
  children: React.ReactNode;
}
```

Usage guidelines:
- Consistent padding
- Responsive breakpoints
- Max-width constraints

### Section
```typescript
interface SectionProps {
  background?: 'white' | 'gray' | 'accent';
  spacing?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

## Animation Guidelines

### Page Transitions
- Use Next.js page transitions
- Keep animations subtle
- Consider reduced motion preferences

### Hover States
- Scale: 1.02-1.05 maximum
- Transition duration: 200-300ms
- Ease timing function

## Accessibility Requirements

### Focus States
- Visible focus rings
- Skip navigation link
- ARIA labels

### Color Contrast
- Meet WCAG 2.1 AA standards
- Test with color blindness simulators

## Mobile Considerations

### Touch Targets
- Minimum 44x44px
- Adequate spacing
- Clear feedback states

### Navigation
- Hamburger menu implementation
- Swipe gestures
- Bottom navigation option

## Performance Optimization

### Image Loading
- Next.js Image component
- Lazy loading
- Proper sizing
- WebP format

### Component Loading
- Code splitting
- Suspense boundaries
- Loading states

## Testing Checklist

### Component Tests
- [ ] Render tests
- [ ] User interaction
- [ ] Responsive behavior
- [ ] Accessibility

### Integration Tests
- [ ] Navigation flow
- [ ] Form submission
- [ ] Error states
- [ ] Loading states

This guide provides detailed implementation instructions for all major components. Follow these guidelines to maintain consistency and quality across the application.
