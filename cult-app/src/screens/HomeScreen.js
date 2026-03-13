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
import { mockMembers, mockCollabs, mockEvents } from '../context/AppContext';
import MemberCard from '../components/MemberCard';

const TABS = ['Collab', 'Events', 'Meet'];

function CollabFeed({ navigation }) {
  return (
    <View style={styles.sectionContent}>
      {mockCollabs.map(collab => (
        <View key={collab.id} style={styles.collabCard}>
          <View style={styles.collabHeader}>
            <View style={styles.collabTypeRow}>
              <View style={[
                styles.collabTypeBadge,
                collab.type === 'Offering' && styles.collabTypeBadgeOffering,
              ]}>
                <Text style={styles.collabTypeText}>{collab.type}</Text>
              </View>
              <Text style={styles.collabTime}>{collab.posted}</Text>
            </View>
          </View>
          <Text style={styles.collabTitle}>{collab.title}</Text>
          <Text style={styles.collabDetails}>{collab.details}</Text>
          <View style={styles.collabFooter}>
            <View style={styles.collabMemberRow}>
              <View style={styles.collabAvatar}>
                <Text style={styles.collabAvatarText}>{collab.member.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.collabMemberName}>{collab.member.name}</Text>
                <Text style={styles.collabMemberRole}>{collab.member.role}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.expressButton} activeOpacity={0.7}>
              <Text style={styles.expressButtonText}>Express Interest</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

function EventsFeed({ navigation }) {
  return (
    <View style={styles.sectionContent}>
      {mockEvents.map(event => (
        <View key={event.id} style={styles.eventCard}>
          <View style={styles.eventDateColumn}>
            <Text style={styles.eventDate}>{event.date.split(' ')[1]}</Text>
            <Text style={styles.eventMonth}>{event.date.split(' ')[0]}</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
            <Text style={styles.eventMeta}>{event.time}  ·  {event.location}</Text>
            <View style={styles.eventBottom}>
              <Text style={styles.eventSpots}>{event.spotsLeft} spots left</Text>
              {event.rsvpd && (
                <View style={styles.rsvpdBadge}>
                  <Text style={styles.rsvpdText}>RSVP'd</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

function MeetFeed({ navigation }) {
  return (
    <View style={styles.sectionContent}>
      <View style={styles.meetIntro}>
        <Text style={styles.meetIntroText}>
          Members open to introductions this week.
        </Text>
        <Text style={styles.meetIntroSub}>
          Tap a member, then let The Circle do the rest.
        </Text>
      </View>
      {mockMembers.map(member => (
        <MemberCard
          key={member.id}
          member={member}
          onPress={() => navigation.navigate('MemberDetail', { member })}
        />
      ))}
    </View>
  );
}

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Collab');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>CULT</Text>
        <Text style={styles.headerSub}>Los Angeles</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.tabTextActive,
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeTab === 'Collab' && <CollabFeed navigation={navigation} />}
        {activeTab === 'Events' && <EventsFeed navigation={navigation} />}
        {activeTab === 'Meet' && <MeetFeed navigation={navigation} />}
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
  headerSub: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    marginBottom: -1,
  },
  tabActive: {
    borderBottomColor: colors.cream,
  },
  tabText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  tabTextActive: {
    color: colors.cream,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  sectionContent: {
    paddingHorizontal: spacing.xl,
  },

  // Collab
  collabCard: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  collabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collabTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  collabTypeBadge: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  collabTypeBadgeOffering: {
    borderColor: colors.creamDim,
  },
  collabTypeText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  collabTime: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1,
  },
  collabTitle: {
    fontFamily: fonts.serif,
    fontSize: 17,
    color: colors.cream,
    letterSpacing: 0.3,
    lineHeight: 24,
  },
  collabDetails: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.creamMuted,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  collabFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  collabMemberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  collabAvatar: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collabAvatarText: {
    fontFamily: fonts.serif,
    fontSize: 12,
    color: colors.creamMuted,
  },
  collabMemberName: {
    fontFamily: fonts.serif,
    fontSize: 12,
    color: colors.cream,
    letterSpacing: 0.2,
  },
  collabMemberRole: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  expressButton: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  expressButtonText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },

  // Events mini feed
  eventCard: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.lg,
  },
  eventDateColumn: {
    width: 36,
    alignItems: 'center',
    paddingTop: 3,
  },
  eventDate: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.cream,
    lineHeight: 24,
  },
  eventMonth: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  eventInfo: {
    flex: 1,
    gap: 4,
  },
  eventTitle: {
    fontFamily: fonts.serif,
    fontSize: 16,
    color: colors.cream,
    letterSpacing: 0.3,
  },
  eventSubtitle: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.creamMuted,
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
  eventBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: 4,
  },
  eventSpots: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1,
  },
  rsvpdBadge: {
    borderWidth: 1,
    borderColor: colors.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  rsvpdText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.success,
    letterSpacing: 1.5,
  },

  // Meet
  meetIntro: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.sm,
  },
  meetIntroText: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: colors.cream,
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  meetIntroSub: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: spacing.sm,
  },
});
