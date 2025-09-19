import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform, AlertController, ToastController } from '@ionic/angular';
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
  private lastBackPress = 0;
  private timePeriodToExit = 2000; // 2 seconds

  constructor(
    private platform: Platform,
    private alertController: AlertController,
    private toastController: ToastController,
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

  async handleBackButton() {
    const currentUrl = this.router.url;
    
    // Check if we're on home or about pages (main tab pages)
    if (currentUrl === '/tabs/home' || currentUrl === '/tabs/about' || currentUrl === '/' || currentUrl === '/tabs') {
      const currentTime = new Date().getTime();
      
      if (currentTime - this.lastBackPress < this.timePeriodToExit) {
        // Second back press within time limit - exit app
        App.exitApp();
      } else {
        // First back press - show toast message
        this.lastBackPress = currentTime;
        await this.showExitToast();
      }
    } else {
      // For other pages, navigate back normally
      this.location.back();
    }
  }

  async showExitToast() {
    const toast = await this.toastController.create({
      message: 'Press back again to exit app',
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    
    await toast.present();
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
