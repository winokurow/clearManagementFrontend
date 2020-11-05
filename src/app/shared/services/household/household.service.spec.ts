import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed, inject } from '@angular/core/testing'
import { HouseholdService } from 'src/app/shared/services/household/household.service'
import { MemberShort } from 'src/app/shared/types/membershort.model'

describe('HouseholdService', () => {

  let service: HouseholdService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HouseholdService]
    })

    // inject the service
    service = TestBed.get(HouseholdService)
    httpMock = TestBed.get(HttpTestingController)
  })

  let members: MemberShort[] = [{
    id: 1, name: 'Ilja Winokurow'}, {
    id: 2, name: 'Rada Winokurow'}]

  it('sollte sich instanziieren lassen', inject([HouseholdService], (regservice: HouseholdService) => {
    expect(regservice).toBeTruthy()
  }))

  it('should get members list', () => {

    service.getMembers(false).subscribe((data: any) => {
      expect(JSON.stringify(data).toLowerCase()).toBe(JSON.stringify({members: members}).toLowerCase())
    })

    const req = httpMock.expectOne('http://localhost:8080/api/household/members', 'call to api2')
    expect(req.request.method).toEqual('GET')

    req.flush({
      members
    })

    httpMock.verify()
  })

})
