import React, { useState } from 'react';
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

const EVENT_TYPE_LABELS = {
  fashion: 'Fashion',
  collab: 'Collab',
  exclusive: 'Members Only',
};

function EventCard({ event, onRsvp }) {
  return (
    <View style={styles.card}>
      {/* Type badge */}
      <View style={styles.cardTop}>
        <View style={[
          styles.typeBadge,
          event.type === 'exclusive' && styles.typeBadgeExclusive,
        ]}>
          <Text style={[
            styles.typeBadgeText,
            event.type === 'exclusive' && styles.typeBadgeTextExclusive,
          ]}>
            {EVENT_TYPE_LABELS[event.type] || event.type}
          </Text>
        </View>
        {event.spotsLeft <= 3 && (
          <View style={styles.urgencyBadge}>
            <Text style={styles.urgencyText}>{event.spotsLeft} left</Text>
          </View>
        )}
      </View>

      {/* Date + Info */}
      <View style={styles.cardBody}>
        <View style={styles.dateBlock}>
          <Text style={styles.dateDay}>{event.date.split(' ')[1]}</Text>
          <Text style={styles.dateMonth}>{event.date.split(' ')[0]}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
          <Text style={styles.eventMeta}>
            {event.time}  ·  {event.location}
          </Text>
        </View>
      </View>

      {/* RSVP */}
      <View style={styles.cardFooter}>
        <Text style={styles.spotsText}>
          {event.spotsLeft} spot{event.spotsLeft !== 1 ? 's' : ''} remaining
        </Text>
        <TouchableOpacity
          style={[
            styles.rsvpButton,
            event.rsvpd && styles.rsvpButtonActive,
          ]}
          onPress={() => onRsvp(event.id)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.rsvpButtonText,
            event.rsvpd && styles.rsvpButtonTextActive,
          ]}>
            {event.rsvpd ? 'On the list' : 'RSVP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function EventsScreen() {
  const { events, rsvpEvent } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? events
    : filter === 'rsvpd'
    ? events.filter(e => e.rsvpd)
    : events.filter(e => e.type === filter);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>CULT</Text>
        <Text style={styles.headerLabel}>Events</Text>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
        style={styles.filtersContainer}
      >
        {['all', 'rsvpd', 'fashion', 'collab', 'exclusive'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.filterChipText,
              filter === f && styles.filterChipTextActive,
            ]}>
              {f === 'all' ? 'All' : f === 'rsvpd' ? 'My RSVPs' : EVENT_TYPE_LABELS[f]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No events in this category.</Text>
          </View>
        ) : (
          filtered.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onRsvp={rsvpEvent}
            />
          ))
        )}

        {/* Upcoming hint */}
        <View style={styles.comingSoon}>
          <View style={styles.comingSoonDivider} />
          <Text style={styles.comingSoonText}>More events announced to members first.</Text>
          <View style={styles.comingSoonDivider} />
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
  headerLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  filtersContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    maxHeight: 50,
  },
  filters: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm,
    alignItems: 'center',
  },
  filterChip: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  filterChipActive: {
    borderColor: colors.cream,
    backgroundColor: colors.cream,
  },
  filterChipText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  filterChipTextActive: {
    color: colors.background,
  },
  scroll: {
    padding: spacing.xl,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  typeBadgeExclusive: {
    borderColor: colors.creamMuted,
  },
  typeBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  typeBadgeTextExclusive: {
    color: colors.creamMuted,
  },
  urgencyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    backgroundColor: colors.strike,
  },
  urgencyText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.cream,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  cardBody: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  dateBlock: {
    width: 36,
    alignItems: 'center',
    paddingTop: 3,
  },
  dateDay: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.cream,
    lineHeight: 28,
  },
  dateMonth: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 3,
  },
  eventInfo: {
    flex: 1,
    gap: 4,
  },
  eventTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.cream,
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  eventSubtitle: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.creamMuted,
    lineHeight: 19,
    letterSpacing: 0.2,
  },
  eventMeta: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.xs,
  },
  spotsText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
  },
  rsvpButton: {
    borderWidth: 1,
    borderColor: colors.creamDim,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  rsvpButtonActive: {
    borderColor: colors.success,
    backgroundColor: 'transparent',
  },
  rsvpButtonText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  rsvpButtonTextActive: {
    color: colors.success,
  },
  comingSoon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  comingSoonDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  comingSoonText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textAlign: 'center',
    flexShrink: 1,
  },
  empty: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamDim,
    letterSpacing: 0.3,
  },
});
