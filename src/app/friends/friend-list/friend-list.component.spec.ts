import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListComponent } from './friend-list.component';
import {FriendService} from '../shared/friend.service';
import {FileService} from '../../files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Friend} from '../shared/friend.model';
import {By} from '@angular/platform-browser';
import {Debugger} from 'inspector';

describe('FriendListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendListComponent ],
      imports: [],
      providers: [
        {provide: FriendService, useClass: friendServiceStub},
        {provide: FileService, useClass: fileServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should contain an h1 tag', () => {
    const h1element = fixture.debugElement.query(By.css('h1'));
    expect(h1element.nativeElement.textContent).toBe('Friends:');
  });
});

class friendServiceStub {
  getFriends(): Observable<Friend[]> {
    return of([]);
  }
}

class fileServiceStub {}
