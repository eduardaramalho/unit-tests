import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

fdescribe('HttpService', () => {
  let service: HttpService;
  let htppTestingController: HttpTestingController;
  let url: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpService);
    htppTestingController = TestBed.inject(HttpTestingController)
    url = 'http://localhost:3000'
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test get by Id', () => {
    const id = 3;
    const response = {name: 'Sabrina', email: 'sabrina@senai.br', age: 30}

    service.getUsersById(id).subscribe(res => {
      expect(res).toBe(response)
    })
    
  	const request = htppTestingController.expectOne(`${url}/users/${id}`)

    expect(request.request.method).toBe('GET')
    expect(request.request.url).toBe(`${url}/users/${id}`)
    request.flush(response)
  })

  it('should get all users', () =>{
    const response = {name: 'Sabrina', email: 'sabrina@senai.br', age: 30}
    
    service.getUsers().subscribe(res => {
      expect(res).toBe(response)
    })
    
  	const request = htppTestingController.expectOne(`${url}/users`)

    expect(request.request.method).toBe('GET')
    expect(request.request.url).toBe(`${url}/users`)
    request.flush(response)
  })

  it('should post user', () => {
    const user = {name: 'Eduarda', email: 'eduarda@senai.br', age: 18}
    
    service.postUser(user).subscribe(res => {
      expect(res).toBe(user)
    })
    
  	const request = htppTestingController.expectOne(`${url}/users`)

    expect(request.request.method).toBe('POST')
    expect(request.request.url).toBe(`${url}/users`)
    request.flush(user)
    
  })

  it('should put user', () => {
    const id = 3;
    const user = {name: 'Larissa', email: 'larissa@senai.br', age: 18}
    
    service.putUser(id, user).subscribe(res => {
      expect(res).toBe(user)
    })
    
  	const request = htppTestingController.expectOne(`${url}/users/${id}`)

    expect(request.request.method).toBe('PUT')
    expect(request.request.url).toBe(`${url}/users/${id}`)
    request.flush(user)
  })

  it('should delete user', () => {
    const id = 3;
    const user = {name: 'Larissa', email: 'larissa@senai.br', age: 18}
    
    service.deleteUser(id).subscribe(res => {
      expect(res).toBe(user)
    })
    
  	const request = htppTestingController.expectOne(`${url}/users/${id}`)

    expect(request.request.method).toBe('DELETE')
    expect(request.request.url).toBe(`${url}/users/${id}`)
    request.flush(user)
  })

  it('should get user with headers', () => {
    
    service.getUserWithHeaders().subscribe()
    
  	const request = htppTestingController.expectOne(`${url}/users`)

    expect(request.request.headers.has('content-type')).toEqual(true)
    expect(request.request.headers.has('Authorization')).toEqual(true)
  })

  it('should generate error to get user', () => {
    service.getUsers().subscribe({
      error: (erro) => {
        expect(erro.status).toBe(500)
      }
    });

    const request = htppTestingController.expectOne(`${url}/users`)

    expect(request.request.method).toBe('GET')
    expect(request.request.url).toBe(`${url}/users`)
  })

});
