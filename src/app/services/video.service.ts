import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VideoInfo {
  title: string;
  url: string;
  qualities: string[];
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  // private apiUrl = 'https://localhost:7180/api/video'; // your .NET API URL
    private apiUrl = 'https://video-downloader-bmfmbrbxf5dgezf3.centralindia-01.azurewebsites.net/api/video'; // your .NET API URL


  constructor(private http: HttpClient) { }

  getVideoInfo(url: string): Observable<VideoInfo> {
    const params = new HttpParams().set('url', url);
    return this.http.get<VideoInfo>(`${this.apiUrl}/info`, { params });
  }

  downloadVideo(url: string, quality: string): void {
    const params = new HttpParams()
      .set('url', url)
      .set('quality', quality);

    const downloadUrl = `${this.apiUrl}/download?${params.toString()}`;
    // Open in new tab to download
    window.open(downloadUrl, '_blank');
  }
}
