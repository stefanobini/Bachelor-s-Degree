import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInformationPage } from './profile-information.page';

describe('ProfileInformationPage', () => {
  let component: ProfileInformationPage;
  let fixture: ComponentFixture<ProfileInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileInformationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
