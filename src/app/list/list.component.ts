import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ListerService } from '../lister.service';
import { List } from '../app.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listId: string;
  status = '';

  listFormGroup = this.formBuilder.group({
    listName: ['', Validators.required],
    listBody: ['', Validators.required]
  });

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
      }
    });
  }

  loadList() {
    this.listerService.getList(this.listId).subscribe((response: List) => {
      this.listFormGroup.setValue({
        listName: response.title,
        listBody: response.text
      });
    });
  }

  onSubmit() {
    if (this.listFormGroup.invalid) {
      return;
    }
    if (this.listId) {
      this.updateList();
    } else {
      this.newList();
    }
  }

  newList() {
    const newList: List = { title: this.listFormGroup.value.listName, text: this.listFormGroup.value.listBody };
    this.listerService.addList(newList).subscribe((response: List) => {
      // TODO: update location without route change so status works as expected.
      this.router.navigate(['/list/' + response._id]);
      this.showStatus('Saved');
    });
  }

  updateList() {
    const list: List = { title: this.listFormGroup.value.listName, text: this.listFormGroup.value.listBody };
    this.listerService.updateList(this.listId, list).subscribe(response => {
      this.showStatus('Saved');
    });
  }

  showStatus(status) {
    this.status = status;
    setTimeout(() => this.status = '', 3000);
  }
}
