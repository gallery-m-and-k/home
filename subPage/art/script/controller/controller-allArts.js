$(document).ready(function () {
  // ================================================================

  const imageContainer = document.querySelector(".gallery");

  // 表示する画像の数
  const numImagesToShow = 234;

  const folderPath = "./image/colorAndShape";
  fetch(folderPath + "/index.json")
    .then((response) => response.json())
    .then((data) => {
      // リストからランダムにいくつかのファイル名を抜き出す。
      const randomFilenames = [];
      while (randomFilenames.length < numImagesToShow) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomFilename = data[randomIndex];
        if (!randomFilenames.includes(randomFilename)) {
          randomFilenames.push(randomFilename);
        }
      }

      // 要素を追加。
      randomFilenames.forEach((data) => {
        const division = document.createElement("div");
        division.classList.add("item");
        division.classList.add("clickable");

        const image = document.createElement("img");
        image.setAttribute("src", folderPath + "/list/" + data.name);

        division.appendChild(image);
        imageContainer.appendChild(division);
      });
    })

    // エラー時
    .catch((error) => console.error(error));
  // ================================================================
});
