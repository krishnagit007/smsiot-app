import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

interface Plant {
  id: number;
  name: string;
  image: string;
  soilStatus: 'wet' | 'dry';
  serialNumber: string;
}

interface SoilMoistureResponse {
  status: 'wet' | 'dry';
  plantId: number;
}

@Component({
  selector: 'app-plants-list',
  templateUrl: './plants-list.component.html',
  styleUrls: ['./plants-list.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HttpClientModule]
})
export class PlantsListComponent implements OnInit, OnDestroy {
  private pollInterval: any;
  private audioInterval: any;
  private currentPlantIndex = 0;
  private allPlantsProcessed = false;
  private readonly DRY_AUDIO = 'dry_audio';
  private readonly WET_AUDIO = 'wet_audio';
  private isAudioPlaying = false;


  plants: Plant[] = [
    {
      id: 1,
      name: 'Tulasi',
      image: 'assets/plants/tulasi.webp',
      soilStatus: 'dry',
      serialNumber: 'PLT001'
    },
    // {
    //   id: 2,
    //   name: 'Rose Garden',
    //   image: 'assets/plants/rose.webp',
    //   soilStatus: 'dry',
    //   serialNumber: 'PLT001'
    // },
    // {
    //   id: 3,
    //   name: 'mango',
    //   image: 'assets/plants/mango.webp',
    //   soilStatus: 'dry',
    //   serialNumber: 'PLT002'
    // },
    // {
    //   id: 4,
    //   name: 'Marigold Flower',
    //   image: 'assets/plants/banthi.jpg',
    //   soilStatus: 'dry',
    //   serialNumber: 'PLT003'
    // },
    // {
    //   id: 5,
    //   name: 'Lilies Flower',
    //   image: 'assets/plants/lilies.jpg',
    //   soilStatus: 'dry',
    //   serialNumber: 'PLT004'
    // }
  ];

  constructor(
    private http: HttpClient,
    private nativeAudio: NativeAudio
  ) { }

  async ngOnInit() {
    await this.initializeAudio();
    this.startPolling();
  }

  ngOnDestroy() {
    this.stopPolling();
    this.clearAudioInterval();
    this.unloadAudio();
  }

  private startPolling() {
    this.pollInterval = setInterval(() => {
      if (this.allPlantsProcessed) {
        this.stopPolling();
        return;
      }
      this.checkSoilMoisture();
    }, 1000);
  }

  private stopPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private async initializeAudio() {
    try {
      await this.nativeAudio.preloadSimple(this.DRY_AUDIO, 'assets/audio/dry_audio.mp3');
      await this.nativeAudio.preloadSimple(this.WET_AUDIO, 'assets/audio/wet_audio.mp3');
    } catch (error) {
      console.error('Error initializing audio:', error);
    }
  }

  private async unloadAudio() {
    try {
      await this.nativeAudio.unload(this.DRY_AUDIO);
      await this.nativeAudio.unload(this.WET_AUDIO);
    } catch (error) {
      console.error('Error unloading audio:', error);
    }
  }

  private clearAudioInterval() {
    if (this.audioInterval) {
      clearInterval(this.audioInterval);
      this.audioInterval = null;
    }
  }

  private async playAudio(audioId: string, loop: boolean = false) {
    if (this.isAudioPlaying) return;
    
    try {
      this.isAudioPlaying = true;
      
      await this.nativeAudio.play(audioId, () => {
        this.isAudioPlaying = false;
        
        if (loop && audioId === this.DRY_AUDIO) {
          this.audioInterval = setTimeout(() => {
            if (!this.isAudioPlaying) {
              this.playAudio(audioId, false);
            }
          }, 5000);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      this.isAudioPlaying = false;
    }
  }

  private checkSoilMoisture() {
    console.log("Checking soil moisture...");
    this.http.get(`http://192.168.4.1/get/soil/moister/details`)
      .subscribe({
        next: async (response: any) => {
          const newStatus = response['status'];
          const currentStatus = this.plants[0].soilStatus;
          
          if (newStatus !== currentStatus) {
            this.plants[0].soilStatus = newStatus;
            
            if (newStatus === 'dry') {
              this.clearAudioInterval();
              await this.playAudio(this.DRY_AUDIO, true);
            } else if (newStatus === 'wet') {
              this.clearAudioInterval();
              await this.playAudio(this.WET_AUDIO);
            }
          }
        },
        error: (error) => {
          console.error('Error fetching soil moisture:', error);
        }
      });
  }

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
