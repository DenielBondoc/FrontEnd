import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddedComponent } from './customer-added.component';

describe('CustomerAddedComponent', () => {
  let component: CustomerAddedComponent;
  let fixture: ComponentFixture<CustomerAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
