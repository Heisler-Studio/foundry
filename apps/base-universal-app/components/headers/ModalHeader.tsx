import { colors } from '@/theme';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { View } from 'react-native';
import { Icon } from '../primitives/Icon';
import { Button } from '../primitives/ThemedButton';
import { Text } from '../primitives/ThemedText';

type ModalHeaderProps = {
  showCloseRightIcon?: boolean;
};

// DEBT: Native headers would be preferred. Can we eliminate this component?
export const ModalHeader = ({ showCloseRightIcon }: ModalHeaderProps) => {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <View className="justify-between">
      {showCloseRightIcon ? (
        <Button variant="link" size="icon" className="self-end" onPress={handleClose}>
          <Icon as={X} name="xmark.circle" color={colors.foreground} className="text-foreground" />
        </Button>
      ) : (
        <Button variant="link" className="self-end" onPress={handleClose}>
          <Text className="text-secondary">Done</Text>
        </Button>
      )}
    </View>
  );
};
