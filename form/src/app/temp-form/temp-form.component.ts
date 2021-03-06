import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from '../app.component';
import { ExmpDiagComponent } from '../exmp-diag/exmp-diag.component';
import { DialogData, Phones} from '../modules/dialog-data';




@Component({
  selector: 'app-temp-form',
  templateUrl: './temp-form.component.html',
  styleUrls: ['./temp-form.component.css']
})
export class TempFormComponent implements OnInit {

  name: string = ''
  lastName: string = ''
  username: string = ''
  cpf: string = ''
  mainPhone: string = ''
  objPhone: Phones[] = []
  adress: string = ''
  compl: string = ''
  password: string = ''
  confPassword: string = ''

 
  @Input() nextUser: number = 1

  addTelSpace(){
    this.objPhone.push({phone: ''})
  }
  removeTelSpace(i: number){
    this.objPhone.splice(i, 1)
  }

  constructor(public dialog: MatDialog) {}

  openDialog(form: NgForm) {
    const dialogRef = this.dialog.open(ExmpDiagComponent, {
      width: '300px',
      data: {
        name: this.name,
        lastName: this.lastName, 
        username: this.username, 
        cpf: this.cpf, 
        mainPhone: this.mainPhone, 
        objPhone: this.objPhone,
        adress: this.adress, 
        compl: this.compl, 
        password: this.password
      },
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result == '') {
        console.log(`%cUsuário ${this.nextUser} (Template)`, 'font-size: 20px;')
        console.log('Dados Corrigidos')
      }
      if (result == true) this.printData(form);
    });
  }

  @Output() userNumAdd: EventEmitter<any> = new EventEmitter<any>()

  printData(form: NgForm){

    console.log(`%cUsuário ${this.nextUser} (Template)`, 'font-size: 20px;')
    console.log(`Nome: ${this.name}`)
    console.log(`Sobrenome: ${this.lastName}`)
    console.log(`Username: ${this.username}`)
    console.log(`CPF: ${this.cpf}`)
    console.log(`Telefone Principal: ${this.mainPhone}`)
    for(let i in this.objPhone) console.log(`Telefone adicional ${i+1}: ${this.objPhone[i].phone}`)
    console.log(`Endereço: ${this.adress}`)
    console.log(`Complemento: ${this.compl}`)
    console.log(`Senha: ${this.password}`)

    form.resetForm()

    this.userNumAdd.emit()
  }

  ngOnInit(): void {
  }

}
