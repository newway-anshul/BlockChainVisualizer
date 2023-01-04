import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorVisualizerComponent } from './validator-visualizer.component';

describe('ValidatorVisualizerComponent', () => {
  let component: ValidatorVisualizerComponent;
  let fixture: ComponentFixture<ValidatorVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatorVisualizerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
