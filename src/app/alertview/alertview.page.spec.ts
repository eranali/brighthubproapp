import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlertviewPage } from './alertview.page';

describe('AlertviewPage', () => {
  let component: AlertviewPage;
  let fixture: ComponentFixture<AlertviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
