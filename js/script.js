// //Get all navbar links
// var navLinks = document.getElementsByClassName("nav-link")

// // Loop through the buttons and add the active class to the current/clicked button
// var i = 0;
// for (i = 0; i < navLinks.length; i++) {
//   navLinks[i].addEventListener("click", function() {
//     var target = this.getAttribute("target");
//     var current = document.getElementsByClassName("active");
    
//     var page = document.getElementsByClassName(target + " subPage");
//     var currentPageName = current[0].getAttribute("target");
//     var currentPage = document.getElementsByClassName(currentPageName + " subPage");

//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";

//     currentPage[0].style.opacity = 0;
//     page[0].style.opacity = 1;
//     currentPage[0].style.width = 0;
//     console.log(vw(90));
//     page[0].style.width = "90vw";
//   });
// }
// function vw(v) {
//   var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
//   return (v * w) / 100;
// }
//
// ***Really Old Code***

window.onload = wait(titleCall);

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

function darkModeToggle(){
  var sheet = document.styleSheets;
  dark = !dark;
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