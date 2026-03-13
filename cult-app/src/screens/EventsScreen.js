import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../theme';
import { EVENTS } from '../data/mockData';

function EventDetailCard({ event, onClose }) {
  const [rsvped, setRsvped] = useState(false);

  return (
    <ScrollView style={styles.detailContainer} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.detailClose} onPress={onClose}>
        <Text style={styles.detailCloseText}>← events</Text>
      </TouchableOpacity>

      <View style={styles.detailDateBlock}>
        <Text style={styles.detailDateLarge}>{event.date}</Text>
        <Text style={styles.detailTime}>{event.time}</Text>
      </View>

      <View style={styles.detailDivider} />

      <Text style={styles.detailTitle}>{event.title}</Text>

      <View style={styles.detailMeta}>
        <Text style={styles.detailMetaItem}>{event.location}</Text>
        <Text style={styles.detailMetaDot}>·</Text>
        <Text style={styles.detailMetaItem}>
          Hosted by {event.host.name}
        </Text>
      </View>

      <Text style={styles.detailDescription}>{event.description}</Text>

      <View style={styles.capacityRow}>
        <Text style={styles.capacityLabel}>capacity</Text>
        <View style={styles.capacityBar}>
          <View
            style={[
              styles.capacityFill,
              { width: `${(event.attending / event.capacity) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.capacityCount}>{event.attending}/{event.capacity}</Text>
      </View>

      <View style={styles.detailTags}>
        {event.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailDivider} />

      <View style={styles.rsvpSection}>
        {!event.rsvpOpen ? (
          <View style={styles.closedBanner}>
            <Text style={styles.closedBannerText}>This event is at capacity.</Text>
          </View>
        ) : rsvped ? (
          <View style={styles.rsvpedBanner}>
            <Text style={styles.rsvpedLabel}>you're attending</Text>
            <TouchableOpacity onPress={() => setRsvped(false)}>
              <Text style={styles.cancelRsvp}>cancel rsvp</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.rsvpButton}
              onPress={() => setRsvped(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.rsvpButtonText}>confirm attendance</Text>
            </TouchableOpacity>
            <Text style={styles.rsvpNote}>
              RSVP is binding. Canceling within 24 hours of the event counts as a no-show.
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default function EventsScreen({ navigation }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filter, setFilter] = useState('all');

  if (selectedEvent) {
    return (
      <View style={styles.container}>
        <EventDetailCard
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      </View>
    );
  }

  const filteredEvents = filter === 'open'
    ? EVENTS.filter(e => e.rsvpOpen)
    : EVENTS;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <Text style={styles.headerSub}>members only · los angeles</Text>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
          {filter === 'all' && <View style={styles.filterUnderline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => setFilter('open')}
        >
          <Text style={[styles.filterText, filter === 'open' && styles.filterTextActive]}>
            Open
          </Text>
          {filter === 'open' && <View style={styles.filterUnderline} />}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.map((event, index) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventRow}
            onPress={() => setSelectedEvent(event)}
            activeOpacity={0.8}
          >
            <View style={styles.eventDateCol}>
              <Text style={styles.eventMonth}>
                {event.date.split(' ')[1]}
              </Text>
              <Text style={styles.eventDay}>
                {event.date.split(' ')[2]?.replace(',', '') || '—'}
              </Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventMeta}>{event.time} · {event.location}</Text>
              <View style={styles.eventStatusRow}>
                <Text style={[
                  styles.eventStatus,
                  !event.rsvpOpen && styles.eventStatusClosed
                ]}>
                  {event.rsvpOpen ? `${event.capacity - event.attending} spots left` : 'full'}
                </Text>
                {event.tags.slice(0, 2).map(tag => (
                  <View key={tag} style={styles.eventTag}>
                    <Text style={styles.eventTagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Text style={styles.eventArrow}>›</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.submitEventSection}>
          <View style={styles.divider} />
          <Text style={styles.submitEventLabel}>Host an event</Text>
          <Text style={styles.submitEventText}>
            Members can propose events for the community. Approved by the CULT team.
          </Text>
          <TouchableOpacity style={styles.submitEventButton} activeOpacity={0.8}>
            <Text style={styles.submitEventButtonText}>propose an event</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 26,
    color: Colors.text,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  headerSub: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterBtn: {
    paddingVertical: 14,
    marginRight: 24,
    position: 'relative',
  },
  filterText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  filterTextActive: {
    color: Colors.text,
  },
  filterUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  eventDateCol: {
    width: 40,
    alignItems: 'center',
    marginRight: 16,
  },
  eventMonth: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  eventDay: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 20,
    color: Colors.text,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 15,
    color: Colors.text,
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  eventMeta: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  eventStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventStatus: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.accent,
    letterSpacing: 1,
    marginRight: 4,
  },
  eventStatusClosed: {
    color: Colors.textMuted,
  },
  eventTag: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  eventTagText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 8,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  eventArrow: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 18,
    color: Colors.textMuted,
    marginLeft: 8,
  },
  submitEventSection: {
    paddingTop: 24,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: 24,
  },
  submitEventLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginBottom: 8,
  },
  submitEventText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 16,
  },
  submitEventButton: {
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  submitEventButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  // Detail view
  detailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  detailClose: {
    marginBottom: 24,
  },
  detailCloseText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  detailDateBlock: {
    marginBottom: 16,
  },
  detailDateLarge: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 13,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  detailTime: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  detailDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 20,
  },
  detailTitle: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 24,
    color: Colors.text,
    letterSpacing: 0.3,
    lineHeight: 36,
    marginBottom: 10,
  },
  detailMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailMetaItem: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
  },
  detailMetaDot: {
    fontFamily: 'SpaceMono_400Regular',
    color: Colors.textMuted,
    marginHorizontal: 8,
  },
  detailDescription: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    color: Colors.textDim,
    lineHeight: 22,
    marginBottom: 20,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  capacityLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginRight: 12,
    width: 60,
  },
  capacityBar: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
    marginRight: 12,
  },
  capacityFill: {
    height: 1,
    backgroundColor: Colors.text,
  },
  capacityCount: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    width: 36,
    textAlign: 'right',
  },
  detailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
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
  rsvpSection: {
    paddingVertical: 20,
    paddingBottom: 60,
  },
  rsvpButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.text,
    alignItems: 'center',
    marginBottom: 12,
  },
  rsvpButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.background,
  },
  rsvpNote: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  closedBanner: {
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  closedBannerText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  rsvpedBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.text,
  },
  rsvpedLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.text,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  cancelRsvp: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
  },
});
