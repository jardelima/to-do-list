import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { TitleComponent } from '../../components/title/title.component';
import { bootstrapEye, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons';
import { Register } from '../shared/register';
import { CommonModule } from '@angular/common';
import passwordMatch from './helpers/validator-password';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconComponent,
    TitleComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  viewProviders: [provideIcons({ bootstrapEye, bootstrapEyeSlash })],
})

export class RegisterComponent implements OnInit {
  @Input() showPassword: boolean = false;
  @Input() showConfirmPassword: boolean = false;

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
      this.createForm(new Register());
  }

  createForm(register: Register) {
    this.registerForm = this.formBuilder.group({
      name: [register.name, [Validators.required, Validators.minLength(6)]],
      email: [register.email, [Validators.required, Validators.email]],
      password: [register.password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [register.confirmPassword, [Validators.required, Validators.minLength(6)]]
    },
    {
      validators: passwordMatch('password', 'confirmPassword')
    });
  }

  get formErrors() {
    return this.registerForm.controls;
  }

  get passwordNotMatch() {
    return this.registerForm.errors?.['passwordMismatch'];
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  handleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleSubmit() {
    if (this.registerForm.invalid) {
      for(const control of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[control].markAsTouched();
      }

      return;
    }

    console.log(this.registerForm)
  }
}
