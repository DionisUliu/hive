export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  score: number;
  verificationCode: string;
  gender: string;
  level: number;
  tokens: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRegistration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
}

export interface IUserUpdate {
  password: string;
  verificationCode: string;
}

export interface IUserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SigninBody {
  email: string;
  password: string;
}

export interface SendResetLinkBody {
  email: string;
}

export interface ValidateResetLinkParams {
  verificationCode: string;
  id: string;
}

export interface ResetPasswordBody {
  verificationCode: string;
  id: string;
  password: string;
}

export enum ResetPasswordStatus {
  SENDING_LINK,
  CONFIRMED,
  NOT_CONFIRMED,
}

export interface RecordingsBody {
  userId: string | undefined;
  sentenceKey: string;
  sentence: string;
  audioUrl: any;
  audioLength: number;
}

export interface ISentenceData {
  sentence: string;
  sourceId: string;
  frequency: number;
  sources?: {
    name: string;
  };
}

export interface ISentenceDataUpdate {
  id: string;
  sentence: string;
  sourceId: string;
  frequency: number;
}
export interface ISourcesData {
  id?: string;
  name: string;
  description: string;
  frequency: number;
}

export interface ICreateResidentBody {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

export interface IUpdateResidentBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface ICreateContractBody {
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
  isPaid: boolean;
  residentId: string;
  roomId: string;
}

export interface IUpdateContractBody {
  name?: string;
  amount?: number;
  startDate?: string;
  endDate?: string;
  isPaid?: boolean;
  residentId?: string;
  roomId?: string;
}

export interface ICreateRegisterBody {
  buildingId: string;
  residentId: string;
  roomId: string;
}

export interface IUpdateRegisterBody {
  buildingId?: string;
  residentId?: string;
  roomId?: string;
  active?: boolean;
}
