import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../theme';
import { MEMBERS } from '../data/mockData';

const OTHER = MEMBERS[1]; // Mia
const ME = MEMBERS[0];

const INITIAL_MESSAGES = [
  {
    id: '0',
    type: 'system',
    text: 'The Circle connected you. Meetup confirmed for Tuesday, March 18 at 11 AM.',
  },
  {
    id: '1',
    sender: OTHER.id,
    text: 'Hey. Looking forward to Tuesday.',
    time: '10:32 AM',
  },
  {
    id: '2',
    sender: ME.id,
    text: 'Same. Do you have a place in mind?',
    time: '10:45 AM',
  },
  {
    id: '3',
    sender: OTHER.id,
    text: 'There\'s a cafe on Sunset I like. Low-key, no music.',
    time: '10:47 AM',
  },
  {
    id: '4',
    sender: ME.id,
    text: 'Perfect. See you there.',
    time: '10:50 AM',
  },
];

function Message({ message }) {
  if (message.type === 'system') {
    return (
      <View style={styles.systemMessage}>
        <View style={styles.systemDivider} />
        <Text style={styles.systemText}>{message.text}</Text>
        <View style={styles.systemDivider} />
      </View>
    );
  }

  const isMe = message.sender === ME.id;
  const sender = isMe ? ME : OTHER;

  return (
    <View style={[styles.messageRow, isMe && styles.messageRowMe]}>
      {!isMe && (
        <View style={styles.messageSenderAvatar}>
          <Text style={styles.messageSenderInitials}>
            {sender.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
      )}
      <View style={[styles.messageBubble, isMe && styles.messageBubbleMe]}>
        <Text style={[styles.messageText, isMe && styles.messageTextMe]}>
          {message.text}
        </Text>
        <Text style={[styles.messageTime, isMe && styles.messageTimeMe]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

export default function ChatScreen({ navigation, route }) {
  const member = route?.params?.member || OTHER;
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);
  const meetupDate = 'Tuesday, March 18 · 11 AM';

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: String(Date.now()),
      sender: ME.id,
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{member.name}</Text>
          <Text style={styles.headerMeta}>{member.role} · {member.location}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', { member })}
          style={styles.profileBtn}
        >
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Meetup banner */}
      <View style={styles.meetupBanner}>
        <Text style={styles.meetupBannerLabel}>confirmed meetup</Text>
        <Text style={styles.meetupBannerDate}>{meetupDate}</Text>
        <TouchableOpacity>
          <Text style={styles.meetupBannerAction}>reschedule</Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Message message={item} />}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
      />

      {/* Input */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="type something"
          placeholderTextColor={Colors.textMuted}
          multiline
          selectionColor={Colors.accent}
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!input.trim()}
          activeOpacity={0.7}
        >
          <Text style={styles.sendButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    paddingRight: 16,
  },
  backText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 18,
    color: Colors.textMuted,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 16,
    color: Colors.text,
    letterSpacing: 0.2,
  },
  headerMeta: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  profileBtn: {
    marginLeft: 12,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarText: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 12,
    color: Colors.textMuted,
  },
  meetupBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  meetupBannerLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.accent,
  },
  meetupBannerDate: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  meetupBannerAction: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    textDecorationLine: 'underline',
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  systemMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  systemDivider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  systemText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 16,
    flex: 3,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageSenderAvatar: {
    width: 28,
    height: 28,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageSenderInitials: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
  },
  messageBubble: {
    maxWidth: '72%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  messageBubbleMe: {
    backgroundColor: Colors.text,
    borderColor: Colors.text,
  },
  messageText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 4,
  },
  messageTextMe: {
    color: Colors.background,
  },
  messageTime: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  messageTimeMe: {
    color: Colors.textMuted,
    textAlign: 'right',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  input: {
    flex: 1,
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    color: Colors.text,
    maxHeight: 100,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 10,
    lineHeight: 20,
  },
  sendButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.text,
  },
  sendButtonDisabled: {
    borderColor: Colors.border,
  },
  sendButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 16,
    color: Colors.text,
  },
});
