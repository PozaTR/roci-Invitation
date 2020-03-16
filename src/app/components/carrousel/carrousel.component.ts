import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-carrousel, [app-carrousel]',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  @Input() pictureUrls: string[];

  constructor() {
    this.pictureUrls = [];
  }

  ngOnInit(): void {
  }

}
