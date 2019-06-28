const Sleep = (milliseconds: number) => {
  return new Promise(() => setTimeout(() => Promise.resolve(), milliseconds));
};

const Wait = async (condition: () => boolean, delay = 100) => {
  while (!condition) {
    await Sleep(delay);
  }
};

export { Sleep, Wait };
export default Wait;
