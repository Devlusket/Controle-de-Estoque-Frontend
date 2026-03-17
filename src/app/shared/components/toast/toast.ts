import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  template: `
    <div class="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg animate-fade-in">
          {{ toast.message }}
        </div>
      }
    </div>
  `
})
export class ToastComponent {
  toastService = inject(ToastService);
}