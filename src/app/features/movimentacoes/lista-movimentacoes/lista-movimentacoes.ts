import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { MovimentacaoResponse, TipoMovimentacao } from '../../../core/models/movimentacao.model';
import { FormMovimentacaoComponent } from '../form-movimentacao/form-movimentacao';

@Component({
  selector: 'app-lista-movimentacoes',
  imports: [FormMovimentacaoComponent, DatePipe],
  templateUrl: './lista-movimentacoes.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaMovimentacoesComponent implements OnInit {
  private movimentacaoService = inject(MovimentacaoService);
  private cdr = inject(ChangeDetectorRef);

  movimentacoes: MovimentacaoResponse[] = [];
  mostrarForm = false;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.movimentacaoService.listar().subscribe({
      next: (dados) => { this.movimentacoes = dados; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });
  }

  abrirForm(): void {
    this.mostrarForm = true;
  }

  aoSalvar(): void {
    this.mostrarForm = false;
    this.carregar();
  }

  tipoBadgeClass(tipo: TipoMovimentacao): string {
    const base = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium';
    switch (tipo) {
      case 'ENTRADA': return `${base} bg-green-100 text-green-700`;
      case 'SAIDA': return `${base} bg-red-100 text-red-700`;
      case 'TRANSFERENCIA': return `${base} bg-blue-100 text-blue-700`;
    }
  }
}