export type Member = {
  name: string;
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
  date: Date;
};

export type Investor = {
  name: string;
  connect: string;
};
