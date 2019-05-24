import {Friend} from "../app/friends/shared/friend.model";
import {Observable, of} from "rxjs";
import {ComponentFixture} from "@angular/core/testing";
import {FriendListComponent} from "../app/friends/friend-list/friend-list.component";
import {By} from "@angular/platform-browser";

export class Helper {
  friends: Friend[] = [];
  getFriends(amount: number): Observable<Friend[]> {
    for (let i = 0; i < amount; i++) {
      this.friends.push(
        { id: 'test' + i, name: 'friend1' + i , address: 'test' + i, phone: '123' + i, mail: 'test' + i,
          picture: 'asd' + i , url: 'www' + i }
      );
    }
    return of(this.friends);
  }
}
//Generic T.
export class DOMHelper<T> {
  private fixture: ComponentFixture<T>
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }
  singleText(tagName: string): string {
    const h2Ele = this.fixture.debugElement.query(By.css(tagName));
    if (h2Ele) {
      return h2Ele.nativeElement.textContent;
    }
  }
  count(tagName: string): number {
    const elements = this.fixture.debugElement
      .queryAll(By.css(tagName));
    return elements.length;
  }

  /*
  Get all buttons, and if the button is equal to the button we are looking for , it should click.
   */
  clickButton(buttonText: string) {
    this.findAll('button').forEach(button => {
      const buttonElement: HTMLButtonElement =
        button.nativeElement;
      if (buttonElement.textContent === buttonText) {
        buttonElement.click();
      }
    });
  }
  findAll(tagName: string) {
    return this.fixture.debugElement
      .queryAll(By.css(tagName));
  }
}


