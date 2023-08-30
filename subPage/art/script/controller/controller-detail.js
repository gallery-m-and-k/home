$(document).ready(function () {
  // ================================================================

  // セッションストレージからデータ取得
  const category = sessionStorage.getItem("category");
  const imageMax = parseInt(sessionStorage.getItem("imageMax"));
  const backScene = sessionStorage.getItem("prev");

  // 戻るボタンの設定
  const backButton = document.querySelector("a.bottomButton");
  backButton.href = backScene;

  // 表示する画像のインデックスを取得
  const imageIndex = parseInt(sessionStorage.getItem("index"));

  // 背景色を設定
  const body = document.querySelector("body");
  body.style.backgroundColor = "#" + sessionStorage.getItem("color");

  // アロー表示フラグ
  let arrowLeft = true;
  let arrowRight = true;

  // イラストを表示
  const container = document.querySelector(".container");
  for (let i = -1; i <= 1; i++) {
    // 画像ＩＤを設定
    const targetId = imageIndex + i;

    // ファイル存在フラグ
    if (targetId < 1) {
      arrowLeft = false;
      continue;
    }
    if (targetId > imageMax) {
      arrowRight = false;
      continue;
    }

    // 要素作成
    let fileName =
      "./image/" +
      category +
      "/view/art_" +
      String(targetId).padStart(4, "0") +
      ".jpg";
    const exhibit = document.createElement("div");
    exhibit.classList.add("exhibit");
    if (i == -1) {
      exhibit.classList.add("movePrev");
    }
    if (i == 1) {
      exhibit.classList.add("moveNext");
    }
    const image = document.createElement("img");
    image.src = fileName;
    container.appendChild(exhibit);
    exhibit.appendChild(image);
  }

  // クリックイベント
  const elementsPrev = document.querySelectorAll(".movePrev");
  for (const element of elementsPrev) {
    // イベント付加
    element.addEventListener("click", () => {
      // セッションストレージのインデックス変更
      sessionStorage.setItem("index", imageIndex - 1);
      // ページ遷移
      open("detail.html", "_self");
    });
  }
  const elementsNext = document.querySelectorAll(".moveNext");
  for (const element of elementsNext) {
    // イベント付加
    element.addEventListener("click", () => {
      // セッションストレージのインデックス変更
      sessionStorage.setItem("index", imageIndex + 1);
      // ページ遷移
      open("detail.html", "_self");
    });
  }

  // 矢印消去
  if (!arrowLeft) {
    const target = document.getElementById("buttonPrev");
    target.remove();
  }
  if (!arrowRight) {
    const target = document.getElementById("buttonNext");
    target.remove();
  }

  // ================================================================
});
