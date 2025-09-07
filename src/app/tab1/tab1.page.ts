import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonModal, IonButtons, IonButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { school, hardwareChip, close } from 'ionicons/icons';

interface ElectricalDevice {
  id: string;
  name: string;
  type: 'fan' | 'bulb' | 'switch';
  isOn: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonModal, IonButtons, IonButton],
})
export class Tab1Page {
  isModalOpen = false;
  selectedRoom = '';
  selectedRoomImage = '';
  
  electricalDevices: ElectricalDevice[] = [
    { id: '1', name: 'Fan', type: 'fan', isOn: false },
    { id: '2', name: 'Bulb', type: 'bulb', isOn: false }
  ];

  constructor() {
    addIcons({ school, hardwareChip, close });
  }

  openRoomModal(roomName: string, roomImage: string) {
    this.selectedRoom = roomName;
    this.selectedRoomImage = roomImage;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleDevice(device: ElectricalDevice) {
    device.isOn = !device.isOn;
  }

  getDeviceIcon(device: ElectricalDevice): string {
    const state = device.isOn ? 'on' : 'off';
    return `assets/icon/${device.type}_${state}.png`;
  }

  getSwitchIcon(isOn: boolean): string {
    return `assets/icon/switch_${isOn ? 'on' : 'off'}.png`;
  }
}
