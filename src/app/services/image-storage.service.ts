import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {

  constructor(private storage: AngularFireStorage) {
  }

  async getPictures(): Promise<string[]> {
    const storageRef = this.storage.storage.ref('/');
    const imageRefs = await storageRef.listAll();
    const imageUrlPromises = imageRefs.items.map(imageRef => {
      return storageRef.child(imageRef.fullPath).getDownloadURL();
    });
    const imageUrls = await Promise.all(imageUrlPromises);
    return imageUrls;
  }
}
