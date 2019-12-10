import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  stateSuccess = false ;
  stateError = false ;
  constructor(private authService: AuthService) { }

  config = {
    // Change this to your upload POST address:
     url: 'http://localhost:9080/webops-web/rest/employee/company/edit/image',
     maxFilesize: 1,
     paramName: 'image',
     acceptedFiles: 'image/*',
     headers: {
      'Authorization': `Bearer ${this.authService.getJwtToken()}`
     }
   };

  ngOnInit() {
  }

  public onUploadError(args: any): void {
    this.stateError = true;
  }

  public onUploadSuccess(args: any): void {
    this.stateSuccess = true;
  }

  

}
