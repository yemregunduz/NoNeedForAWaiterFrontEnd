import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserImageService } from 'src/app/services/user-image.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';
import { UserAddDialogComponent } from './modal/user-add-dialog/user-add-dialog.component';
import { UserDeleteDialogComponent } from './modal/user-delete-dialog/user-delete-dialog.component';
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
  filterText:string
  sortingByFirstNameBefore:boolean = false
  constructor(private userService:UserService,public dialog:MatDialog,private userImageService:UserImageService) { }
  restaurantIdFromStorage:number = parseInt(localStorage.getItem('restaurantId'))
  userIdFromStorage:number = parseInt(localStorage.getItem('userId'))
  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllFormerEmployees();
  }
  getAllEmployees(){
    this.userService.getAllUserByRestaurantIdAndStatus(this.restaurantIdFromStorage,true).subscribe(response=>{
      this.employees = response.data
      if(response.data.length%11==0){
        this.pageOfEmployees=this.pageOfEmployees-1;
      }
    })
  }
  getAllFormerEmployees(){
    this.userService.getAllUserByRestaurantIdAndStatus(this.restaurantIdFromStorage,false).subscribe(response=>{
      this.formerEmployees = response.data
      if(response.data.length%11==0){
        this.pageOfFormerEmployees = this.pageOfFormerEmployees-1;
      }
    })
  }
  updateUserStatus(user:UserDetailDto){
    user.status = !user.status
    this.sortingByFirstNameBefore=!this.sortingByFirstNameBefore
    this.userService.updateUser(user).subscribe(response=>{
      this.getAllEmployees()
      this.getAllFormerEmployees()
      this.sortingEmployeesByFirstName()
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
  openEmployeeDeleteDialog(formerEmployee:UserDetailDto){
    const employeeDeleteDialogRef = this.dialog.open(UserDeleteDialogComponent,{
      data:formerEmployee
    })
    employeeDeleteDialogRef.componentInstance.onDeleted.subscribe(response=>{
      this.getAllFormerEmployees();
    })
  }
  getUserImagePath(userImagePath:string){
    return this.userImageService.getImagePath(userImagePath);
  }
  trackByFn(index: number, employee:UserDetailDto ): any {
    return employee.id;
  }
  sortingEmployeesByFirstName(){
    if(this.sortingByFirstNameBefore==false){
      this.sortingByFirstNameBefore = true
      this.employees.sort((employee1,employee2)=>{
        if(employee1.firstName.toLocaleLowerCase() > employee2.firstName.toLocaleLowerCase()){
          return 1
        }
        if(employee1.firstName.toLocaleLowerCase() < employee2.firstName.toLocaleLowerCase()){
          return -1
        }
        return 0;
      })
    }
    else{
      this.sortingByFirstNameBefore=false
      this.employees.sort((employee1,employee2)=>{
        if(employee1.firstName.toLocaleLowerCase() < employee2.firstName.toLocaleLowerCase()){
          return 1
        }
        if(employee1.firstName.toLocaleLowerCase() > employee2.firstName.toLocaleLowerCase()){
          return -1
        }
        return 0;
      })
    }
  }
  
}
