export interface ProdutoResponse {
  id: number;
  nome: string;
  unidadeMedida: string;
  ativo: boolean;
}

export interface ProdutoRequest {
  nome: string;
  unidadeMedida: string;
}