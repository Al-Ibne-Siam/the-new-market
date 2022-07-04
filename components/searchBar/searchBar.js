var searchSuggestions = ['apple', 'android', 'donut', 'house-decor', 'apple iphone', 'abc book', 'android smartphones', 'a for apple', 'apple and oranges'];

function returnMatches(input) {
  if (input == '') {
    return [];
  }

  var reg = new RegExp(input)
  return searchSuggestions.filter(function(term) {
	  if (term.match(reg)) {
  	  return term;
	  }
  });
}

function showResults(val) {
  suggestionlist = document.getElementById("search1-suggestion");
  
  if(val != '') {
    document.getElementById("search1-btn").classList.remove("disable");
    document.getElementById("search1-text").classList.add("noCollapse");
    document.getElementById("search1-emptyInput").innerHTML = "<img src='white cross.svg' alt='' id='search-x'></img>";
    suggestionlist.style.display = "inline-block";
    suggestionlist.style.width = `${window.getComputedStyle(document.getElementById("search1")).getPropertyValue('width')}`;
  } else {
    document.getElementById("search1-text").classList.remove("noCollapse");
    document.getElementById("search1-emptyInput").innerHTML = "";
    suggestionlist.style.display = "none";
  }
  
  suggestionlist.innerHTML = '';
  let list = '';

  let terms = returnMatches(val).sort().sort((x,y)=>{
    if(x.indexOf(val)>y.indexOf(val)) return 1;
    if(x.indexOf(val)<y.indexOf(val)) return -1;
    return 0;
  });

  let length = (terms.length > 5) ? 5: terms.length;

  if(length == 0) {
    list += '<li>' + "No suggestion found!" + '</li>'
  } else {
    for (i=0; i<length; i++) {
        list += `<li onclick="autofill('${terms[i]}')">` + terms[i] + '</li>';
    }
  }

  suggestionlist.innerHTML = '<ul>' + list + '</ul>';
}

function autofill(term) {
    document.getElementById("search1-text").value = `${term}`;
    showResults(term);
}

function emptySearchbox(){
  document.getElementById("search1-text").value = "";
  showResults("");
}