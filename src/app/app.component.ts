import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform, AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private router: Router,
    private location: Location
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setOverlaysWebView({ overlay: false });
      
      // Hide splash screen after app is ready
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
      
      // Handle hardware back button
      this.platform.backButton.subscribeWithPriority(10, () => {
        this.handleBackButton();
      });
    });
  }

  handleBackButton() {
    const currentUrl = this.router.url;
    
    // Check if we're on home or about pages (main tab pages)
    if (currentUrl === '/tabs/home' || currentUrl === '/tabs/about' || currentUrl === '/' || currentUrl === '/tabs') {
      this.showExitConfirm();
    } else {
      // For other pages, navigate back normally
      this.location.back();
    }
  }

  async showExitConfirm() {
    const alert = await this.alertController.create({
      header: 'Exit App',
      message: 'Are you sure you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Exit',
          handler: () => {
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
