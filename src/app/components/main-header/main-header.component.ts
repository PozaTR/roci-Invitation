import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: '[app-main-header]',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

  constructor() { }

  @HostBinding('class.main-header') hostClass = true;

  ngOnInit(): void {
  }

}
