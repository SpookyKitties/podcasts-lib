export function valueChanged<T>(
  arg1: T | undefined,
  arg2: T | undefined
): T | undefined {
  if (arg1 !== undefined && arg2 === undefined) {
    return arg1;
  }

  if (arg2 !== undefined && arg1 === undefined) {
    return arg2;
  }

  return arg1 !== arg2 ? arg2 : arg1;
}
