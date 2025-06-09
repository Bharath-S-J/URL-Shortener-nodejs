// src/app/shorten/shorten.component.ts
import { Component } from '@angular/core';
import { UrlService } from '../services/url.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.scss'],
  standalone:true,
  imports:[FormsModule, CommonModule]
})
export class ShortenComponent {
  originalUrl: string = '';
  shortUrl: string = '';
  isLoading = false;
  error: string = '';

  constructor(private urlService: UrlService) {}

  shorten() {
    this.isLoading = true;
    this.error = '';
    this.urlService.shortenUrl(this.originalUrl).subscribe({
      next: (url: string) => {
        this.shortUrl = url;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Something went wrong!';
        this.isLoading = false;
      }
    });
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.shortUrl).then(() => {
      this.error = '';
      alert('Copied to clipboard!');
    }).catch(() => {
      this.error = 'Failed to copy!';
    });
  }
  
}
