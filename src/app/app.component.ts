import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ListerService } from './lister.service';

export interface List {
  _id?: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lister';
  lists: List[] = [];

  listFormGroup = this.formBuilder.group({
    listName: ['', Validators.required],
    listBody: ['', Validators.required]
  });

  constructor(private listerService: ListerService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.listerService.getLists().subscribe((data: List[]) => {
      this.lists = data;
    });
  }

  deleteList(listId) {
    this.listerService.deleteList(listId).subscribe(response => {
      console.log(response);
      this.getLists();
    });
  }

  onSubmit() {
    if (this.listFormGroup.invalid) {
      return;
    }
    const newList = {
      title: this.listFormGroup.value.listName,
      text: this.listFormGroup.value.listBody
    };
    this.listerService.addList(newList).subscribe(response => {
      this.getLists();
      this.listFormGroup.reset();
    });
  }
}
