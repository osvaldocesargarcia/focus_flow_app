import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-spotify-player',
  standalone: true,
  templateUrl: './spotify-player.html',
})
export class SpotifyPlayerComponent {
  readonly i18n = inject(I18nService);

  // Spotify "Deep Focus" public playlist
  readonly embedUrl: SafeResourceUrl = inject(DomSanitizer)
    .bypassSecurityTrustResourceUrl(
      'https://open.spotify.com/embed/playlist/37i9dQZF1DWZeKCadgRdKQ?utm_source=generator&theme=0'
    );
}
