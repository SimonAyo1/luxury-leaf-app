// onramper-widget.component.ts
import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { OnramperService } from "../../services/onramper.service";

@Component({
  selector: "app-onramper-widget",
  templateUrl: "./onramper-widget.component.html",
  styleUrls: ["./onramper-widget.component.scss"],
})
export class OnramperWidgetComponent implements AfterViewInit, OnDestroy {
  private subscription: Subscription;

  constructor(private onramperService: OnramperService) {}

  ngAfterViewInit(): void {
    const onramperWidget = document.createElement("onramper-widget");
    onramperWidget.setAttribute("defaultAmount", "1000");
    onramperWidget.setAttribute("defaultCrypto", "BTC");
    onramperWidget.setAttribute("apiKey", "YOUR_ONRAMPER_API_KEY");
    document.getElementById("onramper-widget")?.appendChild(onramperWidget);

    this.subscription = this.onramperService.transactionSuccess.subscribe(
      (data: any) => {
        console.log("Transaction was successful!", data);
        this.handleTransactionSuccess(data);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private handleTransactionSuccess(data: any): void {
    // Add your custom logic here, e.g., update UI, show a notification, etc.
    alert("Transaction was successful!");
    console.log("Transaction data:", data);
  }
}
