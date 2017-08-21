import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOthersComponent } from './review-others.component';

describe('ReviewOthersComponent', () => {
  let component: ReviewOthersComponent;
  let fixture: ComponentFixture<ReviewOthersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewOthersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
