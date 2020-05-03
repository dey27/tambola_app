import { Injectable } from '@angular/core';
import { Http ,HttpModule } from '@angular/http';
import { map } from 'rxjs/operators'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private http : Http) { }
  getService(url:any){
    return this.http.get(url).pipe(
      map(res=> res.json()));
  }
  postService(url:any,payload:any){
    return this.http.post(url,payload);
  }
}
