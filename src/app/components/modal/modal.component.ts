import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() data: string;
  @Input() type: string;
  content: SafeUrl;

  constructor(
    private modalController: ModalController,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.type === 'image/png') {
      this.content = this.sanitizer.bypassSecurityTrustUrl(
        'data:image/png;base64,' + this.data
      );
    } else if (this.type === 'text/html') {
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.data);
    }
  }

  cerrar() {
    this.modalController.dismiss();
  }
}
