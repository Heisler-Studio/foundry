import {
  Card as BaseCard,
  CardContent as BaseCardContent,
  CardDescription as BaseCardDescription,
  CardFooter as BaseCardFooter,
  CardHeader as BaseCardHeader,
  CardTitle as BaseCardTitle,
} from '@foundry/react-native-components';
import type { ComponentProps, ReactNode } from 'react';

type ThemedCardProps = Omit<ComponentProps<typeof BaseCard>, 'children'> & {
  children?: ReactNode;
};

export const Card = ({ children, ...props }: ThemedCardProps) => {
  return <BaseCard {...props}>{children}</BaseCard>;
};

type ThemedCardHeaderProps = Omit<ComponentProps<typeof BaseCardHeader>, 'children'> & {
  children?: ReactNode;
};

export const CardHeader = ({ children, ...props }: ThemedCardHeaderProps) => {
  return <BaseCardHeader {...props}>{children}</BaseCardHeader>;
};

type ThemedCardTitleProps = Omit<ComponentProps<typeof BaseCardTitle>, 'children'> & {
  children?: ReactNode;
};

export const CardTitle = ({ children, ...props }: ThemedCardTitleProps) => {
  return <BaseCardTitle {...props}>{children}</BaseCardTitle>;
};

type ThemedCardDescriptionProps = Omit<ComponentProps<typeof BaseCardDescription>, 'children'> & {
  children?: ReactNode;
};

export const CardDescription = ({ children, ...props }: ThemedCardDescriptionProps) => {
  return <BaseCardDescription {...props}>{children}</BaseCardDescription>;
};

type ThemedCardContentProps = Omit<ComponentProps<typeof BaseCardContent>, 'children'> & {
  children?: ReactNode;
};

export const CardContent = ({ children, ...props }: ThemedCardContentProps) => {
  return <BaseCardContent {...props}>{children}</BaseCardContent>;
};

type ThemedCardFooterProps = Omit<ComponentProps<typeof BaseCardFooter>, 'children'> & {
  children?: ReactNode;
};

export const CardFooter = ({ children, ...props }: ThemedCardFooterProps) => {
  return <BaseCardFooter {...props}>{children}</BaseCardFooter>;
};
