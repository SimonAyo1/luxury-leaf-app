import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { UserI, UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  authType: string = "sign-in";
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public refId: string;
  public isRefValid: boolean = false;
  public isLoading: boolean;
  public referrerCurrentPoints: number;
  public forgotPassword: boolean;
  public resetEmail: string;
  signup_step: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    // private authenticationService: AuthenticationService,
    private _auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private _userService: UserService,
    private notificationService: NotificationService
  ) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  next(step: number) {
    this.signup_step = step;
  }
  showForgotPassword(status: boolean) {
    this.forgotPassword = status;
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$"),
        ],
      ],
      phone_number: ["", [Validators.required, Validators.pattern("[0-9]+")]],
      address: ["", Validators.required],
      postal_code: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      check: [false, Validators.requiredTrue],
      checkage: [false, Validators.requiredTrue],
    });
  }
  async signup() {
    if (this.registerForm.get("check").invalid) {
      this.notificationService.errorMessage(
        "Please accept terms and condition before proceeding!"
      );
      return;
    }
    if (this.registerForm.get("checkage").invalid) {
      this.notificationService.errorMessage(
        "Please your age must be 21+ to access this website!"
      );
      return;
    }
    if (this.registerForm.invalid) {
      this.notificationService.errorMessage("Please fill the form properly!");
      return;
    }
    await this._auth.signUp(
      this.registerForm.value,
      this.refId,
      this.referrerCurrentPoints
    );
  }
  async signIn() {
    if (this.loginForm.invalid) {
      this.notificationService.errorMessage("Invalid credentials!");
      return;
    }
    await this._auth.signIn(
      this.loginForm.get("email").value,
      this.loginForm.get("password").value
    );
  }
  doesLinkExist(linkArray, targetLink) {
    return linkArray.some((item) => item.url === targetLink);
  }
  checkIfRefLinkIsValid(refId: string): any {
    this._userService.getUserById(refId).subscribe((user: UserI[]) => {
      if (user.length == 0 || !user) {
        this.isRefValid = false;
        this.notificationService.hideSpinner();
        this.isLoading = false;
        this.notificationService.errorMessage(
          "Invalid registration link!, if you have an account kindly login"
        );
        return;
      }
      const referrer = user[0];
      this.referrerCurrentPoints = user[0]?.points;
      this.isRefValid = this.doesLinkExist(
        referrer.links || [],
        window.location.href
      );
      if (!this.isRefValid) {
        this.notificationService.errorMessage(
          "Invalid registration link!, if you have an account kindly login"
        );
      }
      this.notificationService.hideSpinner();
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.notificationService.startSpinner();
    this.route.params.subscribe((e) => {
      if (e?.type) {
        if (e.type !== "sign-up" && e.code1 && e.code2) {
          this.router.navigate(["/auth"]);
        }
        if (e.type == "sign-up" && e.code1 && e.code3) {
          this.refId = this._userService.decrypt(e.code1, 3);
          this.checkIfRefLinkIsValid(this.refId);
          return;
        }
        this.authType = e.type;
        this.notificationService.hideSpinner();
        this.isLoading = false;
      }
      if (!e?.type) {
        this.authType = "sign-in";
        this.notificationService.hideSpinner();
        this.isLoading = false;
      }
    });
  }
  resetPassword() {
    if (!this.resetEmail) {
      this.notificationService.errorMessage("Enter a valid email address!");
      return;
    }
    this._auth.resetPassword(this.resetEmail);
  }

  checkIfFirstStageIsInValid() {
    if (this.registerForm.get("name")?.invalid) {
      this.notificationService.errorMessage("Please enter a valid name!");
      return true;
    }
    if (this.registerForm.get("phone_number")?.invalid) {
      this.notificationService.errorMessage(
        "Please enter a valid phone number!"
      );
      return true;
    }
    if (this.registerForm.get("address")?.invalid) {
      this.notificationService.errorMessage("Please enter a valid address!");
      return true;
    }
    if (this.registerForm.get("postal_code")?.invalid) {
      this.notificationService.errorMessage(
        "Please enter a valid postal code!"
      );
      return true;
    }
    if (this.registerForm.get("city")?.invalid) {
      this.notificationService.errorMessage("Please enter a valid city!");
      return true;
    }
  }
}
