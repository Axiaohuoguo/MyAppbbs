import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PulishoreditPage } from './pulishoredit.page';

describe('PulishoreditPage', () => {
  let component: PulishoreditPage;
  let fixture: ComponentFixture<PulishoreditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PulishoreditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PulishoreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
