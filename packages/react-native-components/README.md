# @foundry/react-native-components

Shared React Native components based on [react-native-reusables](https://reactnativereusables.com/). Provides accessible, customizable UI primitives for Expo universal apps.

## Installation

This package is available as a workspace dependency within the Foundry monorepo.

```bash
pnpm add @foundry/react-native-components --workspace
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
pnpm add react react-native
```

### NativeWind Setup

Components use NativeWind for styling. Ensure your app has NativeWind configured:

1. Install NativeWind dependencies (if not already installed):

```bash
pnpm add nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```

2. Configure Tailwind CSS in your app
3. Import the NativeWind types in your `tsconfig.json`

See [NativeWind documentation](https://www.nativewind.dev/) for detailed setup instructions.

## Available Components

### Card

A container component with optional header and footer sections.

```tsx
import { Card } from '@foundry/react-native-components';

<Card header={<Text>Card Title</Text>} footer={<Text>Card Footer</Text>}>
  <Text>Card content goes here</Text>
</Card>;
```

### Button

A pressable button with multiple variants.

```tsx
import { Button } from '@foundry/react-native-components';

<Button variant="primary" onPress={() => console.log('Pressed')}>
  Click Me
</Button>

<Button variant="outline" disabled>
  Disabled Button
</Button>
```

### Input

A text input component with label and error state support.

```tsx
import { Input } from '@foundry/react-native-components';

<Input
  label="Email"
  placeholder="Enter your email"
  keyboardType="email-address"
  onChangeText={(text) => setEmail(text)}
/>

<Input
  label="Password"
  secureTextEntry
  error="Password is required"
/>
```

## Component API Reference

### Card Props

| Prop        | Type              | Default     | Description                        |
| ----------- | ----------------- | ----------- | ---------------------------------- |
| `children`  | `React.ReactNode` | required    | Content to display inside the card |
| `header`    | `React.ReactNode` | `undefined` | Optional header content            |
| `footer`    | `React.ReactNode` | `undefined` | Optional footer content            |
| `className` | `string`          | `undefined` | Additional CSS classes             |

### Button Props

| Prop                 | Type                                    | Default     | Description                    |
| -------------------- | --------------------------------------- | ----------- | ------------------------------ |
| `children`           | `React.ReactNode`                       | required    | Button label/content           |
| `variant`            | `'primary' \| 'secondary' \| 'outline'` | `'primary'` | Visual style variant           |
| `onPress`            | `() => void`                            | `undefined` | Press handler                  |
| `disabled`           | `boolean`                               | `false`     | Whether the button is disabled |
| `isLoading`          | `boolean`                               | `false`     | Whether to show loading state  |
| `accessibilityLabel` | `string`                                | `undefined` | Accessibility label            |
| `className`          | `string`                                | `undefined` | Additional CSS classes         |

### Input Props

| Prop              | Type                     | Default     | Description                   |
| ----------------- | ------------------------ | ----------- | ----------------------------- |
| `label`           | `string`                 | `undefined` | Label text above input        |
| `placeholder`     | `string`                 | `undefined` | Placeholder text              |
| `value`           | `string`                 | `undefined` | Input value                   |
| `onChangeText`    | `(text: string) => void` | `undefined` | Text change handler           |
| `keyboardType`    | `KeyboardTypeOptions`    | `undefined` | Keyboard type                 |
| `secureTextEntry` | `boolean`                | `false`     | Mask input (for passwords)    |
| `error`           | `string`                 | `undefined` | Error message to display      |
| `hasError`        | `boolean`                | `false`     | Whether input has error state |
| `disabled`        | `boolean`                | `false`     | Whether input is disabled     |
| `className`       | `string`                 | `undefined` | Additional CSS classes        |

## Usage Examples

### Form with Card, Button, and Input

```tsx
import { Card, Button, Input } from '@foundry/react-native-components';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card header={<Text>Login</Text>}>
      <View className="gap-4">
        <Input
          label="Email"
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button variant="primary" onPress={() => handleLogin()}>
          Login
        </Button>
      </View>
    </Card>
  );
}
```

### Button Variants

```tsx
<View className="gap-2">
  <Button variant="primary">Primary Button</Button>
  <Button variant="secondary">Secondary Button</Button>
  <Button variant="outline">Outline Button</Button>
</View>
```

## Customization

Components use Tailwind CSS classes for styling. You can customize the appearance by:

1. **Overriding classes** via the `className` prop
2. **Modifying your Tailwind theme** to change default colors and spacing
3. **Creating wrapper components** that apply your design system defaults

Example:

```tsx
// Custom styled button
function MyButton(props: ButtonProps) {
  return <Button {...props} className="rounded-full shadow-lg" />;
}
```

## Runbooks

See the `/runbooks` directory for detailed guides:

- [Component Development](./runbooks/component-development.md) - How to add new components
- [Package Updates](./runbooks/package-updates.md) - How to update dependencies
- [Troubleshooting](./runbooks/troubleshooting.md) - Common issues and solutions

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on adding new components or modifying existing ones.

## License

Private - Internal use only
