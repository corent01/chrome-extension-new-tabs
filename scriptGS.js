//GoggleSreach
//Add class

const googleSearch = document.querySelector("#div");
const inputSearch = googleSearch.querySelector('.mat-input');

googleSearch.addEventListener("click", function() {
    this.classList.add("is-active", "is-completed");
});

//Remove class

googleSearch.addEventListener("focusout", function() {
    if(inputSearch.value === '') {
      this.classList.remove("is-active", "is-completed");
    }
});

//toggle class
  
//   function myFunctionToggle() {
//     document.querySelector(".mat-div").classList.toggle("is-active");
//     document.querySelector(".mat-div").classList.toggle("is-completed");
//   }

  
//alert
  document.getElementById("valeur").onchange = function() {alertFunction()};
  
  function alertFunction() {
    if (valeur.value==='HELP') alert("Hey, tu me cherche ? Teams moi, c'est CWA "); 
  };

  