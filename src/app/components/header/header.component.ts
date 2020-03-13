import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public headerName;
  constructor() {
    this.headerName='PRODUCTOS A&S';
  }

  ngOnInit(): void {
  }

}
