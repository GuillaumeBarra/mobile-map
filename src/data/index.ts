import { MOCK_CSV } from './mock-data.generated';
import { parseMockData, type MockData } from './parse-csv';

export type { AppConfig, ChatMessage, Friend, Listing, Message, MockData } from './parse-csv';
export {
  flagEmoji,
  getChatMessagesForThread,
  getMessageThread,
  listingImageUrl,
  unreadMessageCount,
} from './parse-csv';

export const mockData: MockData = parseMockData(MOCK_CSV);
