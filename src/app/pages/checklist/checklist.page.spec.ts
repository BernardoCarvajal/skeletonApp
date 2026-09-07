import { provideRouter } from '@angular/router';
import { ChecklistPageModule } from './checklist.module';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistPage } from './checklist.page';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ChecklistPage', () => {
  let component: ChecklistPage;
  let fixture: ComponentFixture<ChecklistPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: DatabaseService, useValue: { isInitialized: () => true, init: async () => {}, obtenerChecklists: async () => [] } }],

      imports: [ChecklistPageModule,
        HttpClientTestingModule, FormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChecklistPage);
    component = fixture.componentInstance;
    spyOn(component, 'obtenerUbicacion').and.resolveTo();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
