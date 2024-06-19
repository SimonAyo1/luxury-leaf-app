import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnramperWidgetComponent } from './onramper-widget.component';

describe('OnramperWidgetComponent', () => {
  let component: OnramperWidgetComponent;
  let fixture: ComponentFixture<OnramperWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnramperWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnramperWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
