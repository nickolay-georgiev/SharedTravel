import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-upload-photo',
  templateUrl: './user-upload-photo.component.html',
  styleUrls: ['./user-upload-photo.component.css']
})
export class UserUploadPhotoComponent {
  
  @Output()
  clickButtonEmitter = new EventEmitter<File>();
  fileToUpload: File = null;

  constructor() { }
  
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);    
    this.clickButtonEmitter.emit(this.fileToUpload);
  }
}
