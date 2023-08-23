import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent  implements OnInit{
  categories=[
    {
      cid:'',
      title:'',
      description:''
    }
    // {
    //   cid:23,
    // title:'programming',
    // description: 'this is testing category',

    // },
    // {
    //   cid:23,
    // title:'programming',
    // description: 'this is testing category',

    // },
    // {
    //   cid:23,
    // title:'programming',
    // description: 'this is testing category',

    // },

    
  ]
  constructor(private _category : CategoryService){}
  ngOnInit(): void {
    this._category.categories().subscribe({
      next: (data:any)=>{
        this.categories=data;
        console.log(this.categories);

      },
      error: (err:any)=>{
          console.log(err);
          Swal.fire('Error !!','error in loading data','error');
      }
    });
  }
  
  

}
