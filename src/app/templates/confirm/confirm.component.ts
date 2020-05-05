import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  @Input() titulo: string;
  @Input() mensaje: string;
  onClose: Subject<boolean>;

  constructor(
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  onSi() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  onNo() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
