import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapShowComponent } from './map-show.component';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {FriendService} from '../../friends/shared/friend.service';
import {Observable, of} from 'rxjs';
import {Friend} from '../../friends/shared/friend.model';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MapShowComponent', () => {
  let component: MapShowComponent;
  let fixture: ComponentFixture<MapShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapShowComponent],
      imports: [
        AgmCoreModule.forRoot()
      ],
      providers: [
        MapsAPILoader,
        {provide: FriendService, useClass: friendServiceStub}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class friendServiceStub {

}

