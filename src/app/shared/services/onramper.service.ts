// onramper.service.ts
import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OnramperService {
  transactionSuccess = new EventEmitter<any>();

  constructor() {
    window.addEventListener(
      "onramper-widget-event",
      this.handleOnramperEvent.bind(this)
    );
  }

  private handleOnramperEvent(event: any) {
    if (event.detail && event.detail.event === "transaction_successful") {
      this.transactionSuccess.emit(event.detail.data);
    }
  }
}
