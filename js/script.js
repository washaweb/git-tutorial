function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("include-html");
          includeHTML();
          findActiveRub();
        }
      } 
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

includeHTML();

function findActiveRub() {
  if(!currentpage) return;
  const items = document.querySelectorAll('.main-nav ul li');
  
  for (i = 0; i < items.length; i++) {
    if(items[i].getAttribute('meta-rel') === currentpage) {
      items[i].className = "active";
    }
    items[i].removeAttribute("meta-rel");
  }
}