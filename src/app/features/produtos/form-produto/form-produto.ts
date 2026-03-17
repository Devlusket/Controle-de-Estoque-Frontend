import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProdutoService } from '../../../core/services/produto.service';
import { ProdutoRequest } from '../../../core/models/produto.model';

@Component({
  selector: 'app-form-produto',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form-produto.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormProdutoComponent implements OnInit{

  private fb = inject(FormBuilder);
  private produtoService = inject(ProdutoService);

  @Input() id: number | null = null;
  @Output() salvo = new EventEmitter<void>();

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    unidadeMedida: ['', Validators.required]
  });

  ngOnInit(): void {
    if (this.id) {
      this.produtoService.buscarPorId(this.id).subscribe({
        next: (produto) => this.form.patchValue(produto),
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const request = this.form.value as ProdutoRequest;

    const operacao = this.id
    ? this.produtoService.atualizar(this.id, request)
    : this.produtoService.criar(request);

    operacao.subscribe({
      next: () => this.salvo.emit(),
      error: (err) => console.error(err)
    });

  }




}
