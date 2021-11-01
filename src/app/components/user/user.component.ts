import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserService } from 'src/app/services/user.service';
import { UserAddDialogComponent } from './modal/user-add-dialog/user-add-dialog.component';
import { UserUpdateDialogComponent } from './modal/user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Output() scrolled = new EventEmitter()
  @Input() userImagesArrayNull = new EventEmitter()
  employees:UserDetailDto[]=[]
  formerEmployees:UserDetailDto[]=[]
  totalRecordsOfEmployees:number
  pageOfEmployees:number=1
  totalRecordsOfFormerEmployees:number
  pageOfFormerEmployees:number=1
  constructor(private userService:UserService,public dialog:MatDialog,private userImageService:UserImageService) { }
  restaurantIdFromStorage:number = parseInt(localStorage.getItem('restaurantId'))
  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllFormerEmployees();
  }
  getAllEmployees(){
    this.userService.getAllUserByRestaurantIdAndStatus(this.restaurantIdFromStorage,true).subscribe(response=>{
      this.employees = response.data
      this.totalRecordsOfEmployees = response.data.length
      if(response.data.length%11==0){
        this.pageOfEmployees=this.pageOfEmployees-1;
      }
    })
  }
  getAllFormerEmployees(){
    this.userService.getAllUserByRestaurantIdAndStatus(this.restaurantIdFromStorage,false).subscribe(response=>{
      this.formerEmployees = response.data
      this.totalRecordsOfFormerEmployees = response.data.length
      if(response.data.length%11==0){
        this.pageOfFormerEmployees = this.pageOfFormerEmployees-1;
      }
    })
  }
  updateUserStatus(user:User){
    user.status = !user.status
    this.userService.updateUserStatus(user).subscribe(response=>{
      this.getAllEmployees()
      this.getAllFormerEmployees()
    })
  }
  onEmployeesPageChange(page:number){
    this.pageOfEmployees=page;
    this.scrolled.emit();
  }
  onFormerEmployeesPageChange(page:number){
    this.pageOfFormerEmployees = page;
    this.scrolled.emit();
  }
  openEmployeeAddDialog(){
    const employeeAddDialogRef = this.dialog.open(UserAddDialogComponent);
    employeeAddDialogRef.componentInstance.onAdded.subscribe(response=>{
      this.getAllEmployees();
      employeeAddDialogRef.close()
    })
  }
  openEmployeeUpdateDialog(employee:UserDetailDto){
    const employeeUpdateDialogRef = this.dialog.open(UserUpdateDialogComponent,{
      data:employee
    })
    employeeUpdateDialogRef.componentInstance.onUpdated.subscribe(response=>{
      this.getAllEmployees();
      this.getAllFormerEmployees();
      employeeUpdateDialogRef.close();
    })
    employeeUpdateDialogRef.afterClosed().subscribe(event=>{
      employeeUpdateDialogRef.componentInstance.userImagePath = null
      employeeUpdateDialogRef.componentInstance.userImageFile = null 
    })
  }
  getUserImagePath(userImagePath:string){
    return this.userImageService.getImagePath(userImagePath);
  }
  trackByFn(index: number, employee:UserDetailDto ): any {
    return employee.id;
  }
}
