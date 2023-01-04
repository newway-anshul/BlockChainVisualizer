import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTrasactionComponent } from './send-trasaction.component';

describe('SendTrasactionComponent', () => {
  let component: SendTrasactionComponent;
  let fixture: ComponentFixture<SendTrasactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendTrasactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendTrasactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
