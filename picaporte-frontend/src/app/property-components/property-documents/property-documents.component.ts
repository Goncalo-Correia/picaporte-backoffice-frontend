import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentStructure } from 'src/app/structures/document.structure';

@Component({
  selector: 'app-property-documents',
  templateUrl: './property-documents.component.html',
  styleUrls: ['./property-documents.component.css']
})
export class PropertyDocumentsComponent implements OnInit {

  @Input() mainDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
  @Input() certificateDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();
  @Input() otherDocuments: Array<DocumentStructure> = new Array<DocumentStructure>();

  @Output() event_updateMainPropertyDocuments = new EventEmitter<Array<DocumentStructure>>();
  @Output() event_updateCertificatePropertyDocuments = new EventEmitter<Array<DocumentStructure>>();
  @Output() event_updateOtherPropertyDocuments = new EventEmitter<Array<DocumentStructure>>();
  
  constructor() { }

  ngOnInit(): void {
  }

  triggerEvent_updateMainPropertyDocuments() {
    this.event_updateMainPropertyDocuments.emit(this.mainDocuments);
  }

  triggerEvent_updateCertificatePropertyDocuments() {
    this.event_updateCertificatePropertyDocuments.emit(this.certificateDocuments);
  }

  triggerEvent_updateOtherPropertyDocuments() {
    this.event_updateOtherPropertyDocuments.emit(this.otherDocuments);
  }

}
