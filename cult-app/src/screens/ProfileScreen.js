import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors } from '../theme';
import { MEMBERS, COLLABS } from '../data/mockData';

const { width } = Dimensions.get('window');
const ME = MEMBERS[0];

function StatBox({ label, value }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation, route }) {
  const member = route?.params?.member || ME;
  const isMe = member.id === ME.id;
  const initials = member.name.split(' ').map(n => n[0]).join('');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Back nav if viewing another profile */}
      {!isMe && (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
      )}

      {/* Hero section */}
      <View style={styles.hero}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
        <View style={styles.heroInfo}>
          <Text style={styles.name}>{member.name}</Text>
          <Text style={styles.handle}>{member.handle}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{member.role}</Text>
          </View>
        </View>
      </View>

      {/* Location + status */}
      <View style={styles.metaRow}>
        <Text style={styles.metaItem}>{member.location}</Text>
        <View style={styles.metaDot} />
        <Text style={styles.metaItem}>{member.instagram}</Text>
        {member.verified && (
          <>
            <View style={styles.metaDot} />
            <Text style={[styles.metaItem, styles.verified]}>verified</Text>
          </>
        )}
      </View>

      {/* Bio */}
      <View style={styles.bioSection}>
        <Text style={styles.bio}>{member.bio}</Text>
      </View>

      {/* Strike indicator */}
      {member.strikes > 0 && (
        <View style={styles.strikeRow}>
          <Text style={styles.strikeText}>
            {member.strikes} strike{member.strikes !== 1 ? 's' : ''} · {3 - member.strikes} remaining
          </Text>
        </View>
      )}

      {/* Tags */}
      <View style={styles.tagsSection}>
        {member.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <StatBox label="collabs" value="8" />
        <View style={styles.statDivider} />
        <StatBox label="events" value="12" />
        <View style={styles.statDivider} />
        <StatBox label="meets" value="6" />
      </View>

      {/* Actions */}
      {!isMe && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryAction}
            onPress={() => navigation.navigate('Circle')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryActionText}>connect via the circle</Text>
          </TouchableOpacity>
        </View>
      )}

      {isMe && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryAction} activeOpacity={0.8}>
            <Text style={styles.secondaryActionText}>edit profile</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Divider */}
      <View style={styles.sectionDivider} />

      {/* Activity */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Recent activity</Text>
        {COLLABS.filter(c => c.author.id === member.id).map(collab => (
          <View key={collab.id} style={styles.activityItem}>
            <Text style={styles.activityType}>{collab.type}</Text>
            <Text style={styles.activityHeadline}>{collab.headline}</Text>
            <Text style={styles.activityTime}>{collab.time}</Text>
          </View>
        ))}
        {COLLABS.filter(c => c.author.id === member.id).length === 0 && (
          <Text style={styles.emptyText}>No recent posts.</Text>
        )}
      </View>

      {/* My profile settings */}
      {isMe && (
        <>
          <View style={styles.sectionDivider} />
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            {[
              'Privacy settings',
              'Notification preferences',
              'Strike history',
              'Sign out',
            ].map(item => (
              <TouchableOpacity key={item} style={styles.settingsItem} activeOpacity={0.7}>
                <Text style={styles.settingsItemText}>{item}</Text>
                <Text style={styles.settingsArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 60,
  },
  backBtn: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarInitials: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 22,
    color: Colors.textMuted,
  },
  heroInfo: {
    flex: 1,
  },
  name: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 22,
    color: Colors.text,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  handle: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  roleBadgeText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  metaItem: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  metaDot: {
    width: 3,
    height: 3,
    backgroundColor: Colors.border,
    marginHorizontal: 8,
  },
  verified: {
    color: Colors.accent,
  },
  bioSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 16,
  },
  bio: {
    fontFamily: 'LibreBaskerville_400Regular_Italic',
    fontSize: 15,
    color: Colors.text,
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  strikeRow: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  strikeText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.accent,
    letterSpacing: 1,
  },
  tagsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 6,
    marginBottom: 20,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
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
  stats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValue: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 22,
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  actions: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  primaryAction: {
    width: '100%',
    paddingVertical: 14,
    backgroundColor: Colors.text,
    alignItems: 'center',
  },
  primaryActionText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.background,
  },
  secondaryAction: {
    width: '100%',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  secondaryActionText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  activitySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginBottom: 16,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityType: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.accent,
    marginBottom: 4,
  },
  activityHeadline: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  activityTime: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
  },
  emptyText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
  },
  settingsSection: {
    paddingHorizontal: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingsItemText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  settingsArrow: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 16,
    color: Colors.textMuted,
  },
});
