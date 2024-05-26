import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NewUserComponent } from './new-user.component';

describe('NewUserComponent', () => {
  let component: NewUserComponent;
  let fixture: ComponentFixture<NewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewUserComponent,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should validate the form', () => {
    component.userForm.controls['name'].setValue("Name");
    component.userForm.controls['job'].setValue("Worker");
    expect(component.userForm.valid).toBeTruthy();
  });

  it('should have an error if user name or job is not present', () => {
    let name = component.userForm.controls['name'];
    let job = component.userForm.controls['job'];
    expect(name.valid).toBeFalsy();
    expect(job.valid).toBeFalsy();

    let nameErrors = name.errors || {};
    let jobErrors = job.errors || {};
    expect(nameErrors['required']).toBeTruthy();
    expect(jobErrors['required']).toBeTruthy();
  });

  it('should call onSubmit when form is valid', () => {
    spyOn(component, 'onSubmit');
    component.userForm.controls['name'].setValue("Name");
    component.userForm.controls['job'].setValue("Worker");

    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));;

    expect(component.onSubmit).toHaveBeenCalled();
  });
});
