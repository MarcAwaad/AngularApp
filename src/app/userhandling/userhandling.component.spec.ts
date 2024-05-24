import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserHandlingComponent } from './userhandling.component';

describe('UserhandlingComponent', () => {
  let component: UserHandlingComponent;
  let fixture: ComponentFixture<UserHandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserHandlingComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserHandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
