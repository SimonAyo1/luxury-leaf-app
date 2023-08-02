import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
// import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authType: string = "sign-in"
  public loginForm: FormGroup;
  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    // private authenticationService: AuthenticationService,
    private _auth: AuthService,
    private route: ActivatedRoute,

  ) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  owlcarousel = [
    {
      title: "Welcome to Luxury Leaf Co",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "High Quality Services",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Trusted and Reliable",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      check: [false, Validators.requiredTrue],
    })
  }
  async signup() {
    await this._auth.signUp(this.registerForm.get("email").value, this.registerForm.get("password").value, this.registerForm.get("name").value)
  }
  async signIn() {
    await this._auth.signIn(this.loginForm.get("email").value, this.loginForm.get('password').value)
  }
  ngOnInit() {
    this.route.params.subscribe(e => {
      if (e?.type) {
        this.authType = e.type
      }
    })
  }

  // onSubmit() {
  //   console.log(this.loginForm.value);
  //   this.authenticationService.login(this.loginForm.value.userName, this.loginForm.value.password)
  //     .pipe(first())
  //     .subscribe(
  //       data => { 
  //         // this.isLoading = false;
  //         this.router.navigate(['dashboard']);
  //       },
  //       error => {
  //         console.log(error);

  //         // this.loading = false;
  //         // this.isLoading = false;
  //         // this.error = error;


  //       });

  // }

}
