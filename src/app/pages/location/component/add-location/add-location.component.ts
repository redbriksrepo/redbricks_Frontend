import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { LocationService } from 'src/app/service/location/location.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  JSONFile!: File;
  layoutImage!: File;
  jsonUploaded: boolean = false;
  layoutImageUploaded: boolean = false;
  
  
  constructor(
    private loactionService: LocationService,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  
  locationForm = new FormGroup({
    'location': new FormControl(''),
    'center': new FormControl(''),
    'imageLinks': new FormArray([]),
    'videoLinks': new FormArray([]),
  })

  get imageLinks() {
    return (this.locationForm.get('imageLinks') as FormArray).controls;
  }

  get videoLinks() {
    return (this.locationForm.get('videoLinks') as FormArray).controls;
  }

  jsonUploadHandler = (event: any) => {
    this.JSONFile = event.target.files[0];
    this.jsonUploaded = true;
  }

  layoutImageUploadHandler = (event: any) => {
    this.layoutImage = event.target.files[0];
    this.layoutImageUploaded = true;
  }

  onAdd(controlName: string) {
    const control = new FormControl(null);
    (<FormArray>this.locationForm.get(controlName)).push(control);
  }
  onRemove(controlName:string, controlIndex: number){
    (<FormArray>this.locationForm.get(controlName)).removeAt(controlIndex);
  }

  appentFormData = ():FormData => {
    let formData!: FormData;
    if (this.jsonUploaded) {
      formData.append('jsonFile', this.JSONFile);
    }
    if (this.layoutImageUploaded) {
      formData.append('layoutImage', this.layoutImage);
    }
    for (let key of Object.keys(this.locationForm.value)) {
      formData.append(key, this.locationForm.get(key)?.value);
    }

    return formData;
    
  }
  

  ngOnInit(): void {
    
  }

  onSubmit = () => {
    if (this.locationForm.invalid) {
      return;
    }
    else if (this.jsonUploaded && this.layoutImageUploaded) {
      Swal.fire({
        title: 'File Upload Require!',
        icon: 'error',
        text: 'Both JSON and Layout Image is required. Please make sure to upload them',
        showConfirmButton: true,
        confirmButtonText: 'Got It!',
        confirmButtonColor: '#C3343A'
      })
    }
    else {
      let formData: FormData = this.appentFormData();
      this.loactionService.addLocation(formData).subscribe({
        next: (result: any) => {
          this.router.navigate(['/admin', 'location', 'location-list']);
        },
        error: (err: any) => {
          this.authService.handleAuthError(err);
        }
      })
    }
    
  }
}
