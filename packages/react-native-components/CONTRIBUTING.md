# Contributing to @foundry/react-native-components

Thank you for contributing to the React Native components package! This guide will help you add new components or modify existing ones.

## Development Process

### 1. Plan Your Component

Before writing code:

- Check if a similar component already exists
- Consider if the component should be in this package or app-specific
- Review existing components for patterns to follow
- Consider accessibility requirements from the start

### 2. Create the Component

Create a new file in `src/components/ComponentName.tsx`:

````tsx
import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../utils/cn';

export interface ComponentNameProps extends ViewProps {
  /**
   * Describe what this prop does
   */
  propName: string;
}

/**
 * ComponentName - Brief description of what this component does
 *
 * @example
 * ```tsx
 * <ComponentName propName="value" />
 * ```
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  children,
  className,
  ...props
}) => {
  return (
    <View className={cn('default-classes', className)} {...props}>
      {children}
    </View>
  );
};

ComponentName.displayName = 'ComponentName';
````

### 3. Code Style Requirements

- Use **functional components** with explicit return types
- Export both the component and its props interface
- Use JSDoc comments for all props and the component
- Use `cn()` utility for className merging
- Follow the existing file naming convention (`PascalCase.tsx`)
- Keep components focused (single responsibility)

### 4. Update the Index

Export your component in `src/index.ts`:

```typescript
export { ComponentName, type ComponentNameProps } from './components/ComponentName';
```

### 5. Test Your Component

Before submitting:

- Run `pnpm run build` to ensure TypeScript compiles
- Test the component in an app that consumes this package
- Verify styling works correctly on iOS, Android, and Web
- Test with different props and edge cases

### 6. Update Documentation

Update the README.md with:

- Component description in the Available Components section
- Usage example
- Props table in the API Reference section

## Component Checklist

Use this checklist when creating a new component:

- [ ] Component file created in `src/components/`
- [ ] Props interface defined with JSDoc comments
- [ ] Component has displayName set
- [ ] Uses `cn()` utility for className merging
- [ ] Accessibility props are supported
- [ ] Component exported from `src/index.ts`
- [ ] TypeScript compiles without errors (`pnpm run build`)
- [ ] README.md updated with usage example
- [ ] README.md updated with props documentation

## PR Review Process

1. **Create a feature branch** from main
2. **Make your changes** following the guidelines above
3. **Test thoroughly** in a consuming app
4. **Update documentation** as needed
5. **Submit a PR** with:
   - Clear description of the change
   - Screenshots (if UI-related)
   - Testing notes

## Questions?

If you're unsure about:

- Whether a component belongs in this package → Ask the team
- How to implement a feature → Check existing components for patterns
- Styling decisions → Follow the existing component patterns

## Resources

- [react-native-reusables documentation](https://reactnativereusables.com/docs)
- [NativeWind documentation](https://www.nativewind.dev/)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
