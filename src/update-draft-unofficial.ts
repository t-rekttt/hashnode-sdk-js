import { DraftUpdate } from "./types";
import { updateDraftUnofficial as updateDraftUnofficial_ } from "./base";

const updateDraftUnofficial = async(data: DraftUpdate, cookie: string) => {
  await updateDraftUnofficial_(data, cookie);
  return true;
};

export default updateDraftUnofficial;
