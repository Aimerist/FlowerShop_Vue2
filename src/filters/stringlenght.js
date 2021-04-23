export default function (value, num) {
  if (!value) return ''
  if (value.length > num) {
    const contentString = `${value.slice(0, num)} ...`
    return contentString
  }
  return value
}
