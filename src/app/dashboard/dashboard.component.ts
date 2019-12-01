import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { UserService } from '../services/user.service';
import { finalize } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    userRole: string = '';

    tasks: any[] = [];

    cols: any[];

    taskForm: FormGroup;

    display: boolean = false;

    constructor(private authService: AuthenticationService,
        private fb: FormBuilder,
        private loaderService: LoaderService,
        private userService: UserService,
        private toastService: ToastService,
        private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.userRole = this.authService.currentUserValue.role;

        this.taskForm = this.fb.group({
            comments: ['', Validators.required],
            taskId: ['', Validators.required]
        });

        this.cols = [
            { field: 'taskId', header: 'Task ID' },
            { field: 'comments', header: 'Comments' },
            { field: 'status', header: 'Status' }
        ];

        this.loaderService.showLoader();        

        if (this.authService.currentUserValue.role === 'ROLE_EMPLOYEE') {            
            this.loadTasksById();
        }

        if (this.authService.currentUserValue.role === 'ROLE_SUPERVISOR') {            
           this.loadEmployeeTasks();
        }

    }

    confirmDialog(rowData, status) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.updateTask(rowData, status);
            },
            reject: () => {}
        });
    }

    loadTasksById() {
        this.userService.getTasksById(this.authService.currentUserValue._id)
                .pipe(finalize(()=>this.loaderService.destroyLoader()))
                .subscribe(res=>{
                    this.tasks=res;
                });
    }

    loadEmployeeTasks() {
        const { username, role } = this.authService.currentUserValue;
        this.userService.getAllEmployeeTasks(username, role)
            .pipe(finalize(()=>this.loaderService.destroyLoader()))
            .subscribe(res=>this.tasks=res);
    }

    updateTask(rowData, status) {
        this.loaderService.showLoader();

        rowData['status'] = status;
        this.userService.updateTask(rowData)
            .pipe(finalize(()=>this.loaderService.destroyLoader()))
            .subscribe(res=>{
                if (res.status=='OK') {
                    this.loadEmployeeTasks();
                }
            },
            error=>this.toastService.error(error));
    }

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }

    submitTask() {
        this.loaderService.showLoader();
        this.display = false;

        let task = this.taskForm.value;
        task.employeeId = this.authService.currentUserValue._id;
        task.status = 'AWAITING_APPROVAL';
        this.userService.submitTask(task)
            .pipe(finalize(()=>this.loaderService.destroyLoader()))
            .subscribe(res=>{
                this.loaderService.destroyLoader();
                this.loadTasksById();
                this.toastService.success("Ticket submitted successfully!");
            },
            error=>console.log(error));
    }

}
