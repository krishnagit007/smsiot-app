import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { school, hardwareChip } from 'ionicons/icons';
import { RoomControlComponent } from '../room-control/room-control.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, RoomControlComponent],
})
export class Tab1Page {
  // Home Appliances Data
  totalRooms = 5;
  totalPowerOnElectronics = 8;
  
  // Plant Health Data
  totalPlants = 24;
  wetPlants = 18;
  dryPlants = 6;

  // View state management
  showMenuItems = true;
  showRoomControl = false;

  constructor() {
    addIcons({ school, hardwareChip });
    
    // Listen for home tab click events
    window.addEventListener('homeTabClicked', () => {
      if (this.showRoomControl) {
        this.resetToMenu();
      }
    });
  }

  onHomeAppliancesClick() {
    // Show room control and hide menu items
    this.showRoomControl = true;
    this.showMenuItems = false;
    console.log('Home Appliances clicked - showing room controls');
  }

  resetToMenu() {
    // Reset to show menu items and hide room control
    this.showMenuItems = true;
    this.showRoomControl = false;
    console.log('Reset to menu - showing menu options');
  }

}
