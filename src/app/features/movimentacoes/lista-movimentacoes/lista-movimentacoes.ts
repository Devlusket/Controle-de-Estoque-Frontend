import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormMovimentacaoComponent } from '../form-movimentacao/form-movimentacao';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { AuthService } from '../../../core/services/auth.service';
import { MovimentacaoResponse } from '../../../core/models/movimentacao.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-movimentacoes',
  imports: [MatTableModule, MatButtonModule, MatIconModule, FormMovimentacaoComponent, DatePipe],
  templateUrl: './lista-movimentacoes.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaMovimentacoesComponent implements OnInit{


  private movimentacaoService = inject(MovimentacaoService);
  private cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);

  movimentacoes: MovimentacaoResponse[] = [];
  colunas = ['id', 'tipo', 'produto', 'cidadeOrigem', 'cidadeDestino', 'quantidade', 'data', 'observacao' , 'acoes'];

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.movimentacaoService.listar().subscribe({
      next: (dados) => {
        this.movimentacoes = dados,
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  mostrarForm = false;

  abrirForm(): void {
    this.mostrarForm = true;
  }

  aoSalvar(): void {
    this.mostrarForm = false;
    this.carregar();
  }



}
