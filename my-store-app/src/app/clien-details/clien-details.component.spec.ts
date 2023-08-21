import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienDetailsComponent } from './clien-details.component';

describe('ClienDetailsComponent', () => {
  let component: ClienDetailsComponent;
  let fixture: ComponentFixture<ClienDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienDetailsComponent]
    });
    fixture = TestBed.createComponent(ClienDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
