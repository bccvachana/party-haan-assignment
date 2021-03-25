const MAX_RETRIES = 20;

export const delayFunc = async (
  time: number,
) => new Promise((
  resolve,
) => {
  const timer = setTimeout(() => {
    resolve(undefined);
    clearTimeout(timer);
  }, time);
});

export const retryFunc = async (
  fn: (
    done: (value?: unknown) => void,
    retry: (reason?: any) => void
  ) => void,
) => {
  const promise = async () => {
    await delayFunc(25);
    return new Promise((
      resolve, reject,
    ) => fn(resolve, reject));
  };

  for (let i = 1; i <= MAX_RETRIES; i += 1) {
    try {
      await promise();
      return;
    } catch { }
  }
};
