export default function parseClassNames(...classes: any[]) {
  return classes
    .flat(5)
    .filter((c) => typeof c === "string" && c.length > 0)
    .join(" ");
}
