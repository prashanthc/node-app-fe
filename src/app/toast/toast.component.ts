import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { Subscription } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
    private subscription: Subscription;

    constructor(private msgService: MessageService,
        private toastService: ToastService) { }

    ngOnInit() {
        this.subscription = this.toastService.getToast().subscribe(message=>{
            this.msgService.add(message);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
