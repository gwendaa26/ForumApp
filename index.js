/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


/* This script is to execute a side navigation bar. This idea is from Onsen UI
 https://tutorial.onsen.io/?framework=vanilla&category=reference&module=splitter
 */
window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page,data) {
  var content = document.getElementById('myNavigator');
  var menu = document.getElementById('menu');
  content.pushPage(page, data)
    .then(menu.close.bind(menu));
};

window.fn.pop = function() {
  var content = document.getElementById('myNavigator');
  content.popPage();
};

//----------------------------------------------------------------------------

/* This script is to execute a Join Now button in a account page. The button will
   direct the user to register page.
*/
document.addEventListener('init', function(event) {
  var page = event.target;

  if (page.id === 'login') {
    page.querySelector('#push-button').onclick = function() {
      document.querySelector('#myNavigator').pushPage('register.html', {data: {title: 'Register'}});
    };
  } else if (page.id === 'register') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
});



//----------------------------------------------------------------------------

function calledByClick(){
        var element = document.getElementById("onsInput")._input;
        var el = $(element);
        el.on('keydown', function() {
            window.focus()
            el.focus()
        });
        el.focus();
}


/* ----------------------------------------------------------------------------
  These codes below are for register and login page. The user's data will be saved in
  local storage.
  When the user doesn't have an account in this app, they need to register by filling the
  form. After that, all data will be saved and will retrieved when the user signed in.

  inspired:
  https://developer.mozilla.org/en-US/docs/Web/API/Storage
  https://www.daniweb.com/digital-media/ui-ux-design/threads/476533/login-and-registration-using-local-storage
  https://stackoverflow.com/questions/34299555/javascript-login-register-with-localstorage
----------------------------------------------------------------------------*/
var storage = window.localStorage; // To access

// For register page
var regUsername = document.getElementById('regUsername');
var regEmail = document.getElementById('regEmail');
var regPassword = document.getElementById('regPassword');

// To store a value for register
function register() {
  storage.setItem('regUsername', document.getElementById('regUsername').value);
  storage.setItem('regEmail', document.getElementById('regEmail').value);
  storage.setItem('regPassword', document.getElementById('regPassword').value);


  //     if (document.getElementById('regUsername').value == "" && document.getElementById('regEmail').value == "" &&
  //     document.getElementById('regPassword').value == "" ) {
  //       ons.notification.alert("All fields are required")
  //         } else {
  //       onclick = fn.load ('home.html')
  //       ons.notification.alert("Welcome " + document.getElementById('regUsername').value + " !")
  //       }

}

//check if stored data from register page is equal to entered in login page
function login(){
  //stored data from the register page
  var storedUsername = storage.getItem('regUsername');
  var storedEmail = storage.getItem('regEmail');
  var storedPassword = storage.getItem('regPassword');

  var encrypt = SHA256(storedPassword);
  storage.setItem(storedPassword,encrypt);

  //entered data from the login page
  var username = document.getElementById ('username');
  var password = document.getElementById ('password');

  console.log (username.value, password.value, storedUsername, storedPassword);

  //check the stored data
  if (username.value == storedUsername && password.value == storedPassword) {
    ons.notification.alert({
      title: 'Forum Application',
        message: "Welcome " + document.getElementById('username').value + "!",
        buttonLabels: 'OK'})
     // The alert will show, when the user filled the true data as in the register page
     onclick = fn.load('home.html'); // It will go to the next page, when the login is successfully
  } else {
    ons.notification.alert("All fields are required")
 // The error alert will display, when the user didn't insert the username and password
  }
}

/* ----------
  These codes below are for showing a forum post from the user. The steps are similar with
  register and password above. A title and forum description will be saved in local storage.

  inspired:

*/


var titlePost = document.getElementById('title');
var descriptionPost = document.getElementById('description');
var today = new Date ();
var dayIndex = today.getDay();
var date = today.getDate();
var yearNow = today.getFullYear();
var monthIndex = today.getMonth();

//declare full month and day
var dayList= ["Sunday","Monday","Tuesday", "Wednesday","Thursday","Friday","Saturday"]
var monthList= ["January", "February", "March","April", "May", "June", "July","August", "September", "October","November", "December"];


