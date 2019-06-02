import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendUpdateComponent } from './friend-update.component';
import {FriendService} from '../shared/friend.service';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {RouterTestingModule} from '@angular/router/testing';
import {FileService} from '../../files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Friend} from '../shared/friend.model';
import GeoPoint = firestore.GeoPoint;
import {firestore} from 'firebase';

describe('FriendUpdateComponent', () => {
  let component: FriendUpdateComponent;
  let fixture: ComponentFixture<FriendUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendUpdateComponent ],
    imports: [
      ReactiveFormsModule,
      FormsModule,
      AngularFireStorageModule,
      RouterTestingModule
    ]
      ,
      providers: [
      {provide: FriendService, useClass: FriendServiceStub},
        {provide: FileService, useClass: fileServiceStub}

    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


class fileServiceStub {
}

class FriendServiceStub {
  private friend: Friend;
  getFriendById(id: string): Observable<Friend> {
    this.friend = {id: 'abc',
      name: 'efg',
      address: 'abc',
      mail: 'hello',
      phone: 'lsad',
      url: 'wazzap',
      picture: 'picString',
      location: new GeoPoint(34, 45)
    };
    return of( this.friend);
  }
}
