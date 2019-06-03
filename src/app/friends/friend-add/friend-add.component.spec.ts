import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendAddComponent } from './friend-add.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonsModule} from 'ngx-bootstrap';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FriendService} from '../shared/friend.service';


describe('FriendAddComponent', () => {
  let component: FriendAddComponent;
  let fixture: ComponentFixture<FriendAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendAddComponent ],
      imports: [
        ReactiveFormsModule,
        ButtonsModule,
        FormsModule,
        RouterTestingModule,
        CommonModule,
        AngularFireStorageModule
      ],
      providers: [
        {
          provide: FriendService, useClass: friendServiceStub
        }
      ]
    })
    .compileComponents().catch();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class friendServiceStub {}
