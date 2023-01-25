import updatePublicationArticleUnofficial from "../src/update-publication-article-unofficial";
import findUser from "../src/find-user";

const cookie =
  "";

(async () => {
  const user = await findUser("phuctm97");
  const postId = '';

  let res = await updatePublicationArticleUnofficial(
    {
      post: {
        title: "Updated post",
        subtitle: "",
        contentMarkdown: "This post has been updated",
        tags: [],
        pollOptions: [],
        type: "story",
        coverImage: "",
        coverImageAttribution: "",
        coverImagePhotographer: "",
        isCoverAttributionHidden: false,
        ogImage: "",
        metaTitle: "",
        metaDescription: "",
        isRepublished: false,
        originalArticleURL: "",
        partOfPublication: true,
        publication: user.publication.id,
        slug: "updated-slug",
        slugOverridden: false,
        importedFromMedium: false,
        dateAdded: Date.now(),
        hasCustomDate: true,
        hasScheduledDate: false,
        isDelisted: false,
        disableComments: false,
        stickCoverToBottom: false,
        enableToc: false,
        isNewsletterActivated: true,
        _id: postId,
        hasLatex: false,
      },
      draftId: false,
    },
    cookie
  );

  console.log(res);
})();
