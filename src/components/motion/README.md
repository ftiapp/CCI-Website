# Motion Animation Components

This directory contains reusable animation components built with Framer Motion for enhancing your application's user experience with smooth, professional animations.

## Basic Usage

All components are client-side components and should be used within client components.

```jsx
'use client';

import FadeIn from '@/components/motion/FadeIn';

export default function MyComponent() {
  return (
    <FadeIn delay={0.2} direction="up">
      <h1>This content will fade in from below</h1>
    </FadeIn>
  );
}
```

## Available Components

### Page Transitions

- **PageTransition**: Animates page content with slide and fade effects
- **PageWrapper**: Wraps page content with a fade and slide up animation
- **StepTransition**: For multi-step forms and wizards

### Element Animations

- **FadeIn**: Fades in elements with optional directional movement
- **SlideIn**: Slides elements in from a specified direction
- **ScaleOnHover**: Scales elements on hover (good for cards, buttons)
- **ButtonAnimation**: Adds hover and tap effects to buttons
- **AnimatedCard**: Card component with hover effects

### List Animations

- **StaggerContainer/StaggerItem**: Creates staggered animations for lists
- **AnimatedList/AnimatedListItem**: Animates lists with customizable effects

### UI Component Animations

- **AnimatedAccordion**: Collapsible content with smooth animations
- **AnimatedTabs**: Tab component with smooth indicator transitions
- **AnimatedToast**: Toast/notification animations
- **ModalTransition**: Modal dialog animations
- **ScrollReveal**: Reveals content as user scrolls

### Special Effects

- **AnimatedCounter**: Animated number counter for statistics
- **LayoutAnimation**: Smooth transitions for layout changes
- **Motion**: Versatile component supporting various animation types

## Example: Multi-step Form

```jsx
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StepTransition from '@/components/motion/StepTransition';

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const handleNext = () => {
    setDirection(1);
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setDirection(-1);
    setCurrentStep(prev => prev - 1);
  };
  
  return (
    <div>
      <AnimatePresence mode="wait">
        {currentStep === 0 && (
          <StepTransition direction={direction}>
            <div>Step 1 Content</div>
          </StepTransition>
        )}
        
        {currentStep === 1 && (
          <StepTransition direction={direction}>
            <div>Step 2 Content</div>
          </StepTransition>
        )}
      </AnimatePresence>
      
      <div className="flex gap-4">
        {currentStep > 0 && (
          <button onClick={handleBack}>Back</button>
        )}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
```

## Example: Animated List

```jsx
import { AnimatedList, AnimatedListItem } from '@/components/motion/AnimatedList';

export default function MyList() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  
  return (
    <AnimatedList className="space-y-2">
      {items.map((item, index) => (
        <AnimatedListItem key={index} className="p-4 bg-white rounded shadow">
          {item}
        </AnimatedListItem>
      ))}
    </AnimatedList>
  );
}
```

## Performance Tips

1. Use `AnimatePresence` for elements that mount and unmount
2. Set `layoutId` for elements that move positions
3. Use `initial={false}` to disable initial animations on page load
4. For long lists, consider using `useInView` to only animate visible items
