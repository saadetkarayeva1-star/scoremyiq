export const colors = {
  background: '#0e0c0a',
  surface: '#161412',
  surfaceRaised: '#1c1916',
  cream: '#f2ede6',
  creamMuted: '#a89f94',
  creamDim: '#6b6460',
  accent: '#f2ede6',
  strike: '#8b3a3a',
  success: '#4a6741',
  border: '#2a2520',
  borderLight: '#3a332d',
};

export const fonts = {
  serif: 'LibreBaskerville_400Regular',
  serifBold: 'LibreBaskerville_700Bold',
  mono: 'SpaceMono_400Regular',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const typography = {
  display: {
    fontFamily: fonts.serif,
    fontSize: 36,
    color: colors.cream,
    letterSpacing: 2,
  },
  heading: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.cream,
    letterSpacing: 1,
  },
  subheading: {
    fontFamily: fonts.serif,
    fontSize: 16,
    color: colors.cream,
    letterSpacing: 0.5,
  },
  body: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.cream,
    lineHeight: 22,
  },
  label: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.creamMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  labelSm: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.creamMuted,
    letterSpacing: 1,
  },
};
