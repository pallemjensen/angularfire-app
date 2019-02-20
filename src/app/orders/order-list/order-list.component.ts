import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OrderserviceService} from '../shared/orderservice.service';
import {Order} from "../shared/order.model";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[];
  subscription: Subscription;

  constructor(private orderservice: OrderserviceService) { }

  ngOnInit() {
    this.subscription = this.orderservice.getOrders()
      .subscribe(orders => {
        this.orders = orders;
        //debugger;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
