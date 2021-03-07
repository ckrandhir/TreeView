import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  constructor(private _fileService: FileService) {}
  fileName: string = '';
  isEnable: boolean = true;
  capacityAvailable: number = 0;
  isVisible: boolean = false;
  alertFlag: boolean = false;

  ngOnInit(): void {}

  fileChangeEvent(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.fileName = fileList ? fileList[0].name : '';
    this.isEnable = false;
  }

  upload() {
    this.capacityAvailable = 0;
    if (this.fileName) this.isVisible = true;
    this._fileService.AddFileName(this.fileName);
    let timer = setInterval(() => {
      if (this.capacityAvailable == 100) {
        clearInterval(timer);
        this.alertFlag = false;
        setTimeout(() => {
          this.isVisible = false;
          this.alertFlag = true;
          this.fileName = '';
          this.isEnable = true;
        }, 800);
      } else {
        this.capacityAvailable = this.capacityAvailable + 10;
      }
    }, 30);
  }
}
