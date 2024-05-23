import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserhandlingComponent } from './userhandling.component';

describe('UserhandlingComponent', () => {
  let component: UserhandlingComponent;
  let fixture: ComponentFixture<UserhandlingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserhandlingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserhandlingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
