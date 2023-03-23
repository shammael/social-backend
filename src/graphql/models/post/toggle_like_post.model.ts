import IPost, { TLikeReaction } from "../../../interfaces/post.js";
import { PostModel } from "../../../services/models/index.js";

interface IRequest {
  postdata: Pick<IPost, "userID"> & { reaction?: TLikeReaction | null };
  id: string;
}

const toggleLikePostModel = async ({
  id,
  postdata,
}: IRequest): Promise<IPost | null> => {
  const postDB = await PostModel.findOne({ _id: id, active: true });
  if (!postDB) {
    return null;
  }
  if (
    postDB &&
    postdata.reaction &&
    !postDB.likes.includes({
      reaction: postdata.reaction,
      userID: postdata.userID,
    })
  ) {
    postDB.likes.push({ reaction: postdata.reaction, userID: postdata.userID });

    await postDB.save();

    return postDB;
  } else {
    postDB.likes.filter((post) => post.userID !== postdata.userID);
    const post = await postDB.save();
    return post;
  }
};

export default toggleLikePostModel;
