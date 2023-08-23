import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  categories:any;
  constructor(private _cat:CategoryService){}
  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data:any)=>{
        this.categories=data;

      },
      error: (err:any)=>{
        console.log(err);
      }
    });
  }

}
