import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput,
  SafeAreaView, Animated, KeyboardAvoidingView, Platform, Dimensions,
} from 'react-native';

// ─── THEME ──────────────────────────────────────────────────────────────────
const C = {
  bg: '#0e0c0a', surface: '#161412', raised: '#1c1916',
  cream: '#f2ede6', muted: '#a89f94', dim: '#6b6460',
  border: '#2a2520', borderL: '#3a332d',
  strike: '#8b3a3a', ok: '#4a6741',
};
const T = {
  serif: 'Georgia',
  mono: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
};
const label = (extra) => ({ fontFamily: T.mono, fontSize: 9, color: C.dim, letterSpacing: 2, textTransform: 'uppercase', ...extra });
const serif = (size, color = C.cream, extra = {}) => ({ fontFamily: T.serif, fontSize: size, color, ...extra });

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const MEMBERS = [
  { id: '1', name: 'Valentina Cruz', handle: '@valentina', role: 'Model / Creative Director', location: 'Los Feliz', bio: 'Documenting the in-between moments. Open to editorial, campaign, and concept work.', tags: ['editorial', 'campaign', 'art direction'], strikes: 0, meetups: 4, joined: 'Jan 2024' },
  { id: '2', name: 'Naomi Solis', handle: '@naomisolis', role: 'Influencer / Stylist', location: 'Silver Lake', bio: 'Style is a form of autobiography. Collabing on lookbooks, reels, and brand partnerships.', tags: ['fashion', 'styling', 'content'], strikes: 0, meetups: 7, joined: 'Feb 2024' },
  { id: '3', name: 'Ines Park', handle: '@inespark', role: 'Photographer', location: 'West Hollywood', bio: 'Film and digital. Beauty, fashion, portrait. Looking for models with a strong editorial eye.', tags: ['photography', 'film', 'beauty'], strikes: 0, meetups: 12, joined: 'Dec 2023' },
  { id: '4', name: 'Raia Thompson', handle: '@raiath', role: 'Brand Consultant', location: 'Echo Park', bio: 'Building brand narratives for emerging labels and creatives.', tags: ['branding', 'strategy'], strikes: 1, meetups: 3, joined: 'Mar 2024' },
];
const COLLABS = [
  { id: '1', member: MEMBERS[2], type: 'Looking For', title: 'Model for editorial shoot', details: 'Unpaid, print rights shared. Film camera. Moodboard available.', posted: '2h ago' },
  { id: '2', member: MEMBERS[1], type: 'Offering', title: 'Styling for campaign or lookbook', details: 'Rate negotiable. Serious inquiries only.', posted: '5h ago' },
  { id: '3', member: MEMBERS[3], type: 'Looking For', title: 'Creative director / art direction', details: 'Paid. Brand: emerging swimwear label. Q2 campaign.', posted: '1d ago' },
];
const EVENTS = [
  { id: '1', title: 'Private Preview', subtitle: 'Maison Marais S/S Collection', date: 'Mar 18', time: '7 PM', location: 'Arts District', type: 'fashion', spots: 6, rsvpd: false },
  { id: '2', title: 'Rooftop Edit Session', subtitle: 'Content creation + drinks', date: 'Mar 22', time: '5 PM', location: 'Silver Lake', type: 'collab', spots: 12, rsvpd: true },
  { id: '3', title: 'The CULT Dinner', subtitle: 'Members only, invite only', date: 'Apr 1', time: '8 PM', location: 'Undisclosed', type: 'exclusive', spots: 2, rsvpd: false },
];
const NOTIFS = [
  { id: '1', type: 'circle', msg: 'The Circle has introduced you to Ines Park.', time: '10m ago', read: false },
  { id: '2', type: 'meetup', msg: 'Your meetup with Naomi Solis is confirmed. Chat is now open.', time: '2h ago', read: false },
  { id: '3', type: 'event', msg: 'You\'re on the list for Rooftop Edit Session.', time: '1d ago', read: true },
  { id: '4', type: 'strike', msg: 'Raia Thompson missed your meetup. They received a strike.', time: '3d ago', read: true },
];
const CIRCLE_QS = [
  'What are you building right now that you haven\'t talked about publicly?',
  'What kind of person do you actually want to meet — be specific.',
  'What do you want someone to know about you before they sit down with you?',
];

// ─── CONTEXT ─────────────────────────────────────────────────────────────────
const Ctx = createContext(null);
function AppProvider({ children }) {
  const [events, setEvents] = useState(EVENTS);
  const [notifs, setNotifs] = useState(NOTIFS);
  const [circle, setCircle] = useState({ active: false, match: null, chatUnlocked: false });
  const unread = notifs.filter(n => !n.read).length;
  const rsvp = (id) => setEvents(p => p.map(e => e.id === id ? { ...e, rsvpd: !e.rsvpd } : e));
  const markRead = () => setNotifs(p => p.map(n => ({ ...n, read: true })));
  return <Ctx.Provider value={{ events, rsvp, notifs, markRead, unread, circle, setCircle }}>{children}</Ctx.Provider>;
}
const useApp = () => useContext(Ctx);

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
const Wordmark = () => <Text style={serif(18, C.cream, { letterSpacing: 6 })}>CULT</Text>;
const Divider = ({ mx = 24 }) => <View style={{ height: 1, backgroundColor: C.border, marginHorizontal: mx }} />;
const Tag = ({ t }) => (
  <View style={{ borderWidth: 1, borderColor: C.border, paddingHorizontal: 8, paddingVertical: 3 }}>
    <Text style={label()}>{t}</Text>
  </View>
);

