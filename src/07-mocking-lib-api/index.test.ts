// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => {
  const originalModule = jest.requireActual('lodash');

  return {
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

const relativePath = '/posts';

describe('throttledGetDataFromApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spyCreate: jest.SpyInstance<AxiosInstance> = jest.spyOn(
      axios,
      'create',
    );

    await throttledGetDataFromApi(relativePath);

    expect(spyCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: {} });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    await throttledGetDataFromApi(relativePath);
    expect(mockGet).toBeCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { id: 1, title: 'Test Post' };
    const mockGet = jest.fn().mockResolvedValue({ data: mockData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(mockData);
  });
});
