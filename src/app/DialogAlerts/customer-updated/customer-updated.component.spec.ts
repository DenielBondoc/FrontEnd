import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdatedComponent } from './customer-updated.component';

describe('CustomerUpdatedComponent', () => {
  let component: CustomerUpdatedComponent;
  let fixture: ComponentFixture<CustomerUpdatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerUpdatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
