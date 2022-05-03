function getDate(s){
    const date = s.split("T")[0].split("-")[2];
    return date;
}
export default getDate;