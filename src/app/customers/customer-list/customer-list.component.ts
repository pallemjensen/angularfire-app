import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomerService} from '../shared/customer.service';
import {Customer} from "../shared/customer.model";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Observable<Customer[]>;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customers = this.customerService.getCustomers()
  }
}


/*export class CustomerListComponent implements OnInit {

  subscription: Subscription;
  customers: Customer[];

  constructor(private customerService: CustomerService) { }
  ngOnInit() {
    this.subscription = this.customerService.getCustomers()
      .subscribe(customers =>{
        this.customers = customers;
        //debugger;
      });
  }
}
*/
