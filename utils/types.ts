export type Member = {
  name: string;
  linkedin: string;
  email: string;
  phone: string;
  major: string;
  year: number;
  pod: string;
  hometown: string;
};

export type Startup = {
  name: string;
  memberId: number;
  industry: string;
  status: string;
  umichStartup: boolean;
  source: string;
  notes: string;
  link: string;
  dateSourced: Date | null;
};

export type Investor = {
  name: string;
  connect: string;
};

export enum StartupStatus {
  Contacted = "Contacted",
  Call = "Call",
  MemoWritten = "Memo Written",
  PassedToPartners = "Passed on to Partners",
  PassedToFund = "Passed on to Fund",
  Rejected = "Rejected",
}

export interface Resource {
  name: string;
  description: string;
  link: string;
  category: string;
}

export enum Rank {
  NewUser = 0,
  Member = 1,
  Board = 2,
}
