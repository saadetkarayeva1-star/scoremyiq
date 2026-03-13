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

function StatBox({ value, label }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const { currentUser, circleState } = useApp();

  const strikes = currentUser.strikes;
  const strikesRemaining = 3 - strikes;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.wordmark}>CULT</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile card */}
        <View style={styles.profileSection}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarInitial}>{currentUser.name.charAt(0)}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{currentUser.name}</Text>
            <Text style={styles.handle}>{currentUser.handle}</Text>
            <Text style={styles.role}>{currentUser.role}</Text>
            <Text style={styles.location}>{currentUser.location}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Bio */}
        <View style={styles.bioSection}>
          <Text style={styles.sectionLabel}>About</Text>
          <Text style={styles.bioText}>{currentUser.bio}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagsSection}>
          <Text style={styles.sectionLabel}>Specialties</Text>
          <View style={styles.tags}>
            {currentUser.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatBox value={currentUser.meetupsCompleted} label="Meetups" />
          <View style={styles.statDivider} />
          <StatBox value={strikesRemaining} label="Strikes left" />
          <View style={styles.statDivider} />
          <StatBox value={currentUser.joinedDate} label="Member since" />
        </View>

        <View style={styles.divider} />

        {/* Strike system explanation */}
        <View style={styles.strikeSection}>
          <Text style={styles.sectionLabel}>Strike System</Text>
          <View style={styles.strikeRow}>
            {[0, 1, 2].map(i => (
              <View
                key={i}
                style={[
                  styles.strikeIndicator,
                  i < strikes ? styles.strikeIndicatorActive : styles.strikeIndicatorInactive,
                ]}
              >
                <Text style={[
                  styles.strikeIndicatorText,
                  i < strikes && styles.strikeIndicatorTextActive,
                ]}>
                  {i + 1}
                </Text>
              </View>
            ))}
            <Text style={styles.strikeExplain}>
              {strikes === 0
                ? 'Clean record.'
                : strikes === 1
                ? '1 strike. Ghost once more and it counts.'
                : strikes === 2
                ? '2 strikes. One more means a 30-day ban.'
                : '3 strikes. Account suspended for 30 days.'}
            </Text>
          </View>
          <Text style={styles.strikePolicySummary}>
            Ghost a meetup = 1 strike. Cancel with 24h notice = no strike.{'\n'}
            3 strikes = 30-day ban.
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Circle status */}
        <View style={styles.circleStatusSection}>
          <Text style={styles.sectionLabel}>The Circle</Text>
          {circleState.active ? (
            <View style={styles.circleActiveCard}>
              <Text style={styles.circleActiveHeading}>Introduction in progress</Text>
              <Text style={styles.circleActiveBody}>
                You've been matched with {circleState.matchedWith?.name || 'a member'}.{' '}
                The Circle is collecting your answers.
              </Text>
            </View>
          ) : (
            <Text style={styles.circleInactiveText}>
              No active introductions.{'\n'}
              Visit The Circle tab to get matched.
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Settings links */}
        <View style={styles.settingsSection}>
          {['Availability', 'Collab preferences', 'Notification settings', 'Log out'].map((item, i) => (
            <TouchableOpacity key={item} style={styles.settingsRow} activeOpacity={0.7}>
              <Text style={[
                styles.settingsText,
                item === 'Log out' && styles.settingsTextDanger,
              ]}>
                {item}
              </Text>
              <Text style={styles.settingsArrow}>→</Text>
            </TouchableOpacity>
          ))}
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
  scroll: {
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  wordmark: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.cream,
    letterSpacing: 6,
  },
  editText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: spacing.lg,
    alignItems: 'flex-start',
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  avatarInitial: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.creamMuted,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
    paddingTop: 4,
  },
  name: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.cream,
    letterSpacing: 0.5,
  },
  handle: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.creamDim,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  role: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  location: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: spacing.xl,
  },
  bioSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  sectionLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  bioText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  tagsSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
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
    fontSize: 20,
    color: colors.cream,
    letterSpacing: 0.5,
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
    height: 36,
    backgroundColor: colors.border,
  },
  strikeSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  strikeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  strikeIndicator: {
    width: 28,
    height: 28,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  strikeIndicatorActive: {
    borderColor: colors.strike,
    backgroundColor: colors.strike,
  },
  strikeIndicatorInactive: {
    borderColor: colors.border,
  },
  strikeIndicatorText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.creamDim,
    letterSpacing: 1,
  },
  strikeIndicatorTextActive: {
    color: colors.cream,
  },
  strikeExplain: {
    flex: 1,
    fontFamily: fonts.serif,
    fontSize: 12,
    color: colors.creamMuted,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  strikePolicySummary: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    lineHeight: 15,
    letterSpacing: 1,
  },
  circleStatusSection: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  circleActiveCard: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    gap: spacing.sm,
  },
  circleActiveHeading: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.cream,
    letterSpacing: 0.3,
  },
  circleActiveBody: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.creamMuted,
    lineHeight: 20,
  },
  circleInactiveText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  settingsSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsText: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: colors.cream,
    letterSpacing: 0.2,
  },
  settingsTextDanger: {
    color: colors.creamDim,
  },
  settingsArrow: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.creamDim,
  },
});
