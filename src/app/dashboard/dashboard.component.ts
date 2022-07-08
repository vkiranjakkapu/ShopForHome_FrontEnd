import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationsService } from '../Services/authentications.service';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() public userUpdateTrigger = new EventEmitter();
  public thisPage: string = "Dashboard";
  
  constructor(private _authService: AuthenticationsService, private _cartService: CartService, private router: Router) { }

  ngOnInit(): void {
  }

  public updateUserState() {
    this.userUpdateTrigger.emit();
  }
  
}
