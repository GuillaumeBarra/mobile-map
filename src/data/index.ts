import { MOCK_CSV } from './mock-data.generated';
import { parseMockData, type MockData } from './parse-csv';

export type { AppConfig, Friend, Listing, MockData } from './parse-csv';
export { flagEmoji, listingImageUrl, parseMockData } from './parse-csv';

export const mockData: MockData = parseMockData(MOCK_CSV);
