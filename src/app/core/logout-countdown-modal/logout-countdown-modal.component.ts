import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, timer } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-logout-countdown-modal',
  templateUrl: './logout-countdown-modal.component.html',
  styleUrls: ['./logout-countdown-modal.component.scss']
})
export class LogoutCountdownModalComponent implements OnInit, OnDestroy{

  infoMessage:string;
  timerMessage:string;
  counter: number;
  private destroy$: Subject<void> = new Subject();
  constructor(public dialogRef: MatDialogRef<LogoutCountdownModalComponent>) {
    
   }
  ngOnInit(): void {
    this.startTimer()
  }
   startTimer() {
    timer(0, 1000)
      .pipe(takeUntil(this.destroy$), take(this.counter ))
      .subscribe((value) => {
        this.counter--;

        if (this.counter === 0) {
          this.onTimerComplete();
        }
      });
  }

  private onTimerComplete() {
    this.dialogRef.close(true); // You can pass any data you want here
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
