import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, fonts, spacing } from '../theme';
import { useApp } from '../context/AppContext';

const INITIAL_MESSAGES = [
  {
    id: '0',
    role: 'system',
    text: 'Chat unlocked after confirmed meetup via The Circle.',
    time: null,
  },
];

export default function ChatScreen({ route, navigation }) {
  const { member, circleSummary } = route.params || {};
  const { circleState } = useApp();
  const resolvedMember = member || circleState.matchedWith;

  const [messages, setMessages] = useState([
    ...INITIAL_MESSAGES,
    {
      id: '1',
      role: 'them',
      text: 'Hey — saw your answers. The editorial grief thing sounds interesting actually.',
      time: '2m ago',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: String(Date.now()),
      role: 'me',
      text: inputText.trim(),
      time: 'now',
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate a reply after a short delay
    setTimeout(() => {
      const reply = {
        id: String(Date.now() + 1),
        role: 'them',
        text: getAutoReply(inputText.trim()),
        time: 'just now',
      };
      setMessages(prev => [...prev, reply]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1200);

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const getAutoReply = (input) => {
    const replies = [
      'That makes sense. Let\'s figure out logistics.',
      'Agreed. I\'ll bring the film camera.',
      'Works for me. Silver Lake is fine.',
      'Yes — exactly what I was thinking.',
      'Send me a time that works and I\'ll be there.',
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  if (!resolvedMember) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.lockedContainer}>
          <Text style={styles.lockedTitle}>Chat Locked</Text>
          <Text style={styles.lockedBody}>
            Complete a Circle introduction and confirm a meetup to unlock chat.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerName}>{resolvedMember.name}</Text>
            <Text style={styles.headerMeta}>Meetup confirmed · Chat open</Text>
          </View>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>{resolvedMember.name.charAt(0)}</Text>
          </View>
        </View>

        {/* Circle context banner */}
        {circleSummary && (
          <View style={styles.contextBanner}>
            <Text style={styles.contextBannerLabel}>Circle summary</Text>
            <Text style={styles.contextBannerText}>
              You've each seen the other's answers. Keep it real.
            </Text>
          </View>
        )}

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(msg => {
            if (msg.role === 'system') {
              return (
                <View key={msg.id} style={styles.systemMessage}>
                  <Text style={styles.systemMessageText}>{msg.text}</Text>
                </View>
              );
            }

            const isMe = msg.role === 'me';
            return (
              <View
                key={msg.id}
                style={[
                  styles.messageBubbleRow,
                  isMe ? styles.messageBubbleRowMe : styles.messageBubbleRowThem,
                ]}
              >
                {!isMe && (
                  <View style={styles.msgAvatar}>
                    <Text style={styles.msgAvatarText}>{resolvedMember.name.charAt(0)}</Text>
                  </View>
                )}
                <View style={[
                  styles.bubble,
                  isMe ? styles.bubbleMe : styles.bubbleThem,
                ]}>
                  <Text style={[
                    styles.bubbleText,
                    isMe && styles.bubbleTextMe,
                  ]}>
                    {msg.text}
                  </Text>
                  {msg.time && (
                    <Text style={[
                      styles.bubbleTime,
                      isMe && styles.bubbleTimeMe,
                    ]}>
                      {msg.time}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Meetup reminder */}
        <View style={styles.meetupReminder}>
          <Text style={styles.meetupReminderText}>
            Meetup pending · Ghost = 1 strike
          </Text>
        </View>

        {/* Input */}
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Message..."
            placeholderTextColor={colors.creamDim}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerCenter: {
    alignItems: 'center',
    gap: 2,
  },
  headerName: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: colors.cream,
    letterSpacing: 0.3,
  },
  headerMeta: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.success,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.creamMuted,
  },
  contextBanner: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    gap: 3,
  },
  contextBannerLabel: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  contextBannerText: {
    fontFamily: fonts.serif,
    fontSize: 12,
    color: colors.creamMuted,
    letterSpacing: 0.2,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: spacing.xl,
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  systemMessage: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  systemMessageText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  messageBubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  messageBubbleRowMe: {
    justifyContent: 'flex-end',
  },
  messageBubbleRowThem: {
    justifyContent: 'flex-start',
  },
  msgAvatar: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  msgAvatarText: {
    fontFamily: fonts.serif,
    fontSize: 11,
    color: colors.creamMuted,
  },
  bubble: {
    maxWidth: '78%',
    padding: spacing.md,
    gap: 4,
  },
  bubbleThem: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubbleMe: {
    backgroundColor: colors.surfaceRaised,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  bubbleText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  bubbleTextMe: {
    color: colors.cream,
  },
  bubbleTime: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 1,
  },
  bubbleTimeMe: {
    textAlign: 'right',
  },
  meetupReminder: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  meetupReminderText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  inputArea: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.md,
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.cream,
    maxHeight: 100,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  sendButton: {
    borderWidth: 1,
    borderColor: colors.cream,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    alignSelf: 'flex-end',
  },
  sendButtonDisabled: {
    borderColor: colors.border,
  },
  sendButtonText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.cream,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  lockedTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.cream,
    letterSpacing: 0.5,
  },
  lockedBody: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});
