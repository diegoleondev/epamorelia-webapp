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

export function timestamp() {
  const date = new Date();

  const year = date.getFullYear().toString().slice(2, 4);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return year + month + day + " " + hours + minutes + seconds;
}
