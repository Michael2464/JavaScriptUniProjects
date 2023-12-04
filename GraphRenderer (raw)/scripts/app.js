//document.onload = function () {
  console.log("before main");
  var main = new Main();
  console.log("after main");
  window.addEventListener('resize', main.getDimensionsHandle);
  document.querySelector("canvas").onwheel = main.wheel;
  main.render();
  console.log("onload()");
//}



