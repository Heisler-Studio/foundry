import { useHeaderHeight } from '@react-navigation/elements';
import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

type BaseContainerProps = {
  contentContainerClassName?: string;
  children: ReactNode;
};

/**
 *
 * @returns Top-level component for handling:
 * * KeyboardAvoidingView
 * * ScrollView
 * * Header offset with translucent scroll-behind behavios on iOS
 */
export const BaseContainer = ({ contentContainerClassName, children }: BaseContainerProps) => {
  const headerHeight = useHeaderHeight();

  return (
    // NOTE: SafeAreaView will trigger opaque StatusBar area using the page backgroundColor
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // Offset is usually the height of your header if using one
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        // Ensures that content starts below the header/status bar initially but allows it to scroll behind it with the blur effect
        contentInsetAdjustmentBehavior="automatic"
        // Web/Android: Manual compensation for the transparent header
        contentContainerStyle={{
          paddingTop: Platform.OS !== 'ios' ? headerHeight : 0,
        }}
        contentContainerClassName={contentContainerClassName}
        keyboardDismissMode="interactive"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
