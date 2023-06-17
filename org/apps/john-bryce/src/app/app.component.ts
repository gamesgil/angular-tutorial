import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'org-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data = {name: 'gil', email: 'gil@gil.com', course: 'react'};
  formGroup!: FormGroup;



  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      myName: new FormControl(this.data.name, {nonNullable: true}),
      myEmail: [this.data.email],
      myCourse: [this.data.course, [this.myValidator]],
      myChildren: this.fb.array([
        this.fb.group({
          name: 'Rivka',
          age: 55
        }),
        this.fb.group({
          name: 'Leah',
          age: 50
        })
      ])
    });
  }

  onSubmit() {
    this.data.name = this.formGroup.get('myName')?.value;
  }

  onReset() {
    this.formGroup.reset();
  }

  onAdd() {
    (this.formGroup.get('myChildren') as FormArray).push(this.fb.group(
      {
        name: 'Rachel',
      age: 30
    }))
  }

  getChildrenControls() {
    return (this.formGroup.get('myChildren') as FormArray).controls as FormGroup[];
  }

  myValidator(c: AbstractControl) {
    const value = c.value;
  
    if (value.includes('angular')) {
      return null;
    }
  
    return {reason: 'Course in not angular'}
  }
}

