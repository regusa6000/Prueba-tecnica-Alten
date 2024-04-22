import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.sass'],
})
export class HeroDetailComponent implements OnInit {

  heroFormDetail = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ref: MatDialogRef<HeroDetailComponent>
  ) {}

  ngOnInit(): void {
    this.setFormValue();
  }

  closeDialogHero() {
    this.ref.close();
  }

  setFormValue() {
    this.heroFormDetail.patchValue({
      id: this.data.id,
      name: this.data.name.toUpperCase()
    });
  }

}
