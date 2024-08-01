import React, { ComponentProps } from 'react';
import { SFSymbol, SymbolView } from 'expo-symbols';
import { StyleProp, TouchableOpacity, ViewStyle, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  iosName: SFSymbol,
  androidName: ComponentProps<typeof Ionicons>[`name`],
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
  styles?: any;
}

export default function SignButton({
  iosName,
  androidName,
  containerStyle,
  onPress,
  width,
  height,
  styles
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const iconColor = isDarkMode ? '#fff' : '#000';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={[{
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }, containerStyle, styles]}
    >
      <SymbolView 
        name={iosName}
        size={25}
        style={{ width: width, height: height }}
        tintColor={iconColor}
        fallback={
          <Ionicons size={25} name={androidName} color={iconColor} />
        }
      />
    </TouchableOpacity>
  );
}
