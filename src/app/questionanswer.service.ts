import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionanswerService {

  _url='http://localhost:3000';
  constructor(private http:HttpClient) { }

  UploadQuestion(question):Observable<Response>{

    return this.http.post<Response>(this._url+'/question/upload',question);
  }

  GetQuestions(skipper):Observable<any[]>{

    return this.http.post<any[]>(this._url+'/question/load',skipper);
  }

  QuestionWithAnswer(questionid):Observable<Object>{
    return this.http.post<Object>(this._url+'/question/getone',questionid);
  }
  UploadAnswer(answer):Observable<Object>{
    return this.http.post<Object>(this._url+'/answer/upload',answer);
  }

  GetQuestionsBasedonUser(data):Observable<any[]>{
    return this.http.post<any[]>(this._url+'/question/userspecific',data);
  }
  GetTrendingtags():Observable<any[]>{
    return this.http.get<any[]>(this._url+'/question/trending');
  }
  GetQuestionsByFollowing(data):Observable<any[]>{
    return this.http.post<any[]>(this._url+'/question/following',data);
  }
  RemovePost(data){
    return this.http.post(this._url+'/question/remove',data);
  }
  GetSuggestionsByTags(prefix):Observable<any[]>{
    return this.http.post<any[]>(this._url+'/question/tagsuggestion',prefix);
  }
  GetQuestionsByTags(data):Observable<any[]>{
    return this.http.post<any[]>(this._url+'/question/tag',data);
  }
}
