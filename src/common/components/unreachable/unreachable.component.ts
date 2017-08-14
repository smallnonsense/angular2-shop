import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unreachable',
  templateUrl: './unreachable.component.html',
  styleUrls: ['./unreachable.component.css']
})
export class UnreachableComponent implements OnInit {

  public returnUrl: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.returnUrl = decodeURIComponent(
      this.route.snapshot.queryParamMap.get('returnUrl') || '/');
  }
}
