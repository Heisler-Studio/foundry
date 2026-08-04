import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-4 px-6">
        <Text variant="h1">Evergreen</Text>
        <Text variant="muted" className="text-center">
          Buy, borrow, die — tracked.
        </Text>
        <Button onPress={() => {}}>
          <Text>Get started</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
