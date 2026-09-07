import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('debería obtener patentes', () => {
    service.getPatentes().subscribe(patentes => {
      expect(patentes).toEqual(['ABCD12']);
    });

    const req = httpMock.expectOne(request => new URL(request.url).href === 'http://localhost:3000/vehiculos');
    expect(req.request.method).toBe('GET');
    req.flush([{ patente: 'ABCD12' }]);
    httpMock.verify();
  });
});
