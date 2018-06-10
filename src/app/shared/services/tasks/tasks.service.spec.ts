import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { Household } from 'src/app/shared/types/household';
import { Message } from 'src/app/shared/types/message';
import { TasksService } from 'src/app/shared/services/tasks/tasks.service';
import { Task } from 'src/app/shared/types/task.model';

describe('TasksService', () => {

  let service: TasksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksService]
    });

    // inject the service
    service = TestBed.get(TasksService);
    httpMock = TestBed.get(HttpTestingController);
  });

  let task: Task = {
    id: 1, groupname: 'Уборка', name: 'Подмести пол',
    description: 'Подмести пол', shedule: 'P3D', nextRun: '2018-06-09T18:24:59',
    priority: 1, complexity: 5};
  it('sollte sich instanziieren lassen', inject([TasksService], (regservice: TasksService) => {
    expect(regservice).toBeTruthy();
  }));

  it('should get the tasks list', () => {

    service.getTasks().subscribe((data: any) => {
      expect(JSON.stringify(data).toLowerCase()).toBe(JSON.stringify({task: task}).toLowerCase());
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/tasks`, 'call to api');
    expect(req.request.method).toBe('GET');

    req.flush({
      task
    });

    httpMock.verify();
  });
});
