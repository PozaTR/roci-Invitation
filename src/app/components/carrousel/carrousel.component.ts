import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  ElementRef,
  Renderer2,
  ViewChild,
  SimpleChanges
} from '@angular/core';


@Component({
  selector: 'app-carrousel, [app-carrousel]',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit, OnChanges, OnDestroy {
  @Input() pictureUrls: string[];
  @ViewChild('carrousel') carrousel: ElementRef;

  private pictureInterval: number;
  private activeImage: number;
  private imageWidth: number;

  constructor() {
    this.pictureUrls = [];
    this.activeImage = 0;
    this.imageWidth = 0;
  }

  ngOnInit(): void {
    this.pictureInterval = window.setInterval(this.changePicture.bind(this), 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pictureUrls.currentValue.length) {
      setTimeout(() => {
        this.imageWidth = this.carrousel.nativeElement.children[0].offsetWidth;
      }, 100);
    }
  }

  ngOnDestroy(): void {
    window.clearInterval(this.pictureInterval);
  }

  changePicture() {
    if (this.activeImage < this.pictureUrls.length - 1) {
      this.activeImage = this.activeImage + 1;
    } else {
      this.activeImage = 0;
    }

    this.carrousel.nativeElement.scrollLeft = this.activeImage * this.imageWidth;
  }
}
