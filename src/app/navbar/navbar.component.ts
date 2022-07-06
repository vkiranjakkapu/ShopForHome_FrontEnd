import { Component, Input, OnInit } from '@angular/core';
import { User } from '../Entities/user.model';
import { AuthenticationsService } from '../Services/authentications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  displayAuth !: string;
  showProfile !: string;

  @Input('parentdata') public login: any;
  @Input('curUser') public user: User | undefined;

  constructor(private _authService: AuthenticationsService) { }

  ngOnInit(): void {
  }

  Logout() {
    this._authService.logout();
    location.href = './';
  }
}