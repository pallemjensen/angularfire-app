import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CustomerService} from '../shared/customer.service';
import {Customer} from '../shared/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Observable<Customer[]>;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }

  deleteCustomer(customer: Customer) {
    const obs = this.customerService.deleteCustomer(customer.id);
    obs.subscribe(() => {
        window.alert('Customer with id: ' + customer.id + ' was deleted.');
      }, error1 => {
        window.alert('Customer with id: ' + customer.id + ' was not found.');
        });
    }
}
