// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
  // rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const val = await resolveValue('some data');
    expect(val).toBe('some data');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('this is it!');
    } catch (error: unknown) {
      if (error instanceof Error) expect(error.message).toBe('this is it!');
      else {
        console.error('unknown error', error);
      }
    }
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultName = 'Oops!';
    try {
      throwError();
    } catch (error: unknown) {
      if (error instanceof Error) expect(error.message).toBe(defaultName);
      else {
        console.error('unknown error', error);
      }
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
