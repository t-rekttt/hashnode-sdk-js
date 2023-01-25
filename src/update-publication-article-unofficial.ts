import { RequestPromise } from "request-promise";
import { APIError, query, sendAjaxUpdatePost } from "./base";
import { Article, PostUpdate } from "./types";

/**
 *
 * @param postUpdate Parameters for post update
 * @param cookie Cookie string
 * @returns
 */
const updatePublicationArticleUnofficial = async (
  postUpdate: PostUpdate,
  cookie: string
): Promise<any> => sendAjaxUpdatePost(postUpdate, cookie);

export default updatePublicationArticleUnofficial;
