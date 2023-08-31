$(document).ready(function () {
  // ================================================================

  // セッションストレージからデータ取得
  const category = sessionStorage.getItem("category");
  const imageMax = parseInt(sessionStorage.getItem("imageMax"));
  const backScene = sessionStorage.getItem("prev");

  // 不正なアクセス
  if (!category || !imageMax || !backScene) {
    open("index.html", "_self");
  }

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

    // 要素の作成
    let exhibit;
    if (targetId > 0 && targetId <= imageMax) {
      // 画像あり
      exhibit = document.createElement("img");
      exhibit.classList.add("exhibit");
      let fileName =
        "./image/" +
        category +
        "/view/art_" +
        String(targetId).padStart(4, "0") +
        ".jpg";
      exhibit.src = fileName;
      if (i == -1) {
        exhibit.classList.add("movePrev");
      }
      if (i == 1) {
        exhibit.classList.add("moveNext");
      }
    } else {
      // 画像なし
      exhibit = document.createElement("div");
      exhibit.classList.add("exhibit");
      exhibit.classList.add("blank");

      if (targetId < 1) {
        arrowLeft = false;
      } else if (targetId > imageMax) {
        arrowRight = false;
      }
    }
    container.appendChild(exhibit);
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
