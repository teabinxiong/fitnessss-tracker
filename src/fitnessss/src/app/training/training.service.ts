import { Observable, Subject, Subscription } from "rxjs";
import { Exercise } from "./exercise.model";
import { CollectionReference, DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData } from "@angular/fire/firestore";
import { Injectable, OnDestroy, inject } from "@angular/core";

@Injectable()
 export class TrainingService implements OnDestroy
 {
    subscriptions:Subscription[] = [];

    firestore: Firestore = inject(Firestore);

    availableExercisesCollection?: CollectionReference<DocumentData,DocumentData>
    finishedExercisesCollection?: CollectionReference<DocumentData,DocumentData>
    constructor(){

        this.availableExercisesCollection = collection(this.firestore, 'availableExercises');
        this.finishedExercisesCollection = collection(this.firestore, 'finishedExercises');

        this.availableExercises$ = collectionData(this.availableExercisesCollection) as Observable<Exercise[]>;
        this.finishedExercises$ = collectionData(this.finishedExercisesCollection) as Observable<Exercise[]>;
  
       this.subscriptions.push( this.availableExercises$.subscribe(items => {
            this.availableExercises = items;
            console.log(items);
        }));

        this.subscriptions.push( this.finishedExercises$.subscribe(items => {
            this.finishedExercises = items;
            console.log(this.finishedExercises);
        }));
  }

     ngOnDestroy(): void {
         this.subscriptions.map(subscription => {
            subscription.unsubscribe();
         });
     }




    exerciseChanged = new Subject<Exercise| null>();
    availableExercises$ = new Observable<Exercise[]>();
    finishedExercises$ = new Observable<Exercise[]>();

    private availableExercises : Exercise[] = [];
    /*
    private availableExercises : Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ]
    */

    private runningExercise? : Exercise | null;
    private finishedExercises : Exercise[] = [];

    getAvailableExercise(){
        return this.availableExercises.slice();
    }

    startExercise(selectedId : string)
    {
        this.runningExercise  = this.availableExercises.find( exercise => exercise.id === selectedId);
        if(this.runningExercise != null){
            this.exerciseChanged.next({...this.runningExercise!});
        }
        
    }

    getRunningExercise(){
        return { ...this.runningExercise };
    }

    completeExercise(){
        if(this.runningExercise != null){
            //this.completedExercises.push({ 
            this.addFinishedExerciseToDatabase({
                ...this.runningExercise!,
                date : new Date(),
                state : 'completed' 
             });
            this.runningExercise = null;
            this.exerciseChanged.next(null);
        }
    }

    cancelExercise(progress: number){
        if(this.runningExercise != null){
            //this.completedExercises.push({ 
            this.addFinishedExerciseToDatabase({
                ...this.runningExercise!,
                duration: this.runningExercise.duration * (progress / 100),
                calories: this.runningExercise.calories * (progress / 100),
                date : new Date(),
                state : 'cancelled' 
             });
            this.runningExercise = null;
            this.exerciseChanged.next(null);
        }
    }

    getCompletedOrCancelledExercises(){
        console.log(this.finishedExercises.slice());
        return this.finishedExercises.slice();
    }

    private addFinishedExerciseToDatabase(exercise: Exercise)
    {
        addDoc(this.finishedExercisesCollection!,   exercise ).then((documentReference: DocumentReference) => {
            // the documentReference provides access to the newly created document
            console.log(documentReference);
        });
    }
 }