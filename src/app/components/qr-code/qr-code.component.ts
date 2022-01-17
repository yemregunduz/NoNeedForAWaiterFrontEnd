
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { qrCode } from 'src/app/models/qrCode';
import { qrCodeTableDto } from 'src/app/models/qrCodeTableDto';
import { Table } from 'src/app/models/table';
import { QrCodeService } from 'src/app/services/qr-code.service';
import { TableService } from 'src/app/services/table.service';
import { TableQrCodeDialogComponent } from './modal/table-qr-code-dialog/table-qr-code-dialog.component';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  restaurantIdFromStorage:number = parseInt(localStorage.getItem("restaurantId"))
  qrCodesByRestaurant:qrCodeTableDto[]=[]
  tables:Table[]

  
  constructor(private tableService:TableService,private qRcodeService:QrCodeService,
    private toastrService:ToastrService,private dialog:MatDialog) { }
  
  ngOnInit(): void {
    this.getAllTablesByRestaurantId()
    this.getAllQrCodesByRestaurantId()
  }
  getAllTablesByRestaurantId(){
    this.tableService.getAllTablesByRestaurantId(this.restaurantIdFromStorage).subscribe(response=>{
      this.tables = response.data;
    })
  }
  getAllQrCodesByRestaurantId(){
    this.qRcodeService.getAllQrCodeTableDtosByRestaurantId(this.restaurantIdFromStorage).subscribe(response=>{
      this.qrCodesByRestaurant = response.data
    })
  }
  openTableQrCodeDialog(tableId:number){
    const tableQrCodeDialogRef = this.dialog.open(TableQrCodeDialogComponent,{
      minWidth:'25%',
      maxWidth:'40%',
      data:tableId
    })
  }

  
}
