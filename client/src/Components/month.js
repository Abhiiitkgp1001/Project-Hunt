function getMonth(s) {
  var mon = s.split("T")[0].split("-")[1];
  if (mon === "01") {
    mon = "Jan";
  } else if (mon === "02") {
    mon = "Feb";
  } else if (mon === "03") {
    mon = "Mar";
  } else if (mon === "04") {
    mon = "Apr";
  } else if (mon === "05") {
    mon = "May";
  } else if (mon === "06") {
    mon = "Jun";
  } else if (mon === "07") {
    mon = "Jul";
  } else if (mon === "08") {
    mon = "Aug";
  } else if (mon === "09") {
    mon = "Sep";
  } else if (mon === "10") {
    mon = "Oct";
  } else if (mon === "11") {
    mon = "Nov";
  } else {
    mon = "Dec";
  }
  return mon;
}
export default getMonth;