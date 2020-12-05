import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { IMessage } from 'src/app/core/interfaces/message';


@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {

  @Input() message: IMessage;
  @Output() deleteMessageEmitter = new EventEmitter();
  @Output() readMessageEmitter = new EventEmitter();
  panelOpenState: boolean;

  constructor() { }

  ngOnInit(): void {
    this.panelOpenState = false;
  }

  deleteMessage() {
    this.deleteMessageEmitter.emit(this.message);
  }
}
