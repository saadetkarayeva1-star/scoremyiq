import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../theme';
import { NOTIFICATIONS } from '../data/mockData';

const ICON_MAP = {
  circle: '⊙',
  event: '◇',
  collab: '○',
  meetup: '◉',
  system: '—',
};

const TYPE_LABEL = {
  circle: 'The Circle',
  event: 'Event',
  collab: 'Collab',
  meetup: 'Meetup',
  system: 'System',
};

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotifPress = (notif) => {
    setNotifications(prev =>
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );

    if (notif.type === 'circle' || notif.type === 'meetup') {
      navigation.navigate('Circle');
    } else if (notif.type === 'event') {
      navigation.navigate('Events');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markRead}>mark all read</Text>
          </TouchableOpacity>
        )}
        {unreadCount === 0 && <View style={{ width: 80 }} />}
      </View>

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <Text style={styles.unreadBannerText}>{unreadCount} unread</Text>
        </View>
      )}

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notif, index) => (
          <TouchableOpacity
            key={notif.id}
            style={[
              styles.notifItem,
              !notif.read && styles.notifItemUnread,
              index === notifications.length - 1 && styles.notifItemLast,
            ]}
            onPress={() => handleNotifPress(notif)}
            activeOpacity={0.75}
          >
            <View style={styles.notifIconCol}>
              <Text style={[
                styles.notifIcon,
                notif.type === 'circle' && styles.notifIconCircle,
              ]}>
                {ICON_MAP[notif.type]}
              </Text>
            </View>
            <View style={styles.notifContent}>
              <Text style={styles.notifType}>{TYPE_LABEL[notif.type]}</Text>
              <Text style={[
                styles.notifText,
                !notif.read && styles.notifTextUnread,
              ]}>
                {notif.text}
              </Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            {!notif.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}

        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nothing yet.</Text>
          </View>
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
  backBtn: {},
  backText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  headerTitle: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 17,
    color: Colors.text,
    letterSpacing: 0.3,
  },
  markRead: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
  unreadBanner: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  unreadBannerText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.accent,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 40,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    position: 'relative',
  },
  notifItemUnread: {
    backgroundColor: Colors.surface,
  },
  notifItemLast: {
    borderBottomWidth: 0,
  },
  notifIconCol: {
    width: 28,
    paddingTop: 2,
  },
  notifIcon: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 14,
    color: Colors.textMuted,
  },
  notifIconCircle: {
    color: Colors.accent,
  },
  notifContent: {
    flex: 1,
  },
  notifType: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginBottom: 4,
  },
  notifText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
    marginBottom: 6,
  },
  notifTextUnread: {
    color: Colors.text,
  },
  notifTime: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  unreadDot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.accent,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  emptyState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'LibreBaskerville_400Regular_Italic',
    fontSize: 16,
    color: Colors.textMuted,
  },
});
