import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<HelpModalComponent>) { }

  ngOnInit(): void {
  }
  closeModal():void{
    this.dialogRef.close();
  }

}
