import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {

  public returnUrl: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = decodeURIComponent(
      this.route.snapshot.queryParamMap.get('returnUrl'));
  }
}
