import { Injectable } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonDialogComponent } from './common-dialog.component';
import { LogoutCountdownModalComponent } from '@core/logout-countdown-modal/logout-countdown-modal.component';
@Injectable()
export class CommonDialogService {
    dialogConfig: MatDialogConfig = {
        disableClose: false,
        hasBackdrop:false,
        backdropClass:'',
        width: '',
        height: '',
        position: {
            top: '',
            bottom: '',
            left: '',
            right: ''
        }
    };
    constructor(public dialog: MatDialog) { }

    deleteConformationDialog(message: string): Observable<boolean> {
        const dialogRef = this.dialog.open(CommonDialogComponent, this.dialogConfig);
        dialogRef.componentInstance.primaryMessage = message;
        return dialogRef.afterClosed();
    }

    showCountdownDialog(infoMessage:string,timerMessage:string,count: number): Observable<boolean> {
        const dialogRef = this.dialog.open(LogoutCountdownModalComponent, this.dialogConfig);
        dialogRef.componentInstance.counter = count;
        dialogRef.componentInstance.infoMessage = infoMessage;
        dialogRef.componentInstance.timerMessage = timerMessage;
        return dialogRef.afterClosed();
    }
}
