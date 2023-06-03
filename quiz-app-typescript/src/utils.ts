export const generateUUID = (): string =>
  // eslint-disable-next-line
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

/**
 * Shuffles the array passed as a parameter
 * @param array
 * https://forum.freecodecamp.org/t/how-does-math-random-work-to-sort-an-array/151540
 */
export const shuffleArray = (array: Array<any>): Array<any> =>
  [...array].sort(() => Math.random() - 0.5);
