import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendListComponent } from './friend-list.component';
import {FriendService} from '../shared/friend.service';
import {FileService} from '../../files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Friend} from '../shared/friend.model';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {DOMHelper, Helper} from '../../../testing/dom-helper';
import {Router} from '@angular/router';

describe('FriendListComponent', () => {
  let component: FriendListComponent;
  let fixture: ComponentFixture<FriendListComponent>;
  let dh: DOMHelper<FriendListComponent>;
  let friendServiceMock: any;
  let fileServiceMock: any;
  beforeEach(async(() => {
    //Jasmine = "spy" on the method. See how many times it's called ect.
    friendServiceMock = jasmine.createSpyObj('FriendService', ['getFriends']); //Same as creating a stub.
    friendServiceMock.getFriends.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']); //Same as creating a stub.
    fileServiceMock.getFileUrl.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ FriendListComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: FriendService, useValue: friendServiceMock},
        // {provide: FriendService, useClass: friendServiceStub},
        {provide: FileService, useValue: fileServiceMock}
        // {provide: FileService, useClass: fileServiceStub}
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(FriendListComponent);
    component = fixture.componentInstance;
    dh = new DOMHelper(fixture);
  });
  describe('Simple HTML', () => {
    beforeEach(() => {
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
      expect(dh.count('button')).toBe(1);
    });
  })
  describe('Navigation', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });
    it('should navigate to /add when + button is clicked',
      () => {
        const router = TestBed.get(Router);
        spyOn(router, 'navigateByUrl')
        dh.clickButton('Add Friend');
        expect(router.navigateByUrl)
          .toHaveBeenCalledWith(router.createUrlTree(['/add']),
            { skipLocationChange: false, replaceUrl: false });
      });
  })

  describe('Button calls', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });
    it('should call deleteFriend once when delete buttton is clicked', () => {
      component.Friends = helper.getFriends(1);
      fixture.detectChanges();
      spyOn(component, 'deleteFriend');
      dh.clickButton('Delete');
      expect(component.deleteFriend).toHaveBeenCalledTimes(1);
    });

    it('should call deleteFriend with the friend to delete when clicked delete', () => {
      component.Friends = helper.getFriends(1);
      fixture.detectChanges();
      spyOn(component, 'deleteFriend');
      dh.clickButton('Delete');
      expect(component.deleteFriend).toHaveBeenCalledWith(helper.friends[0]);
      // expect(component.deleteFriend).toHaveBeenCalledTimes(1);
    });

  })

  describe('Contains' , () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });
    it('should contain atlease one add friend button ', () => {
      const addFriendButton = fixture.debugElement
        .queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = addFriendButton[0].nativeElement;
      expect(nativeButton.textContent).toBe('Add Friend');
    });

    it('should show an unordered list of friends', () => {
      const listFriends = fixture.debugElement
        .queryAll(By.css('ul'));
      expect(dh.count('ul')).toBe(1);
    });

    it('should show no list when no friends are avalible', () => {
      const listFriends = fixture.debugElement
        .queryAll(By.css('li'));
      expect(dh.count('listFriends')).toBe(0);
      //expect(listFriends.length).toBe(0);
    });

    it('should show one friend on the list, when friend is added', () => {
      component.Friends = helper.getFriends(1); //HELPER CLASS, to make EASY tests
      fixture.detectChanges();
      const friendAdd = fixture.debugElement
        .queryAll(By.css('li'));
      expect(friendAdd.length).toBe(1);
    });
  });

  describe('images', () =>  {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });
    it('should show img tag with url on friends',  () => {
      component.Friends = helper.getFriends(1);
      helper.friends[0].url = 'http://abc-url';
      fixture.detectChanges();
      expect(dh.count('img'))
        .toBe(1);
    });
  });
  describe('Calls from service', () => {

  });


  describe('Async calls', () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
      fixture.detectChanges();
    });
    it('should call getFriends on friendService once on ngOnInit',  () => {
      expect(friendServiceMock.getFriends).toHaveBeenCalledTimes(1);
    });
  });
});

class friendServiceStub {
  getFriends(): Observable<Friend[]> {
    return of([]);
  }
}

class fileServiceStub {}
