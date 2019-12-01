import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    
    submitted = false;

    selectedCity: any;

    returnUrl: string;

    error: string = '';

    cities: any[] = [];

    constructor(private fb: FormBuilder,
        private authService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService) {
            if (this.authService.currentUserValue){
                this.router.navigate(['/']);
            }
    }

    ngOnInit() {

        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];

        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get formControls() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.formControls.username.value, this.formControls.password.value)
            .pipe(first())
            .subscribe(data=>{
                    this.router.navigate([this.returnUrl]);
                },
                error=>{
                    this.toastService.error(error);
                });
    }

}
