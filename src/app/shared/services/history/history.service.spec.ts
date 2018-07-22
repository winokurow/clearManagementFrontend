import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Message } from 'src/app/shared/types/message';
import { HistoryService } from 'src/app/shared/services/history/history.service';
import { TaskHistory } from 'src/app/shared/types/task.history.model';

describe('HistoryService', () => {

  let service: HistoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HistoryService]
    });

    // inject the service
    service = TestBed.get(HistoryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  let history: TaskHistory = {
    id: 1, taskname: 'Подмести пол',
    action: 'SUBMIT', member: 'tester', timestamp: '2018-06-09T18:24:59',
    complexity: 5};

  it('sollte sich instanziieren lassen', inject([HistoryService], (regservice: HistoryService) => {
    expect(regservice).toBeTruthy();
  }));

  it('getMemberHistory should get the member history list', () => {

    service.getMemberHistory().subscribe((data: any) => {
      expect(JSON.stringify(data).toLowerCase()).toBe(JSON.stringify({history: history}).toLowerCase());
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/member_history`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      history
    });

    httpMock.verify();
  });

  it('getHouseholdHistory should get the member history list', () => {

    service.getHouseholdHistory().subscribe((data: any) => {
      expect(JSON.stringify(data).toLowerCase()).toBe(JSON.stringify({history: history}).toLowerCase());
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/household_history`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      history
    });

    httpMock.verify();
  });
});
