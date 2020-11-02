import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  _url='http://localhost:3000';
  
  constructor(private http:HttpClient) { }

  uploadImage(image:File,):Observable<Response>{
    const formData = new FormData();
    formData.append('image',image);
    return this.http.post<Response>(this._url+'/profile/upload', formData);
  }
}
