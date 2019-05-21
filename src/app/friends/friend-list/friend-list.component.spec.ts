import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListComponent } from './friend-list.component';
import {FriendService} from '../shared/friend.service';
import {FileService} from '../../files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Friend} from '../shared/friend.model';
import {By} from '@angular/platform-browser';
import {Debugger} from 'inspector';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {Location} from '@angular/common';

describe('FriendListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendListComponent, DummyComponent],
      imports: [
        RouterTestingModule.withRoutes(
          [
            {path: 'add', component: DummyComponent}
          ]
        )
      ],
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

  it('should atleast have one button on the page', () => {
    const buttons = fixture.debugElement
      .queryAll(By.css('button'));
    expect(buttons.length >= 1).toBeTruthy(); //Should have minimum one button
  });

  it('should navigate to /add when + button is clicked', () => {
    const location = TestBed.get(Location);
    const linkDes = fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
    nativeButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/add');
    });
  });

  it('should contain atlease one add button (+) ', () => {
    const addFriendButton = fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = addFriendButton[0].nativeElement;
    expect(nativeButton.textContent).toBe('+');
  });
  it('should show an unordered list of friends', () => {
    const listFriends = fixture.debugElement
      .queryAll(By.css('ul'));
    expect(listFriends.length).toBe(1);
  });

  it('should show no list when no friends are avalible', () => {
    const listFriends = fixture.debugElement
      .queryAll(By.css('li'));
    expect(listFriends.length).toBe(0);
  });

  it('should show one friend on the list, when friend is added', () => {
    component.Friends = of( [
      {
        id: 'test', name: 'friend1', address: 'test', phone: '123', mail: 'test',
        latitude: '12', longitude: '20', picture: 'asd', url: 'www'
      }
    ]);
    fixture.detectChanges();
    const friendAdd = fixture.debugElement
      .queryAll(By.css('li'));
    expect(friendAdd.length).toBe(1);
  });
});

@Component({ template: ''})
class DummyComponent {}

class friendServiceStub {
  getFriends(): Observable<Friend[]> {
    return of([]);
  }
}

class fileServiceStub {}
