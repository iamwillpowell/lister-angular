import { Component, OnInit } from '@angular/core';
import { ListerService } from '../lister.service';
import { List } from '../list';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  lists: List[] = [];

  constructor(private listerService: ListerService) {}

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
}
