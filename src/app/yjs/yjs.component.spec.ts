import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YjsComponent } from './yjs.component';

describe('YjsComponent', () => {
  let component: YjsComponent;
  let fixture: ComponentFixture<YjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
