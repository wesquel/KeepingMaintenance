import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-dialog',
  imports: [MatIcon],
  templateUrl: './response-dialog.component.html',
  styleUrl: './response-dialog.component.css'
})
export class ResponseDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number; action: string }) {}

  getMessage(): string {
    switch (this.data.action) {
      case 'create': return 'Manutenção criada com sucesso!';
      case 'update': return 'Manutenção atualizada com sucesso!';
      case 'delete': return 'Manutenção removida com sucesso!';
      default: return 'Operação realizada com sucesso!';
    }
  }
}
