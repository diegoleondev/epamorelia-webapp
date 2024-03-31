export function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function snakeToCamel(str: string) {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}

export function index<T extends Record<string, any>>(
  array: T[],
  key: keyof T,
): Record<string, T> {
  return array.reduce<Record<string, T>>((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}
