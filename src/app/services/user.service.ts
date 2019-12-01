import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { EnvService } from '../env.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
      private env: EnvService) { }

    register(user: any): Observable<any> {
        const { username, password, firstName, lastName, SVusername, email, mobileNumber, role } = user;
        return this.http.post(`${this.env.apiUrl}/users/register`, { username, password, firstName, lastName, SVusername, email, mobileNumber, role });
    }

    submitTask(task: any): Observable<any> {
        return this.http.post(`${this.env.apiUrl}/users/task`, task);
    }

    getTasksById(id): Observable<any> {
        return this.http.get(`${this.env.apiUrl}/users/tasks/${id}`);
    }

    getAllEmployeeTasks(username, role): Observable<any> {
        return this.http.post(`${this.env.apiUrl}/users/tasks`, {username, role});
    }

    updateTask(task): Observable<any> {
        return this.http.post(`${this.env.apiUrl}/users/task/${task._id}`, task);
    }
}