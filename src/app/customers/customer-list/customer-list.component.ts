import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {CustomerserviceService} from '../shared/customerservice.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Observable<any[]>;
  constructor(private customerService: CustomerserviceService) { }
  ngOnInit() {
    this.customers = this.customerService.getCustomers();
  }
}
