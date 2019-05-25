import {getTestBed, TestBed} from '@angular/core/testing';

import { FileService } from './file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {of} from 'rxjs';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorage} from '@angular/fire/storage';

describe('FileService', () => {
  let angularFirestoreMock: any;
  let angularFireStorageMock: any;
  let fsCollectionMock: any;
  let service: FileService;
  let httpMock: HttpTestingController;
  let refMock;

  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection', 'createId']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));

    angularFireStorageMock = jasmine.createSpyObj('AngularFireStorage', ['ref']);
    refMock = jasmine.createSpyObj('ref', ['getDownloadURL', 'putString']);
    angularFireStorageMock.ref.and.returnValue(refMock);
    refMock.getDownloadURL.and.returnValue(of(''));



    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,
        AngularFireModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireStorage, useValue: angularFireStorageMock }
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFileUrl', () => {
  it('should call getFileUrl when called', () => {
    spyOn(service, 'getFileUrl');
    service.getFileUrl('test');
    expect(service.getFileUrl).toHaveBeenCalledTimes(1);
  });
});
});
