import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';

@Component({
  selector: 'app-carrousel, [app-carrousel]',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  public pictures: string[];

  constructor(private storage: AngularFireStorage) {
    this.pictures = [];
  }

  ngOnInit(): void {
    const storageRef = this.storage.storage.ref('/');

    storageRef.listAll().then(resp => {
      const imagesUrlPromises = resp.items.map(item => {
        return storageRef.child(item.fullPath).getDownloadURL();
      });
      Promise.all(imagesUrlPromises).then(response => {
        this.pictures = response;
      });
    });
  }

}
