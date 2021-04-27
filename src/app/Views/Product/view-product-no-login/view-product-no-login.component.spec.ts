import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductNoLoginComponent } from './view-product-no-login.component';

describe('ViewProductNoLoginComponent', () => {
  let component: ViewProductNoLoginComponent;
  let fixture: ComponentFixture<ViewProductNoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProductNoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProductNoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
