import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors, fonts, spacing } from '../theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onDone }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(500),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(600),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Subtle grid lines for texture */}
      <View style={styles.gridOverlay} />

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          <Text style={styles.logo}>CULT</Text>
          <View style={styles.logoUnderline} />
        </Animated.View>

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          A members-only creator network.{'\n'}Los Angeles.
        </Animated.Text>
      </View>

      <Animated.View style={[styles.footer, { opacity: buttonOpacity }]}>
        <TouchableOpacity style={styles.button} onPress={onDone} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Request Access</Text>
        </TouchableOpacity>
        <Text style={styles.footerNote}>By invitation or application only.</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    paddingVertical: spacing.xxxl,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.04,
    borderWidth: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontFamily: fonts.serif,
    fontSize: 64,
    color: colors.cream,
    letterSpacing: 16,
    textAlign: 'center',
  },
  logoUnderline: {
    width: 40,
    height: 1,
    backgroundColor: colors.creamDim,
    marginTop: spacing.md,
  },
  tagline: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: colors.creamMuted,
    textAlign: 'center',
    lineHeight: 26,
    letterSpacing: 0.5,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.md,
  },
  button: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.cream,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.cream,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  footerNote: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
