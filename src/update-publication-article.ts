import { APIError, query } from "./base";
import { Article } from "./types";

type InputArticle = Omit<Article, "url">;

/**
 * Update an article in a publication.
 *
 * @param publicationId The publication's id.
 * @param article The article with updated content.
 */
const updatePublicationArticle = async (
  apiKey : string,
  publicationId: string,
  article: InputArticle
): Promise<Article> =>
  query(
    apiKey,
    `mutation updateStory($postId: String!, $input: UpdateStoryInput!) {
        updateStory(postId: $postId, input: $input) {
         success,
         message,
         post {
           _id,
           title,
           slug,
           isRepublished,
           publication {
             domain
           }
         },
       }
     }`,
    {
      postId: article.id,
      input: {
        title: article.title,
        slug: article.slug,
        tags: [], // Hashnode API doesn't support tags yet.
        contentMarkdown: article.contentMarkdown,
        isPartOfPublication: {
          publicationId: publicationId,
        },
        isRepublished: article.canonicalURL
          ? {
              originalArticleURL: article.canonicalURL,
            }
          : null,
      },
    }
  ).then(({ data: { updateStory } }) => {
    if (!updateStory.success) throw new APIError([updateStory.message]);

    const { post } = updateStory;
    return {
      id: post._id,
      title: post.title,
      slug: post.slug,
      url: `https://${post.publication.domain}/${post.slug}`,
      canonicalURL: post.isRepublished ? article.canonicalURL : undefined,
      contentMarkdown: article.contentMarkdown,
    };
  });

export default updatePublicationArticle;
