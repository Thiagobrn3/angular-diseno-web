import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponeteComponent } from './componete.component';

describe('ComponeteComponent', () => {
  let component: ComponeteComponent;
  let fixture: ComponentFixture<ComponeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponeteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
