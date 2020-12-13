import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyforaPage } from './applyfora.page';

describe('ApplyforaPage', () => {
  let component: ApplyforaPage;
  let fixture: ComponentFixture<ApplyforaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyforaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyforaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
