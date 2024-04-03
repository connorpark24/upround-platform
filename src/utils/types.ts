export type Member = {
  full_name: string;
  linkedin: string;
  email: string;
  phone: string;
  major: string;
  year: number;
  hometown: string;
};

export type User = {
  full_name: string;
  linkedin: string;
  email: string;
  phone: string;
  major: string;
  year: number;
  hometown: string;
  pod: Pod;
  rank: Rank;
};

export type Startup = {
  id: number;
  name: string;
  user_id: number;
  industry: string;
  status: string;
  umich_startup: boolean;
  source: string;
  notes: string;
  link: string;
  date_sourced: Date | null;
  pod: Pod;
};

export interface Resource {
  name: string;
  description: string;
  link: string;
  pod: Pod;
}

export interface Task {
  name: string;
  description: string;
  done_by: string;
  user_assigned: 0;
  status: string;
  profiles: {
    full_name: string;
  };
}

export type Investor = {
  name: string;
  connect: string;
};

export type Post = {
  title: string;
  description: string;
  link_to_resource: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
};

export enum StartupStatus {
  Contacted = "Contacted",
  Call = "Call",
  MemoWritten = "Memo Written",
  PassedToPartners = "Passed on to Partners",
  PassedToFund = "Passed on to Fund",
  Rejected = "Rejected",
}

export enum Rank {
  NewMember = "NewMember",
  Member = "Member",
  Board = "Board",
  Alumni = "Almuni",
}

export enum Pod {
  Accelerator = "Accelerator",
  Dealflow = "Dealflow",
  Fund = "Fund",
}
