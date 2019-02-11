import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ListerService } from '../lister.service';
import { List } from '../list';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listId: string;
  lists: List[];
  status = '';
  listFormGroup: FormGroup = this.formBuilder.group({
    listName: ['', Validators.required],
    listBody: ['', Validators.required],
    listItems: this.formBuilder.array([
      // this.formBuilder.control(''),
    ])
  });

  get listItems(): FormArray {
    return this.listFormGroup.get('listItems') as FormArray;
  }


  constructor(
    private route: ActivatedRoute,
    private listerService: ListerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.listId = paramMap.get('id');
      if (this.listId) {
        this.loadList();
      } else {
        this.initList();
      }
    });

    this.getLists();
  }

  initList() {
    this.listFormGroup.setValue({
      listName: '',
      listBody: '',
      listItems: []
    });
    this.listItems.push(this.formBuilder.control(''));
  }

  createListItem(text: string): FormGroup {
    return this.formBuilder.group({
      type: 'bullet',
      text: text
    });
  }

  getLists() {
    this.listerService.getLists().subscribe((data: List[]) => {
      this.lists = data;
    });
  }

  loadList() {
    this.initList();
    this.listerService.getList(this.listId).subscribe((response: List) => {
      this.listFormGroup.setValue({
        listName: response.title,
        listBody: response.text,
        listItems: ['']
      });
      if (response.items) {
        response.items.map(item => {
          this.listItems.push(this.formBuilder.control(item));
        });
      }
      if (this.listItems.controls[this.listItems.controls.length - 1].value !== '') {
        this.listItems.push(this.formBuilder.control(''));
      }
    });
  }

  onSubmit() {
    if (this.listFormGroup.invalid) {
      return;
    }
    if (this.listId) {
      this.updateList();
    } else {
      this.saveNewList();
    }
    this.getLists();
  }

  saveNewList() {
    const newList: List = {
      title: this.listFormGroup.value.listName,
      text: this.listFormGroup.value.listBody,
      items: this.listFormGroup.value.listItems
    };
    this.listerService.addList(newList).subscribe((response: List) => {
      // TODO: update location without route change so status works as expected.
      this.router.navigate(['/list/' + response._id]);
      this.showStatus('Saved');
    });
  }

  updateList() {
    const list: List = {
      title: this.listFormGroup.value.listName,
      text: this.listFormGroup.value.listBody,
      items: this.listFormGroup.value.listItems

    };
    this.listerService.updateList(this.listId, list).subscribe(response => {
      console.log(response);
      this.showStatus('Saved');
      this.loadList();
    });
  }

  deleteList() {
    if (!this.listId) {
      return;
    }
    this.listerService.deleteList(this.listId).subscribe(response => {
      console.log(response);
      this.router.navigate(['/list/']);
    });
  }

  showStatus(status) {
    this.status = status;
    setTimeout(() => (this.status = ''), 3000);
  }
}
