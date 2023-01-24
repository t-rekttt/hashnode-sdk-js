import { APIError, query, queryUnofficial, uploadImageToAmazon } from "./base";
import { ImageUploadURL } from "./types";

/**
 *
 * @param contentType
 * @returns
 */
const createImageUploadURL = async (
  cookie: string,
  contentType: string = "image/png"
): Promise<ImageUploadURL> => {
  let {
    data: { imageUploadURL },
    errors,
  } = await queryUnofficial(
    `query ImageUploadURL($contentType: ImageContentType!) {
      imageUploadURL(contentType: $contentType) {
        url
        fields
        __typename
      }
    }`,
    {
      contentType,
    },
    cookie
  );

  if (errors?.length) {
    throw new APIError(
      errors.map((error: { message: string }) => error.message)
    );
  }

  return imageUploadURL;
};

/**
 *
 * @param imageStream
 * @param cookie
 * @returns
 */
const uploadImage = async (imageStream: any, cookie: string) => {
  let imageUploadURLData: ImageUploadURL = await createImageUploadURL(cookie);
  await uploadImageToAmazon(imageUploadURLData.fields, imageStream);
  return `https://cdn.hashnode.com/${imageUploadURLData.fields.key}`;
};

export default uploadImage;
