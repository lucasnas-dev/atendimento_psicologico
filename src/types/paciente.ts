export interface Paciente {
  id: string;
  nome: string;
  email: string | null;
  telefone: string | null;
  dataNascimento: string; // ISO string format
  genero: string | null;
  endereco: string | null;
  observacoes: string | null;
  ativo: boolean;
  tenantId: string;
  usuarioId: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export type PacientesResponse = ApiResponse<Paciente[]>;
