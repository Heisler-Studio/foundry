import { Text } from '@/components/primitives/ThemedText';
import { useThemeStore } from '@/store/theme-store';
import { themeColor } from '@/theme/colors';
import { THEME_VALUES, type ThemeMode } from '@/theme/types';
import { getPreviewColors } from '@/theme/utils';
import { Pressable, View } from 'react-native';

interface ThemePreviewCardProps {
  theme: ThemeMode;
  isSelected: boolean;
  onSelect: () => void;
}

const ThemePreviewCard = ({
  theme,
  isSelected,
  onSelect,
}: ThemePreviewCardProps) => {
  const getCardStyles = () => {
    const previewColors = getPreviewColors(theme);

    return {
      container: { backgroundColor: previewColors[themeColor.background] },
      header: { backgroundColor: previewColors[themeColor.card] },
      card: { backgroundColor: previewColors[themeColor.card] },
      accent: { backgroundColor: previewColors[themeColor.primary] },
    };
  };

  const styles = getCardStyles();

  return (
    <Pressable
      onPress={onSelect}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      className={`rounded-xl overflow-hidden border-2 ${
        isSelected ? 'border-primary' : 'border-transparent'
      }`}>
      <View className="w-24 h-32" style={styles.container}>
        {/* Mock Header */}
        <View className="h-6 mx-2 mt-2 rounded-t" style={styles.header} />

        {/* Mock Content Card */}
        <View className="mx-2 mt-1 h-16 rounded-b p-2" style={styles.card}>
          {/* Mock Text Lines */}
          <View className="h-1.5 bg-gray-400/30 rounded w-3/4 mb-1" />
          <View className="h-1.5 bg-gray-400/30 rounded w-1/2 mb-2" />

          {/* Mock Accent Button */}
          <View className="h-4 rounded w-8" style={styles.accent} />
        </View>
      </View>

      {/* Label */}
      <View className={`py-2 ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
        <Text className="text-center text-xs font-medium capitalize">
          {theme}
        </Text>
      </View>
    </Pressable>
  );
};

export const ThemeSwitcher = () => {
  const { mode, setMode } = useThemeStore();

  const handleSelect = (theme: ThemeMode) => {
    setMode(theme);
  };

  return (
    <View className="flex-row justify-center gap-3 py-4">
      {THEME_VALUES.map((theme) => (
        <ThemePreviewCard
          key={theme}
          theme={theme}
          isSelected={mode === theme}
          onSelect={() => handleSelect(theme)}
        />
      ))}
    </View>
  );
};
