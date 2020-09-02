export default function (value) {
  if (!value) return '';
  if (value.length > 27) {
    const contentString = `${value.slice(0, 27)} ...`;
    return contentString;
  }
  return value;
}
