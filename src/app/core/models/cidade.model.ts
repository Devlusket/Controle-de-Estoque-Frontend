export interface CidadeResponse {
  id: number;
  nome: string;
  estado: string;
  sede: boolean;
}

export interface CidadeRequest {
  nome: string;
  estado: string;
  sede: boolean;
}