import { query } from "./base";
import { User } from "./types";

const apiKey = "";

/**
 * Find a user by username.
 *
 * @param username The user's username.
 */
const findUser = async (username: string): Promise<User> =>
  query(
    apiKey,
    `query User($username: String!) {
       user(username: $username) {
         _id,
         username,
         name,
         tagline,
         publication {
           _id,
           title
         },
         publicationDomain
       }
     }`,
    { username }
  ).then(({ data: { user } }) => ({
    id: user._id,
    username: user.username,
    name: user.name,
    tagline: user.tagline,
    publication: {
      id: user.publication._id,
      name: user.publication.title,
      domain: user.publicationDomain,
    },
  }));

export default findUser;
