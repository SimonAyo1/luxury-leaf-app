import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  name: string;
  email: string;
  phone: string;
  message: string;

  constructor(private http: HttpClient, private notify: NotificationService) { }
  submit() {
    if(!this.name || !this.email || !this.phone || !this.message) {
      this.notify.errorMessage("Fill form properly!")
      return
    }
    this.notify.startSpinner()
    this.http.post("https://luxuryleaf-api.vercel.app/api/contact", { name: this.name, email: this.email, phone: this.phone, message: this.message }).subscribe({
      next: () => {
        this.notify.successMessage("Sent message!")
        this.notify.hideSpinner()
        this.name = '',
        this.email = '',
        this.message = '',
        this.phone = ''
      },
      error: () => {
        this.notify.errorMessage("Error sending message")
        this.notify.hideSpinner()
      }
    })
  }
  ngOnInit(): void {

  }

}
