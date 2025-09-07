import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { school, hardwareChip } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonCard]
})
export class Tab2Page {

  constructor() {
    addIcons({ school, hardwareChip });
  }

}
