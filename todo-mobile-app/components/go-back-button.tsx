import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/constants/style';

interface GoBackButtonProps {
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
}

export default function GoBackButton({ style, iconSize = 20, iconColor = colors.textPrimary }: GoBackButtonProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={() => router.back()}
      accessibilityLabel="Go back"
    >
      <FontAwesome name="arrow-left" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfacePrimary,
    borderRadius: 20,
    padding: 8,
    shadowColor: colors.surfacePrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
});