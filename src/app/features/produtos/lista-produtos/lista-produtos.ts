import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ProdutoService } from '../../../core/services/produto.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProdutoResponse } from '../../../core/models/produto.model';

@Component({
  selector: 'app-lista-produtos',
  imports: [MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './lista-produtos.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaProdutosComponent implements OnInit {

  private produtoService = inject(ProdutoService);
  private cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);

  produtos: ProdutoResponse[] = [];
  colunas = ['id', 'nome', 'unidadeMedida', 'ativo', 'acoes'];

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => {
        this.produtos = dados,
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  desativar(id: number): void {
    this.produtoService.desativar(id).subscribe({
      next: () => this.carregar,
      error: (err) => console.error(err)
    })
  }
  

}
