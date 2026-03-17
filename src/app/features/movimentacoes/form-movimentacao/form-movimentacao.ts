import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MovimentacaoService } from '../../../core/services/movimentacao.service';
import { ProdutoService } from '../../../core/services/produto.service';
import { CidadeService } from '../../../core/services/cidade.service';
import { AuthService } from '../../../core/services/auth.service';
import { MovimentacaoRequest, TipoMovimentacao } from '../../../core/models/movimentacao.model';
import { ProdutoResponse } from '../../../core/models/produto.model';
import { CidadeResponse } from '../../../core/models/cidade.model';

@Component({
  selector: 'app-form-movimentacao',
  imports: [ReactiveFormsModule],
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
    tipoMovimentacao: ['ENTRADA' as TipoMovimentacao, Validators.required],
    produtoId: [null as number | null],
    cidadeDestinoId: [null as number | null],
    quantidade: [null as number | null],
    observacao: ['' as string | null]
  });

  ngOnInit(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => { this.produtos = dados; this.cdr.markForCheck(); },
      error: (err) => console.error(err)
    });

    this.cidadeService.listar().subscribe({
      next: (dados) => {
        this.cidades = this.authService.isAdmin() ? dados : dados.filter(c => c.sede);
        this.cdr.markForCheck();
      },
      error: (err) => console.error(err)
    });

    this.form.get('tipoMovimentacao')?.valueChanges.subscribe(tipo => {
      this.mostrarCidadeDestino = tipo === 'TRANSFERENCIA';
      this.cdr.markForCheck();
    });

    this.cdr.markForCheck();
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