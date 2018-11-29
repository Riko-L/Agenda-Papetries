import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Data {
  total_rows: number;
  offset:     number;
  rows:       Row[];
}

export interface Row {
  id:    string;
  key:   string;
  value: Value;
  doc:   Events;
}

export interface Events {
  _id:                  string;
  _rev:                 string;
  validate_doc_update?: string;
  language?:            string;
  title?:               string;
  start_time?:          string;
  end_time?:            string;
  location?:            string;
  description?:         string;
}

export interface Value {
  rev: string;
}

export interface Response {
  ok:  boolean;
  id:  string;
  rev: string;
}

const username ='alf74';
const password=  'kiedis74';
const httpOptions = {
  headers: new HttpHeaders({ 
    'Content-Type': 'application/json' ,
    'Authorization': 'Basic ' +btoa(`${username}:${password}`)
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  
  dbcouch: string = "https://alf74.alwaysdata.net/data/alf74_agenda_papeteries/";
  all_docs: string = "_all_docs?include_docs=true";

  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<Events[]> {
    return this.http.get<Data>(this.dbcouch + this.all_docs).pipe(
      map(data => data.rows.map( row => row.doc)),
      catchError(this.handleError('getAllEvents', []))
    );
  }

  addEvent(event: Events):Observable<Response>{
    return this.http.post<Response>(this.dbcouch, event, httpOptions);
  }

  putEvent(event: Events): Observable<Response> {
    const url = `${this.dbcouch}${event._id}?rev=${event._rev}`;
    return this.http.put<Response>(url, event, httpOptions);
  }

  deleteEvent(event: Events): Observable<Response>{
    const url = `${this.dbcouch}${event._id}?rev=${event._rev}`;
    return this.http.delete<Response>(url,httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
