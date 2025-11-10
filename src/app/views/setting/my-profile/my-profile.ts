import { Component, inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomToast } from '../../../services/toast';
import { ToastType } from '../../../models/enums';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile {
  roles: string[] = ['Admin', 'Supervisor', 'User'];
  themes: string[] = ['Light', 'Dark', 'System Default'];
  
  private formBuilder = inject(FormBuilder);
  private toast = inject(CustomToast);

  dataStore = {
    firstName: "Stephen",
    lastName: "Owoko",
    role: "Admin",
    email: "vostowoko@gmail.com"
  }

  profileForm = this.formBuilder.group({
    firstName: [this.dataStore.firstName, Validators.required],
    lastName: [this.dataStore.lastName],
    role: [this.dataStore.role],
    email: [this.dataStore.email]
  });

  onUpdate(){
    if (this.profileForm.valid){
      console.log('Profile updated:', this.profileForm.value);

      this.toast.showToast(ToastType.Success, 'Profile updated successfully!');
    }else{
      this.toast.showToast(ToastType.Warning, 'Please fill in all required fields!');
    }
  }
}