function share() {
  storage.setItem('titlePost', document.getElementById('title').value);
  storage.setItem('descriptionPost', document.getElementById('description').value);

// for adding new list https://codepen.io/frankdiox/pen/yOrdOV?editors=1010
//https://community.onsen.io/topic/391/onsen-2-with-jquery-and-loading-json-into-list/4
  var list = document.querySelector('#addToList');
  var newItem = document.createElement('ons-list-item');
  newItem.setAttribute('modifier', "chevron");
  newItem.setAttribute('tappable');
  newItem.setAttribute('onclick',"fn.load('pageforum2.html')");

  newItem.innerHTML = "<span class='list-item__title' style='font-weight:bold;color:#2C3E50; font-size:1.5em'>" + document.getElementById("title").value + "</span>"
                    + "<span class='list-item__subtitle' style='color:#000000; padding-top: 15px;'>" + document.getElementById("description").value + "</span>";

  if (document.getElementById('title').value == "" &&
  document.getElementById('description').value == "")
 {
    ons.notification.alert("All fields are required")
      } else {
        ons.notification.confirm({
          title: 'Data shares',
            message: 'Are you sure you want to share?',
            buttonLabels: ['Discard', 'Save'],
          callback: function(idx) {
            switch (idx) {
              case 0:
                break;
              case 1:

              // It will show a date format in ons-list-header
            document.getElementById("Addtime").innerHTML = dayList[dayIndex] + ", " + date + " " + monthList[monthIndex] + " " + yearNow;

                break;
            }
          }
        });
      }
      list.appendChild(newItem);
      console.log(newItem.innerHTML);
}

var newTitlePost = document.getElementById('titleReply');
var newDescriptionPost = document.getElementById('descriptionReply');


function reply() {

  storage.setItem('newTitlePost', document.getElementById('titleReply').value);
  storage.setItem('newDescriptionPost', editorText.document.body.innerHTML);

// for adding new list https://codepen.io/frankdiox/pen/yOrdOV?editors=1010
//https://community.onsen.io/topic/391/onsen-2-with-jquery-and-loading-json-into-list/4

  if (document.getElementById('titleReply').value == "" &&
  editorText.document.body.innerHTML == "")
 {
    ons.notification.alert("All fields are required")
      } else {
        ons.notification.confirm({
          title: 'Data shares',
            message: 'Are you sure you want to share?',
            buttonLabels: ['Discard', 'Save'],
          callback: function(idx) {
            switch (idx) {
              case 0:
                break;
              case 1:

              // It will show a date format in ons-list-header
            document.getElementById("Addtime").innerHTML = dayList[dayIndex] + ", " + date + " " + monthList[monthIndex] + " " + yearNow;

            document.getElementById("titleForum").innerHTML = document.getElementById("titleReply").value;
            document.getElementById("descForum").innerHTML = editorText.document.body.innerHTML;

                break;
            }
          }
        });
      }

      console.log(document.getElementById("titleForum").innerHTML = document.getElementById("titleReply").value);
}

// to show to next page
// http://jsfiddle.net/SrRSw/

function enableEditMode() {
  editorText = document.getElementById('descriptionReply').contentWindow;
  editorText.document.designMode = "on"
  editorText.document.open();
  editorText.document.write('<head><style type="text/css">body{ font-family:Helvetica; font-size:14px;}</style></head>');
  editorText.document.close();
  editorText.document.addEventListener('keyup',showTextEditor, false);
  editorText.document.addEventListener('paste', showTextEditor, false);
}
function showTextEditor () {
    document.getElementById('descForum').innerHTML = editorText.document.body.innerHTML;
    return;
}

// ----------------

function execCmd(command) {
  richTextField.document.execCommand(command, false, null);
  richTextField.document.execCommand(command, false, null);
  richTextField.document.execCommand(command, false, null);

}








/* ----------------------------------------------------------------------------

These codes below show the networking. It uses localhost to connect to web server
or the networking. It can save and load the data.

  appid = 214441847
  user = gwendahasnaa

inspired:
    https://www.youtube.com/watch?v=rfAJR8YfB_M&feature=youtu.be
    https://www.youtube.com/watch?v=Z_LhfDZABP4&feature=youtu.be
---------------------------------------------------------------------------- */

window.baseUrl = "http://introtoapps.com/datastore.php?&appid=214441847";

window.currentUsername = null;
window.forumTopics = [];


function displayForumPage() {
  for (var index = 0; index < forumTopics.length; index++) {
    var topic = forumTopics[index];
    $("body").append("<p>" + topic.title +" / " + topic.author + "</p>")
  }

  var newTopic = {
    title: "Users",
    author: window.currentUsername
  }
  forumTopics.push(newTopic);

}
function loadForumTopics() {
  var url = baseUrl + "&action=load&objectid=forumstopics";

  $.ajax ({ url: url, cache:false })
    .done(function (data) {

        alert("Server returned: " + data);
        window.forumTopics = JSON.parse(data);
        displayForumPage();

    }).fail(function (jqXHR , textStatus) {
      alert ("Request failed: " + textStatus);
    });
}

