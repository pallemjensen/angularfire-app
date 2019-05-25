import {getTestBed, TestBed} from '@angular/core/testing';

import { FriendService } from './friend.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {FileService} from '../../files/shared/file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';
import {Friend} from './friend.model';

describe('FriendService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;

  let httpMock: HttpTestingController;
  let service: FriendService;
  let helper: Helper;
  beforeEach(() => {


    angularFirestoreMock = jasmine.createSpyObj('AngularFireStore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'doc', 'add']);

    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    fsCollectionMock.doc.and.returnValue();
    fileServiceMock = jasmine.createSpyObj('FileService', ['uploadFile']);
    helper = new Helper();
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock},
        { provide: FileService, useValue: fileServiceMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FriendService);
  });

  it('should be created', () => {
    service = TestBed.get(FriendService);
    expect(service).toBeTruthy();
  });

  describe('getFriends', () => {

    beforeEach(() => {
    service.getFriends(); //calls getFriend before each "it"
    });

    it('should call collection and snapshotChanges on FireStore', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });
    it('should call snapshotChanges one time on AngularfireStore service', ()  => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
    it('should call collection with "friends" as parameter', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
    // Expect to return a list of actions from helper. "payload" as an action.
    describe('get friends return value', () => {
      it('should call getFriends and return one friend', () => {
        fsCollectionMock.snapshotChanges.and.returnValue(helper.getActions(1));
        service.getFriends().subscribe(friends => {
          expect(friends.length).toBe(1);
        });
      });
    });
  });
});



/*
Fake payload
This is what we expect to return.
 */
class Helper {
  actions: any[] = [];
  getActions(amount: number): Observable<any[]> {
    for (let i = 0; i < amount; i++) {
      this.actions.push({
        payload: {
          doc: {
            id: 'abc' + i,
            data: () => {
              return {
                id: 'testId' + i,
                name: 'test' + i
              };
            }
          }
        }
      });
    }
    return of(this.actions);
  }
}
