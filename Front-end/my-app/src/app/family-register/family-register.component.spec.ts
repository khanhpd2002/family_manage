import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegisterComponent } from './family-register.component';

describe('HomeComponent', () => {
  let component: FamilyRegisterComponent;
  let fixture: ComponentFixture<FamilyRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
