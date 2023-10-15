import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSecurityComponent } from './main-security.component';

describe('MainSecurityComponent', () => {
  let component: MainSecurityComponent;
  let fixture: ComponentFixture<MainSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
