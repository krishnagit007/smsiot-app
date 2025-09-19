import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class LandingPageComponent implements OnInit, OnDestroy {

  images = [
    'assets/landing_images/img_1.png',
    'assets/landing_images/img_2.jpg',
    'assets/landing_images/img_3.jpg',
    'assets/landing_images/img_4.jpg',
    'assets/landing_images/img_5.jpg',
    'assets/landing_images/img_6.jpg'
  ];

  currentImageIndex = 0;
  private intervalId: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds (1 sec display + 0.5 sec transition + buffer)
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  startApplication() {
    this.router.navigate(['/app/tabs/home']);
  }
}
