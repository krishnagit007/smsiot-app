import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface Plant {
  id: number;
  name: string;
  image: string;
  soilStatus: 'wet' | 'dry';
  serialNumber: string;
}

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PlantsListComponent implements OnInit {

  plants: Plant[] = [
    {
      id: 1,
      name: 'Tulasi',
      image: 'assets/plants/tulasi.webp',
      soilStatus: 'wet',
      serialNumber: 'PLT001'
    },
    {
      id: 2,
      name: 'Rose Garden',
      image: 'assets/plants/rose.webp',
      soilStatus: 'wet',
      serialNumber: 'PLT001'
    },
    {
      id: 3,
      name: 'mango',
      image: 'assets/plants/mango.webp',
      soilStatus: 'dry',
      serialNumber: 'PLT002'
    },
    {
      id: 4,
      name: 'Marigold Flower',
      image: 'assets/plants/banthi.jpg',
      soilStatus: 'wet',
      serialNumber: 'PLT003'
    },
    {
      id: 5,
      name: 'Lilies Flower',
      image: 'assets/plants/lilies.jpg',
      soilStatus: 'dry',
      serialNumber: 'PLT004'
    }
  ];

  constructor() { }

  ngOnInit() {}

  getSoilStatusImage(status: 'wet' | 'dry'): string {
    return status === 'wet' ? 'assets/images/we-soil.jpg' : 'assets/images/dry-soil.jpg';
  }

  getSoilStatusClass(status: 'wet' | 'dry'): string {
    return status === 'wet' ? 'soil-wet' : 'soil-dry';
  }

  onBackClick(): void {
    // This will be handled by the parent component
    window.history.back();
  }

}
