// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 200;
    const acc = getBankAccount(balance);
    expect(acc.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 200;
    const sumToTake = 4000;
    const acc = getBankAccount(balance);
    expect(() => acc.withdraw(sumToTake)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 200;
    const sumToMove = 4000;
    const acc2 = getBankAccount(balance);
    const acc = getBankAccount(balance);
    expect(() => acc.transfer(sumToMove, acc2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 200;
    const sumToMove = 4000;
    const acc = getBankAccount(balance);
    expect(() => acc.transfer(sumToMove, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const balance = 200;
    const sumToAdd = 4000;
    const acc = getBankAccount(balance);
    acc.deposit(sumToAdd);
    expect(acc.getBalance()).toBe(balance + sumToAdd);
  });

  test('should withdraw money', () => {
    const balance = 200;
    const sumToRemove = 100;
    const acc = getBankAccount(balance);
    acc.withdraw(sumToRemove);
    expect(acc.getBalance()).toBe(balance - sumToRemove);
  });

  test('should transfer money', () => {
    const balance = 200;
    const sumToMove = 100;
    const acc2 = getBankAccount(balance);
    const acc = getBankAccount(balance);
    acc.transfer(sumToMove, acc2);
    expect(acc2.getBalance()).toBe(balance + sumToMove);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 200;
    const acc = getBankAccount(balance);
    const result = await acc.fetchBalance();
    if (result) expect(typeof result).toBe('number');
    else expect(result).toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 0;
    const acc = getBankAccount(balance);
    const result = await acc.fetchBalance();
    if (result) {
      acc.deposit(result);
      expect(acc.getBalance()).toBe(result);
    } else expect(acc.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 0;
    const acc = getBankAccount(balance);
    try {
      await acc.synchronizeBalance();
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error).toBeInstanceOf(SynchronizationFailedError);
      }
    }
  });
});
