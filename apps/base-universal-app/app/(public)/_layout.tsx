import { Icon } from '@/components/primitives/Icon';
import { colors } from '@/theme';
import { Stack, useRouter } from 'expo-router';
import { Cog } from 'lucide-react-native';
import { Pressable } from 'react-native';

export default function PublicLayout() {
  const router = useRouter();

  const handleLoginOpen = () => {
    router.push('/(public)/login');
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: 'Heisler Studio',

          // KEEP: Example of upcoming multi-function iOS implementation
          // unstable_headerRightItems: () => [
          //   {
          //     type: 'button',
          //     label: 'Settings',
          //     icon: {
          //       type: 'sfSymbol',
          //       name: 'heart',
          //     },
          //     onPress: () => {
          //       router.push('/(public)/login');
          //     },
          //   },
          // ],
          headerRight: () => (
            <Pressable onPress={handleLoginOpen} className="w-10 items-center">
              <Icon
                key="settings"
                name="gearshape"
                as={Cog}
                color={colors['muted-foreground']}
                className="text-destructive"
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen name="login" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
