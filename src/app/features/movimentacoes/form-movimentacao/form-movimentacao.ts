import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { ProdutoService } from '../../../core/services/produto.service';
import { CidadeService } from '../../../core/services/cidade.service';
import { AuthService } from '../../../core/services/auth.service';
import { MovimentacaoRequest, TipoMovimentacao } from '../../../core/models/movimentacao.model';
import { ProdutoResponse } from '../../../core/models/produto.model';
import { CidadeResponse } from '../../../core/models/cidade.model';

@Component({
  selector: 'app-form-movimentacao',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './form-movimentacao.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormMovimentacaoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private movimentacaoService = inject(MovimentacaoService);
  private produtoService = inject(ProdutoService);
  private cidadeService = inject(CidadeService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  @Output() salvo = new EventEmitter<void>();

  produtos: ProdutoResponse[] = [];
  cidades: CidadeResponse[] = [];
  mostrarCidadeDestino = false;

  tipos: TipoMovimentacao[] = ['ENTRADA', 'SAIDA', 'TRANSFERENCIA'];

  form = this.fb.nonNullable.group({
    tipo: ['ENTRADA' as TipoMovimentacao, Validators.required],
    produtoId: [null as number | null, Validators.required],
    cidadeDestinoId: [null as number | null],
    quantidade: [null as number | null, Validators.required],
    observacao: ['' as string | null]
  });

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => { this.produtos = dados; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });

    this.cidadeService.listar().subscribe({
      next: (dados) => {
        if (this.authService.isAdmin()) {
          this.cidades = dados;
        } else {
          this.cidades = dados.filter(c => c.sede);
        }
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });

    this.form.get('tipo')?.valueChanges.subscribe(tipo => {
      this.mostrarCidadeDestino = tipo === 'TRANSFERENCIA';
      this.cdr.markForCheck();
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const request = this.form.value as MovimentacaoRequest;
    this.movimentacaoService.registrar(request).subscribe({
      next: () => this.salvo.emit(),
      error: (err) => console.error(err)
    });
  }
}