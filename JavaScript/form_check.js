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
  var flag = true;
  for(i = 0; i < checkList.length; i++) {
    var tmp = checkList[i];
    flag = checkString(form.elements["f_" + tmp].value, "Podaj " + tmp);
    if(!flag) {
      return false;
    }
  }

  flag = checkEmail(form.elements["f_email"].value)
  if(!flag) {
    return false;
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

function checkEmail(str) {
  if (isWhiteSpace(str)) {
    alert("Podaj właściwy e-mail");
    return false;
  } 
  else {
    var at = str.indexOf("@");
    if (at < 1) {
      alert("Nieprawidłowy e-mail");
      return false;
    } 
    else {
      var l = -1;
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (c == ".") {
          l = i;
        }
      }
      if ((l < (at + 2)) || (l == str.length - 1)) {
        alert("Nieprawidłowy e-mail");
        return false;
      }
    }
    return true;
  }
}