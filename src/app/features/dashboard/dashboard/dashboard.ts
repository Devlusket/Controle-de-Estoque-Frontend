import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { MovimentacaoResponse } from '../../../core/models/movimentacao.model';

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule, DatePipe],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit{

  private movimentacaoService = inject(MovimentacaoService);
  private cdr = inject(ChangeDetectorRef);

  movimentacoes: MovimentacaoResponse[] = [];
  ultimas: MovimentacaoResponse[] = [];
  colunas = ['tipo', 'produto', 'quantidade', 'data'];

  ngOnInit(): void {
    this.movimentacaoService.listar().subscribe({
      next: (dados) => {
        this.movimentacoes = dados;
        this.ultimas = dados.slice(-5).reverse();
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }



}
