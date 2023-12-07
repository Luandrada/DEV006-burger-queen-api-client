import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastModel } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnDestroy {

  public toastModel: ToastModel;

  private $subscriptions: Subscription;

  constructor(private _toastService:ToastService) {
    this.$subscriptions = this._toastService.$toastState.subscribe( (toastModel: ToastModel) => {
      this.toastModel = toastModel;
    });
  }
 
  public close(): void { this.toastModel.visible = false; }

  ngOnDestroy(): void { this.$subscriptions.unsubscribe(); }
}