// ─── SCREEN: SPLASH ──────────────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const op = useRef(new Animated.Value(0)).current;
  const sc = useRef(new Animated.Value(0.92)).current;
  const op2 = useRef(new Animated.Value(0)).current;
  const op3 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.timing(op, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(sc, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
      Animated.delay(400),
      Animated.timing(op2, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.delay(400),
      Animated.timing(op3, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);
  return (
    <View style={[s.fill, { justifyContent: 'space-between', paddingVertical: 64, backgroundColor: C.bg }]}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ opacity: op, transform: [{ scale: sc }], alignItems: 'center' }}>
          <Text style={serif(64, C.cream, { letterSpacing: 16 })}>CULT</Text>
          <View style={{ width: 40, height: 1, backgroundColor: C.dim, marginTop: 16 }} />
        </Animated.View>
        <Animated.Text style={[serif(15, C.muted, { textAlign: 'center', lineHeight: 26, marginTop: 24 }), { opacity: op2 }]}>
          A members-only creator network.{'\n'}Los Angeles.
        </Animated.Text>
      </View>
      <Animated.View style={{ opacity: op3, paddingHorizontal: 32, gap: 16 }}>
        <TouchableOpacity style={[s.btn]} onPress={onDone} activeOpacity={0.7}>
          <Text style={label({ color: C.cream })}>Request Access</Text>
        </TouchableOpacity>
        <Text style={[label({ textAlign: 'center', fontSize: 8 })]}>By invitation or application only.</Text>
      </Animated.View>
    </View>
  );
}

