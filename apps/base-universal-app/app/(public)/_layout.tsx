import { Icon } from '@/components/primitives/Icon';
import { useTheme } from '@/providers/ThemeProvider';
import { getThemeColor, THEME_COLOR_FOREGROUND } from '@/theme/utils';
import { Stack, useRouter } from 'expo-router';
import { Cog } from 'lucide-react-native';
import { Pressable } from 'react-native';

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

/**
 * FIXME?: Remember to define modals and sheets here.
 * They do not behave correctly unless in the root Stack.
 */
export default function PublicLayout() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const handleLoginOpen = () => {
    router.push('/(public)/settings');
  };

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTitle: 'Heisler Studio',
          headerTransparent: true, // Allows content to flow behind the header
          headerRight: () => (
            <Pressable onPress={handleLoginOpen} className="w-10 items-center">
              <Icon
                key="settings"
                name="gearshape"
                as={Cog}
                color={getThemeColor(resolvedTheme, THEME_COLOR_FOREGROUND)}
                className="text-foreground"
              />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          presentation: 'formSheet',
          sheetAllowedDetents: 'fitToContents', // depends on height being set on component
          sheetGrabberVisible: true,
        }}
      />

      <Stack.Screen
        name="settings/index"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
