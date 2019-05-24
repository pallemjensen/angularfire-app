import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from './home.component';
import {ButtonsModule} from 'ngx-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonsModule,
    RouterTestingModule
  ]
})
export class HomeModule { }
