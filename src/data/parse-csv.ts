export type AppConfig = {
  userName: string;
  userAvatar: string;
  userFlag: string;
  inviteCode: string;
  invitesLeft: number;
  waitlistCount: number;
  kikisAddedToday: number;
  rewardTitle: string;
  rewardDescription: string;
  rewardGoal: number;
  rewardProgress: number;
  rewardDaysLeft: number;
  rewardImage: string;
  networkCount: number;
  exploreTitle: string;
  exploreSubtitle: string;
  mapLatitude: number;
  mapLongitude: number;
};

export type Listing = {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  hostFlag: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  listingType: string;
  bedrooms: number | null;
  favouritesCount: number;
  vouchedBy: string;
  vouchedAvatar: string;
  pastBookings: number;
  imageSeed: string;
  isFavourite: boolean;
  extraDates: number | null;
  latitude: number;
  longitude: number;
};

export type Friend = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Message = {
  id: string;
  contactName: string;
  contactAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  listingTitle: string;
};

export type ChatMessage = {
  id: string;
  threadId: string;
  sender: string;
  isMe: boolean;
  body: string;
  sentAt: string;
};

export type MockData = {
  app: AppConfig;
  listings: Listing[];
  friends: Friend[];
  messages: Message[];
  chatMessages: ChatMessage[];
};

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }

  values.push(current.trim());
  return values;
}

function parseNumber(value: string | undefined, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseBoolean(value: string | undefined): boolean {
  return value?.toLowerCase() === 'true';
}

export function parseMockData(csv: string): MockData {
  const lines = csv
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const appRows = lines.filter((line) => line.startsWith('app,'));
  const listingRows = lines.filter((line) => line.startsWith('listing,'));
  const friendRows = lines.filter((line) => line.startsWith('friend,'));
  const messageRows = lines.filter((line) => line.startsWith('message,'));
  const chatRows = lines.filter((line) => line.startsWith('chat,'));

  const appMap = new Map<string, string>();
  for (const row of appRows) {
    const [, field, value] = parseCsvLine(row);
    if (field && value !== undefined) {
      appMap.set(field, value);
    }
  }

  const app: AppConfig = {
    userName: appMap.get('user_name') ?? 'Guest',
    userAvatar: appMap.get('user_avatar') ?? '',
    userFlag: appMap.get('user_flag') ?? 'GB',
    inviteCode: appMap.get('invite_code') ?? 'XXXXX',
    invitesLeft: parseNumber(appMap.get('invites_left')),
    waitlistCount: parseNumber(appMap.get('waitlist_count')),
    kikisAddedToday: parseNumber(appMap.get('kikis_added_today')),
    rewardTitle: appMap.get('reward_title') ?? '',
    rewardDescription: appMap.get('reward_description') ?? '',
    rewardGoal: parseNumber(appMap.get('reward_goal')),
    rewardProgress: parseNumber(appMap.get('reward_progress')),
    rewardDaysLeft: parseNumber(appMap.get('reward_days_left')),
    rewardImage: appMap.get('reward_image') ?? '',
    networkCount: parseNumber(appMap.get('network_count')),
    exploreTitle: appMap.get('explore_title') ?? 'Explore',
    exploreSubtitle: appMap.get('explore_subtitle') ?? '',
    mapLatitude: parseNumber(appMap.get('map_latitude'), 51.5074),
    mapLongitude: parseNumber(appMap.get('map_longitude'), -0.1278),
  };

  const listings: Listing[] = listingRows.map((row) => {
    const cols = parseCsvLine(row);
    const bedrooms = cols[11] ? parseNumber(cols[11], NaN) : NaN;
    const extraDates = cols[18] ? parseNumber(cols[18], NaN) : NaN;

    return {
      id: cols[1] ?? '',
      title: cols[2] ?? '',
      hostName: cols[3] ?? '',
      hostAvatar: cols[4] ?? '',
      hostFlag: cols[5] ?? '',
      location: cols[6] ?? '',
      dateStart: cols[7] ?? '',
      dateEnd: cols[8] ?? '',
      price: parseNumber(cols[9]),
      listingType: cols[10] ?? 'Room',
      bedrooms: Number.isNaN(bedrooms) ? null : bedrooms,
      favouritesCount: parseNumber(cols[12]),
      vouchedBy: cols[13] ?? '',
      vouchedAvatar: cols[14] ?? '',
      pastBookings: parseNumber(cols[15]),
      imageSeed: cols[16] ?? 'listing',
      isFavourite: parseBoolean(cols[17]),
      extraDates: Number.isNaN(extraDates) ? null : extraDates,
      latitude: parseNumber(cols[19], 51.5074),
      longitude: parseNumber(cols[20], -0.1278),
    };
  });

  const friends: Friend[] = friendRows.map((row) => {
    const cols = parseCsvLine(row);
    return {
      id: cols[1] ?? '',
      name: cols[2] ?? '',
      avatarUrl: cols[3] ?? '',
    };
  });

  const messages: Message[] = messageRows.map((row) => {
    const cols = parseCsvLine(row);
    return {
      id: cols[1] ?? '',
      contactName: cols[2] ?? '',
      contactAvatar: cols[3] ?? '',
      lastMessage: cols[4] ?? '',
      timestamp: cols[5] ?? '',
      unread: parseBoolean(cols[6]),
      listingTitle: cols[7] ?? '',
    };
  });

  const chatMessages: ChatMessage[] = chatRows.map((row) => {
    const cols = parseCsvLine(row);
    return {
      id: cols[2] ?? '',
      threadId: cols[1] ?? '',
      sender: cols[3] ?? '',
      isMe: parseBoolean(cols[4]),
      body: cols[5] ?? '',
      sentAt: cols[6] ?? '',
    };
  });

  return { app, listings, friends, messages, chatMessages };
}

export function listingImageUrl(seed: string, width = 800, height = 520): string {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

export function flagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase();
  if (code.length !== 2) {
    return '🏳️';
  }
  const offset = 127397;
  return String.fromCodePoint(code.charCodeAt(0) + offset, code.charCodeAt(1) + offset);
}

export function unreadMessageCount(messages: Message[]): number {
  return messages.filter((message) => message.unread).length;
}

export function getMessageThread(messages: Message[], threadId: string): Message | undefined {
  return messages.find((message) => message.id === threadId);
}

export function getChatMessagesForThread(chatMessages: ChatMessage[], threadId: string): ChatMessage[] {
  return chatMessages.filter((message) => message.threadId === threadId);
}
