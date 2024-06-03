import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapEye, bootstrapEyeSlash } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIconComponent,
    TitleComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  viewProviders: [provideIcons({ bootstrapEye, bootstrapEyeSlash })]
})
export class LoginComponent {
  @Input() name: string = '';
  @Input() password: string = '';
  @Input() showPassword: boolean = false;

  handleShowPassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword);
  }

  handleSubmit() {
    if (this.name === 'admin' && this.password === 'admin') {
      window.location.href='/todo';
      return;
    }

    alert('Login ou senha incorretos');
  }
}
