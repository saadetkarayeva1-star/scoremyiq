import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { colors, fonts, spacing } from '../theme';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    heading: 'Not\nfor\neveryone.',
    body: 'CULT is a private network for models, influencers, and creatives building something real in Los Angeles.',
    label: '01 / 04',
  },
  {
    id: 2,
    heading: 'No\ncold\ntexts.',
    body: 'The Circle — our AI — makes every introduction. It asks questions, shares answers, and sets the meetup. Chat only opens after both of you confirm.',
    label: '02 / 04',
  },
  {
    id: 3,
    heading: 'Show\nup.',
    body: 'Ghost a confirmed meetup and earn a strike. Three strikes means a 30-day ban. Cancel with notice and you\'re clean.',
    label: '03 / 04',
  },
  {
    id: 4,
    heading: 'Build\nthe\ncircle.',
    body: 'Collabs. Events. Connections. Everything curated, everything members-only. The network you\'ve always wanted to be in.',
    label: '04 / 04',
  },
];

export default function OnboardingScreen({ onDone }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideOpacity = useRef(new Animated.Value(1)).current;

  const goNext = () => {
    if (currentIndex < slides.length - 1) {
      Animated.sequence([
        Animated.timing(slideOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      setCurrentIndex(prev => prev + 1);
    } else {
      onDone();
    }
  };

  const slide = slides[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>CULT</Text>
        <TouchableOpacity onPress={onDone}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.slideContent, { opacity: slideOpacity }]}>
        <Text style={styles.label}>{slide.label}</Text>
        <Text style={styles.heading}>{slide.heading}</Text>
        <View style={styles.divider} />
        <Text style={styles.body}>{slide.body}</Text>
      </Animated.View>

      <View style={styles.footer}>
        {/* Progress dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={goNext} activeOpacity={0.7}>
          <Text style={styles.buttonText}>
            {currentIndex < slides.length - 1 ? 'Continue' : 'Apply for Access'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl + spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  wordmark: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.cream,
    letterSpacing: 6,
  },
  skip: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: spacing.xl,
  },
  heading: {
    fontFamily: fonts.serif,
    fontSize: 52,
    color: colors.cream,
    lineHeight: 58,
    letterSpacing: 1,
    marginBottom: spacing.xl,
  },
  divider: {
    width: 32,
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: spacing.xl,
  },
  body: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: colors.creamMuted,
    lineHeight: 26,
    letterSpacing: 0.3,
  },
  footer: {
    gap: spacing.lg,
  },
  dots: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  dot: {
    height: 1,
    borderRadius: 0,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.cream,
  },
  dotInactive: {
    width: 12,
    backgroundColor: colors.creamDim,
  },
  button: {
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
});
