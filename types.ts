
export type Ilead = {
    nome: string;
    mail: string;
    telefone: string;
    status?: string;
    descricao: string;
};

export type IleadId = Ilead & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};
