import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    StopTrainingComponent
  ],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css'
})
export class CurrentTrainingComponent implements OnInit{

  progress = 0;
  timer?: any;


  constructor(private dialog: MatDialog, private trainingService:TrainingService) {

    
  }

  ngOnInit(){
    this.startOrResumeTimer();
  }

  startOrResumeTimer(){
    const step = this.trainingService.getRunningExercise().duration! / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;

      if(this.progress >=100)
        {
          this.progress = 100;
            clearInterval(this.timer);
            this.trainingService.completeExercise();
        }
    },step);
  }

  onClickStop(){
    clearInterval(this.timer);
   const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result)
          {
            this.trainingService.cancelExercise(this.progress);
            
          } else {
            this.startOrResumeTimer();
          }
    });
  }
}
