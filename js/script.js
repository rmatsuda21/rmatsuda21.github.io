window.onload = wait(titleCall);

var el = document.getElementById("logo");
el.addEventListener("click", darkModeToggle, false);

function typeWriter(msg, id, i, speed, _secondcall) {
  if (i < msg.length) {
    document.getElementById(id).innerHTML += msg.charAt(i);
    i++;
    var offset = Math.round(Math.random()*100);
    // console.log(offset);
    setTimeout(function() {typeWriter(msg,id, i, speed, _secondcall)}, speed+offset);
  }
  else{
    if(_secondcall)
      _secondcall();
  }
}

function wait(_call){
  setTimeout(_call, 1000);
}

function titleCall(){
  typeWriter("Hello!", "title", 0, 300, function(){ wait(subCall)});
}

function subCall(){
  typeWriter("Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident dolor modi quis corrupti nesciunt vel sunt ipsa earum tempore adipisci, neque expedita, quos animi quisquam! Perspiciatis asperiores nesciunt quae quasi enim iusto facilis, at, eveniet recusandae et sapiente officia cum accusantium quaerat magnam nam totam accusamus aliquid minus iure. Est.", "titleSub", 0, 10)
}

var typer = function(el, msg, speed) {

}

var dark = false;

function initDark(){
  var c = document.cookie;
  if(c.substring(c.indexOf("=")+1) == "dark")
    dark = false;
  else
    dark = true;
  
  darkModeToggle();
}

function darkModeToggle(){
  dark = !dark;
  
  //Write cookie to store darkmode option
  if(dark)
    document.cookie = "darkMode=dark";
  else
    document.cookie = "darkMode=light";

  toggleDark();

  var sheet = document.styleSheets;

  sheet[1].deleteRule(0);
  if(!dark)
    sheet[1].insertRule(":root{ --main-bg-color: #eee; --main-text-color: black; --logo-hover-color: #888;--nav-link-hover-color: #666;--between-topbot-color: #aaa;--between-main-color: #777;}",0);
  else
    sheet[1].insertRule(":root{ --main-bg-color: black; --main-text-color: whitesmoke;--logo-hover-color: #666;--nav-link-hover-color: #888;--between-topbot-color: #aaa;--between-main-color: #777;",0);
}

function toggleProjects(){
  var langs = document.getElementsByClassName("lang");
  var checked = [];
  // Get all checked radio buttons
  for(var i=0;i<langs.length;++i){
    if(langs[i].children[0].checked){
      checked.push(langs[i].children[0].className);
    }
  }

  // Toggle activated cards
  var cards = document.getElementsByClassName("card");
  for(var i=0;i<cards.length;++i){
    var type = cards[i].className.split(" ")[1];
    if(checked.indexOf(type)==-1 && cards[i].className.indexOf("hidden")==-1 && checked.length!=0){
      cards[i].className+=" hidden";
    }
    else if((checked.indexOf(type)!=-1 || checked.length==0) && cards[i].className.indexOf("hidden")!=-1){
        cards[i].className = cards[i].className.substring(0,cards[i].className.lastIndexOf(" "))
    }
  }
}