function createUser (_username, _password, _email){
  var userObject = {
    username: _username,
    password: _password,
    email: _email
  };

  var data = JSON.stringify(userObject);
  alert("Data to be saved: " + data);
  // create a url for saving
  var url = baseUrl + "&action=save&objectid=" + encodeURIComponent(_username) +".user&data="
  + encodeURIComponent(data);
  alert ("URL:" +url);

  $.ajax ({ url: url, cache:false })
    .done(function (data) {
      // when successfully complete, run this function
      alert("Result from server:" + data);
    })
    .fail(function (jqXHR , textStatus) {
      alert ("Request failed: " + textStatus);
    });
}


function loadUser(username) {
  var url = baseUrl + "&action=load&objectid=" + encodeURIComponent(username) + ".user";
  console.log(url);
  $.ajax ({
    url: url, cache:false })
    .done(function (data) {
      $ ("body").append(data);
    })
    .fail(function (jqXHR , textStatus) {
      alert ("Request failed: " + textStatus);
    });
}

  $(document).ready(function() {
    console.log ("My app is starting...");
    //loadForumTopics();


    loadUser ("gwendahasnaa")
    //createUser ("gwendahasnaa", "12345","gwendahasnaa26@gmail.com")

  });


//-----------------------------



  function SHA256(s){
  var chrsz   = 8;
  var hexcase = 0;

 function safe_add (x, y) {
   var lsw = (x & 0xFFFF) + (y & 0xFFFF);
   var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
   return (msw << 16) | (lsw & 0xFFFF);
 }

 function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
 function R (X, n) { return ( X >>> n ); }
 function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
 function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
 function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
 function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
 function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
 function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

 function core_sha256 (m, l) {
   var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
   var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
   var W = new Array(64);
   var a, b, c, d, e, f, g, h, i, j;
   var T1, T2;

   m[l >> 5] |= 0x80 << (24 - l % 32);
   m[((l + 64 >> 9) << 4) + 15] = l;

   for ( var i = 0; i<m.length; i+=16 ) {
     a = HASH[0];
     b = HASH[1];
     c = HASH[2];
     d = HASH[3];
     e = HASH[4];
     f = HASH[5];
     g = HASH[6];
     h = HASH[7];

     for ( var j = 0; j<64; j++) {
       if (j < 16) W[j] = m[j + i];
       else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

       T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
       T2 = safe_add(Sigma0256(a), Maj(a, b, c));

       h = g;
       g = f;
       f = e;
       e = safe_add(d, T1);
       d = c;
       c = b;
       b = a;
       a = safe_add(T1, T2);
     }

     HASH[0] = safe_add(a, HASH[0]);
     HASH[1] = safe_add(b, HASH[1]);
     HASH[2] = safe_add(c, HASH[2]);
     HASH[3] = safe_add(d, HASH[3]);
     HASH[4] = safe_add(e, HASH[4]);
     HASH[5] = safe_add(f, HASH[5]);
     HASH[6] = safe_add(g, HASH[6]);
     HASH[7] = safe_add(h, HASH[7]);
   }
   return HASH;
 }

 function str2binb (str) {
   var bin = Array();
   var mask = (1 << chrsz) - 1;
   for(var i = 0; i < str.length * chrsz; i += chrsz) {
     bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
   }
   return bin;
 }

 function Utf8Encode(string) {
   string = string.replace(/\r\n/g,"\n");
   var utftext = "";

   for (var n = 0; n < string.length; n++) {

     var c = string.charCodeAt(n);

     if (c < 128) {
       utftext += String.fromCharCode(c);
     }
     else if((c > 127) && (c < 2048)) {
       utftext += String.fromCharCode((c >> 6) | 192);
       utftext += String.fromCharCode((c & 63) | 128);
     }
     else {
       utftext += String.fromCharCode((c >> 12) | 224);
       utftext += String.fromCharCode(((c >> 6) & 63) | 128);
       utftext += String.fromCharCode((c & 63) | 128);
     }

   }

   return utftext;
 }

 function binb2hex (binarray) {
   var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
   var str = "";
   for(var i = 0; i < binarray.length * 4; i++) {
     str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
     hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
   }
   return str;
 }

 s = Utf8Encode(s);
 return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
