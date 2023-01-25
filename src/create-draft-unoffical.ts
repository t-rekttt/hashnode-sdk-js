import { createDraftUnofficial as createDraftUnofficial_ } from "./base";
import { Publication } from "./types";

const createDraftUnofficial = async (publicationId : Publication["id"], cookie: string) => {
  let draftPath: any = await createDraftUnofficial_(publicationId, cookie);
  return draftPath.replace("/draft/", "");
};

export default createDraftUnofficial;
