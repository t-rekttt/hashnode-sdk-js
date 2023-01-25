import fs from "fs";
import { createDraftUnofficial } from "../src/base";
import uploadImage from "../src/upload-image";

let cookie =
  "";
let publicationId = "";

(async () => {
  let newDraftId = await createDraftUnofficial(publicationId, cookie);
  console.log(newDraftId);
})();
