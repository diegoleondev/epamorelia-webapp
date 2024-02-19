export default function parseClassNames(...classes: any[]) {
  return classes.filter((c) => typeof c === "string" && c.length > 0).join(" ");
}
