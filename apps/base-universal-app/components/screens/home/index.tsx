import StyledExample from '@/components/example/StyledExample';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function Home() {
  return (
    // NOTE: SafeAreaView will trigger opaque StatusBar area using the page backgroundColor
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // Offset is usually the height of your header if using one
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        // Ensures that content starts below the header/status bar initially but allows it to scroll behind it with the blur effect
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="sm:flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6 mt-safe"
        keyboardDismissMode="interactive"
      >
        <View className="w-full gap-4">
          <StyledExample />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
