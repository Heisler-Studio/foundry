import { Pressable, View } from 'react-native';
import { colors } from '@/theme';
import { useThemeStore } from '@/store/theme-store';
import { ThemeValue, THEME_SYSTEM, THEME_LIGHT, THEME_DARK } from '@/types/theme';
import { Text } from '@/components/primitives/ThemedText';

interface ThemePreviewCardProps {
  theme: ThemeValue;
  isSelected: boolean;
  onSelect: () => void;
}

const ThemePreviewCard = ({ theme, isSelected, onSelect }: ThemePreviewCardProps) => {
  const getCardStyles = () => {
    switch (theme) {
      case THEME_SYSTEM:
        return {
          container: `bg-[${colors.system.backgroundLight}]`,
          header: `bg-[${colors.system.header}]`,
          card: `bg-[${colors.system.card}]`,
          accent: `bg-[${colors.system.primary}]`,
        };
      case THEME_LIGHT:
        return {
          container: `bg-[${colors.light.background}]`,
          header: `bg-[${colors.light.card}]`,
          card: `bg-[${colors.light.card}]`,
          accent: `bg-[${colors.light.primary}]`,
        };
      case THEME_DARK:
        return {
          container: `bg-[${colors.dark.background}]`,
          header: `bg-[${colors.dark.card}]`,
          card: `bg-[${colors.dark.card}]`,
          accent: `bg-[${colors.dark.primary}]`,
        };
      default:
        return {
          container: `bg-[${colors.light.background}]`,
          header: `bg-[${colors.light.card}]`,
          card: `bg-[${colors.light.card}]`,
          accent: `bg-[${colors.light.primary}]`,
        };
    }
  };

  const styles = getCardStyles();

  return (
    <Pressable
      onPress={onSelect}
      className={`rounded-xl overflow-hidden border-2 ${
        isSelected ? 'border-primary' : 'border-transparent'
      }`}
    >
      <View className={`w-24 h-32 ${styles.container}`}>
        {/* Mock Header */}
        <View className={`h-6 ${styles.header} mx-2 mt-2 rounded-t`} />

        {/* Mock Content Card */}
        <View className={`mx-2 mt-1 h-16 ${styles.card} rounded-b p-2`}>
          {/* Mock Text Lines */}
          <View className="h-1.5 bg-gray-400/30 rounded w-3/4 mb-1" />
          <View className="h-1.5 bg-gray-400/30 rounded w-1/2 mb-2" />

          {/* Mock Accent Button */}
          <View className={`h-4 ${styles.accent} rounded w-8`} />
        </View>
      </View>

      {/* Label */}
      <View className={`py-2 ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
        <Text className="text-center text-xs font-medium capitalize">{theme}</Text>
      </View>
    </Pressable>
  );
};

export const ThemeSwitcher = () => {
  const { mode, setMode } = useThemeStore();

  const themes: ThemeValue[] = [THEME_SYSTEM, THEME_LIGHT, THEME_DARK];

  return (
    <View className="flex-row justify-center gap-3 py-4">
      {themes.map((theme) => (
        <ThemePreviewCard
          key={theme}
          theme={theme}
          isSelected={mode === theme}
          onSelect={() => setMode(theme)}
        />
      ))}
    </View>
  );
};
