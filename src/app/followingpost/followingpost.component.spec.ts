import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingpostComponent } from './followingpost.component';

describe('FollowingpostComponent', () => {
  let component: FollowingpostComponent;
  let fixture: ComponentFixture<FollowingpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowingpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
