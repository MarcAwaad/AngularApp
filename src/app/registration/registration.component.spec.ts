import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistrationComponent,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should have correct email error based on the input', () => {
    let email = component.registrationForm.controls['email'];
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
    let password = component.registrationForm.controls['password'];
    expect(password.valid).toBeFalsy();

    let errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("short1");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    password.setValue("longPasswordNoNumbers");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();
  });

  it('should check for match between password and confirmPassword', () => {
    let password = component.registrationForm.controls['password'];
    let confirmPassword = component.registrationForm.controls['confirmPassword'];

    password.setValue("Password1");

    let confirmErrors = confirmPassword.errors || {};
    expect(confirmErrors['required']).toBeTruthy();

    let registrationErrors = component.registrationForm.errors || {};
    confirmPassword.setValue("Password2");
    expect(registrationErrors['mismatch']).toBeTruthy();
  });


  it('should validate the form', () => {
    component.registrationForm.controls['email'].setValue("test@example.com");
    component.registrationForm.controls['password'].setValue("Password1");
    component.registrationForm.controls['confirmPassword'].setValue("Password1");
    expect(component.registrationForm.valid).toBeTruthy();
  });

  it('should invalidate the form with incorrect email pattern', () => {
    component.registrationForm.controls['email'].setValue("invalid-email");
    component.registrationForm.controls['password'].setValue("Password1");
    component.registrationForm.controls['confirmPassword'].setValue("Password1");
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should invalidate the form with incorrect password pattern', () => {
    component.registrationForm.controls['email'].setValue("test@example.com");
    component.registrationForm.controls['password'].setValue("password1");
    component.registrationForm.controls['confirmPassword'].setValue("password1");
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should invalidate the form when password and confirmPassword do not match', () => {
    component.registrationForm.controls['email'].setValue("test@example.com");
    component.registrationForm.controls['password'].setValue("Password1");
    component.registrationForm.controls['confirmPassword'].setValue("Password2");
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('should call onSubmit when form is valid', () => {
    spyOn(component, 'onSubmit');
    component.registrationForm.controls['email'].setValue("test@example.com");
    component.registrationForm.controls['password'].setValue("Password1");
    component.registrationForm.controls['confirmPassword'].setValue("Password1");

    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
