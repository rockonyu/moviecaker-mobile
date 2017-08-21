import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosVideoComponent } from './pos-video.component';

describe('PosVideoComponent', () => {
  let component: PosVideoComponent;
  let fixture: ComponentFixture<PosVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
