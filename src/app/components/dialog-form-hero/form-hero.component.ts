import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-hero',
  templateUrl: './form-hero.component.html',
  styleUrls: ['./form-hero.component.sass'],
})
export class FormHeroComponent {
  heroForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ref: MatDialogRef<FormHeroComponent>
  ) {}

  closeDialogHero() {
    this.ref.close();
  }
}
