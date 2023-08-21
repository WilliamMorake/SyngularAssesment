import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreLandingComponent } from './store-landing.component';

describe('StoreLandingComponent', () => {
  let component: StoreLandingComponent;
  let fixture: ComponentFixture<StoreLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreLandingComponent]
    });
    fixture = TestBed.createComponent(StoreLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
