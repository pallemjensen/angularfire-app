import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendUpdateComponent } from './friend-update.component';

describe('FriendUpdateComponent', () => {
  let component: FriendUpdateComponent;
  let fixture: ComponentFixture<FriendUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendUpdateComponent ]
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
