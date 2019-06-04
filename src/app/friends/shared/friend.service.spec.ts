import {getTestBed, TestBed} from '@angular/core/testing';
import { Friend} from './friend.model';
import { FriendService } from './friend.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {FileService} from '../../files/shared/file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';
import {firestore} from 'firebase';

describe('FriendService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;
  let docMock: any;
  let mapMock: any;
  let pipeMock: any;
  let dbUpdate: any;
  let httpMock: HttpTestingController;
  let service: FriendService;
  let helper: ActionHelper;
  let refMock;
  let friendX: Friend;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFireStore', ['collection', 'doc']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges', 'doc', 'add']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    fsCollectionMock.doc.and.returnValue();
    fileServiceMock = jasmine.createSpyObj('FileService', ['uploadFile']);
    refMock = jasmine.createSpyObj('FriendService', ['updateFriend']);
    refMock.updateFriend.and.returnValue(of(friendX));
    // doc
    pipeMock = jasmine.createSpyObj('get', ['pipe']);
    mapMock = jasmine.createSpyObj('pipe', ['map']);
    docMock = jasmine.createSpyObj('doc', ['delete', 'get', 'valueChanges', 'update']);
    docMock.get.and.returnValue(pipeMock);
    docMock.update.and.returnValue(mapMock);
    angularFirestoreMock.doc.and.returnValue(docMock);
    dbUpdate = jasmine.createSpyObj('doc', ['update']);
    fsCollectionMock.doc.and.returnValue(dbUpdate);
    helper = new ActionHelper();
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: FileService, useValue: fileServiceMock}
      ]
    });
    service = TestBed.get(FriendService);
  });

  it('should be created', () => {
    // service = TestBed.get(FriendService);
    expect(service).toBeTruthy();
  });

  describe('getFriends', () => {

    beforeEach(() => {
      service.getFriends(); // calls getFriend before each "it"
    });
    it('should call collection and snapshotChanges on FireStore', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });
    it('should call snapshotChanges one time on AngularfireStore service', () => {
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

  describe('getFriendById', () => {
    beforeEach(() => {
      service.getFriendById('1');
    });

    it('should call doc when get friend by id', () => {
      expect(docMock.valueChanges).toHaveBeenCalledTimes(1);
    });

  });

  describe('delete friend', () => {
    beforeEach(() => {
      service.deleteFriend('1');
    });
    it('should call pipe when deleting a friend ', ()  => {
      expect(pipeMock.pipe).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateFriend', () => {
    beforeEach(() => {
      service.deleteFriend('test');
    });
    it('should call db collection', () => {
      expect(docMock.get).toHaveBeenCalledTimes(1);
    });
  });
});


/*
Fake payload
This is what we expect to return.
 */
class ActionHelper {
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
                name: 'test' + i,
                address: 'abc' + i,
                mail: 'hello' + 1,
                phone: 'lsad' + i,
                url: 'wazzap' + i,
                picture: 'picString',
                location: {latitude: 34, longitude: 45}
              };
            }
          }
        }
      });
    }
    return of(this.actions);
  }
}

