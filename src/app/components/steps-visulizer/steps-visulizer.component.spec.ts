import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsVisulizerComponent } from './steps-visulizer.component';

describe('StepsVisulizerComponent', () => {
  let component: StepsVisulizerComponent;
  let fixture: ComponentFixture<StepsVisulizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepsVisulizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepsVisulizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
