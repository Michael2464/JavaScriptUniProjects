document.onload = function () {
  var main = new Main;
  window.addEventListener('resize', main.getDimensionsHandle);
  document.querySelector("canvas").onwheel = main.wheel;
  main.render();
  console.log("onload()");
}



