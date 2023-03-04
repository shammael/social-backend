interface IPost {
  userID: string;
  description: string;
  picturePath?: string;
  likes: {
    userID: string;
  }[];
  comments: IPost[];
  createdAt: string;
  updatedAt: string;
  status: "pending" | "active" | "disabled";
  commentFrom: string;
}

export default IPost;
