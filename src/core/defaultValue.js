export default function defaultValue(a, b) {
  if (a !== undefined && a !== null) {
    return a;
  }
  return b;
}
