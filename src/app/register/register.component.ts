import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;

    submitted: boolean = false;

    roles: any[] = [];

    constructor(private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastService: ToastService) { }

    ngOnInit() {
        
        this.roles= [
            {name: 'Employee', code: 'ROLE_EMPLOYEE'},
            {name: 'Supervisor', code: 'ROLE_SUPERVISOR'}
        ];

        this.registerForm = this.formBuilder.group({
            username: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            email: [null, Validators.email],
            role: [null, Validators.required],
            mobileNumber: [''],
            password: [null, Validators.required],
            confirmPassword: [null, Validators.required]
        });

        this.registerForm.get('role').valueChanges.subscribe(control=>{
            if (control == 'ROLE_EMPLOYEE' && !this.registerForm.contains('SVusername')) {
                this.registerForm.addControl('SVusername', new FormControl('', Validators.required));
            } else if (control == 'ROLE_SUPERVISOR' && this.registerForm.contains('SVusername')) {
                this.registerForm.removeControl('SVusername')
            } else {
                this.registerForm.removeControl('SVusername');
            }
        });
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login']);
                },
                error => {
                    this.toastService.error(error);
                });
    }    

    get formControls() {
        return this.registerForm.controls;
    }

}
