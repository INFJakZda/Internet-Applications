var errorField = "";

//**************************//
function isEmpty(str) {
    if(!str.length || str == undefined) {
        return true;
    } else {
        return false
    }
}

//**************************//
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

//**************************//
function wrong(form) {
    for(var i in form.elements) {
        form.elements[i].className = "wrong";
    }
}

//**************************//
function validate(form) {
    var checkList = ["imie", "nazwisko", "ulica", "miasto"];
    var flag = true;
    for(i = 0; i < checkList.length; i++) {
        var tmp = checkList[i];
        //flag = checkString(form.elements["f_" + tmp].value, "Podaj " + tmp);
        flag = checkStringAndFocus(form.elements["f_" + tmp], "Podaj " + tmp);
        if(!flag) {
            wrong(form);
            return false;
        }
    }

    flag = checkEmailRegEx(form.elements["f_email"].value)
    if(!flag) {
        wrong(form);
        form.elements["f_email"].focus();
        return false;
    }

    var postCode = form.elements["f_kod"].value;
    if(checkZIPCodeRegEx(postCode)) {
        alert("Zly kod pocztowy");
        form.elements["f_kod"].focus();
        wrong(form);
        return false;
    }
    return true;  
}

//**************************//
function checkString(str, msg) {
    if(isEmpty(str) || isWhiteSpace(str)) {
        alert(msg);
        return false;
    } else {
        return true;
    }
}
//**************************//

function checkZIPCodeRegEx(str) {
    var code = /[0-9]{2}-[0-9]{3}/;
    if (code.test(str) && str.length == 6) {
        document.getElementById("kod").innerHTML = "OK";
        document.getElementById("kod").className = "green";
        return false;
    } else {
        document.getElementById("kod").innerHTML = "źle";
        document.getElementById("kod").className = "red";
        return true;
    }
}

//**************************//
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

//**************************//
function checkEmailRegEx(str) {
    var email = /[a-zA-Z_0-9\.]+@[a-zA-Z_0-9\.]+\.[a-zA-Z][a-zA-Z]+/;
    if (email.test(str))
        return true;
    else {
        alert("Podaj właściwy e-mail");
        //document.elements["f_email"].focus();
        return false;
    }
}

//**************************//
function checkStringAndFocus(obj, msg) {
    var str = obj.value;
    var errorFieldName = "e_" + obj.name.substr(2, obj.name.length);
    if (isWhiteSpace(str) || isEmpty(str)) {
        document.getElementById(errorFieldName).innerHTML = msg;
        obj.focus();
        startTimer(errorFieldName);
        return false;
    }
    else {
        return true;
    }
 }

//**************************//
function startTimer(fName) {
    errorField = fName;
    window.setTimeout("clearError(errorField)", 1000);
}

//**************************//
function clearError(objName) {
    document.getElementById(objName).innerHTML = "";
}
 
//**************************//
function showElement(e) {
    document.getElementById(e).style.visibility = 'visible';
}

//**************************//
function hideElement(e) {
    document.getElementById(e).style.visibility = 'hidden';
}

//---------------------------------------------------
alterRows(1, document.getElementsByTagName("tr")[0]);
//---------------------------------------------------

//**************************//
function alterRows(i, e) {
    console.log(e);
    if (e) {
        if (i % 2 == 1) {
            e.setAttribute("style", "background-color: Aqua;");
        }
        e = e.nextSibling;
        while (e && e.nodeType != 1) {
            e = e.nextSibling;
        }
        alterRows(++i, e);
    }
}

//**************************//
function nextNode(e) {
    while (e && e.nodeType != 1) {
        e = e.nextSibling;
    }
    return e;
}

//**************************//
function prevNode(e) {
    while (e && e.nodeType != 1) {
        e = e.previousSibling;
    }
    return e;
}

//**************************//
function swapRows(b) {
    var tab = prevNode(b.previousSibling);
    var tBody = nextNode(tab.firstChild);
    var lastNode = prevNode(tBody.lastChild);
    tBody.removeChild(lastNode);
    var firstNode = nextNode(tBody.firstChild);
    tBody.insertBefore(lastNode, firstNode);
}

//**************************//
function cnt(form, msg, maxSize) {
    if (form.value.length > maxSize)
        form.value = form.value.substring(0, maxSize);
    else
        msg.innerHTML = maxSize - form.value.length;
   }