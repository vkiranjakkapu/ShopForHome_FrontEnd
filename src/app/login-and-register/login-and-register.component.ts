import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationsService } from '../Services/authentications.service';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent implements OnInit {

  @Output() public loginEvent = new EventEmitter();
  @Output() public logoutEvent = new EventEmitter();

  loginStatus: string = "";
  isProgress: boolean = false;
  registerForm!: FormGroup;
  alerts: {status: string, msg: string, for: string} = {status: "none", msg: "", for: ""};

  constructor(private _authService: AuthenticationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      uname: ['', [Validators.required]],
      regEmail: ['', [Validators.required, Validators.email, Validators.pattern("[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{10}$")]],
      npass: ['', [Validators.required]],
      cpass: ['', [Validators.required]],
    })
  }

  Register(data: any) {
    this.isProgress = true;
    this.alerts.for = "reg";
    this._authService.registerUser(data).then((resp: any) => {
      this.alerts.status = resp.status;
      this.alerts.msg = resp.msg;
      location.href = './dashboard';
    }).catch((err) => {
      this.alerts.status = "error";
      this.alerts.msg = err.msg;
    }).finally(()=>{
      this.isProgress = false;
    });
  }

  async LoginUser(data: any) {
    this.isProgress = true;
    this.alerts.for = "auth";
    this._authService.authenticateUser(data).then((res: any) => {
      this.alerts.msg = res.msg;
      this.alerts.status = res.status;
      this.loginEvent.emit();
      location.href = './dashboard';
    }).catch((err)=>{
      this.alerts.msg = err.msg;
      this.alerts.status = err.status;
    }).finally(()=>{
      this.isProgress = false;
    });
  }

  Logout() {
    this._authService.logout();
    location.href = './';
  }
}
