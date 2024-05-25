import { Injectable, OnInit, inject } from "@angular/core";
import { AuthData } from "./auth-data.model";
//import { User } from "./user.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { Auth, User, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from "@angular/fire/auth";

@Injectable()
export class AuthService implements OnInit{
    private auth = inject(Auth);

    authChange = new Subject<boolean>();
    private user?:User | null;
    private isAuthenticated = false;
    constructor(private router: Router){


     }
    ngOnInit(): void {
        authState(this.auth).subscribe( currentUser => {
            this.user=currentUser;
            console.log(currentUser);
            if(currentUser == null){
                this.isAuthenticated = false;
            }
            else {
                this.isAuthenticated = true;
            }

            console.log(this.isAuthenticated);
        });
    }

    registerUser(authData: AuthData)
    {
        createUserWithEmailAndPassword(
            this.auth,
            authData.email,
            authData.password
          ).then(result => {
            console.log(result);
            this.authSuccessfully();
          }).catch(err => {
            console.log(err);
          })
          ;
          /*
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString()
        };
        */
       
    }

    login(authData: AuthData)
    {
        signInWithEmailAndPassword(
            this.auth,
            authData.email,
            authData.password
          ).then(result => {
            console.log(result);
            this.authSuccessfully();
          }).catch(err => {
            console.log(err);
          });
    }

    logout() {
        signOut(this.auth);
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }


    isAuth(){
        return this.isAuthenticated;
    }

    private authSuccessfully(){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}