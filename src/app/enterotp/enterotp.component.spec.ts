import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterotpComponent } from './enterotp.component';

describe('EnterotpComponent', () => {
  let component: EnterotpComponent;
  let fixture: ComponentFixture<EnterotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterotpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
