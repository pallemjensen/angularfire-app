import {OrderService} from '../shared/order.service';
import {Order} from "../shared/order.model";
import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: Observable<Order[]>;

  constructor(private orderservice: OrderService) { }

  ngOnInit() {
    this.orders = this.orderservice.getOrders();
  }

  deleteOrder(order: Order) {
    const obs = this.orderservice.deleteOrder(order.id)
      obs.subscribe(() => {
        window.alert('Order with id: ' + order.id + ' was deleted.');
      }, error1 => {
        window.alert('Order with id: ' + order.id + 'was not found.')
        });
  }
}
