import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthenticationComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should have correct email error based on the input', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    let errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("test");
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();

    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['pattern']).toBeFalsy();
  });

  it('should have correct password error based on the input', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    let errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("standardPassword");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should validate the form', () => {
    component.loginForm.controls['email'].setValue("test@example.com");
    component.loginForm.controls['password'].setValue("Password1");
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should invalidate the form with incorrect email pattern', () => {
    component.loginForm.controls['email'].setValue("invalid-email");
    component.loginForm.controls['password'].setValue("Password1");
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should call onSubmit when form is valid', () => {
    spyOn(component, 'onSubmit');
    component.loginForm.controls['email'].setValue("test@example.com");
    component.loginForm.controls['password'].setValue("Password1");

    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
