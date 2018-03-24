function isEmpty(string) {
  if(!string.length || string == undefined) {
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
  var imie = form.elements["f_imie"].value;
  if(isEmpty(imie) || isWhiteSpace(imie)) {
    alert("Podaj imię!");
    return false;
  } else {
    return true;
  }
}