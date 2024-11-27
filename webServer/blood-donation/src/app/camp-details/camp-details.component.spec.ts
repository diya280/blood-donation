import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampDetailsComponent } from './camp-details.component';

describe('CampDetailsComponent', () => {
  let component: CampDetailsComponent;
  let fixture: ComponentFixture<CampDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampDetailsComponent]
    });
    fixture = TestBed.createComponent(CampDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
