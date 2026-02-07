import React from 'react';
import { View, ViewProps } from 'react-native';
import { cn } from '../utils/cn';

/**
 * Props for the Card component
 */
export interface CardProps extends ViewProps {
  /**
   * Optional header content displayed at the top of the card
   */
  header?: React.ReactNode;
  /**
   * Optional footer content displayed at the bottom of the card
   */
  footer?: React.ReactNode;
  /**
   * Content to display inside the card
   */
  children: React.ReactNode;
}

/**
 * Card component - A container component with optional header and footer sections.
 * Uses NativeWind for styling with default classes that can be overridden.
 *
 * @example
 * ```tsx
 * <Card header={<Text>Title</Text>} footer={<Text>Footer</Text>}>
 *   <Text>Card content</Text>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({ header, footer, children, className, ...props }) => {
  return (
    <View
      className={cn('rounded-lg border border-border bg-card p-4 shadow-sm', className)}
      {...props}
    >
      {header && <View className="mb-3 border-b border-border pb-3">{header}</View>}
      <View className="flex-1">{children}</View>
      {footer && <View className="mt-3 border-t border-border pt-3">{footer}</View>}
    </View>
  );
};

Card.displayName = 'Card';
