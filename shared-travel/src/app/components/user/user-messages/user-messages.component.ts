import { ChangeDetectorRef, OnChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/core/interfaces/message';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  messages$: Observable<IMessage[]> = null;

  constructor(private userService: UserService, public cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.messages$ = this.userService.getUserMessages();
  }

  ngOnChanges(): void {
    this.cd.detectChanges();
  }

  deleteMessageHandler(message: IMessage): void {
    this.userService.deleteUserMessage(message);
  }
}
