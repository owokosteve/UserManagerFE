import { Component, inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile {
  roles: string[] = ['Admin', 'Supervisor', 'User'];
  themes: string[] = ['Light', 'Dark', 'System Default'];
  
  private formBuilder = inject(FormBuilder);

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
}
