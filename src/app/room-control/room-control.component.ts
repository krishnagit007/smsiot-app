import { Component } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { ElectronicsAppliancesComponent } from '../electronics-appliances/electronics-appliances.component';

interface ElectricalDevice {
  id: string;
  name: string;
  type: 'fan' | 'bulb' | 'switch';
  isOn: boolean;
}

@Component({
  selector: 'app-room-control',
  templateUrl: './room-control.component.html',
  styleUrls: ['./room-control.component.scss'],
  imports: [CommonModule, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ElectronicsAppliancesComponent],
  standalone: true
})
export class RoomControlComponent {
  isModalOpen = false;
  selectedRoom = '';
  selectedRoomImage = '';
  
  electricalDevices: ElectricalDevice[] = [
    { id: '1', name: 'Fan', type: 'fan', isOn: false },
    { id: '2', name: 'Bulb', type: 'bulb', isOn: false }
  ];

  constructor() {
    addIcons({ close });
  }

  openRoomModal(roomName: string, roomImage: string) {
    this.selectedRoom = roomName;
    this.selectedRoomImage = roomImage;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
