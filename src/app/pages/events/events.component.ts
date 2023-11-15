import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: {
    id: string;
    eventName: string;
    eventDate: string;
    location: string;
    description: string;
    image: string
  }[]


  constructor(private store: StoreService) { }

  getEvents() {
    this.store.getAllEvents().subscribe({
      next: (res:any) => {
        this.events = res
      }
    })
  }
  
  ngOnInit(): void {
    this.getEvents()
  }

}
