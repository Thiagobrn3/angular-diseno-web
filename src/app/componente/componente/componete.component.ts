import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { TestService } from '../../service/test.service';
import test from 'node:test';
import { Device } from '../../models/device';
import { Data } from '../../models/deviceData';
import { error } from 'node:console';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-componente',
  templateUrl: './componete.component.html',
  styleUrl: './componete.component.css'
})
export class ComponeteComponent implements OnInit {
  deviceList = new Array<Device>()
  device = new Device()
  data = new Data()
  @Input() name: string
  @Input() price: number
  @Input() color: string
  @Input() id2: string
  @Input() name2: string
  @Input() price2: number
  @Input() color2: string
  @ViewChild('see') see: any
  constructor(private testService: TestService, private modalService: NgbModal){}

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
      this.testService.getAll().subscribe((response) =>{
        this.deviceList = response
        this.clearInputs()
    },error =>{
      console.log(error)
    })
  }
  save() {
    this.device.name = this.name
    this.data.price = this.price
    this.data.color = this.color
    this.device.data = this.data
  
    this.testService.save(this.device).subscribe(response => {
      this.deviceList.push(response)
      this.clearInputs()
    }, error => {
      console.log(error)
    });
  }
  

  insertTr(response: Device) {
    var tbody = document.getElementsByTagName('tbody')[0]
    var row = tbody.insertRow()
    row.setAttribute('id', response.id)

    var cell = row.insertCell()
    cell.innerHTML = response.id

    cell = row.insertCell()
    cell.innerHTML = response.name

    cell = row.insertCell()
    cell.innerHTML = response.data.price.toString()

    cell = row.insertCell()
    cell.innerHTML = response.data.color

    cell = row.insertCell()
    var button = document.createElement('button')
    
    button.innerHTML = "VIEW"
    cell.appendChild(button)
    cell = row.insertCell()
    var button = document.createElement('button')
    button.innerHTML = "DELETE"
    cell.appendChild(button)
    this.clearInputs()
  }

  clearInputs() {
    document.getElementsByTagName('input')[0].value = ''
    document.getElementsByTagName('input')[1].value = ''
    document.getElementsByTagName('input')[2].value = ''
    document.getElementsByTagName('input')[0].focus()
  }

  delete(id: string) {
    if (!id.startsWith("ff808")) {  // Asume un patrón de ID que el servidor usa
      this.deviceList = this.deviceList.filter(device => device.id !== id)
    } else {
      this.testService.delete(id).subscribe(() => {
        this.deviceList = this.deviceList.filter(device => device.id !== id)
      }, error => {
        console.log("ERROR", error)
      });
    }
  }
  view(see: any, device: Device) {
    this.id2 = device.id;
    this.name2 = device.name;
    this.price2 = device.data.price;
    this.color2 = device.data.color;

    // Abrir el modal
    this.modalService.open(see).result.then(
        (result) => {
        },
        (reason) => {
        }
    );
}


saveChanges(modal: any) {
  this.device.id = this.id2      
  this.device.name = this.name2
  this.data.price = this.price2
  this.data.color = this.color2
  this.device.data = this.data

  // Llamar al servicio para actualizar el dispositivo en el backend
  this.testService.update(this.device).subscribe(
      (response) => {
          const index = this.deviceList.findIndex(d => d.id === response.id)
          if (index !== -1) {
              this.deviceList[index] = response // Actualiza el dispositivo en la lista
          }
          modal.close("Save click")
      },
      (error) => {
        console.error('Error al actualizar el dispositivo:', error) 
      }
  );
}
}
