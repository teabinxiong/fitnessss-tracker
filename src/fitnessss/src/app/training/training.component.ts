import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    MatTabsModule,
    NewTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {

  ongoingTraining:Boolean = false;
  subscriptions:Subscription[] = [];

  constructor(private trainingService: TrainingService){}

  ngOnInit(): void {
    this.subscriptions.push(
      this.trainingService.exerciseChanged.subscribe(exercise => {
        if(exercise){
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      })
    );
  }
}
