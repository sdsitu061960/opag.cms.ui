import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRuralOrganizationMember } from '../model/rbo-directory.model';

@Component({
  selector: 'app-list-rbo',
  templateUrl: './list-rbo.component.html',
  styleUrls: ['./list-rbo.component.css']
})
export class ListRboComponent implements OnInit, OnDestroy {
  RboCategoryList: IRuralOrganizationMember[] = [];


  constructor() { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
