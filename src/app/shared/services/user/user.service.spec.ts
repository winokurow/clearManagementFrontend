import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Household } from 'src/app/shared/types/household';
import { Message } from 'src/app/shared/types/message';
import { UserService } from 'src/app/shared/services/user/user.service';


describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    // inject the service
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  
});
