import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: 'Heisler Studio',
          headerRight: () => {
            return (
              <Ionicons
                name="ellipsis-horizontal-circle-outline"
                size={32}
                className="text-primary-500"
              />
            );
          },
        }}
      />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
