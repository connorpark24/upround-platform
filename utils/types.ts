export type Member = {
  id: number;
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
  id: number | null;
  name: string;
  member_id: number;
  industry: string;
  status: string;
  umich_startup: boolean;
  source: string;
  notes: string;
  link: string;
  date_sourced: Date | null;
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
  id: number;
  name: string;
  description: string;
  link: string;
  category: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  done_by: Date;
  members_assigned: number[];
  status: string;
}

export enum Rank {
  NewUser = 0,
  Member = 1,
  Board = 2,
}
