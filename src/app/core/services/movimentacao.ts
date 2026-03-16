import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovimentacaoRequest, MovimentacaoResponse } from '../models/movimentacao.model';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  

  private readonly apiUrl = `${environment.apiUrl}/movimentacoes`;

  private http = inject(HttpClient);


  listar(): Observable<MovimentacaoResponse[]> {
    return this.http.get<MovimentacaoResponse[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<MovimentacaoResponse> {
    return this.http.get<MovimentacaoResponse>(`${this.apiUrl}/${id}`);
  }

  registrar(request: MovimentacaoRequest): Observable<MovimentacaoResponse> {
    return this.http.post<MovimentacaoResponse>(this.apiUrl, request);
  }

  filtrarPorProdutoId(id: number): Observable<MovimentacaoResponse[]> {
    return this.http.get<MovimentacaoResponse[]>(`${this.apiUrl}/produto/${id}`);
  }

  filtrarPorCidadeId(id: number): Observable<MovimentacaoResponse[]> {
    return this.http.get<MovimentacaoResponse[]>(`${this.apiUrl}/cidade/${id}`);
  }


}
