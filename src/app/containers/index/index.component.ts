import { Component, OnInit } from '@angular/core';
import {ImageStorageService} from '../../services/image-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public pictureUrls: string[];

  constructor(private imageStorageService: ImageStorageService) {
    this.pictureUrls = [];
  }

  ngOnInit(): void {
    this.imageStorageService.getPictures().then(pictureUrls => {
      this.pictureUrls = pictureUrls;
    });
  }
}
