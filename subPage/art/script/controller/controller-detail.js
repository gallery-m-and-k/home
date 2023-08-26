$(document).ready(function () {
  // ================================================================

  // 背景色を設定
  const body = document.querySelector("body");
  body.style.backgroundColor = "#" + sessionStorage.getItem("color");

  // イラストを表示
  const imageFileName = sessionStorage.getItem("image");
  const displayItem = document.getElementById("displayItem");
  const dotIndex = imageFileName.lastIndexOf(".");
  let fileName = imageFileName.slice(0, dotIndex) + ".jpg";
  fileName = fileName.replace("click", "view");
  displayItem.src = fileName;

  // ================================================================
});
