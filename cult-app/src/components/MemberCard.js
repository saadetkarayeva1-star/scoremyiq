import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts, spacing } from '../theme';

export default function MemberCard({ member, onPress, compact = false }) {
  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {/* Avatar placeholder */}
      <View style={[styles.avatar, compact && styles.avatarCompact]}>
        <Text style={[styles.avatarInitial, compact && styles.avatarInitialCompact]}>
          {member.name.charAt(0)}
        </Text>
      </View>

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, compact && styles.nameCompact]}>{member.name}</Text>
          {member.strikes > 0 && (
            <View style={styles.strikesBadge}>
              <Text style={styles.strikesText}>{member.strikes}s</Text>
            </View>
          )}
        </View>
        <Text style={styles.role}>{member.role}</Text>
        {!compact && (
          <>
            <Text style={styles.location}>{member.location}</Text>
            <View style={styles.tags}>
              {member.tags.slice(0, 3).map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  cardCompact: {
    paddingVertical: spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  avatarCompact: {
    width: 38,
    height: 38,
  },
  avatarInitial: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.creamMuted,
  },
  avatarInitialCompact: {
    fontSize: 14,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    fontFamily: fonts.serif,
    fontSize: 16,
    color: colors.cream,
    letterSpacing: 0.3,
  },
  nameCompact: {
    fontSize: 14,
  },
  role: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  location: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  strikesBadge: {
    backgroundColor: colors.strike,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  strikesText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.cream,
    letterSpacing: 1,
  },
});
