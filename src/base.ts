const apiURL = "https://api.hashnode.com";
const unofficalApiUrl = "https://gql.hashnode.com";
const imageUploadApiUrl = "https://s3.amazonaws.com/cloudmate-test";
const ajaxApiUnofficial = "https://hashnode.com/ajax";
import request, { RequestPromise } from "request-promise";
import { DraftUpdate, PostUpdate, Publication } from "./types";

/**
 * Hashnode API's returned errors.
 */
export class APIError extends Error {
  readonly errors: any[];

  constructor(errors: any[]) {
    super(`Hashnode API error: ${JSON.stringify(errors, null, 2)}.`);
    this.errors = errors;
  }
}

export const query = async (apiKey: string, gql: string, variables: any) => {
  let res = await request(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: apiKey || "",
    },
    body: {
      query: gql,
      variables,
    },
    json: true,
  });
  if (res?.errors) throw new APIError(res?.errors);
  return res;
};
/**
 * Generic utility to make a Hashnode API's call.
 *
 * @param gql GraphQL query.
 * @param variables Variables expression.
 */
export const queryUnofficial = async (
  gql: string,
  variables: any,
  cookie: string
): Promise<any> => {
  let res = await request(unofficalApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Cookie: cookie,
    },
    body: {
      query: gql,
      variables,
    },
    json: true,
  });
  if (res?.errors) throw new APIError(res?.errors);
  return res;
};

export const uploadImageToAmazon = async (fields: object, imageStream: any) => {
  let res = await request.post(imageUploadApiUrl, {
    formData: {
      ...fields,
      file: {
        value: imageStream,
        options: {
          filename: "image.png",
          contentType: "image/png",
        },
      },
    },
    resolveWithFullResponse: true,
    simple: false,
  });

  if (res.statusCode !== 204) throw new APIError([res.body]);

  return res;
};

export const sendAjaxUpdatePost = (data : PostUpdate, cookie: string) => {
  return request.post(`${ajaxApiUnofficial}/post/update`, {
    body: data,
    json: true,
    headers: {
      Cookie: cookie,
    },
  });
}

export const updateDraftUnofficial = (data : DraftUpdate, cookie : string) => {
  return request.post("https://hashnode.com/api/draft/save-data", {
    body: data,
    json: true,
    headers: {
      Cookie: cookie
    }
  });
}

export const getBuildId = async() => {
  let res = await request.get("https://hashnode.com");
  return /buildId":".+?"/.exec(res)?.[1];
}

export const createDraftUnofficial = async(publicationId : Publication["id"], cookie : string) => {
  let res = await request.get("https://hashnode.com/draft", {
    qs: {
      new: true,
      publicationId,
    },
    headers: {
      Cookie: cookie,
    },
    json: true,
    resolveWithFullResponse: true,
    simple: false,
    followRedirect: false
  });

  if (res.statusCode !== 307)
    throw new APIError(res.body);

  return res.headers['location'];
}
