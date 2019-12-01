import { Component } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { LoaderService } from './services/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'node-app-fe';

    currentUser: User;

    showLoader: boolean = false;

    constructor(private router: Router,
        private authService: AuthenticationService,
        private loader: LoaderService) {
            this.authService.currentUser.subscribe(user=>this.currentUser=user);
            this.loader.load().subscribe(x=>this.showLoader=x);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
