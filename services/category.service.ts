import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl1 = "http://localhost:8082";


  constructor(private http:HttpClient) { }

  //load all the categoriea
  public categories(){
    return this.http.get(`${this.baseUrl1}/category/`);
  }

  //add categiyr
  public addingCategory(categoryData:any){
    return this.http.post(`${this.baseUrl1}/category/`,categoryData);
  }
}
