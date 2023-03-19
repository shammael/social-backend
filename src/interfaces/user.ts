interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  picturePath: string;
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  online: boolean;
  active?: boolean;
  _id: string;
  token?: string;
}

export default IUser;
