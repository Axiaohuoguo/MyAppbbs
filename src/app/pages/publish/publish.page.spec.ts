import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublishPage } from './publish.page';

describe('PublishPage', () => {
  let component: PublishPage;
  let fixture: ComponentFixture<PublishPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
