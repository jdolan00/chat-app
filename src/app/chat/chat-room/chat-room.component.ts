import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  messages: any[] = [];
  newMessage: string = '';
  username: string = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.username = this.authService.getCurrentUser().username;
    this.chatService.getMessages().subscribe(
      (response: any) => {
        this.messages = response;
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  sendMessage(): void {
    const username = this.authService.getCurrentUser().username;
    const messageContent = this.newMessage;
    this.chatService.postMessage(username, messageContent).subscribe(
      (response: any) => {
        this.messages.push(response);
        this.newMessage = '';
      },
      (error: any) => {
        console.error('Error sending message:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
