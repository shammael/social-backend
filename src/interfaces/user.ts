interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  online?: boolean;
  active?: boolean;
}

export default IUser;
