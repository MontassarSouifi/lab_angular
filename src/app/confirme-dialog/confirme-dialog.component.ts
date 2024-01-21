import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirme-dialog',
  templateUrl: './confirme-dialog.component.html',
  styleUrls: ['./confirme-dialog.component.css']
})
export class ConfirmeDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmeDialogComponent>) { }

  title="Are you sure ? "
  content = "Do you really to remove this item"
  cancel ="cancel"
  confirm ="confirm"

}
