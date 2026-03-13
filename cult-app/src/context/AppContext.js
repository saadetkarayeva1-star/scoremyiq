import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export const mockMembers = [
  {
    id: '1',
    name: 'Valentina Cruz',
    handle: '@valentina',
    role: 'Model / Creative Director',
    location: 'Los Feliz',
    bio: 'Documenting the in-between moments. Open to editorial, campaign, and concept work.',
    tags: ['editorial', 'campaign', 'art direction'],
    strikes: 0,
    meetupsCompleted: 4,
    joinedDate: 'Jan 2024',
    avatar: null,
    circleStatus: null,
  },
  {
    id: '2',
    name: 'Naomi Solis',
    handle: '@naomisolis',
    role: 'Influencer / Stylist',
    location: 'Silver Lake',
    bio: 'Style is a form of autobiography. Collabing on lookbooks, reels, and brand partnerships.',
    tags: ['fashion', 'styling', 'content'],
    strikes: 0,
    meetupsCompleted: 7,
    joinedDate: 'Feb 2024',
    avatar: null,
    circleStatus: null,
  },
  {
    id: '3',
    name: 'Ines Park',
    handle: '@inespark',
    role: 'Photographer',
    location: 'West Hollywood',
    bio: 'Film and digital. Beauty, fashion, portrait. Looking for models with a strong editorial eye.',
    tags: ['photography', 'film', 'beauty'],
    strikes: 0,
    meetupsCompleted: 12,
    joinedDate: 'Dec 2023',
    avatar: null,
    circleStatus: null,
  },
  {
    id: '4',
    name: 'Raia Thompson',
    handle: '@raiath',
    role: 'Brand Consultant',
    location: 'Echo Park',
    bio: 'Building brand narratives for emerging labels and creatives. DMs are where deals go to die.',
    tags: ['branding', 'strategy', 'consulting'],
    strikes: 1,
    meetupsCompleted: 3,
    joinedDate: 'Mar 2024',
    avatar: null,
    circleStatus: null,
  },
];

export const mockEvents = [
  {
    id: '1',
    title: 'Private Preview',
    subtitle: 'Maison Marais S/S Collection',
    date: 'Mar 18',
    time: '7 PM',
    location: 'Arts District, LA',
    type: 'fashion',
    spotsLeft: 6,
    rsvpd: false,
  },
  {
    id: '2',
    title: 'Rooftop Edit Session',
    subtitle: 'Content creation + drinks',
    date: 'Mar 22',
    time: '5 PM',
    location: 'Silver Lake',
    type: 'collab',
    spotsLeft: 12,
    rsvpd: true,
  },
  {
    id: '3',
    title: 'The CULT Dinner',
    subtitle: 'Members only, invite only',
    date: 'Apr 1',
    time: '8 PM',
    location: 'Undisclosed',
    type: 'exclusive',
    spotsLeft: 2,
    rsvpd: false,
  },
];

export const mockCollabs = [
  {
    id: '1',
    member: mockMembers[2],
    type: 'Looking For',
    title: 'Model for editorial shoot',
    details: 'Unpaid, print rights shared. Film camera. Moodboard available.',
    posted: '2h ago',
  },
  {
    id: '2',
    member: mockMembers[1],
    type: 'Offering',
    title: 'Styling for campaign or lookbook',
    details: 'Rate negotiable. Serious inquiries only.',
    posted: '5h ago',
  },
  {
    id: '3',
    member: mockMembers[3],
    type: 'Looking For',
    title: 'Creative director / art direction',
    details: 'Paid. Brand: emerging swimwear label. Q2 campaign.',
    posted: '1d ago',
  },
];

export const mockNotifications = [
  {
    id: '1',
    type: 'circle',
    message: 'The Circle has introduced you to Ines Park.',
    time: '10m ago',
    read: false,
  },
  {
    id: '2',
    type: 'meetup',
    message: 'Your meetup with Naomi Solis has been confirmed. Chat is now open.',
    time: '2h ago',
    read: false,
  },
  {
    id: '3',
    type: 'event',
    message: 'You\'re on the list for Rooftop Edit Session.',
    time: '1d ago',
    read: true,
  },
  {
    id: '4',
    type: 'strike',
    message: 'Raia Thompson missed your meetup. They have received a strike.',
    time: '3d ago',
    read: true,
  },
];

export function AppProvider({ children }) {
  const [currentUser] = useState({
    id: '0',
    name: 'Sofia Laurent',
    handle: '@sofialaurent',
    role: 'Model / Influencer',
    location: 'Los Feliz',
    bio: 'Cult member since January 2024.',
    tags: ['editorial', 'lifestyle', 'content'],
    strikes: 0,
    meetupsCompleted: 2,
    joinedDate: 'Jan 2024',
    memberSince: 'Jan 2024',
    status: 'active',
  });

  const [circleState, setCircleState] = useState({
    active: false,
    matchedWith: null,
    step: 0,
    myAnswers: [],
    theirAnswers: [],
    meetupConfirmed: false,
    chatUnlocked: false,
  });

  const [notifications, setNotifications] = useState(mockNotifications);
  const [events, setEvents] = useState(mockEvents);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const rsvpEvent = (eventId) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === eventId ? { ...e, rsvpd: !e.rsvpd } : e
      )
    );
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      circleState,
      setCircleState,
      notifications,
      markAllRead,
      events,
      rsvpEvent,
      unreadCount,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
