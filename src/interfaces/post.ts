export type TLikeReaction = "like" | "haha" | "love";
interface IPost {
  userID: string;
  content: string;
  picturePath?: string;
  likes: {
    userID: string;
    reaction: TLikeReaction;
  }[];
  createdAt: string;
  updatedAt: string;
  status: "pending" | "active" | "disabled";
  _id: string;
  level: "first" | "second" | "third";
}

export default IPost;
