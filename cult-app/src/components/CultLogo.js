import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';

export default function CultLogo({ size = 'md', style }) {
  const fontSize = size === 'lg' ? 36 : size === 'sm' ? 20 : 28;
  const letterSpacing = fontSize * 0.3;
  const underlineWidth = fontSize * 4.2;

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, { fontSize, letterSpacing }]}>CULT</Text>
      <View style={[styles.underline, { width: underlineWidth }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontFamily: 'LibreBaskerville_400Regular',
    color: '#f2ede6',
  },
  underline: {
    height: 1,
    backgroundColor: '#f2ede6',
    marginTop: 2,
  },
});
