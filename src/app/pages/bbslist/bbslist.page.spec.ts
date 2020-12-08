import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BbslistPage } from './bbslist.page';

describe('BbslistPage', () => {
  let component: BbslistPage;
  let fixture: ComponentFixture<BbslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BbslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
