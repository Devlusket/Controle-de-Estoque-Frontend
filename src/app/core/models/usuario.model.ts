import { CidadeResponse } from "./cidade.model";

export type Role = 'ADMIN' | 'CLIENTE';

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  role: Role;
  ativo: boolean;
  cidade: CidadeResponse;
}

export interface UsuarioRequest {

  nome: string;
  email: string;
  senha: string;
  role: Role;
  cidadeId: number;
}