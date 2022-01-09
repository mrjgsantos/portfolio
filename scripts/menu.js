var menu = document.querySelector(".menu");

menu.addEventListener("click", function (evt) {
  console.log("button click", evt);
  document.querySelector("#overlay").classList.toggle("show");
});

document.addEventListener("click", function (event) {
  console.log("document click", event);
  var isClickInsideButton = menu.contains(event.target);
  if (!isClickInsideButton) {
    document.querySelector("#overlay").classList.remove("show");
  }
});
