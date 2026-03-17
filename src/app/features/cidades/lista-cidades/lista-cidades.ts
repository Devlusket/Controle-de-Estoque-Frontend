import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormCidadeComponent } from '../form-cidade/form-cidade';
import { CidadeService } from '../../../core/services/cidade.service';
import { AuthService } from '../../../core/services/auth.service';
import { CidadeResponse } from '../../../core/models/cidade.model';

@Component({
  selector: 'app-lista-cidades',
  imports: [MatTableModule, MatButtonModule, MatIconModule, FormCidadeComponent],
  templateUrl: './lista-cidades.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListaCidadesComponent implements OnInit {

  private cidadeService = inject(CidadeService);
  private cdr = inject(ChangeDetectorRef);
  authService = inject(AuthService);


  cidades: CidadeResponse[] = [];
  colunas = ['id', 'nome', 'estado', 'sede', 'acoes'];

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.cidadeService.listar().subscribe({
      next: (dados) => {
        this.cidades = dados,
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  deletar(id: number): void {
    this.cidadeService.deletar(id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error(err)
    });
  }

  mostrarForm = false;
  idSelecionado: number | null = null;

    abrirForm(id: number | null = null): void {
    this.idSelecionado = id;
    this.mostrarForm = true;
  };

  aoSalvar(): void {
    this.mostrarForm = false;
    this.idSelecionado = null;
    this.carregar();
  }


}
