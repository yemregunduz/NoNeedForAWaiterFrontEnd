import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { qrCodeTableDto } from 'src/app/models/qrCodeTableDto';
import { QrCodeService } from 'src/app/services/qr-code.service';

@Component({
  selector: 'app-table-qr-code-dialog',
  templateUrl: './table-qr-code-dialog.component.html',
  styleUrls: ['./table-qr-code-dialog.component.css']
})
export class TableQrCodeDialogComponent implements OnInit {

  qrCodesByTable:qrCodeTableDto[]=[];
  imageData: any;  
  sanitizedImageData: any;
  qrCodeAddForm:FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public tableId:number,private qrCodeService:QrCodeService,private domSanitizer:DomSanitizer,private toastrService:ToastrService,
  private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllQrCodesByTableId();
  }
  getAllQrCodesByTableId(){
    this.qrCodeService.getAllQrCodeTableDtosByTableId(this.tableId).subscribe(response=>{
      this.qrCodesByTable = response.data
    })
  }
  getQrCodeImagePath(qrCode:qrCodeTableDto){
    this.imageData = 'data:image/jpeg;base64,'+qrCode.qrCodeImagePath
    this.sanitizedImageData = this.domSanitizer.bypassSecurityTrustUrl(this.imageData)
    return this.sanitizedImageData;
  }
  deleteQrCode(qrCode:qrCodeTableDto){
    this.qrCodeService.qrCodeDelete(qrCode).subscribe(response=>{
      if(response.success==true){
        this.toastrService.success(response.message,"Başarılı!")
        this.getAllQrCodesByTableId()
      }
    })
  }
  createQrCodeAddForm(){
    this.qrCodeAddForm = this.formBuilder.group({
      tableId:[this.tableId,Validators.required],
      routerLink:["http://localhost:4200/clientside",Validators.required]
    })
    this.qrCodeAddToTable()
  }
  qrCodeAddToTable(){
    if(this.qrCodeAddForm.valid){
      let qrCodeModel = Object.assign({},this.qrCodeAddForm.value)
      this.qrCodeService.qrCodeAdd(qrCodeModel).subscribe(response=>{
        if(response.success==true){
          this.toastrService.success("QrCode oluşturuldu","Başarılı!")
          this.getAllQrCodesByTableId();
        }
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Hata!")
      })
    }
  }
  printQrCodes(){
    window.print();
  }
}
