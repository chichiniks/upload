import { Component } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'uploadofficial';
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  files: File[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const files = event.target.files;

    if (files.length) {
      this.status = "initial";
      this.files = files;
    }
  }

  onUpload() {
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append("file", file, file.name);
      });

      const upload$ = this.http.post("https://httpbin.com/post", formData);

      this.status = "uploading";

      upload$.subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
        },
      });
    }
  
}

  
}
