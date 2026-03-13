import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../theme';
import CultLogo from '../components/CultLogo';
import CultInput from '../components/CultInput';

const FIELDS = [
  { key: 'name', label: 'Full name', placeholder: 'as it appears publicly' },
  { key: 'instagram', label: 'Instagram handle', placeholder: '@' },
  { key: 'city', label: 'City / neighborhood', placeholder: 'where you actually are' },
  { key: 'what_you_do', label: 'What do you do?', placeholder: 'don\'t be vague', multiline: false },
  { key: 'referral', label: 'Who referred you?', placeholder: '@handle' },
];

const ROLE_OPTIONS = [
  'Model', 'Creative Director', 'Photographer', 'Stylist',
  'Influencer', 'Brand Founder', 'Artist', 'Talent', 'Other',
];

export default function ApplyScreen({ navigation }) {
  const [form, setForm] = useState({});
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleRole = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <CultLogo size="sm" />
          <View style={styles.successBody}>
            <Text style={styles.successHeadline}>Application received.</Text>
            <View style={styles.successDivider} />
            <Text style={styles.successText}>
              We review every application personally.{'\n'}
              If you're the right fit, you'll hear from us.
            </Text>
            <Text style={styles.successMeta}>No timeline. No updates. We reach out when we're ready.</Text>
          </View>
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
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backText}>← back</Text>
          </TouchableOpacity>
          <CultLogo size="sm" style={styles.logo} />
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Request Access</Text>
          <Text style={styles.subtitle}>
            We don't accept everyone. Answer honestly.
          </Text>
        </View>

        <View style={styles.form}>
          {FIELDS.map(field => (
            <CultInput
              key={field.key}
              label={field.label}
              placeholder={field.placeholder}
              value={form[field.key] || ''}
              onChangeText={v => setForm(prev => ({ ...prev, [field.key]: v }))}
              multiline={field.multiline}
            />
          ))}

          <View style={styles.roleSection}>
            <Text style={styles.roleLabel}>What best describes you?</Text>
            <Text style={styles.roleHint}>select all that apply</Text>
            <View style={styles.roleGrid}>
              {ROLE_OPTIONS.map(role => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleTag,
                    selectedRoles.includes(role) && styles.roleTagActive,
                  ]}
                  onPress={() => toggleRole(role)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.roleTagText,
                    selectedRoles.includes(role) && styles.roleTagTextActive,
                  ]}>
                    {role}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <CultInput
            label="Why do you want in?"
            placeholder="be direct. be real."
            value={form.why || ''}
            onChangeText={v => setForm(prev => ({ ...prev, why: v }))}
            multiline
          />

          <CultInput
            label="Link us to something"
            placeholder="portfolio, showreel, anything"
            value={form.link || ''}
            onChangeText={v => setForm(prev => ({ ...prev, link: v }))}
          />

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerText}>
              By applying you acknowledge CULT is invite-only and we reserve the right to decline without reason.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitText}>submit application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  backBtn: {
    flex: 1,
  },
  backText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  logo: {
    flex: 1,
    alignItems: 'center',
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 26,
    color: Colors.text,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    lineHeight: 18,
  },
  form: {
    paddingHorizontal: 20,
  },
  roleSection: {
    marginBottom: 28,
  },
  roleLabel: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    color: Colors.textMuted,
    marginBottom: 4,
  },
  roleHint: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  roleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleTag: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 4,
  },
  roleTagActive: {
    borderColor: Colors.text,
    backgroundColor: Colors.text,
  },
  roleTagText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  roleTagTextActive: {
    color: Colors.background,
  },
  disclaimer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginBottom: 20,
  },
  disclaimerText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 9,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  submitButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: Colors.text,
    alignItems: 'center',
  },
  submitText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.background,
  },
  // Success state
  successContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  successContent: {
    alignItems: 'center',
    width: '100%',
  },
  successBody: {
    marginTop: 48,
    alignItems: 'flex-start',
    width: '100%',
  },
  successHeadline: {
    fontFamily: 'LibreBaskerville_400Regular',
    fontSize: 26,
    color: Colors.text,
    marginBottom: 16,
  },
  successDivider: {
    width: 40,
    height: 1,
    backgroundColor: Colors.accent,
    marginBottom: 20,
  },
  successText: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 13,
    color: Colors.textDim,
    lineHeight: 24,
    marginBottom: 20,
  },
  successMeta: {
    fontFamily: 'SpaceMono_400Regular',
    fontSize: 10,
    color: Colors.textMuted,
    letterSpacing: 0.5,
    lineHeight: 18,
    fontStyle: 'italic',
  },
});
