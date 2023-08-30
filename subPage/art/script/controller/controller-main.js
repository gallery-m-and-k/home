// ブラウザバック時処理（スマホ対応）
window.onpageshow = function (event) {
  if (event.persisted) {
    window.location.reload();
  }
};

$(document).ready(function () {
  /**
   * 初期化
   */

  // 要素を追加する箇所を指定
  const imageContainer = document.querySelector(".container");
  const category = imageContainer.getAttribute("id");

  // 表示する画像の数
  const numImagesToShow = 15;

  // 画像の総数
  const imageMaxCount = 259;

  // 汎用データをセッションストレージに記憶
  sessionStorage.setItem("category", category);
  sessionStorage.setItem("imageMax", imageMaxCount);

  // ランダムにインデックスを指定
  let arr = [];
  for (let i = 0; i < imageMaxCount; i++) {
    arr[i] = i + 1;
  }
  let len = arr.length;
  let targets = [];
  for (let j = 0; j < numImagesToShow; j++, len--) {
    rndNum = Math.floor(Math.random() * len);
    targets.push(arr[rndNum]);
    arr[rndNum] = arr[len - 1];
  }

  // 抜き出したファイル名を使用して、画像を表示する。
  targets.forEach((k) => {
    const folderPath = "./image/" + category;

    // 要素作成
    const image = document.createElement("img");
    image.classList.add("item");
    image.classList.add("clickable");
    image.setAttribute(
      "data-src",
      folderPath + "/click/art_" + String(k).padStart(4, "0") + ".png"
    );
    image.setAttribute("data-index", k);
    imageContainer.appendChild(image);

    // ランダム移動
    moveElement(image, true);
  });

  const imgElements = document.querySelectorAll("img.item");
  for (let i = 0; i < imgElements.length; i++) {
    const item = imgElements[i];
    // 遅延読み込み
    item.src = item.getAttribute("data-src");
    item.removeAttribute("data-src");

    // 画像読み込み完了したときの処理
    item.addEventListener("load", () => {
      // 次の移動をスケジュールする
      moveElement(item);

      // 移動終了後に、次の移動をスケジュールするように設定
      item.addEventListener("transitionend", () => {
        moveElement(item);
      });

      // イベント付加
      item.addEventListener("click", () => {
        // セッションストレージにデータをセット
        sessionStorage.setItem("index", item.getAttribute("data-index"));
        sessionStorage.setItem("prev", "./index.html");

        // ページ遷移
        open("detail.html", "_self");
      });
    });
  }
});
// ================================================================

// 移動速度
const moveSpeed = 150;

/**
 * ランダム移動設定
 */
function moveElement(element, pre = false) {
  // 現在座標を取得
  const { left: startX, top: startY } = element.getBoundingClientRect();

  // Ｘ座標
  let randomLeft = Math.random() * window.innerWidth;

  // Ｙ座標
  let randomTop = Math.random() * window.innerHeight;

  // 角度
  let angle = getRotationAngle(element);
  angle += Math.floor(Math.random() * 90);
  angle -= Math.floor(Math.random() * 90);

  if (pre) {
    // 大きさ
    const max = 1.0;
    const min = 0.1;
    const scale = Math.random() * (max - min) + min;
    element.style.width = "calc(max(45vw, 45vh) * " + scale + ")";
  } else {
    // トランジション
    const dist = Math.sqrt(
      Math.pow(startX - randomLeft, 2) + Math.pow(startY - randomTop, 2)
    );
    const time = dist / moveSpeed;
    element.style.transition = "all " + time + "s linear";
  }

  // 移動の反映
  element.style.left = randomLeft + "px";
  element.style.top = randomTop + "px";
  element.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";
}

/**
 * 要素の角度を取得
 */
function getRotationAngle(element) {
  const style = window.getComputedStyle(element, null);
  const transform = style.getPropertyValue("transform");
  const matrix = transform.match(/^matrix\((.+)\)$/);

  if (matrix) {
    const values = matrix[1].split(",");
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);
    const angleRad = Math.atan2(b, a);
    const angleDeg = angleRad * (180 / Math.PI);

    return angleDeg;
  }

  return 0;
}
