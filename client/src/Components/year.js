function getYear(s) {
  const date = s.split("T")[0].split("-")[0];
  return date;
}
export default getYear;
