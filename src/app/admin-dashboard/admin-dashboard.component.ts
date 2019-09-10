import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FilesService } from '../services/files.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  // private files = [];
  private url = 'http://localhost:3000/catalog';
  private uploader: FileUploader;
  public form: FormGroup;
  @ViewChild('file', {static: false}) public file;
  public files: Set<File> = new Set();

  constructor(private fileService: FilesService, private fb: FormBuilder) { 
    this.form = this.fb.group({
      file: ['', []]
    });
  }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.url});

    this.fileService.showFileNames().subscribe(response => {
      console.log(response);
      // for (let i = 0; i < response.d.length; i++) {
      //   this.files[i] = {
      //     filename: response.d[i].filename,
      //     originalname: response.d[i].originalname,
      //     contentType: response.d[i].contentType
      //   };
      // }
    });
  }

  onUpload() {
    console.log(this.file.nativeElement.files[0]);
    this.fileService.uploadPDF(this.file.nativeElement.files[0]).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }
  // onDownload
  onDownload(filename, contentType) {
    this.fileService.downloadPDF().subscribe(
      (res) => {
        const file = new Blob([res.blob()], { type: contentType });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      }
    );
  }

}
