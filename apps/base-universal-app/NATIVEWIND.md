# NativeWind Setup Guide

This project uses **NativeWind v4** with **Tailwind CSS v3** for utility-first styling in React Native.

## Quick Start

```tsx
// Use Tailwind classes in your components
import { View, Text } from 'react-native';

export function MyComponent() {
  return (
    <View className="flex-1 bg-primary p-4">
      <Text className="text-white font-bold text-lg">Hello NativeWind!</Text>
    </View>
  );
}
```

## Configuration Files

- `tailwind.config.js` - Tailwind configuration with custom theme
- `global.css` - Global styles and CSS variables
- `babel.config.js` - Babel preset for NativeWind
- `metro.config.js` - Metro bundler configuration
- `nativewind.d.ts` - TypeScript type declarations

## Custom Theme

Our design system includes:

### Colors

- `bg-primary` / `text-primary` - #007AFF
- `bg-secondary` / `text-secondary` - #5856D6
- `bg-muted` / `text-muted` - Gray backgrounds
- `bg-background` / `text-foreground` - Default theme colors

### Spacing (4px base)

- `p-1` = 4px, `p-2` = 8px, `p-4` = 16px, up to `p-16` = 64px

### Border Radius

- `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full`

## Running the Example

The example component is at `components/example/StyledExample.tsx` and is displayed on the home screen.

## Resources

- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
