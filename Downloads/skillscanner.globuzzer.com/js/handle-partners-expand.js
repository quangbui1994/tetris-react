//expand parteners

const expandPartenersButton = document.querySelector(

  ".expand-button.parteners"

);

const partenerExpandableBox = document.querySelector(

  "#parteners .gb-exapndable-box"

);

const partenerExpandMoreButton = document.querySelector("#parteners .more");

const partenerExpandLessButton = document.querySelector("#parteners .less");

const arrow = document.querySelector("#parteners .gb-show-more-icon");



// expandPartenersButton.addEventListener("click", function () {

//   if (!partenerExpandableBox.classList.contains("expanded")) {

//     partenerExpandableBox.style.maxHeight =

//       partenerExpandableBox.scrollHeight + "px";

//     partenerExpandableBox.classList.add("expanded");

//     partenerExpandMoreButton.classList.remove("active");

//     partenerExpandLessButton.classList.add("active");

//     arrow.classList.add("turned");

//   } else {

//     partenerExpandableBox.style.maxHeight = "";

//     partenerExpandableBox.classList.remove("expanded");

//     partenerExpandMoreButton.classList.add("active");

//     partenerExpandLessButton.classList.remove("active");

//     arrow.classList.remove("turned");

//   }

// });