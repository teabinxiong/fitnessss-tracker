import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Firestore, QueryDocumentSnapshot, collection, collectionChanges, collectionData, doc, getDocs, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent implements OnInit {
  //exercises?: Exercise[] = [];

  exercises$?: Observable<Exercise[]>;
  firestore: Firestore = inject(Firestore);

  constructor(private trainingService: TrainingService){

        const availableExercisesCollection = collection(this.firestore, 'availableExercises');

        this.exercises$ = collectionData(availableExercisesCollection) as Observable<Exercise[]>;
  
  }

  ngOnInit(): void {

  }

  onStartTraining(form : NgForm){
    this.trainingService.startExercise(form.value.exercise);
  }
}
