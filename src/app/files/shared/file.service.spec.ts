import {getTestBed, TestBed} from '@angular/core/testing';

import { FileService } from './file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {of} from 'rxjs';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {isBrowserEvents} from '@angular/core/src/render3/discovery_utils';

describe('FileService', () => {
  let angularFirestoreMock: any;
  let angularFireStorageMock: any;
  let fsCollectionMock: any;
  let service: FileService;
  let httpMock: HttpTestingController;
  let putMock: any;
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

    putMock = jasmine.createSpyObj('Put', ['then', 'put', 'putString']);
    putMock.then.and.returnValue(of(''));

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule,
        AngularFireModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: AngularFireStorage, useValue: angularFireStorageMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFileUrl', () => {
    it('should call getFileUrl', () => {
      spyOn(service, 'getFileUrl');
      service.getFileUrl('test');
      expect(service.getFileUrl).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRandomId', () => {
    it('should call getRandomId ', () => {
      spyOn(service, 'getRandomId');
      service.getRandomId();
      expect(service.getRandomId).toHaveBeenCalledTimes(1);
    });


  });

  describe('uploadFile', () => {
    it('should call uploadFile', () => {
      spyOn(service, 'uploadFile');
      // @ts-ignore
      service.uploadFile();
      expect(service.uploadFile).toHaveBeenCalledTimes(1);
    });
  });

  describe('uploadFile Put & then should be called', () => {
    it('should call put', () => {
      // @ts-ignore
      service.uploadFile();
      expect(putMock.putString).toHaveBeenCalledTimes(1);
    });
  });
});

