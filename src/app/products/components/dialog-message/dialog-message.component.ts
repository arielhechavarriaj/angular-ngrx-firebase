import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface DialogData {
  action: string;
  response: boolean;
}

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss'],
})
export class DialogMessageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  success(): void {
    this.data.response = true;
    this.dialogRef.close(true);
  }
}
