import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../theme';

export default function CultButton({ title, onPress, variant = 'primary', style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === 'secondary' && styles.textSecondary,
          variant === 'ghost' && styles.textGhost,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.text,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.text,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  text: {
    fontFamily: Fonts.mono,
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.background,
  },
  textSecondary: {
    color: Colors.text,
  },
  textGhost: {
    color: Colors.textMuted,
  },
});
