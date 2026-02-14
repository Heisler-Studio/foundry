import StyledExample from '@/components/example/StyledExample';
import { Text } from '@/components/primitives/ThemedText';
import { useHeaderHeight } from '@react-navigation/elements';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function Home() {
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
        contentContainerClassName="p-4 py-8"
        keyboardDismissMode="interactive"
      >
        <View className="w-full">
          <Text>* Hero: Heisler Studio</Text>
          <View className="p-1" />
          <Text>
            * Horizontal list of cards for work history: Thrive, Fountain Life, Bionic Health,
            LifeOmic
          </Text>
          <View className="p-1" />
          <Text>* Tab bar: About, contact</Text>
          <View className="p-1" />
          <Text>* Menu: GitHub, LinkedIn</Text>
          <StyledExample />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
