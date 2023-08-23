import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryData = {
   title:'',
   description:''
  
  };

  constructor(private _category: CategoryService, private snack: MatSnackBar){

  }
  public categoryAdd(){
    console.log("login btn clicked");
    if(this.categoryData.title.trim()==''||this.categoryData.title==null){
        this.snack.open("Title is required !!",'',{
          duration:3000,
        });
        return;
    }
    if(this.categoryData.description.trim()==''||this.categoryData.description==null){
      this.snack.open("Description is required !!",'',{
        duration:3000,
      });
      return;
   }
   this._category.addingCategory(this.categoryData).subscribe({
    next: (categoryData:any)=>{
      console.log("Category data is :", categoryData);
    },
    error: (err:any)=>{
      console.log(err);
    },
    complete: () => {
      // console.log('Subscription complete');
      Swal.fire('Success','Categoyr is added', 'success');


    }
    
   });
   
  }

}
