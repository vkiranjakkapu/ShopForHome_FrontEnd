import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from '../Services/authentications.service';
import { UsersService } from '../Services/users.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  public thisPage: string = "Participants";
  public usersList: User[] = [];
  public isProgress: boolean = false;
  public alerts: { status: string, msg: string, for: string } = { status: "none", msg: "", for: "" };
  public type: String = "create";
  public selectedUserID!: number;
  public modalTitle!: string;
  public btnDisable: boolean = true;

  public user!: User;
  public curUser: User | undefined;

  constructor(private _userService: UsersService, private _authService: AuthenticationsService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this._authService.localAuthnticate(this._authService.getUserToken()).then((data: any) => {
      this.curUser = this._authService.getCurrentUser();
    })
  }

  setUserData(type: any, id: number) {
    this.isProgress = true;
    this.alerts = { status: "none", msg: "", for: "" };
    this.type = type;
    if (type == "create") {
      this.modalTitle = "Create User";
    } else {
      this.modalTitle = "Update User";
    }
    this.updateModalstate('filled');
    this._userService.getUserById(id).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.user = data.user;
        }
      },
      (err: HttpErrorResponse) => { }
    )
    this.isProgress = false;
  }

  submitForm(data: any) {
    if (this.type == "create") {
      this.modalTitle = "Create User";
      this.getUsers();
      let nUid = this.usersList.length;
      this.user = new User(nUid + 1, data?.name, data?.email, '', 0, 'password', data?.acctype);
      this.addUser(this.user);
    } else if (this.type == "update") {
      this.modalTitle = "Update User";
      this.user = new User(this.user.uid, data?.name, data?.email, this.user.phone, this.user.discard, this.user.password, data?.acctype);
      this.updateUser(this.user);
    }
  }

  getUsers() {
    this.isProgress = true;
    this._userService.getUsers().subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.usersList = data.users;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
    this.isProgress = false;
  }

  addUser(user: any) {
    this.isProgress = true;
    this._userService.createUser(user).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.user = data.user;
          this.getUsers();
        }
        this.alerts.msg = data.msg;
        this.alerts.status = data.status;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
    this.isProgress = false;
  }

  deleteUser(id: number) {
    this.isProgress = true;
    this._userService.deleteUser(id).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.user = data.user;
          this.getUsers();
        }
        alert(data.msg);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
    this.isProgress = false;
  }

  updateUser(user: any) {
    this.isProgress = true;
    this._userService.updateUser(user).subscribe(
      (data: any) => {
        if (data.status == "success") {
          this.user = data.user;
          this.getUsers();
        }
        this.alerts.msg = data.msg;
        this.alerts.status = data.status
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
    this.isProgress = false;
  }

  updateModalstate(type: string) {
    if (type == "create") {
      this.modalTitle = "Create User";
    }
    if (type == "reset") {
      document.querySelectorAll('[required]').forEach(field => {
        field.classList.remove('is-invalid');
        field.classList.remove('is-valid');
      });
      this.alerts = { status: "none", msg: "", for: "" };
    }
    if (type = "filled") {
    }
  }

}
