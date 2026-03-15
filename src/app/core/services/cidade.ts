import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CidadeRequest, CidadeResponse } from '../models/cidade.model';

@Injectable({
  providedIn: 'root',
})
export class CidadeService {
  

  private readonly apiUrl = `${environment.apiUrl}/cidades`;

  private http = inject(HttpClient);


  listar(): Observable<CidadeResponse[]> {
    return this.http.get<CidadeResponse[]>(this.apiUrl); 
  } 

  buscarPorId(id: number): Observable<CidadeResponse> {
    return this.http.get<CidadeResponse>(`${this.apiUrl}/${id}`);
  }

  criar(request: CidadeRequest): Observable<CidadeResponse> {
    return this.http.post<CidadeResponse>(this.apiUrl, request);
  }

  atualizar(id: number, request: CidadeRequest): Observable<CidadeResponse> {
    return this.http.put<CidadeResponse>(`${this.apiUrl}/${id}`, request);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
