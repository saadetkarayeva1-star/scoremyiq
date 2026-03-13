import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
} from 'react-native';
import { Colors } from '../theme';
import { MEMBERS } from '../data/mockData';

const CIRCLE_STAGES = {
  INTRO: 'intro',
  QUESTIONS: 'questions',
  REVEAL: 'reveal',
  SCHEDULE: 'schedule',
  CONFIRMED: 'confirmed',
};

const THE_CIRCLE_QUESTIONS = [
  'What are you working on right now that you haven\'t told anyone about yet?',
  'What kind of creative would complement what you\'re building?',
  'Where do your best ideas actually happen?',
];

const MATCH = MEMBERS[1]; // Mia Fontaine

function CircleMessage({ text, delay = 0 }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.circleMessage, { opacity, transform: [{ translateY }] }]}>
      <Text style={styles.circleLabel}>The Circle</Text>
      <Text style={styles.circleText}>{text}</Text>
    </Animated.View>
  );
}

export default function CircleScreen({ navigation }) {
  const [stage, setStage] = useState(CIRCLE_STAGES.INTRO);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [scheduledDate, setScheduledDate] = useState(null);
  const scrollRef = useRef(null);

  const PROPOSED_DATES = [
    { id: '1', label: 'Tuesday, March 18', time: '11 AM' },
    { id: '2', label: 'Wednesday, March 19', time: '2 PM' },
    { id: '3', label: 'Thursday, March 20', time: '4 PM' },
  ];

  const submitAnswer = () => {
    if (!currentAnswer.trim()) return;
    const newAnswers = [...answers, currentAnswer.trim()];
    setAnswers(newAnswers);
    setCurrentAnswer('');

    if (questionIndex < THE_CIRCLE_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStage(CIRCLE_STAGES.REVEAL);
    }
  };

  const confirmMeetup = (date) => {
    setScheduledDate(date);
    setStage(CIRCLE_STAGES.CONFIRMED);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>The Circle</Text>
        <View style={{ width: 48 }} />
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {/* INTRO STAGE */}
        {stage === CIRCLE_STAGES.INTRO && (
          <View style={styles.stageContainer}>
            <CircleMessage
              text="I've found someone worth your time."
              delay={0}
            />
            <CircleMessage
              text={`Her name is ${MATCH.name}. ${MATCH.role}. Based in ${MATCH.location}.`}
              delay={800}
            />
            <CircleMessage
              text="Before I introduce you, I need to ask you a few things. Your answers go to her. Her answers come to you."
              delay={1600}
            />

            <View style={styles.matchPreview}>
              <View style={styles.matchAvatar}>
                <Text style={styles.matchAvatarText}>
                  {MATCH.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <View style={styles.matchDetails}>
                <Text style={styles.matchName}>{MATCH.name}</Text>
                <Text style={styles.matchRole}>{MATCH.role}</Text>
                <Text style={styles.matchBio}>"{MATCH.bio}"</Text>
              </View>
            </View>

            <Animated.View style={styles.introActions}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => setStage(CIRCLE_STAGES.QUESTIONS)}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>I'm ready</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ghostButton} onPress={() => navigation.goBack()}>
                <Text style={styles.ghostButtonText}>not now</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}

        {/* QUESTIONS STAGE */}
        {stage === CIRCLE_STAGES.QUESTIONS && (
          <View style={styles.stageContainer}>
            <View style={styles.progressRow}>
              {THE_CIRCLE_QUESTIONS.map((_, i) => (
                <View
                  key={i}
                  style={[styles.progressDot, i <= questionIndex && styles.progressDotActive]}
                />
              ))}
            </View>

            <CircleMessage
              text={THE_CIRCLE_QUESTIONS[questionIndex]}
              delay={0}
            />

            <View style={styles.answerSection}>
              <TextInput
                style={styles.answerInput}
                value={currentAnswer}
                onChangeText={setCurrentAnswer}
                placeholder="..."
                placeholderTextColor={Colors.textMuted}
                multiline
                autoFocus
                selectionColor={Colors.accent}
              />
              <TouchableOpacity
                style={[styles.sendButton, !currentAnswer.trim() && styles.sendButtonDisabled]}
                onPress={submitAnswer}
                disabled={!currentAnswer.trim()}
                activeOpacity={0.8}
              >
                <Text style={styles.sendButtonText}>
                  {questionIndex === THE_CIRCLE_QUESTIONS.length - 1 ? 'submit' : 'next'}
                </Text>
              </TouchableOpacity>
            </View>

            {answers.length > 0 && (
              <View style={styles.previousAnswers}>
                {THE_CIRCLE_QUESTIONS.slice(0, questionIndex).map((q, i) => (
                  <View key={i} style={styles.prevAnswer}>
                    <Text style={styles.prevQuestion}>{q}</Text>
                    <Text style={styles.prevAnswerText}>{answers[i]}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* REVEAL STAGE */}
        {stage === CIRCLE_STAGES.REVEAL && (
          <View style={styles.stageContainer}>
            <CircleMessage text="Good." delay={0} />
            <CircleMessage
              text="She answered too. Here's what she said."
              delay={600}
            />

            <View style={styles.revealCard}>
              <View style={styles.revealHeader}>
                <Text style={styles.revealName}>{MATCH.name}</Text>
              </View>
              {THE_CIRCLE_QUESTIONS.map((q, i) => (
                <View key={i} style={styles.revealItem}>
                  <Text style={styles.revealQuestion}>{q}</Text>
                  <Text style={styles.revealAnswer}>
                    {[
                      'Something I haven\'t said out loud yet. A show. A proper one.',
                      'Someone with taste who doesn\'t need to explain their references.',
                      'In the car, driving nowhere specific.',
                    ][i]}
                  </Text>
                </View>
              ))}
            </View>

            <CircleMessage
              text="You two should meet. I already have some times."
              delay={400}
            />

            <TouchableOpacity
              style={[styles.primaryButton, { marginTop: 24 }]}
              onPress={() => setStage(CIRCLE_STAGES.SCHEDULE)}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>see proposed times</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* SCHEDULE STAGE */}
        {stage === CIRCLE_STAGES.SCHEDULE && (
          <View style={styles.stageContainer}>
            <CircleMessage
              text="Pick a time. She'll confirm. Coffee somewhere neutral."
              delay={0}
            />

            <View style={styles.scheduleOptions}>
              {PROPOSED_DATES.map(date => (
                <TouchableOpacity
                  key={date.id}
                  style={styles.dateOption}
                  onPress={() => confirmMeetup(date)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.dateLabel}>{date.label}</Text>
                  <Text style={styles.dateTime}>{date.time}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.proposeButton}>
              <Text style={styles.proposeText}>propose a different time</Text>
            </TouchableOpacity>

            <View style={styles.strikeWarning}>
              <Text style={styles.strikeWarningText}>
                Ghosting a confirmed meetup = 1 strike. 3 strikes = 30 day ban.
              </Text>
            </View>
          </View>
        )}

        {/* CONFIRMED STAGE */}
        {stage === CIRCLE_STAGES.CONFIRMED && scheduledDate && (
          <View style={styles.stageContainer}>
            <CircleMessage text="Confirmed." delay={0} />
            <CircleMessage
              text={`${MATCH.name} will be notified. When she confirms, your chat opens.`}
              delay={600}
            />

            <View style={styles.confirmedCard}>
              <Text style={styles.confirmedLabel}>meetup scheduled</Text>
              <Text style={styles.confirmedDate}>{scheduledDate.label}</Text>
              <Text style={styles.confirmedTime}>{scheduledDate.time}</Text>
              <View style={styles.confirmedWith}>
                <Text style={styles.confirmedWithText}>with {MATCH.name}</Text>
              </View>
            </View>

            <View style={styles.chatLocked}>
              <Text style={styles.chatLockedIcon}>⊘</Text>
              <Text style={styles.chatLockedText}>
                Chat unlocks when {MATCH.name} confirms.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, { marginTop: 24 }]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>back to feed</Text>
            </TouchableOpacity>
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
  backBtn: {
    width: 48,
  },
  backText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  headerTitle: {
    fontFamily: 'LibreBaskerville_400Regular_Italic',
    fontSize: 16,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 60,
  },
  stageContainer: {
    width: '100%',
  },
  // Circle messages
  circleMessage: {
    marginBottom: 20,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: Colors.accent,
  },
  circleLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.accent,
    marginBottom: 6,
  },
  circleText: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 16,
    color: Colors.text,
    lineHeight: 26,
    letterSpacing: 0.2,
  },
  // Match preview
  matchPreview: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginVertical: 24,
  },
  matchAvatar: {
    width: 56,
    height: 56,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  matchAvatarText: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 18,
    color: Colors.textMuted,
  },
  matchDetails: {
    flex: 1,
  },
  matchName: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 17,
    color: Colors.text,
    marginBottom: 2,
  },
  matchRole: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  matchBio: {
    fontFamily: 'LibreBaskerville_400Regular_Italic',
    fontSize: 12,
    color: Colors.textDim,
    lineHeight: 20,
  },
  introActions: {
    marginTop: 8,
  },
  primaryButton: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: Colors.text,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.background,
  },
  ghostButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  ghostButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  // Questions stage
  progressRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  progressDot: {
    width: 24,
    height: 1,
    backgroundColor: Colors.border,
    marginRight: 6,
  },
  progressDotActive: {
    backgroundColor: Colors.accent,
    width: 32,
  },
  answerSection: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
  },
  answerInput: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    color: Colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 12,
    lineHeight: 22,
  },
  sendButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.text,
  },
  sendButtonDisabled: {
    borderColor: Colors.border,
  },
  sendButtonText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.text,
  },
  previousAnswers: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  prevAnswer: {
    marginBottom: 16,
  },
  prevQuestion: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 6,
  },
  prevAnswerText: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 14,
    color: Colors.textDim,
    lineHeight: 22,
  },
  // Reveal stage
  revealCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    marginVertical: 20,
  },
  revealHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  revealName: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 15,
    color: Colors.text,
  },
  revealItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  revealQuestion: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    lineHeight: 16,
    marginBottom: 8,
  },
  revealAnswer: {
    fontFamily: 'LibreBaskerville_400Regular_Italic',
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },
  // Schedule stage
  scheduleOptions: {
    marginVertical: 20,
  },
  dateOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 8,
  },
  dateLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 12,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  dateTime: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  proposeButton: {
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 16,
  },
  proposeText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: Colors.textMuted,
  },
  strikeWarning: {
    paddingTop: 12,
  },
  strikeWarningText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  // Confirmed stage
  confirmedCard: {
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 20,
    alignItems: 'center',
    marginVertical: 24,
  },
  confirmedLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.accent,
    marginBottom: 12,
  },
  confirmedDate: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 4,
  },
  confirmedTime: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 14,
    color: Colors.textDim,
    marginBottom: 12,
  },
  confirmedWith: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    width: '100%',
    alignItems: 'center',
  },
  confirmedWithText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  chatLocked: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chatLockedIcon: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 16,
    color: Colors.textMuted,
    marginRight: 10,
  },
  chatLockedText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    flex: 1,
  },
});
