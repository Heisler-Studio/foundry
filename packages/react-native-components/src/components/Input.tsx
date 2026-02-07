import React, { useState } from 'react';
import { TextInput, TextInputProps, View, Text, KeyboardTypeOptions } from 'react-native';
import { cn } from '../utils/cn';

/**
 * Props for the Input component
 */
export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  /**
   * Label text displayed above the input
   */
  label?: string;
  /**
   * Error message displayed below the input
   */
  error?: string;
  /**
   * Whether the input has an error state
   * @default false
   */
  hasError?: boolean;
  /**
   * Placeholder text when input is empty
   */
  placeholder?: string;
  /**
   * Callback when text changes
   */
  onChangeText?: (text: string) => void;
  /**
   * The type of keyboard to display
   */
  keyboardType?: KeyboardTypeOptions;
  /**
   * Whether to mask input (for passwords)
   * @default false
   */
  secureTextEntry?: boolean;
}

/**
 * Input component - A text input with label, error state, and various keyboard types.
 * Supports focused, error, and disabled states with proper styling.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   keyboardType="email-address"
 *   onChangeText={(text) => console.log(text)}
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  hasError,
  placeholder,
  onChangeText,
  keyboardType,
  secureTextEntry,
  editable,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = editable === false;
  const showError = hasError || !!error;

  return (
    <View className="w-full">
      {label && <Text className="mb-1 text-sm font-medium text-foreground">{label}</Text>}
      <TextInput
        className={cn(
          'rounded-md border border-input bg-background px-3 py-2 text-foreground',
          isFocused && 'border-ring',
          showError && 'border-destructive',
          isDisabled && 'opacity-50 bg-muted',
          className,
        )}
        placeholder={placeholder}
        placeholderTextColor="hsl(var(--muted-foreground))"
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        editable={editable}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <Text className="mt-1 text-sm text-destructive">{error}</Text>}
    </View>
  );
};

Input.displayName = 'Input';
