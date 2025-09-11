import { Component, Input } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

interface ElectricalDevice {
  id: string;
  name: string;
  type: 'fan' | 'bulb' | 'switch';
  isOn: boolean;
}

@Component({
  selector: 'app-electronics-appliances',
  templateUrl: './electronics-appliances.component.html',
  styleUrls: ['./electronics-appliances.component.scss'],
  imports: [CommonModule, IonGrid, IonRow, IonCol, IonCard, IonCardContent],
  standalone: true
})
export class ElectronicsAppliancesComponent {
  @Input() electricalDevices: ElectricalDevice[] = [
    { id: '1', name: 'Fan', type: 'fan', isOn: false },
    { id: '2', name: 'Bulb', type: 'bulb', isOn: false }
  ];

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
