import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../theme';
import CultLogo from '../components/CultLogo';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    headline: 'Not for everyone.',
    body: 'CULT is a private network for the women who create the culture — not follow it.',
  },
  {
    id: 2,
    headline: 'By referral only.',
    body: 'Every member is vouched for. Every introduction is intentional.',
  },
  {
    id: 3,
    headline: 'The Circle connects you.',
    body: 'Our AI matchmaker reads between the lines. One coffee can change everything.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  const goNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      const next = currentSlide + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setCurrentSlide(next);
    } else {
      navigation.navigate('Apply');
    }
  };

  const handleScroll = (e) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slide);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CultLogo size="sm" />
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        style={styles.slider}
      >
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.slideContent}>
              <Text style={styles.slideNumber}>0{index + 1}</Text>
              <Text style={styles.slideHeadline}>{slide.headline}</Text>
              <View style={styles.divider} />
              <Text style={styles.slideBody}>{slide.body}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentSlide && styles.dotActive]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={goNext} activeOpacity={0.8}>
          <Text style={styles.nextButtonText}>
            {currentSlide === SLIDES.length - 1 ? 'apply' : 'next'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('Apply')}
        >
          <Text style={styles.skipText}>skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'flex-start',
  },
  slider: {
    flex: 1,
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  slideContent: {
    alignItems: 'flex-start',
  },
  slideNumber: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.accent,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  slideHeadline: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 30,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 42,
    marginBottom: 20,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.accent,
    marginBottom: 20,
  },
  slideBody: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    color: Colors.textDim,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
    alignItems: 'flex-start',
  },
  dots: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  dot: {
    width: 16,
    height: 1,
    backgroundColor: Colors.border,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: Colors.text,
    width: 32,
  },
  nextButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.text,
    alignItems: 'center',
    marginBottom: 12,
  },
  nextButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.background,
  },
  skipButton: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  skipText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
});
