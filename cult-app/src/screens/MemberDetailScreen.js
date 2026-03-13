import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors, fonts, spacing } from '../theme';
import { useApp } from '../context/AppContext';

export default function MemberDetailScreen({ route, navigation }) {
  const { member } = route.params;
  const { setCircleState } = useApp();

  const handleRequestIntro = () => {
    setCircleState({
      active: true,
      matchedWith: member,
      step: 0,
      myAnswers: [],
      theirAnswers: [],
      meetupConfirmed: false,
      chatUnlocked: false,
    });
    navigation.navigate('Circle');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.topBarLabel}>Member</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarInitial}>{member.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.handle}>{member.handle}</Text>
          <Text style={styles.role}>{member.role}</Text>
          <Text style={styles.location}>{member.location}</Text>
        </View>

        <View style={styles.divider} />

        {/* Bio */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About</Text>
          <Text style={styles.bio}>{member.bio}</Text>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Focus</Text>
          <View style={styles.tags}>
            {member.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{member.meetupsCompleted}</Text>
            <Text style={styles.statLabel}>Meetups</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={[styles.statValue, member.strikes > 0 && styles.statValueStrike]}>
              {member.strikes}
            </Text>
            <Text style={styles.statLabel}>Strikes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{member.joinedDate}</Text>
            <Text style={styles.statLabel}>Joined</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Circle CTA */}
        <View style={styles.ctaSection}>
          <View style={styles.circleExplain}>
            <Text style={styles.circleExplainLabel}>How it works</Text>
            <Text style={styles.circleExplainText}>
              You can't message {member.name.split(' ')[0]} directly.{'\n\n'}
              Request an introduction through The Circle. Our AI will ask you each 3 questions, share your answers with each other, then schedule a meetup. Chat unlocks only after both of you confirm.
            </Text>
          </View>

          {member.strikes >= 3 ? (
            <View style={styles.bannedNotice}>
              <Text style={styles.bannedText}>
                This member is currently suspended.
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.introButton}
              onPress={handleRequestIntro}
              activeOpacity={0.7}
            >
              <Text style={styles.introButtonText}>Request Introduction via The Circle</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.creamMuted,
    letterSpacing: 1.5,
  },
  topBarLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  scroll: {
    paddingBottom: spacing.xxl,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  avatarLarge: {
    width: 88,
    height: 88,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  avatarInitial: {
    fontFamily: fonts.serif,
    fontSize: 36,
    color: colors.creamMuted,
  },
  name: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.cream,
    letterSpacing: 0.5,
  },
  handle: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.creamDim,
    letterSpacing: 1.5,
  },
  role: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: spacing.xs,
  },
  location: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xl,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  bio: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  tagText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.cream,
    letterSpacing: 0.5,
  },
  statValueStrike: {
    color: colors.strike,
  },
  statLabel: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },
  ctaSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    gap: spacing.xl,
  },
  circleExplain: {
    gap: spacing.sm,
  },
  circleExplainLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  circleExplainText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  introButton: {
    borderWidth: 1,
    borderColor: colors.cream,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
  },
  introButtonText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.cream,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  bannedNotice: {
    borderWidth: 1,
    borderColor: colors.strike,
    padding: spacing.md,
    alignItems: 'center',
  },
  bannedText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.strike,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
