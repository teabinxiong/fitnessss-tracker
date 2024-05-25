import { Injectable, OnDestroy, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Auth, authState } from "@angular/fire/auth";
import { Subscription } from "rxjs";

@Injectable()
export class AuthGuard implements OnDestroy {
    subscriptions: Subscription[] = [];
    private auth = inject(Auth);
    constructor(private authService: AuthService, private router: Router) {

    }
    ngOnDestroy(): void {
        this.subscriptions.map(subscription => {
            subscription.unsubscribe();
        });
    }

    canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot){


        this.subscriptions.push(authState(this.auth).subscribe( currentUser => {

        console.log(currentUser);
        if(currentUser !== null){
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }

        }));

        /*
        if(this.authService.isAuth())
        {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
        */
    }
}