import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';
import { CollectionReference, DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-past-trainings',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    CommonModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './past-trainings.component.html',
  styleUrl: './past-trainings.component.css'
})
export class PastTrainingsComponent implements OnInit, AfterViewInit{
  displayColumns = ['date', 'name', 'duration' , 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort?: MatSort; 
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  subscriptions:Subscription[] = [];

  firestore: Firestore = inject(Firestore);

  finishedExercisesCollection?: CollectionReference<DocumentData,DocumentData>

  finishedExercises$ = new Observable<Exercise[]>();

  private finishedExercises : Exercise[] = [];
  
  constructor(private trainingService : TrainingService){
   
    this.finishedExercisesCollection = collection(this.firestore, 'finishedExercises');

    this.finishedExercises$ = collectionData(this.finishedExercisesCollection) as Observable<Exercise[]>;




  }

  ngAfterViewInit(): void {
    if(this.sort != null){
      this.dataSource.sort = this.sort;
    }

    if(this.paginator != null){
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.subscriptions.push( this.finishedExercises$.subscribe(items => {
      this.finishedExercises = items;
      console.log(this.finishedExercises);

      this.dataSource.data = items.slice();
  }));
   let availableExercises2  = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
]
 // this.dataSource.data = availableExercises2;
   // this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
