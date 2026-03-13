import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors } from '../theme';
import { COLLABS, EVENTS, MEET_SUGGESTIONS } from '../data/mockData';
import CultLogo from '../components/CultLogo';

const TABS = ['Collab', 'Events', 'Meet'];

function MemberAvatar({ member, size = 40 }) {
  const initials = member.name.split(' ').map(n => n[0]).join('');
  return (
    <View style={[styles.avatar, { width: size, height: size }]}>
      <Text style={[styles.avatarText, { fontSize: size * 0.32 }]}>{initials}</Text>
    </View>
  );
}

function CollabCard({ item, navigation }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.85}>
      <View style={styles.cardHeader}>
        <MemberAvatar member={item.author} size={36} />
        <View style={styles.cardHeaderInfo}>
          <Text style={styles.cardAuthor}>{item.author.name}</Text>
          <Text style={styles.cardMeta}>{item.author.role} · {item.time}</Text>
        </View>
        <View style={styles.typeTag}>
          <Text style={styles.typeTagText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.cardHeadline}>{item.headline}</Text>
      <Text style={styles.cardBody}>{item.body}</Text>
      <View style={styles.cardTags}>
        {item.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.cardSaves}>{item.saves} saved</Text>
        <TouchableOpacity style={styles.respondButton}>
          <Text style={styles.respondText}>respond</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function EventCard({ item, navigation }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Events')}
    >
      <View style={styles.eventDateBadge}>
        <Text style={styles.eventDateText}>{item.date.split(',')[1]?.trim() || item.date}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
      <Text style={styles.cardHeadline}>{item.title}</Text>
      <Text style={styles.cardMeta}>{item.location}</Text>
      <Text style={styles.cardBody}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.cardSaves}>
          {item.attending}/{item.capacity} attending
        </Text>
        {item.rsvpOpen ? (
          <TouchableOpacity style={styles.respondButton}>
            <Text style={styles.respondText}>rsvp</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.closedText}>closed</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

function MeetCard({ item, navigation }) {
  return (
    <TouchableOpacity
      style={[styles.card, styles.meetCard]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('Circle')}
    >
      <View style={styles.circleHeader}>
        <Text style={styles.circleLabel}>The Circle suggests</Text>
      </View>
      <View style={styles.meetRow}>
        <MemberAvatar member={item.member} size={52} />
        <View style={styles.meetInfo}>
          <Text style={styles.meetName}>{item.member.name}</Text>
          <Text style={styles.meetRole}>{item.member.role}</Text>
          <Text style={styles.meetLocation}>{item.member.location}</Text>
        </View>
      </View>
      <View style={styles.matchNote}>
        <Text style={styles.matchReason}>{item.matchReason}</Text>
        <Text style={styles.circleNote}>"{item.circleNote}"</Text>
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.declineButton}>
          <Text style={styles.declineText}>pass</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.respondButton}>
          <Text style={styles.respondText}>connect</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeFeedScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Collab');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <CultLogo size="sm" />
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={styles.notifBtn}
        >
          <View style={styles.notifDot} />
          <Text style={styles.notifIcon}>⊙</Text>
        </TouchableOpacity>
      </View>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Feed */}
      <ScrollView
        style={styles.feed}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'Collab' && (
          <>
            <View style={styles.feedHeader}>
              <Text style={styles.feedHeadline}>Collaborations</Text>
              <TouchableOpacity>
                <Text style={styles.feedAction}>+ post</Text>
              </TouchableOpacity>
            </View>
            {COLLABS.map(item => (
              <CollabCard key={item.id} item={item} navigation={navigation} />
            ))}
          </>
        )}

        {activeTab === 'Events' && (
          <>
            <View style={styles.feedHeader}>
              <Text style={styles.feedHeadline}>Upcoming</Text>
            </View>
            {EVENTS.map(item => (
              <EventCard key={item.id} item={item} navigation={navigation} />
            ))}
          </>
        )}

        {activeTab === 'Meet' && (
          <>
            <View style={styles.feedHeader}>
              <Text style={styles.feedHeadline}>Your matches</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Circle')}>
                <Text style={styles.feedAction}>the circle</Text>
              </TouchableOpacity>
            </View>
            {MEET_SUGGESTIONS.map(item => (
              <MeetCard key={item.id} item={item} navigation={navigation} />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  notifBtn: {
    position: 'relative',
    padding: 4,
  },
  notifDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    backgroundColor: Colors.accent,
    zIndex: 1,
  },
  notifIcon: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 18,
    color: Colors.textMuted,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingHorizontal: 20,
  },
  tab: {
    marginRight: 28,
    paddingVertical: 14,
    position: 'relative',
  },
  tabText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.text,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.text,
  },
  feed: {
    flex: 1,
  },
  feedContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  feedHeadline: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 20,
    color: Colors.text,
    letterSpacing: 0.3,
  },
  feedAction: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.accent,
  },
  // Cards
  card: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 12,
  },
  meetCard: {
    borderColor: Colors.borderLight,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontFamily: 'LibreBaskerville_400Regular',
    color: Colors.textMuted,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardAuthor: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  cardMeta: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  typeTag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeTagText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 8,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  cardHeadline: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 16,
    color: Colors.text,
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  cardBody: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    color: Colors.textDim,
    lineHeight: 20,
    marginBottom: 12,
  },
  cardTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
  },
  cardSaves: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
  },
  respondButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.text,
  },
  respondText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.text,
  },
  declineButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  declineText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  closedText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  // Event card specifics
  eventDateBadge: {
    marginBottom: 10,
  },
  eventDateText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.accent,
  },
  eventTime: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  // Meet card specifics
  circleHeader: {
    marginBottom: 12,
  },
  circleLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.accent,
  },
  meetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  meetInfo: {
    marginLeft: 12,
  },
  meetName: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 17,
    color: Colors.text,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  meetRole: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  meetLocation: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
  },
  matchNote: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.accent,
    paddingLeft: 12,
    marginBottom: 14,
  },
  matchReason: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textDim,
    marginBottom: 4,
  },
  circleNote: {
    fontFamily: 'LibreBaskerville_400Regular_Italic',
    fontSize: 13,
    color: Colors.text,
  },
});
