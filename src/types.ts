export type Publication = {
  id: string;
  name: string;
  domain: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  tagline: string;
  publication: Publication;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  url: string;
  canonicalURL?: string;
  contentMarkdown: string;
};

export type Tag = {
  _id: string;
  slug: string;
  name: string;
}

export type ImageUploadURL = {
  url: string;
  fields: any;
  __typename: string;
};

export type PostUpdate = {
  post: {
    contentMarkdown: string;
    coverImage: string;
    coverImageAttribution: string;
    coverImagePhotographer: string;
    dateAdded: number;
    disableComments: boolean;
    enableToc: boolean;
    hasCustomDate: boolean;
    hasLatex: boolean;
    hasScheduledDate: boolean;
    importedFromMedium: boolean;
    isCoverAttributionHidden: boolean;
    isDelisted: boolean;
    isNewsletterActivated: boolean;
    isRepublished: boolean;
    metaDescription: string;
    metaTitle: string;
    ogImage: string;
    originalArticleURL: string;
    partOfPublication: boolean;
    pollOptions: [any] | [];
    publication: Publication["id"];
    slug: string;
    slugOverridden: boolean;
    stickCoverToBottom: boolean;
    subtitle: string;
    tags: [Tag] | [];
    title: string;
    type: string;
    _id: string;
  };
  draftId: boolean;
};
