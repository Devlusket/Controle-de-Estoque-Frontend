import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoRequest, ProdutoResponse } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {

  
  private readonly apiUrl = `${environment.apiUrl}/produtos`;

  private http = inject(HttpClient);


  listar(): Observable<ProdutoResponse[]> {
    return this.http.get<ProdutoResponse[]>(this.apiUrl);
  }

  buscarPorId(id: number):  Observable<ProdutoResponse> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}/${id}`);
  }

  criar(request: ProdutoRequest): Observable<ProdutoResponse> {
    return this.http.post<ProdutoResponse>(this.apiUrl, request);
  }

  atualizar(id: number, request: ProdutoRequest): Observable<ProdutoResponse> {
    return this.http.put<ProdutoResponse>(`${this.apiUrl}/${id}`, request);
  }

  desativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }




}
