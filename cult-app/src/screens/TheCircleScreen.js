import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import { colors, fonts, spacing } from '../theme';
import { useApp, mockMembers } from '../context/AppContext';

const CIRCLE_QUESTIONS = [
  'What are you building right now that you haven\'t talked about publicly?',
  'What kind of person do you actually want to meet — be specific.',
  'What do you want someone to know about you before they sit down with you?',
];

// Simulate the other member's AI-generated answers
const generateTheirAnswers = (memberName) => [
  `I'm developing a concept editorial project — fashion as grief. It's strange and I love it.`,
  `Someone who has an actual vision, not just a mood board. Execution matters.`,
  `I show up on time and I'm direct. I don't do performative networking.`,
];

function CircleMessage({ role, text, delay = 0 }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.message,
        role === 'circle' ? styles.messageCircle : styles.messageUser,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      {role === 'circle' && (
        <Text style={styles.messageRole}>The Circle</Text>
      )}
      <Text style={[
        styles.messageText,
        role === 'user' && styles.messageTextUser,
      ]}>
        {text}
      </Text>
    </Animated.View>
  );
}

export default function TheCircleScreen({ navigation }) {
  const { circleState, setCircleState } = useApp();
  const scrollRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [uiStep, setUiStep] = useState(0);
  const [localState, setLocalState] = useState({
    messages: [],
    questionIndex: 0,
    myAnswers: [],
    phase: 'idle', // idle | intro | questions | reveal | schedule | confirmed
  });

  // Start flow
  const handleStart = () => {
    const match = mockMembers[Math.floor(Math.random() * mockMembers.length)];
    setCircleState(prev => ({ ...prev, active: true, matchedWith: match }));

    const introMessages = [
      {
        role: 'circle',
        text: `Welcome to The Circle.\n\nI've identified a member whose work and focus aligns with yours. Before I make this introduction, I need to understand both of you better.`,
      },
      {
        role: 'circle',
        text: `I'll ask you 3 questions. Answer honestly. I'll ask them the same questions. Once I have both sets of answers, I'll share them — then we'll schedule a time for you to meet in person.`,
      },
      {
        role: 'circle',
        text: `Ready? Here's your first question:\n\n${CIRCLE_QUESTIONS[0]}`,
      },
    ];

    setLocalState({
      messages: introMessages,
      questionIndex: 0,
      myAnswers: [],
      phase: 'questions',
      match,
    });
  };

  const handleSubmitAnswer = () => {
    if (!inputText.trim()) return;

    const answer = inputText.trim();
    const newAnswers = [...localState.myAnswers, answer];
    const nextQIndex = localState.questionIndex + 1;

    const userMessage = { role: 'user', text: answer };

    if (nextQIndex < CIRCLE_QUESTIONS.length) {
      const nextQuestion = {
        role: 'circle',
        text: CIRCLE_QUESTIONS[nextQIndex],
      };
      setLocalState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage, nextQuestion],
        questionIndex: nextQIndex,
        myAnswers: newAnswers,
      }));
    } else {
      // All answered — move to reveal
      const theirAnswers = generateTheirAnswers(localState.match?.name);

      const revealMessages = [
        { role: 'user', text: answer },
        {
          role: 'circle',
          text: `Thank you. I've now collected answers from both of you.\n\nHere is what ${localState.match?.name?.split(' ')[0] || 'your match'} said:`,
        },
        {
          role: 'circle',
          text: `On what they're building:\n"${theirAnswers[0]}"`,
        },
        {
          role: 'circle',
          text: `On who they want to meet:\n"${theirAnswers[1]}"`,
        },
        {
          role: 'circle',
          text: `What they want you to know:\n"${theirAnswers[2]}"`,
        },
        {
          role: 'circle',
          text: `Based on your answers, I believe this is a worthwhile introduction.\n\nProposed meetup: Coffee, next week, Silver Lake or Los Feliz.\n\nConfirm below to proceed. If you confirm and ghost, you receive a strike.`,
        },
      ];

      setLocalState(prev => ({
        ...prev,
        messages: [...prev.messages, ...revealMessages],
        myAnswers: newAnswers,
        phase: 'reveal',
        theirAnswers,
      }));
    }

    setInputText('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const handleConfirmMeetup = () => {
    const confirmMessages = [
      {
        role: 'circle',
        text: `Meetup confirmed.\n\nI've notified ${localState.match?.name?.split(' ')[0]}. You both agreed to meet. Chat is now unlocked.\n\nDo not ghost. Your reputation in CULT depends on it.`,
      },
    ];

    setLocalState(prev => ({
      ...prev,
      messages: [...prev.messages, ...confirmMessages],
      phase: 'confirmed',
    }));

    setCircleState(prev => ({
      ...prev,
      meetupConfirmed: true,
      chatUnlocked: true,
      theirAnswers: localState.theirAnswers,
      myAnswers: localState.myAnswers,
    }));
  };

  const handleOpenChat = () => {
    navigation.navigate('Chat', {
      member: localState.match,
      circleSummary: {
        myAnswers: localState.myAnswers,
        theirAnswers: localState.theirAnswers,
      },
    });
  };

  // Idle state
  if (!circleState.active && localState.phase === 'idle') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.wordmark}>CULT</Text>
          <Text style={styles.headerLabel}>The Circle</Text>
        </View>

        <View style={styles.idleContent}>
          <View style={styles.circleSymbol}>
            <Text style={styles.circleSymbolText}>○</Text>
          </View>
          <Text style={styles.idleHeading}>The Circle</Text>
          <View style={styles.idleDivider} />
          <Text style={styles.idleBody}>
            No cold messages.{'\n\n'}
            The Circle introduces you to one member at a time. It asks you both three questions, shares your answers, then schedules an in-person meetup.{'\n\n'}
            Chat only opens once both of you confirm.
          </Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStart}
            activeOpacity={0.7}
          >
            <Text style={styles.startButtonText}>Begin Introduction</Text>
          </TouchableOpacity>

          <Text style={styles.idleNote}>
            You will be matched with one member.{'\n'}
            Introductions are one at a time.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>CULT</Text>
        <Text style={styles.headerLabel}>The Circle</Text>
      </View>

      {localState.match && (
        <View style={styles.matchBar}>
          <View style={styles.matchAvatar}>
            <Text style={styles.matchAvatarText}>
              {localState.match.name.charAt(0)}
            </Text>
          </View>
          <View>
            <Text style={styles.matchName}>{localState.match.name}</Text>
            <Text style={styles.matchRole}>{localState.match.role}</Text>
          </View>
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {localState.messages.map((msg, i) => (
          <CircleMessage
            key={i}
            role={msg.role}
            text={msg.text}
            delay={msg.role === 'circle' ? (i % 3) * 100 : 0}
          />
        ))}

        {/* Action buttons at bottom of messages */}
        {localState.phase === 'reveal' && (
          <View style={styles.confirmBlock}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmMeetup}
              activeOpacity={0.7}
            >
              <Text style={styles.confirmButtonText}>Confirm Meetup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton} activeOpacity={0.7}>
              <Text style={styles.declineButtonText}>Decline (no strike)</Text>
            </TouchableOpacity>
          </View>
        )}

        {localState.phase === 'confirmed' && (
          <TouchableOpacity
            style={styles.chatButton}
            onPress={handleOpenChat}
            activeOpacity={0.7}
          >
            <Text style={styles.chatButtonText}>Open Chat</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Input */}
      {localState.phase === 'questions' && (
        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Your answer..."
            placeholderTextColor={colors.creamDim}
            multiline
            maxLength={400}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            onPress={handleSubmitAnswer}
            disabled={!inputText.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
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

  // Idle
  idleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  circleSymbol: {
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  circleSymbolText: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.creamDim,
  },
  idleHeading: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.cream,
    letterSpacing: 1,
    textAlign: 'center',
  },
  idleDivider: {
    width: 32,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  idleBody: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  startButton: {
    borderWidth: 1,
    borderColor: colors.cream,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xxl,
    marginTop: spacing.md,
  },
  startButtonText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.cream,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  idleNote: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textAlign: 'center',
    lineHeight: 16,
  },

  // Match bar
  matchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  matchAvatar: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchAvatarText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
  },
  matchName: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.cream,
    letterSpacing: 0.2,
  },
  matchRole: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: 2,
  },

  // Messages
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: spacing.xl,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  message: {
    maxWidth: '88%',
    gap: spacing.xs,
  },
  messageCircle: {
    alignSelf: 'flex-start',
  },
  messageUser: {
    alignSelf: 'flex-end',
  },
  messageRole: {
    fontFamily: fonts.mono,
    fontSize: 8,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  messageText: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 22,
    letterSpacing: 0.2,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageTextUser: {
    color: colors.cream,
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.borderLight,
    textAlign: 'right',
  },

  // Confirm block
  confirmBlock: {
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  confirmButton: {
    borderWidth: 1,
    borderColor: colors.cream,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.cream,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  declineButton: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  declineButtonText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  chatButton: {
    borderWidth: 1,
    borderColor: colors.cream,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  chatButtonText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.cream,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },

  // Input
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
});
