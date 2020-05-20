import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public get() {
    let token = '';
    const uiwebadmin = JSON.parse(localStorage.getItem('uiwebadminminsal'));
    if (uiwebadmin !== null) {
      token = uiwebadmin.token;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  public post() {
    let token = '';
    const uiwebadmin = JSON.parse(localStorage.getItem('uiwebadminminsal'));
    if (uiwebadmin !== null) {
      token = uiwebadmin.token;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return httpOptions;
  }

  public delete() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer '.concat(JSON.parse(token))
      })
    };
    return httpOptions;
  }

  public put() {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'bearer '.concat(JSON.parse(token))
      })
    };
    return httpOptions;
  }

  public getBlob() {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers =
      new HttpHeaders({
        'Content-Type': 'application/vnd.openxmlformats',
        'Authorization': 'bearer '.concat(token)
      });
    return headers;
  }
}
