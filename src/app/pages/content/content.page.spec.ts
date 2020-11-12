import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContentPage } from './content.page';

describe('ContentPage', () => {
  let component: ContentPage;
  let fixture: ComponentFixture<ContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
