import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
        selector: 'app-stop-training',
        template: `
        <h1 mat-dialog-title>Are you sure?</h1>
        <mat-dialog-content>
            <p>You already got {{ passedData.progress }}%</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-button [mat-dialog-close]="true">Yes</button>
            <button mat-button [mat-dialog-close]="false">NO</button>
        </mat-dialog-actions>
        `,
        imports:[
            MatDialogModule,
            MatButtonModule
        ],
        standalone:true
})
export class StopTrainingComponent 
{
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any){

    }
}