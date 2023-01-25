import createDraftUnofficial from "../src/create-draft-unoffical";
import updateDraftUnofficial from "../src/update-draft-unofficial";
import uploadImage from "../src/upload-image";
import findUser from '../src/find-user';

let cookie = "";

(async () => {
  let user = await findUser("trekttt");
  let publicationId = user.publication.id;
  let draftId = await createDraftUnofficial(publicationId, cookie);

  let data = {
    updateData: {
      _id: draftId,
      type: "story",
      contentMarkdown: "This draft has been updated at " + (new Date).toString(),
      title: "Updated!",
      subtitle: "",
      slug: "",
      slugOverridden: false,
      tags: [],
      coverImage: "",
      coverImageAttribution: "",
      coverImagePhotographer: "",
      isCoverAttributionHidden: false,
      ogImage: "",
      metaTitle: "",
      metaDescription: "",
      originalArticleURL: "",
      isRepublished: false,
      partOfPublication: true,
      publication: publicationId,
      isDelisted: false,
      dateAdded: "",
      importedFromMedium: false,
      dateUpdated: Date.now(),
      hasCustomDate: false,
      hasScheduledDate: false,
      isActive: true,
      series: null,
      pendingPublicationApproval: false,
      disableComments: false,
      stickCoverToBottom: false,
      enableToc: false,
      publishAs: null,
      isNewsletterActivated: true,
    },
    draftAuthor: user.id,
    draftId: draftId,
    options: {
      merge: true,
    },
  };

  let result = await updateDraftUnofficial(data, cookie);
  console.log(result);
})();
