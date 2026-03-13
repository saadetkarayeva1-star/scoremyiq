import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { colors, fonts, spacing } from '../theme';

const ROLES = ['Model', 'Influencer', 'Photographer', 'Creative Director', 'Stylist', 'Brand Consultant', 'Other'];

const FIELDS = [
  { key: 'name', label: 'Full Name', placeholder: 'Your name', multiline: false },
  { key: 'instagram', label: 'Instagram', placeholder: '@handle', multiline: false },
  { key: 'location', label: 'Neighborhood', placeholder: 'Silver Lake, Los Feliz, WeHo...', multiline: false },
  { key: 'referral', label: 'Who referred you?', placeholder: 'Member name or handle (optional)', multiline: false },
  { key: 'why', label: 'Why CULT?', placeholder: 'What are you here to build? Be specific. No pitches.', multiline: true },
  { key: 'bringing', label: 'What do you bring?', placeholder: 'Skills, network, energy — honest answer only.', multiline: true },
];

export default function ApplicationScreen({ onDone }) {
  const [form, setForm] = useState({
    name: '', instagram: '', location: '', referral: '', why: '', bringing: '', role: '',
  });
  const [step, setStep] = useState('form'); // form | review | submitted
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = () => {
    setStep('submitted');
    setTimeout(() => {
      onDone();
    }, 3000);
  };

  if (step === 'submitted') {
    return (
      <View style={styles.container}>
        <View style={styles.submittedContent}>
          <Text style={styles.submittedLogo}>CULT</Text>
          <View style={styles.divider} />
          <Text style={styles.submittedHeading}>Application received.</Text>
          <Text style={styles.submittedBody}>
            We review applications manually.{'\n'}
            If accepted, you'll hear from us.{'\n\n'}
            Do not follow up.
          </Text>
          <Text style={styles.submittedNote}>Entering the app now...</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.wordmark}>CULT</Text>
          <Text style={styles.headerLabel}>Application</Text>
        </View>

        <Text style={styles.intro}>
          We don't accept everyone. Answer honestly. We'll know if you don't.
        </Text>

        {/* Role selector */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>I am a</Text>
          <View style={styles.roleGrid}>
            {ROLES.map(role => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleChip,
                  form.role === role && styles.roleChipActive,
                ]}
                onPress={() => setForm(prev => ({ ...prev, role }))}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.roleChipText,
                  form.role === role && styles.roleChipTextActive,
                ]}>
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form fields */}
        {FIELDS.map(field => (
          <View key={field.key} style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              style={[
                styles.input,
                field.multiline && styles.inputMultiline,
                focusedField === field.key && styles.inputFocused,
              ]}
              value={form[field.key]}
              onChangeText={(val) => setForm(prev => ({ ...prev, [field.key]: val }))}
              placeholder={field.placeholder}
              placeholderTextColor={colors.creamDim}
              multiline={field.multiline}
              numberOfLines={field.multiline ? 4 : 1}
              onFocus={() => setFocusedField(field.key)}
              onBlur={() => setFocusedField(null)}
              autoCapitalize={field.key === 'instagram' ? 'none' : 'words'}
              returnKeyType={field.multiline ? 'default' : 'next'}
            />
          </View>
        ))}

        {/* Submit */}
        <View style={styles.submitSection}>
          <Text style={styles.disclaimer}>
            By applying, you agree to the CULT community standard.{'\n'}
            No pitching. No cold messaging. Show up when you say you will.
          </Text>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!form.name || !form.instagram || !form.role || !form.why) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!form.name || !form.instagram || !form.role || !form.why}
            activeOpacity={0.7}
          >
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDone} style={styles.skipLink}>
            <Text style={styles.skipLinkText}>Skip for now (demo)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl + spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  intro: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.creamMuted,
    lineHeight: 22,
    marginBottom: spacing.xl,
    letterSpacing: 0.2,
  },
  fieldGroup: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.cream,
    letterSpacing: 0.2,
  },
  inputMultiline: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: spacing.md,
  },
  inputFocused: {
    borderColor: colors.creamDim,
  },
  roleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  roleChip: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  roleChipActive: {
    borderColor: colors.cream,
    backgroundColor: colors.cream,
  },
  roleChipText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  roleChipTextActive: {
    color: colors.background,
  },
  submitSection: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  disclaimer: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    lineHeight: 16,
    letterSpacing: 1,
  },
  submitButton: {
    borderWidth: 1,
    borderColor: colors.cream,
    paddingVertical: spacing.md + 2,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    borderColor: colors.border,
  },
  submitButtonText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.cream,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  skipLink: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  skipLinkText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  submittedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.xl,
  },
  submittedLogo: {
    fontFamily: fonts.serif,
    fontSize: 48,
    color: colors.cream,
    letterSpacing: 12,
  },
  divider: {
    width: 32,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  submittedHeading: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.cream,
    letterSpacing: 1,
    textAlign: 'center',
  },
  submittedBody: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: colors.creamMuted,
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  submittedNote: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.creamDim,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginTop: spacing.xl,
  },
});
