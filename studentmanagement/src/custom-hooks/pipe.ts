export const pipe = (...fns: Function[]) => (initialValue?: any) =>
    fns.reduce((acc, fn) => fn(acc), initialValue);
  