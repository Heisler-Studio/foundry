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
   * Optional className override for the header container
   */
  headerClassName?: string;

  /**
   * Optional className override for the content container
   */
  contentClassName?: string;

  /**
   * Optional className override for the footer container
   */
  footerClassName?: string;
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
export const Card: React.FC<CardProps> = ({
  header,
  footer,
  headerClassName,
  contentClassName,
  footerClassName,
  children,
  className,
  ...props
}) => {
  return (
    <View
      className={cn('rounded-lg border border-border bg-card p-4 shadow-sm', className)}
      {...props}
    >
      {header && (
        <View className={cn('mb-3 border-b border-border pb-3', headerClassName)}>{header}</View>
      )}
      <View className={cn('flex-1', contentClassName)}>{children}</View>
      {footer && (
        <View className={cn('mt-3 border-t border-border pt-3', footerClassName)}>{footer}</View>
      )}
    </View>
  );
};

Card.displayName = 'Card';
