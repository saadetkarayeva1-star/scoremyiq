import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import CultLogo from '../components/CultLogo';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Grain texture overlay via opacity dots */}
      <View style={styles.grain} pointerEvents="none" />

      <View style={styles.content}>
        <Animated.View style={[styles.logoSection, { opacity: logoOpacity }]}>
          <CultLogo size="lg" />
        </Animated.View>

        <Animated.View style={[styles.taglineSection, { opacity: taglineOpacity }]}>
          <Text style={styles.tagline}>Members only.</Text>
          <Text style={styles.taglineSub}>Los Angeles.</Text>
        </Animated.View>

        <Animated.View style={[styles.actions, { opacity: buttonOpacity }]}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Onboarding')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>request access</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ghostButton}
            onPress={() => navigation.navigate('MainTabs')}
            activeOpacity={0.8}
          >
            <Text style={styles.ghostButtonText}>sign in</Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>invite only</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  grain: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.03,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  taglineSection: {
    alignItems: 'center',
    marginBottom: 64,
  },
  tagline: {
    fontFamily: 'LibreBaskerville_400Regular_Italic',
    fontSize: 16,
    color: Colors.textDim,
    letterSpacing: 1,
    marginBottom: 4,
  },
  taglineSub: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 0,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.text,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.background,
  },
  ghostButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  ghostButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
});
