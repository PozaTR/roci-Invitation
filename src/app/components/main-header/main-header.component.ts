import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: '[app-main-header]',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  public isNavHidden: boolean;

  constructor() {
    this.isNavHidden = true;
  }

  @HostBinding('class.main-header') hostClass = true;

  ngOnInit(): void {
  }

  onToogleNav() {
    this.isNavHidden = !this.isNavHidden;
  }

}
