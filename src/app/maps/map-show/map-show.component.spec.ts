import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapShowComponent } from './map-show.component';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {FriendService} from '../../friends/shared/friend.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Friend} from '../../friends/shared/friend.model';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileService} from '../../files/shared/file.service';

describe('MapShowComponent', () => {
  let component: MapShowComponent;
  let fixture: ComponentFixture<MapShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapShowComponent],
      imports: [
        AgmCoreModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: FirestoreStub },
        {provide: FriendService, friendServiceStub },
        {provide: FileService, fileServiceStub},
        MapsAPILoader,
        RouterTestingModule,
        AngularFireStorage,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/*
  describe('showFriendsOnMap', () => {
    component.ngOnInit();
    it('should call showFriendsOnMap ', ()  => {
      expect(component.showFriendsOnMap).toHaveBeenCalledTimes(1);
    });
  });


  describe('onChoseLocation' , () => {
    component.onChoseLocation('d');
    it('should call onChoseLocation', () => {
      expect(component.onChoseLocation).toHaveBeenCalledTimes(1);
    });
  });*/

/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  */
});



const FirestoreStub = {
  collection: (name: string) => ({
    // tslint:disable-next-line:variable-name
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      // tslint:disable-next-line:variable-name
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

class friendServiceStub {

}

class  fileServiceStub {
  
}