// ─── SCREEN: ONBOARDING ───────────────────────────────────────────────────────
const SLIDES = [
  { n: '01 / 04', h: 'Not\nfor\neveryone.', b: 'CULT is a private network for models, influencers, and creatives building something real in Los Angeles.' },
  { n: '02 / 04', h: 'No\ncold\ntexts.', b: 'The Circle — our AI — makes every introduction. It asks questions, shares answers, and sets the meetup. Chat only opens after both of you confirm.' },
  { n: '03 / 04', h: 'Show\nup.', b: 'Ghost a confirmed meetup and earn a strike. Three strikes means a 30-day ban. Cancel with notice and you\'re clean.' },
  { n: '04 / 04', h: 'Build\nthe\ncircle.', b: 'Collabs. Events. Connections. Everything curated, everything members-only.' },
];
function OnboardingScreen({ onDone }) {
  const [i, setI] = useState(0);
  const op = useRef(new Animated.Value(1)).current;
  const next = () => {
    if (i < SLIDES.length - 1) {
      Animated.sequence([
        Animated.timing(op, { toValue: 0, duration: 180, useNativeDriver: true }),
        Animated.timing(op, { toValue: 1, duration: 280, useNativeDriver: true }),
      ]).start();
      setI(p => p + 1);
    } else onDone();
  };
  const sl = SLIDES[i];
  return (
    <View style={[s.fill, { paddingHorizontal: 32, paddingTop: 60, paddingBottom: 48, backgroundColor: C.bg }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 48 }}>
        <Wordmark />
        <TouchableOpacity onPress={onDone}><Text style={label()}>Skip</Text></TouchableOpacity>
      </View>
      <Animated.View style={{ flex: 1, justifyContent: 'center', opacity: op }}>
        <Text style={label({ marginBottom: 24 })}>{sl.n}</Text>
        <Text style={serif(50, C.cream, { lineHeight: 56, letterSpacing: 1, marginBottom: 24 })}>{sl.h}</Text>
        <View style={{ width: 32, height: 1, backgroundColor: C.borderL, marginBottom: 24 }} />
        <Text style={serif(15, C.muted, { lineHeight: 26 })}>{sl.b}</Text>
      </Animated.View>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
          {SLIDES.map((_, idx) => <View key={idx} style={{ height: 1, width: idx === i ? 24 : 12, backgroundColor: idx === i ? C.cream : C.dim }} />)}
        </View>
        <TouchableOpacity style={s.btn} onPress={next} activeOpacity={0.7}>
          <Text style={label({ color: C.cream })}>{i < SLIDES.length - 1 ? 'Continue' : 'Apply for Access'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── SCREEN: APPLICATION ─────────────────────────────────────────────────────
const ROLES = ['Model', 'Influencer', 'Photographer', 'Creative Director', 'Stylist', 'Brand Consultant'];
function ApplicationScreen({ onDone }) {
  const [form, setForm] = useState({ name: '', ig: '', role: '', why: '', bringing: '' });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  if (submitted) return (
    <View style={[s.fill, { justifyContent: 'center', alignItems: 'center', gap: 24, paddingHorizontal: 32, backgroundColor: C.bg }]}>
      <Text style={serif(48, C.cream, { letterSpacing: 12 })}>CULT</Text>
      <View style={{ width: 32, height: 1, backgroundColor: C.borderL }} />
      <Text style={serif(22, C.cream, { textAlign: 'center' })}>Application received.</Text>
      <Text style={serif(14, C.muted, { textAlign: 'center', lineHeight: 24 })}>We review applications manually.{'\n'}If accepted, you'll hear from us.{'\n\n'}Do not follow up.</Text>
      <TouchableOpacity style={[s.btn, { marginTop: 16, paddingHorizontal: 32 }]} onPress={onDone} activeOpacity={0.7}>
        <Text style={label({ color: C.cream })}>Enter App</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <KeyboardAvoidingView style={[s.fill, { backgroundColor: C.bg }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 32, paddingTop: 60, paddingBottom: 64 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <Wordmark /><Text style={label()}>Application</Text>
        </View>
        <Text style={serif(14, C.muted, { lineHeight: 22, marginBottom: 24 })}>We don't accept everyone. Answer honestly. We'll know if you don't.</Text>
        <Text style={label({ marginBottom: 8 })}>I am a</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {ROLES.map(r => (
            <TouchableOpacity key={r} style={[{ borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 6 }, form.role === r && { borderColor: C.cream, backgroundColor: C.cream }]} onPress={() => set('role', r)} activeOpacity={0.7}>
              <Text style={label({ color: form.role === r ? C.bg : C.dim })}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {[['Full Name', 'name', false], ['Instagram', 'ig', false], ['Why CULT?', 'why', true], ['What do you bring?', 'bringing', true]].map(([lbl, key, multi]) => (
          <View key={key} style={{ marginBottom: 20 }}>
            <Text style={label({ marginBottom: 6 })}>{lbl}</Text>
            <TextInput
              style={[{ backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, paddingHorizontal: 16, paddingVertical: 14, fontFamily: T.serif, fontSize: 14, color: C.cream }, multi && { height: 96, textAlignVertical: 'top' }]}
              value={form[key]} onChangeText={v => set(key, v)} multiline={multi}
              placeholderTextColor={C.dim} placeholder={multi ? 'Be specific. No pitches.' : ''}
            />
          </View>
        ))}
        <TouchableOpacity style={[s.btn, (!form.name || !form.ig || !form.role || !form.why) && { borderColor: C.border }]} onPress={() => setSubmitted(true)} disabled={!form.name || !form.ig || !form.role || !form.why} activeOpacity={0.7}>
          <Text style={label({ color: (!form.name || !form.ig || !form.role || !form.why) ? C.dim : C.cream })}>Submit Application</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDone} style={{ alignItems: 'center', marginTop: 16 }}>
          <Text style={label({ fontSize: 9 })}>Skip for demo</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── SCREEN: HOME FEED ────────────────────────────────────────────────────────
function HomeScreen({ setScreen, setDetailMember }) {
  const [tab, setTab] = useState('Collab');
  const { events, rsvp } = useApp();
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}><Wordmark /><Text style={label()}>Los Angeles</Text></View>
      <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.border }}>
        {['Collab', 'Events', 'Meet'].map(t => (
          <TouchableOpacity key={t} style={[{ flex: 1, paddingVertical: 14, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: tab === t ? C.cream : 'transparent', marginBottom: -1 }]} onPress={() => setTab(t)} activeOpacity={0.7}>
            <Text style={label({ color: tab === t ? C.cream : C.dim })}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}>
        {tab === 'Collab' && COLLABS.map(c => (
          <View key={c.id} style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: C.border, gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ borderWidth: 1, borderColor: C.border, paddingHorizontal: 8, paddingVertical: 3 }}><Text style={label()}>{c.type}</Text></View>
              <Text style={label({ letterSpacing: 1 })}>{c.posted}</Text>
            </View>
            <Text style={serif(17, C.cream, { lineHeight: 24 })}>{c.title}</Text>
            <Text style={serif(13, C.muted, { lineHeight: 20 })}>{c.details}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{ width: 28, height: 28, borderWidth: 1, borderColor: C.border, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={serif(11, C.muted)}>{c.member.name.charAt(0)}</Text>
                </View>
                <Text style={serif(12, C.cream)}>{c.member.name}</Text>
              </View>
              <TouchableOpacity style={{ borderWidth: 1, borderColor: C.borderL, paddingHorizontal: 12, paddingVertical: 5 }} activeOpacity={0.7}>
                <Text style={label({ fontSize: 8 })}>Express Interest</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {tab === 'Events' && events.map(e => (
          <View key={e.id} style={{ flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: C.border, gap: 20 }}>
            <View style={{ width: 36, alignItems: 'center', paddingTop: 3 }}>
              <Text style={serif(22, C.cream, { lineHeight: 24 })}>{e.date.split(' ')[1]}</Text>
              <Text style={label({ fontSize: 8, marginTop: 2 })}>{e.date.split(' ')[0]}</Text>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={serif(16, C.cream)}>{e.title}</Text>
              <Text style={serif(13, C.muted)}>{e.subtitle}</Text>
              <Text style={label({ letterSpacing: 1.5, marginTop: 4 })}>{e.time} · {e.location}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <Text style={label({ fontSize: 8 })}>{e.spots} spots left</Text>
                {e.rsvpd && <View style={{ borderWidth: 1, borderColor: C.ok, paddingHorizontal: 6, paddingVertical: 2 }}><Text style={label({ color: C.ok, fontSize: 8 })}>RSVP'd</Text></View>}
              </View>
            </View>
          </View>
        ))}
        {tab === 'Meet' && (
          <>
            <View style={{ paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border, marginBottom: 8 }}>
              <Text style={serif(15, C.cream, { lineHeight: 22 })}>Members open to introductions this week.</Text>
              <Text style={label({ marginTop: 8 })}>Tap a member, then let The Circle do the rest.</Text>
            </View>
            {MEMBERS.map(m => (
              <TouchableOpacity key={m.id} style={{ flexDirection: 'row', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: C.border, gap: 16 }} onPress={() => { setDetailMember(m); setScreen('detail'); }} activeOpacity={0.75}>
                <View style={{ width: 52, height: 52, borderWidth: 1, borderColor: C.borderL, justifyContent: 'center', alignItems: 'center', backgroundColor: C.surface }}>
                  <Text style={serif(20, C.muted)}>{m.name.charAt(0)}</Text>
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text style={serif(16, C.cream)}>{m.name}</Text>
                  <Text style={label({ marginTop: 2 })}>{m.role}</Text>
                  <Text style={label({ letterSpacing: 1.5 })}>{m.location}</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                    {m.tags.map(t => <Tag key={t} t={t} />)}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── SCREEN: MEMBER DETAIL ────────────────────────────────────────────────────
function MemberDetailScreen({ member, onBack, setScreen }) {
  const { setCircle } = useApp();
  const requestIntro = () => {
    setCircle({ active: true, match: member, chatUnlocked: false });
    setScreen('circle');
  };
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={onBack}><Text style={label()}>← Back</Text></TouchableOpacity>
        <Text style={label()}>Member</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        <View style={{ alignItems: 'center', paddingVertical: 40, paddingHorizontal: 24, gap: 8 }}>
          <View style={{ width: 88, height: 88, borderWidth: 1, borderColor: C.borderL, justifyContent: 'center', alignItems: 'center', backgroundColor: C.surface, marginBottom: 8 }}>
            <Text style={serif(36, C.muted)}>{member.name.charAt(0)}</Text>
          </View>
          <Text style={serif(22, C.cream, { letterSpacing: 0.5 })}>{member.name}</Text>
          <Text style={label()}>{member.handle}</Text>
          <Text style={label({ marginTop: 4 })}>{member.role}</Text>
          <Text style={label({ letterSpacing: 1.5 })}>{member.location}</Text>
        </View>
        <Divider />
        <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
          <Text style={label({ marginBottom: 8 })}>About</Text>
          <Text style={serif(14, C.muted, { lineHeight: 22 })}>{member.bio}</Text>
        </View>
        <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
          <Text style={label({ marginBottom: 8 })}>Focus</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {member.tags.map(t => <Tag key={t} t={t} />)}
          </View>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 20 }}>
          {[['meetups', 'Meetups'], ['strikes', 'Strikes'], ['joined', 'Joined']].map(([k, l], idx) => (
            <React.Fragment key={k}>
              {idx > 0 && <View style={{ width: 1, height: 32, backgroundColor: C.border, alignSelf: 'center' }} />}
              <View style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                <Text style={serif(18, k === 'strikes' && member.strikes > 0 ? C.strike : C.cream)}>{member[k]}</Text>
                <Text style={label({ fontSize: 8 })}>{l}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
        <Divider />
        <View style={{ paddingHorizontal: 24, paddingTop: 28, gap: 20 }}>
          <Text style={serif(14, C.muted, { lineHeight: 22 })}>
            You can't message {member.name.split(' ')[0]} directly.{'\n\n'}
            Request an introduction through The Circle. Our AI will ask you each 3 questions, share your answers, then schedule a meetup. Chat only unlocks after both of you confirm.
          </Text>
          <TouchableOpacity style={s.btn} onPress={requestIntro} activeOpacity={0.7}>
            <Text style={label({ color: C.cream, textAlign: 'center' })}>Request Introduction via The Circle</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── SCREEN: THE CIRCLE ───────────────────────────────────────────────────────
const THEIR_ANSWERS = [
  'I\'m developing a concept editorial project — fashion as grief. It\'s strange and I love it.',
  'Someone who has an actual vision, not just a mood board. Execution matters.',
  'I show up on time and I\'m direct. I don\'t do performative networking.',
];
function CircleScreen({ setScreen }) {
  const { circle, setCircle } = useApp();
  const scrollRef = useRef(null);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [phase, setPhase] = useState('idle');

  const start = () => {
    setMsgs([
      { r: 'c', t: 'Welcome to The Circle.\n\nI\'ve identified a member whose work aligns with yours. Before I make the introduction, I need to understand both of you.' },
      { r: 'c', t: 'I\'ll ask you 3 questions. Answer honestly. I\'ll ask them the same. Once I have both sets, I\'ll share them — then we\'ll schedule your in-person meetup.' },
      { r: 'c', t: `Ready? First question:\n\n${CIRCLE_QS[0]}` },
    ]);
    setPhase('q');
  };

  const send = () => {
    if (!input.trim()) return;
    const ans = input.trim();
    const newA = [...answers, ans];
    const next = qIdx + 1;
    const newMsgs = [...msgs, { r: 'u', t: ans }];
    if (next < CIRCLE_QS.length) {
      newMsgs.push({ r: 'c', t: CIRCLE_QS[next] });
      setQIdx(next);
    } else {
      newMsgs.push(
        { r: 'c', t: `Thank you. I've collected answers from both of you.\n\nHere is what ${circle.match?.name?.split(' ')[0]} said:` },
        { r: 'c', t: `On what they're building:\n"${THEIR_ANSWERS[0]}"` },
        { r: 'c', t: `On who they want to meet:\n"${THEIR_ANSWERS[1]}"` },
        { r: 'c', t: `What they want you to know:\n"${THEIR_ANSWERS[2]}"` },
        { r: 'c', t: 'Based on your answers, this is a worthwhile introduction.\n\nProposed meetup: Coffee, next week, Silver Lake or Los Feliz.\n\nConfirm below. If you ghost, you receive a strike.' },
      );
      setPhase('confirm');
    }
    setMsgs(newMsgs);
    setAnswers(newA);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const confirm = () => {
    setMsgs(p => [...p,
      { r: 'c', t: `Meetup confirmed.\n\nI've notified ${circle.match?.name?.split(' ')[0]}. Chat is now unlocked.\n\nDo not ghost. Your reputation depends on it.` },
    ]);
    setCircle(p => ({ ...p, chatUnlocked: true }));
    setPhase('done');
  };

  if (phase === 'idle') return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}><Wordmark /><Text style={label()}>The Circle</Text></View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, gap: 20 }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, borderWidth: 1, borderColor: C.borderL, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={serif(28, C.dim)}>○</Text>
        </View>
        <Text style={serif(26, C.cream, { letterSpacing: 1 })}>The Circle</Text>
        <View style={{ width: 32, height: 1, backgroundColor: C.borderL }} />
        <Text style={serif(14, C.muted, { textAlign: 'center', lineHeight: 24 })}>
          No cold messages.{'\n\n'}The Circle introduces you to one member at a time. It asks you both three questions, shares your answers, then schedules an in-person meetup.{'\n\n'}Chat only opens once both of you confirm.
        </Text>
        <TouchableOpacity style={[s.btn, { paddingHorizontal: 32, marginTop: 8 }]} onPress={start} activeOpacity={0.7}>
          <Text style={label({ color: C.cream })}>Begin Introduction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}><Wordmark /><Text style={label()}>The Circle</Text></View>
      {circle.match && (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.surface }}>
          <View style={{ width: 32, height: 32, borderWidth: 1, borderColor: C.borderL, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={serif(13, C.muted)}>{circle.match.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={serif(13, C.cream)}>{circle.match.name}</Text>
            <Text style={label({ fontSize: 8, marginTop: 1 })}>{circle.match.role}</Text>
          </View>
        </View>
      )}
      <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 24, gap: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        {msgs.map((m, i) => (
          <View key={i} style={{ maxWidth: '88%', alignSelf: m.r === 'u' ? 'flex-end' : 'flex-start', gap: 4 }}>
            {m.r === 'c' && <Text style={label({ fontSize: 8, marginBottom: 2 })}>The Circle</Text>}
            <View style={{ padding: 14, borderWidth: 1, borderColor: m.r === 'u' ? C.borderL : C.border, backgroundColor: m.r === 'u' ? C.raised : C.surface }}>
              <Text style={serif(14, m.r === 'u' ? C.cream : C.muted, { lineHeight: 22 })}>{m.t}</Text>
            </View>
          </View>
        ))}
        {phase === 'confirm' && (
          <View style={{ gap: 12, marginTop: 8 }}>
            <TouchableOpacity style={s.btn} onPress={confirm} activeOpacity={0.7}>
              <Text style={label({ color: C.cream })}>Confirm Meetup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ alignItems: 'center', paddingVertical: 12 }} activeOpacity={0.7}>
              <Text style={label()}>Decline (no strike)</Text>
            </TouchableOpacity>
          </View>
        )}
        {phase === 'done' && (
          <TouchableOpacity style={[s.btn, { marginTop: 8 }]} onPress={() => setScreen('chat')} activeOpacity={0.7}>
            <Text style={label({ color: C.cream })}>Open Chat</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {phase === 'q' && (
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.border, paddingHorizontal: 24, paddingVertical: 12, gap: 12, alignItems: 'flex-end', backgroundColor: C.surface }}>
          <TextInput style={{ flex: 1, fontFamily: T.serif, fontSize: 14, color: C.cream, maxHeight: 90 }} value={input} onChangeText={setInput} placeholder="Your answer..." placeholderTextColor={C.dim} multiline />
          <TouchableOpacity style={[{ borderWidth: 1, borderColor: input.trim() ? C.cream : C.border, paddingHorizontal: 12, paddingVertical: 7 }]} onPress={send} disabled={!input.trim()} activeOpacity={0.7}>
            <Text style={label({ color: input.trim() ? C.cream : C.dim })}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── SCREEN: CHAT ─────────────────────────────────────────────────────────────
const REPLIES = [
  'That makes sense. Let\'s figure out logistics.',
  'Agreed. I\'ll bring the film camera.',
  'Works for me. Silver Lake is fine.',
  'Yes — exactly what I was thinking.',
  'Send me a time and I\'ll be there.',
];
function ChatScreen({ setScreen }) {
  const { circle } = useApp();
  const [msgs, setMsgs] = useState([
    { id: '0', r: 'sys', t: 'Chat unlocked after confirmed meetup via The Circle.' },
    { id: '1', r: 'them', t: 'Hey — saw your answers. The editorial grief thing sounds interesting actually.' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const send = () => {
    if (!input.trim()) return;
    const t = input.trim();
    setMsgs(p => [...p, { id: Date.now().toString(), r: 'me', t }]);
    setInput('');
    setTimeout(() => {
      setMsgs(p => [...p, { id: (Date.now() + 1).toString(), r: 'them', t: REPLIES[Math.floor(Math.random() * REPLIES.length)] }]);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1100);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);
  };
  if (!circle.chatUnlocked) return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => setScreen('circle')}><Text style={label()}>← Back</Text></TouchableOpacity>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, gap: 16 }}>
        <Text style={serif(22, C.cream)}>Chat Locked</Text>
        <Text style={serif(14, C.muted, { textAlign: 'center', lineHeight: 22 })}>Complete a Circle introduction and confirm a meetup to unlock chat.</Text>
        <TouchableOpacity style={[s.btn, { paddingHorizontal: 24, marginTop: 8 }]} onPress={() => setScreen('circle')} activeOpacity={0.7}>
          <Text style={label({ color: C.cream })}>Go to The Circle</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={[s.header, { justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={() => setScreen('circle')}><Text style={label()}>← Back</Text></TouchableOpacity>
          <View style={{ alignItems: 'center', gap: 2 }}>
            <Text style={serif(15, C.cream)}>{circle.match?.name}</Text>
            <Text style={label({ color: C.ok, fontSize: 8 })}>Meetup confirmed · Chat open</Text>
          </View>
          <View style={{ width: 32, height: 32, borderWidth: 1, borderColor: C.borderL, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={serif(13, C.muted)}>{circle.match?.name?.charAt(0)}</Text>
          </View>
        </View>
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: 24, gap: 12, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
          {msgs.map(m => m.r === 'sys' ? (
            <View key={m.id} style={{ alignItems: 'center', paddingVertical: 8 }}>
              <Text style={label({ fontSize: 8, textAlign: 'center' })}>{m.t}</Text>
            </View>
          ) : (
            <View key={m.id} style={{ flexDirection: 'row', justifyContent: m.r === 'me' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
              {m.r === 'them' && <View style={{ width: 26, height: 26, borderWidth: 1, borderColor: C.border, justifyContent: 'center', alignItems: 'center' }}><Text style={serif(10, C.muted)}>{circle.match?.name?.charAt(0)}</Text></View>}
              <View style={{ maxWidth: '78%', padding: 14, borderWidth: 1, borderColor: m.r === 'me' ? C.borderL : C.border, backgroundColor: m.r === 'me' ? C.raised : C.surface }}>
                <Text style={serif(14, m.r === 'me' ? C.cream : C.muted, { lineHeight: 21 })}>{m.t}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={{ borderTopWidth: 1, borderTopColor: C.border, paddingHorizontal: 24, paddingVertical: 10, flexDirection: 'row', gap: 12, alignItems: 'flex-end', backgroundColor: C.surface }}>
          <TextInput style={{ flex: 1, fontFamily: T.serif, fontSize: 14, color: C.cream, maxHeight: 90 }} value={input} onChangeText={setInput} placeholder="Message..." placeholderTextColor={C.dim} multiline />
          <TouchableOpacity style={{ borderWidth: 1, borderColor: input.trim() ? C.cream : C.border, paddingHorizontal: 12, paddingVertical: 7 }} onPress={send} disabled={!input.trim()} activeOpacity={0.7}>
            <Text style={label({ color: input.trim() ? C.cream : C.dim })}>Send</Text>
          </TouchableOpacity>
        </View>
        <View style={{ paddingVertical: 6, alignItems: 'center', borderTopWidth: 1, borderTopColor: C.border }}>
          <Text style={label({ fontSize: 7 })}>Meetup pending · Ghost = 1 strike</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── SCREEN: EVENTS ───────────────────────────────────────────────────────────
function EventsScreen() {
  const { events, rsvp } = useApp();
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? events : filter === 'rsvpd' ? events.filter(e => e.rsvpd) : events.filter(e => e.type === filter);
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}><Wordmark /><Text style={label()}>Events</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10, gap: 8 }} style={{ borderBottomWidth: 1, borderBottomColor: C.border, maxHeight: 48 }}>
        {['all', 'rsvpd', 'fashion', 'collab', 'exclusive'].map(f => (
          <TouchableOpacity key={f} style={[{ borderWidth: 1, borderColor: C.border, paddingHorizontal: 12, paddingVertical: 5 }, filter === f && { borderColor: C.cream, backgroundColor: C.cream }]} onPress={() => setFilter(f)} activeOpacity={0.7}>
            <Text style={label({ color: filter === f ? C.bg : C.dim })}>{f === 'all' ? 'All' : f === 'rsvpd' ? 'My RSVPs' : f.charAt(0).toUpperCase() + f.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 24, gap: 16 }}>
        {shown.map(e => (
          <View key={e.id} style={{ borderWidth: 1, borderColor: C.border, padding: 20, gap: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ borderWidth: 1, borderColor: C.border, paddingHorizontal: 8, paddingVertical: 3 }}><Text style={label({ fontSize: 8 })}>{e.type}</Text></View>
              {e.spots <= 3 && <View style={{ backgroundColor: C.strike, paddingHorizontal: 8, paddingVertical: 3 }}><Text style={label({ color: C.cream, fontSize: 8 })}>{e.spots} left</Text></View>}
            </View>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <View style={{ alignItems: 'center', paddingTop: 3 }}>
                <Text style={serif(24, C.cream, { lineHeight: 26 })}>{e.date.split(' ')[1]}</Text>
                <Text style={label({ fontSize: 7, marginTop: 2 })}>{e.date.split(' ')[0]}</Text>
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={serif(17, C.cream)}>{e.title}</Text>
                <Text style={serif(13, C.muted)}>{e.subtitle}</Text>
                <Text style={label({ marginTop: 4, letterSpacing: 1.5 })}>{e.time} · {e.location}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: C.border, paddingTop: 12 }}>
              <Text style={label({ fontSize: 8 })}>{e.spots} spots remaining</Text>
              <TouchableOpacity style={{ borderWidth: 1, borderColor: e.rsvpd ? C.ok : C.dim, paddingHorizontal: 14, paddingVertical: 6 }} onPress={() => rsvp(e.id)} activeOpacity={0.7}>
                <Text style={label({ color: e.rsvpd ? C.ok : C.dim, fontSize: 8 })}>{e.rsvpd ? 'On the list' : 'RSVP'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── SCREEN: PROFILE ──────────────────────────────────────────────────────────
function ProfileScreen({ setScreen }) {
  const { circle } = useApp();
  const u = { name: 'Sofia Laurent', handle: '@sofialaurent', role: 'Model / Influencer', location: 'Los Feliz', bio: 'Cult member since January 2024.', tags: ['editorial', 'lifestyle', 'content'], strikes: 0, meetups: 2, joined: 'Jan 2024' };
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}><Wordmark /><Text style={label()}>Edit</Text></View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 28, gap: 20 }}>
          <View style={{ width: 72, height: 72, borderWidth: 1, borderColor: C.borderL, justifyContent: 'center', alignItems: 'center', backgroundColor: C.surface }}>
            <Text style={serif(28, C.muted)}>{u.name.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1, gap: 4, paddingTop: 4 }}>
            <Text style={serif(20, C.cream, { letterSpacing: 0.5 })}>{u.name}</Text>
            <Text style={label({ letterSpacing: 1.5 })}>{u.handle}</Text>
            <Text style={label({ marginTop: 4 })}>{u.role}</Text>
            <Text style={label({ letterSpacing: 1.5 })}>{u.location}</Text>
          </View>
        </View>
        <Divider />
        <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
          <Text style={label({ marginBottom: 8 })}>About</Text>
          <Text style={serif(14, C.muted, { lineHeight: 22 })}>{u.bio}</Text>
        </View>
        <View style={{ paddingHorizontal: 24, paddingBottom: 20 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {u.tags.map(t => <Tag key={t} t={t} />)}
          </View>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 20 }}>
          {[['2', 'Meetups'], ['3', 'Strikes left'], ['Jan 2024', 'Member since']].map(([v, l], i) => (
            <React.Fragment key={l}>
              {i > 0 && <View style={{ width: 1, height: 32, backgroundColor: C.border, alignSelf: 'center' }} />}
              <View style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                <Text style={serif(18, C.cream)}>{v}</Text>
                <Text style={label({ fontSize: 8 })}>{l}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>
        <Divider />
        <View style={{ paddingHorizontal: 24, paddingVertical: 20 }}>
          <Text style={label({ marginBottom: 12 })}>Strike System</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {[0, 1, 2].map(i => (
              <View key={i} style={{ width: 28, height: 28, borderWidth: 1, borderColor: i < u.strikes ? C.strike : C.border, backgroundColor: i < u.strikes ? C.strike : 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={label({ color: i < u.strikes ? C.cream : C.dim, fontSize: 10 })}>{i + 1}</Text>
              </View>
            ))}
            <Text style={serif(12, C.muted, { flex: 1, lineHeight: 18 })}>Clean record.</Text>
          </View>
          <Text style={label({ marginTop: 12, lineHeight: 15 })}>Ghost = 1 strike. Cancel with notice = no strike. 3 strikes = 30-day ban.</Text>
        </View>
        <Divider />
        <View style={{ paddingHorizontal: 24, paddingTop: 20 }}>
          <Text style={label({ marginBottom: 12 })}>The Circle</Text>
          {circle.active
            ? <Text style={serif(14, C.muted, { lineHeight: 22 })}>Introduction in progress with {circle.match?.name}.</Text>
            : <Text style={serif(14, C.muted, { lineHeight: 22 })}>No active introductions.{'\n'}Visit The Circle tab to get matched.</Text>}
        </View>
        <Divider mx={0} />
        <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
          {['Availability', 'Collab preferences', 'Notification settings', 'Log out'].map(item => (
            <TouchableOpacity key={item} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border }} activeOpacity={0.7}>
              <Text style={serif(15, item === 'Log out' ? C.dim : C.cream)}>{item}</Text>
              <Text style={serif(12, C.dim)}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── SCREEN: NOTIFICATIONS ────────────────────────────────────────────────────
const NICONS = { circle: '○', meetup: '◆', event: '□', strike: '△' };
const NCOLORS = { circle: C.cream, meetup: C.ok, event: C.muted, strike: C.strike };
function NotifScreen() {
  const { notifs, markRead, unread } = useApp();
  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Wordmark />
        {unread > 0 && <TouchableOpacity onPress={markRead}><Text style={label()}>Mark all read</Text></TouchableOpacity>}
      </View>
      {unread > 0 && <View style={{ paddingHorizontal: 24, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.surface }}><Text style={label()}>{unread} unread</Text></View>}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 48 }}>
        {['New', 'Earlier'].map(group => {
          const items = notifs.filter(n => group === 'New' ? !n.read : n.read);
          if (!items.length) return null;
          return (
            <React.Fragment key={group}>
              <Text style={label({ paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8 })}>{group}</Text>
              {items.map(n => (
                <TouchableOpacity key={n.id} style={[{ flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: C.border, gap: 14 }, !n.read && { backgroundColor: C.surface }]} activeOpacity={0.7}>
                  <Text style={{ fontFamily: T.serif, fontSize: 14, color: NCOLORS[n.type] || C.muted, paddingTop: 2 }}>{NICONS[n.type] || '—'}</Text>
                  <View style={{ flex: 1, gap: 4 }}>
                    <Text style={serif(14, n.read ? C.muted : C.cream, { lineHeight: 21 })}>{n.msg}</Text>
                    <Text style={label({ fontSize: 8, letterSpacing: 1 })}>{n.time}</Text>
                  </View>
                  {!n.read && <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.cream, marginTop: 6 }} />}
                </TouchableOpacity>
              ))}
            </React.Fragment>
          );
        })}
        <View style={{ paddingHorizontal: 24, paddingTop: 32, borderTopWidth: 1, borderTopColor: C.border, marginTop: 24 }}>
          <Text style={label({ textAlign: 'center', lineHeight: 16 })}>CULT does not send push notifications.{'\n'}Check back regularly.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── TAB BAR ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'feed', label: 'Feed' },
  { id: 'events', label: 'Events' },
  { id: 'circle', label: 'Circle' },
  { id: 'profile', label: 'Profile' },
  { id: 'inbox', label: null },
];
function TabBar({ active, setScreen, unread }) {
  return (
    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.bg, paddingBottom: Platform.OS === 'ios' ? 16 : 0 }}>
      {[
        { id: 'feed', l: 'Feed' }, { id: 'events', l: 'Events' }, { id: 'circle', l: 'Circle' },
        { id: 'profile', l: 'Profile' }, { id: 'inbox', l: unread > 0 ? `(${unread})` : 'Inbox' },
      ].map(t => (
        <TouchableOpacity key={t.id} style={{ flex: 1, paddingVertical: 14, alignItems: 'center' }} onPress={() => setScreen(t.id)} activeOpacity={0.7}>
          <Text style={label({ color: active === t.id ? C.cream : C.dim, fontSize: 8 })}>{t.l}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
function MainApp() {
  const [screen, setScreen] = useState('feed');
  const [detailMember, setDetailMember] = useState(null);
  const { unread } = useApp();
  const mainScreens = ['feed', 'events', 'circle', 'profile', 'inbox'];
  const showTabs = mainScreens.includes(screen);
  return (
    <View style={s.fill}>
      <View style={{ flex: 1 }}>
        {screen === 'feed' && <HomeScreen setScreen={setScreen} setDetailMember={setDetailMember} />}
        {screen === 'events' && <EventsScreen />}
        {screen === 'circle' && <CircleScreen setScreen={setScreen} />}
        {screen === 'profile' && <ProfileScreen setScreen={setScreen} />}
        {screen === 'inbox' && <NotifScreen />}
        {screen === 'detail' && detailMember && <MemberDetailScreen member={detailMember} onBack={() => setScreen('feed')} setScreen={setScreen} />}
        {screen === 'chat' && <ChatScreen setScreen={setScreen} />}
      </View>
      {showTabs && <TabBar active={screen} setScreen={setScreen} unread={unread} />}
    </View>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [phase, setPhase] = useState('splash'); // splash | onboard | apply | main
  return (
    <AppProvider>
      {phase === 'splash' && <SplashScreen onDone={() => setPhase('onboard')} />}
      {phase === 'onboard' && <OnboardingScreen onDone={() => setPhase('apply')} />}
      {phase === 'apply' && <ApplicationScreen onDone={() => setPhase('main')} />}
      {phase === 'main' && <MainApp />}
    </AppProvider>
  );
}

// ─── BASE STYLES ─────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  fill: { flex: 1, backgroundColor: C.bg },
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: C.border,
  },
  btn: {
    borderWidth: 1, borderColor: C.cream,
    paddingVertical: 14, alignItems: 'center',
  },
});
