import fs from "fs";
import uploadImage from "../src/upload-image";

let cookie = "";

(async () => {
  let testImage = fs.createReadStream("./example-image.png");
  let url = await uploadImage(testImage, cookie);
  console.log(url);
})();
