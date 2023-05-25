import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const headers = new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBpc21haWwuY29tIiwiaWF0IjoxNjg0OTM3ODI5LCJleHAiOjE2ODQ5MzkyNjl9.BfeHxwLZCESH3r1KjgnFCknfRJ6yblN_5YZpq1ROc9g');

@Injectable({ providedIn: 'root' })
export class AppService {
    
    constructor(
        private httpClient: HttpClient
    ) { }

    saveCollaborator(request: any): Observable<any> {
        return this.httpClient.post('http://localhost:9090/createCollaborator', request);
    }

    saveAbsence(request: any): Observable<any> {
        return this.httpClient.post('http://localhost:9090/createAbsence', request);
    }

    updateCollaborator(request: any): Observable<any> {
        return this.httpClient.post('http://localhost:9090/updateCollaborator', request);
    }

    deleteCollaborator(request: any): Observable<any> {
        return this.httpClient.post('http://localhost:9090/deleteCollaborator', request);
    }

    getAbsencesByCollaborator(request: any): Observable<any> {
        return this.httpClient.post('http://localhost:9090/getAbsencesByCollaborator', request);
    }

    getCollaborators(): Observable<any> {
        return this.httpClient.post('http://localhost:9090/api/getCollaborators', {});
    }

    login(request:any): Observable<any> {
        return this.httpClient.post('http://localhost:9090/api/auth/login', request);
    }


}