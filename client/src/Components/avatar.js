function getAvatarName(s) {
  const nameList = s.split(" ");
  var avatarName ="";
  var first = 0;
  var last = nameList.length -1;
  if(last ===0){
      avatarName = nameList[0].split("")[0];
  }else{
      avatarName = nameList[0].split("")[0] + nameList[last].split("")[0];
  }
  console.log(avatarName);
  return avatarName;
}
export default getAvatarName;
