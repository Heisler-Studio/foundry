# Component Development Runbook

This runbook provides step-by-step instructions for adding new components to the `@foundry/react-native-components` package.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step-by-Step Guide](#step-by-step-guide)
3. [Component Template](#component-template)
4. [Checklist](#checklist)
5. [Common Patterns](#common-patterns)

## Prerequisites

Before creating a component:

- [ ] Review existing components for patterns
- [ ] Ensure NativeWind is set up in your development app
- [ ] Understand the component's purpose and use cases
- [ ] Consider accessibility requirements

## Step-by-Step Guide

### Step 1: Install via React Native Reusables CLI (Default)

This package's default workflow is to install upstream React Native Reusables components into the package using the CLI:

```bash
pnpm dlx @react-native-reusables/cli@latest add -y --overwrite --cwd packages/react-native-components <component>
```

This installs upstream source files under `src/registry/new-york/` (per `components.json`).

Then export (or wrap) components from:

- `src/registry/new-york/components/ui/index.ts`

Those exports are re-exported from `src/index.ts` and become the public API for consuming apps.

This keeps the component source inside the package so:

- Tailwind content scanning can include it
- Consuming apps can import from `@foundry/react-native-components` without deep imports

### Step 2: Add Foundry-specific wrappers (Optional)

If you need to wrap an upstream component to match Foundry conventions, create wrappers in a separate directory so they won't be overwritten by future CLI installs. Recommended:

- `src/foundry/*`

### Step 3: Add Props Interface

Define a props interface with JSDoc comments for each prop:

```typescript
export interface YourComponentProps extends BaseComponentProps {
  /**
   * Description of what this prop does
   * @default defaultValue
   */
  propName: propType;
}
```

### Step 4: Export from Index

Add the export to `src/index.ts`:

```typescript
export {
  YourComponent,
  type YourComponentProps,
} from './foundry/YourComponent';
```

### Step 5: Build and Test

```bash
# Build the package
pnpm run build

# Install in consuming app (from app directory)
cd ../apps/base-universal-app
pnpm add @foundry/react-native-components --workspace

# Test the component
# Run the app and verify the component renders correctly
```

### Step 6: Update Documentation

Update `README.md` with:

- Component description
- Usage example
- Props table

## Component Template

````tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../registry/new-york/lib/utils';

/**
 * Props for the YourComponent component
 */
export interface YourComponentProps extends ViewProps {
  /**
   * Description of the prop
   * @default undefined
   */
  propName?: string;
  /**
   * The content to display
   */
  children: React.ReactNode;
}

/**
 * YourComponent - Brief description of what this component does
 *
 * @example
 * ```tsx
 * <YourComponent propName="value">
 *   Content here
 * </YourComponent>
 * ```
 */
export const YourComponent: React.FC<YourComponentProps> = ({
  propName,
  children,
  className,
  ...props
}) => {
  return (
    <View className={cn('default-classes-here', className)} {...props}>
      {children}
    </View>
  );
};

YourComponent.displayName = 'YourComponent';
````

## Checklist

Before submitting your component:

- [ ] Component file created in `src/foundry/` (wrappers/custom components only)
- [ ] Props interface defined with JSDoc comments
- [ ] Component has `displayName` set
- [ ] Uses `cn()` utility for className merging
- [ ] Supports `className` prop for customization
- [ ] Accessibility props properly forwarded
- [ ] Component exported from `src/index.ts`
- [ ] TypeScript compiles without errors
- [ ] Tested in a consuming app
- [ ] README.md updated with documentation

## Common Patterns

### Conditional Styling

```tsx
className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'opacity-50',
  className
)}
```

### Event Handlers

```tsx
export interface ButtonProps extends PressableProps {
  onPress?: () => void;
}

<Pressable onPress={onPress} {...props}>
```

### Children with Custom Rendering

```tsx
{
  typeof children === 'string' ? (
    <Text className="text-base">{children}</Text>
  ) : (
    children
  );
}
```

### Forwarding Refs (if needed)

```tsx
import React, { forwardRef } from 'react';

export const YourComponent = forwardRef<View, YourComponentProps>(
  ({ propName, ...props }, ref) => {
    return <View ref={ref} {...props} />;
  },
);

YourComponent.displayName = 'YourComponent';
```

## Testing Requirements

Components should be tested for:

1. **Rendering**: Component renders without errors
2. **Props**: All props work as expected
3. **Styling**: className overrides work correctly
4. **Accessibility**: Screen readers announce correctly
5. **Platforms**: Works on iOS, Android, and Web

## Questions?

If you encounter issues:

- Check existing components for reference patterns
- Review the [Troubleshooting Runbook](./troubleshooting.md)
- Ask in the team channel
