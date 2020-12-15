import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoostersPage } from './boosters.page';

describe('BoostersPage', () => {
  let component: BoostersPage;
  let fixture: ComponentFixture<BoostersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoostersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoostersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
