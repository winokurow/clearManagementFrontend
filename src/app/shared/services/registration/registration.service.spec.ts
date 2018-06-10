import { RegistrationService } from 'src/app/shared/services/registration/registration.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Household } from 'src/app/shared/types/household';
import { Message } from 'src/app/shared/types/message';

describe('RegistrationService', () => {

  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService]
    });

    // inject the service
    service = TestBed.get(RegistrationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  let household: Household = {
    householdname: 'test7', members: [{email: 'test7@test.de', firstname: 'Ilja',
    lastname: 'Winokurow', password: '#Start01', confirmpassword: '#Start01', isAdmin: true},
    {email: 'test7@test.de', firstname: 'Ilja', lastname: 'Winokurow', password: '#Start01',
    confirmpassword: '#Start01', isAdmin: true}]};

  it('sollte sich instanziieren lassen', inject([RegistrationService], (regservice: RegistrationService) => {
    expect(regservice).toBeTruthy();
  }));

  it('should register the correct data', () => {
    service.registerHousehold(household).subscribe((data: Message) => {
      expect(data.message).toBe('Househols is registriert');
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/register`, 'put to api');
    expect(req.request.method).toBe('PUT');

    req.flush({
      message: 'Househols is registriert', error: ''
    });

    httpMock.verify();
  });
});