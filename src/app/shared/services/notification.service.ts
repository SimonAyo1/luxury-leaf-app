import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  successMessage(message: string) {
    this.toastService.success(message, 'Success');
  }

  errorMessage(message: string) {
    // Custom error messages for specific Firebase errors
    let customErrorMessage: string;
    switch (message) {
      // Authentication Errors
      case 'auth/app-deleted':
        customErrorMessage =
          'The authentication server is no longer available.';
        break;
      case 'auth/app-not-authorized':
        customErrorMessage =
          'You are not authorized to access the authentication server.';
        break;
      case 'auth/argument-error':
        customErrorMessage = 'Invalid arguments provided for authentication.';
        break;
      case 'auth/invalid-api-key':
        customErrorMessage = 'The provided API key is invalid.';
        break;
      case 'auth/invalid-user-token':
        customErrorMessage = 'The user token is invalid or expired.';
        break;
      case 'auth/network-request-failed':
        customErrorMessage =
          'A network error occurred. Please check your internet connection.';
        break;
      case 'auth/operation-not-allowed':
        customErrorMessage =
          'The requested authentication operation is not allowed.';
        break;
      case 'auth/requires-recent-login':
        customErrorMessage =
          'This operation requires a recent login. Please sign in again.';
        break;
      case 'auth/too-many-requests':
        customErrorMessage = 'Too many requests. Please try again later.';
        break;
      case 'auth/unauthorized-domain':
        customErrorMessage =
          'This domain is not authorized to access the authentication server.';
        break;
      case 'auth/invalid-email':
        customErrorMessage = 'Invalid Email.';
        break;
      case 'auth/user-not-found':
        customErrorMessage = 'Email does not belong to this account.';
        break;
      case 'auth/wrong-password':
        customErrorMessage = 'Invalid Email or Password.';
        break;
      case 'auth/email-already-in-use':
        customErrorMessage = 'Email already in use!';
        break;
      case 'auth/weak-password':
        customErrorMessage = 'Weak password!';
        break;

      case 'not-found': 
        customErrorMessage = "Error code: 404";
        break;
      default:
        // Use a generic error message if the Firebase error is not explicitly handled
        customErrorMessage = message;
        break;
    }

    // Display the custom error message
    this.toastService.error(customErrorMessage, 'Error');
  }

  infoMessage(message: string) {
    this.toastService.info(message, 'Information');
  }

  warningMessage(message: string) {
    this.toastService.warning(message, 'Warning');
  }

  startSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }
}
