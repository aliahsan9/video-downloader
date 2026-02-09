import { Component } from '@angular/core';
import { VideoService, VideoInfo } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports:[CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  videoUrl: string = '';
  videoInfo?: VideoInfo;
  selectedQuality: string = '';
  loadingInfo: boolean = false;
  errorMessage: string = '';

  constructor(private videoService: VideoService) {}

  
  fetchVideoInfo() {
    if (!this.videoUrl) return;
    this.loadingInfo = true;
    this.errorMessage = '';
    this.videoInfo = undefined;

    this.videoService.getVideoInfo(this.videoUrl).subscribe({
      next: (info) => {
        this.videoInfo = info;
        this.selectedQuality = info.qualities[info.qualities.length - 1]; // default highest
        this.loadingInfo = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch video info.';
        this.loadingInfo = false;
      }
    });
  }
getVideoId(url: string): string {
  try {
    const regExp = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  } catch {
    return '';
  }
}

  downloadVideo() {
    if (this.videoInfo && this.selectedQuality) {
      this.videoService.downloadVideo(this.videoInfo.url, this.selectedQuality);
    }
  }
}
