import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FriendService} from '../shared/friend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css']
})
export class FriendAddComponent implements OnInit {

  friendFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private friendService: FriendService
              ) {
    this.friendFormGroup = new FormGroup( {
      name: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      mail: new FormControl(''),
      location: new FormControl('')
  }); }

  ngOnInit() {
  }

  addFriend() {
    const friendData = this.friendFormGroup.value;
    this.friendService.addFriend(
      friendData,
    ).subscribe(friend => {
      this.router.navigate(['../'],
        {relativeTo: this.activatedRoute});
    },
      error1 => {
        window.alert('An error occurred while trying to add a friend error1 ' + JSON.stringify(error1));
      });
  }
































  updateImage(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }
}
