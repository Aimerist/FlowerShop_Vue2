export default function (time) {
  const date = new Date(time * 1000);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}/${month}/${day}`;
}
