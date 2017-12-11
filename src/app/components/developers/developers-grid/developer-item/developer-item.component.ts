import { Component, OnInit, Input } from '@angular/core';
import { Developer } from '../../../../models/developer.model';
import { DeveloperService } from '../../../../services/developer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-developer-item',
  templateUrl: './developer-item.component.html',
  styleUrls: ['./developer-item.component.css']
})
export class DeveloperItemComponent implements OnInit {
  @Input() developer: Developer;
  @Input() index: number;

  constructor(
    private developerService: DeveloperService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onDeleteDeveloper(){
    this.developerService.deleteDeveloper(this.developer._id);
    this.router.navigate(['../']);
  }
}
