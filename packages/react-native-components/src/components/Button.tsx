import React from 'react';
import { Pressable, PressableProps, Text, View, AccessibilityState } from 'react-native';
import { cn } from '../utils/cn';

/**
 * Button variant styles
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

/**
 * Props for the Button component
 */
export interface ButtonProps extends Omit<PressableProps, 'children'> {
  /**
   * The content to display inside the button
   */
  children: React.ReactNode;
  /**
   * The visual style variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;
  /**
   * Accessibility label for screen readers
   */
  accessibilityLabel?: string;
}

/**
 * Get the appropriate styles for a button variant
 */
const getVariantStyles = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'primary':
      return 'bg-primary';
    case 'secondary':
      return 'bg-secondary';
    case 'outline':
      return 'border-2 border-primary bg-transparent';
    default:
      return 'bg-primary';
  }
};

/**
 * Get the text color styles for a button variant
 */
const getTextStyles = (variant: ButtonVariant, pressed: boolean, isDisabled: boolean): string => {
  if (isDisabled) {
    return 'text-muted-foreground';
  }

  switch (variant) {
    case 'primary':
    case 'secondary':
      return 'text-primary-foreground';
    case 'outline':
      return pressed ? 'text-primary-foreground' : 'text-primary';
    default:
      return 'text-primary-foreground';
  }
};

/**
 * Button component - A pressable button with multiple variants and states.
 * Supports primary, secondary, and outline styles with proper accessibility.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onPress={() => console.log('Pressed')}>
 *   Click Me
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading,
  disabled,
  accessibilityLabel,
  className,
  ...props
}) => {
  const isDisabled = !!(disabled || isLoading);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled } as AccessibilityState}
      disabled={isDisabled}
      className={cn(
        'rounded-md px-4 py-2 active:opacity-80',
        getVariantStyles(variant),
        isDisabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {({ pressed }: { pressed: boolean }) => (
        <View className="flex-row items-center justify-center">
          {isLoading ? (
            <Text
              className={cn('text-sm font-medium', getTextStyles(variant, pressed, isDisabled))}
            >
              Loading...
            </Text>
          ) : (
            <Text
              className={cn('text-sm font-medium', getTextStyles(variant, pressed, isDisabled))}
            >
              {children}
            </Text>
          )}
        </View>
      )}
    </Pressable>
  );
};

Button.displayName = 'Button';
