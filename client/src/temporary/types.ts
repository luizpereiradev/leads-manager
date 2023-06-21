export type ILead = {
  name: string;
  email: string;
  phone: string;
  status?: string;
  description?: string;
};

export type ILeadId = ILead & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};