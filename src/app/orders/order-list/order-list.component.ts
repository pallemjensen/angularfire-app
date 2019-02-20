import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {OrderserviceService} from '../shared/orderservice.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Observable<any[]>;

  constructor(private orderservice: OrderserviceService) { }

  ngOnInit() {
    this.orders = this.orderservice.getOrders();
  }

}
