function isEmpty(str) {
  if(!str.length || str == undefined) {
    return true;
  } else {
    return false
  }
}

function isWhiteSpace(str) {
  var ws = "\t\n\r ";
  for (var i = 0; i < str.length; i++) {
    var c = str.charAt(i);
    if (ws.indexOf(c) == -1) {
      return false;
    }
  }
  return true;
 }

function validate(form) {
  var checkList = ["imie", "nazwisko", "kod", "ulica", "miasto"];
  for(i = 0; i < checkList.length; i++) {
    var tmp = checkList[i];
    var flag = checkString(form.elements["f_" + tmp].value, "Podaj " + tmp);
    if(!flag) {
      return false;
    }
  }
  return true;
  
}

function checkString(str, msg) {
  if(isEmpty(str) || isWhiteSpace(str)) {
    alert(msg);
    return false;
  } else {
    return true;
  }
}