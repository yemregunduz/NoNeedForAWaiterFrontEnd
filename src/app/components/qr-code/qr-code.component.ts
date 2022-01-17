import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { qrCodeTableDto } from 'src/app/models/qrCodeTableDto';
import { Table } from 'src/app/models/table';
import { QrCodeService } from 'src/app/services/qr-code.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  restaurantIdFromStorage:number = parseInt(localStorage.getItem("restaurantId"))
  qrCodesByTable:qrCodeTableDto[]=[]
  qrCodesByRestaurant:qrCodeTableDto[]=[]
  tables:Table[]
  imageData: any;  
  sanitizedImageData: any;  
  
  constructor(private tableService:TableService,private qRcodeService:QrCodeService,private sanitizer: DomSanitizer) { }
  
  ngOnInit(): void {
    this.getAllTablesByRestaurantId()
    this.getAllQrCodesByRestaurantId()
  }
  getAllTablesByRestaurantId(){
    this.tableService.getAllTablesByRestaurantId(this.restaurantIdFromStorage).subscribe(response=>{
      this.tables = response.data;
    })
  }
  getAllQrCodesByTableId(tableId:number){
    this.qRcodeService.getAllQrCodeTableDtosByTableId(tableId).subscribe(response=>{
      this.qrCodesByTable = response.data
    })
  }
  getAllQrCodesByRestaurantId(){
    this.qRcodeService.getAllQrCodeTableDtosByRestaurantId(this.restaurantIdFromStorage).subscribe(response=>{
      this.qrCodesByRestaurant = response.data
    })
  }
  getQrCodeImagePath(qrCode:qrCodeTableDto){
    this.imageData = 'data:image/jpeg;base64,'+qrCode.qrCodeImagePath
    this.sanitizedImageData = this.sanitizer.bypassSecurityTrustUrl(this.imageData)
    return this.sanitizedImageData;
  }

}
