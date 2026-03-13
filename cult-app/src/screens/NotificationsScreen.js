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

const NOTIFICATION_ICONS = {
  circle: '○',
  meetup: '◆',
  event: '□',
  strike: '△',
  system: '—',
};

const NOTIFICATION_COLORS = {
  circle: colors.cream,
  meetup: colors.success,
  event: colors.creamMuted,
  strike: colors.strike,
  system: colors.creamDim,
};

function NotificationItem({ notification, onPress }) {
  const icon = NOTIFICATION_ICONS[notification.type] || '—';
  const iconColor = NOTIFICATION_COLORS[notification.type] || colors.creamDim;

  return (
    <TouchableOpacity
      style={[styles.item, !notification.read && styles.itemUnread]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemLeft}>
        <Text style={[styles.icon, { color: iconColor }]}>{icon}</Text>
        {!notification.read && <View style={styles.unreadDot} />}
      </View>
      <View style={styles.itemContent}>
        <Text style={[
          styles.itemText,
          !notification.read && styles.itemTextUnread,
        ]}>
          {notification.message}
        </Text>
        <Text style={styles.itemTime}>{notification.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function NotificationsScreen({ navigation }) {
  const { notifications, markAllRead, unreadCount } = useApp();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>CULT</Text>
        <View style={styles.headerRight}>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead}>
              <Text style={styles.markReadText}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Text style={styles.unreadBannerText}>
            {unreadCount} unread
          </Text>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {notifications.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nothing here yet.</Text>
            <Text style={styles.emptySubtext}>
              Notifications will appear when The Circle matches you, meetups are confirmed, or events are announced.
            </Text>
          </View>
        ) : (
          <>
            {/* Unread group */}
            {notifications.filter(n => !n.read).length > 0 && (
              <>
                <Text style={styles.groupLabel}>New</Text>
                {notifications.filter(n => !n.read).map(notif => (
                  <NotificationItem
                    key={notif.id}
                    notification={notif}
                    onPress={() => {
                      if (notif.type === 'circle' || notif.type === 'meetup') {
                        navigation.navigate('Circle');
                      } else if (notif.type === 'event') {
                        navigation.navigate('Events');
                      }
                    }}
                  />
                ))}
              </>
            )}

            {/* Read group */}
            {notifications.filter(n => n.read).length > 0 && (
              <>
                <Text style={[styles.groupLabel, styles.groupLabelOlder]}>Earlier</Text>
                {notifications.filter(n => n.read).map(notif => (
                  <NotificationItem
                    key={notif.id}
                    notification={notif}
                    onPress={() => {}}
                  />
                ))}
              </>
            )}
          </>
        )}

        {/* System info */}
        <View style={styles.systemNote}>
          <Text style={styles.systemNoteText}>
            CULT does not send push notifications outside this inbox.{'\n'}
            Check back regularly.
          </Text>
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  markReadText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  unreadBanner: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  unreadBannerText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  scroll: {
    paddingBottom: spacing.xxl,
  },
  groupLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  groupLabelOlder: {
    color: colors.creamDim,
    opacity: 0.6,
  },
  item: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  itemUnread: {
    backgroundColor: colors.surface,
  },
  itemLeft: {
    width: 24,
    alignItems: 'center',
    paddingTop: 2,
    position: 'relative',
  },
  icon: {
    fontFamily: fonts.mono,
    fontSize: 14,
    lineHeight: 18,
  },
  unreadDot: {
    position: 'absolute',
    top: -2,
    right: -1,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cream,
  },
  itemContent: {
    flex: 1,
    gap: spacing.xs,
  },
  itemText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  itemTextUnread: {
    color: colors.cream,
  },
  itemTime: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  empty: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    gap: spacing.md,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.creamMuted,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  emptySubtext: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.creamDim,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  systemNote: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: spacing.xl,
  },
  systemNoteText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    lineHeight: 16,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
});
