import { CidadeResponse } from "./cidade.model";
import { ProdutoResponse } from "./produto.model";
import { UsuarioResponse } from "./usuario.model";

export type TipoMovimentacao = 'ENTRADA' | 'SAIDA' | 'TRANSFERENCIA';

export interface MovimentacaoResponse {
  id: number;
  tipo: TipoMovimentacao;
  produto: ProdutoResponse;
  usuario: UsuarioResponse;
  cidadeOrigem: CidadeResponse | null;
  cidadeDestino: CidadeResponse | null;
  quantidade: number;
  dataMovimentacao: string;
  observacao: string | null;
}

export interface MovimentacaoRequest {
  tipo: TipoMovimentacao;
  produtoId: number;
  cidadeDestinoId: number | null;
  quantidade: number;
  observacao: string | null;
}

