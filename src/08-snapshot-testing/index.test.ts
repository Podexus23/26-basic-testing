// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elems = [1, 2, 3];
    const list = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    const res = generateLinkedList(elems);
    expect(res).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elems = [4, 5, 6];
    const res = generateLinkedList(elems);

    expect(res).toMatchSnapshot();
  });
});
