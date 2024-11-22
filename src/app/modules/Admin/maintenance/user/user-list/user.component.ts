import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IGetUser, IUpdateUser } from '../models/user.model';
import { UserService } from '../service/user.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  IGetUserList: IGetUser[] = [];
  inputs: IUpdateUser = { 
      Id : '',
      Email : '',
      UserName : '',
      CurrentPassword : '',
      NewPassword : '',
      Roles : [],
   };
   IGetUser: IGetUser | any;

   //Paganation
  entries: any[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalPages: number = 0;
  totalRecords: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  visiblePageCount = 5;
  searchTerm: string = '';

  //subscription
  private UserSucription?: Subscription;
  private AddUserSubcription?: Subscription;
  private FetchUserByIdSubcription?: Subscription;
  private UpdateUserSubcription?: Subscription;
  private onDeleteSubcription?: Subscription;

  //reset
  @ViewChild('formRef', { static: false }) form!: NgForm;
  //close modal
  @ViewChild('closeModal') closeModal!: ElementRef
  // open modal
  @ViewChild('updateModal') updateModal!: ElementRef;
  // close modal
  @ViewChild('closeModalUpdate') closeModals!: ElementRef;

  constructor(private UserServices: UserService) {}

  ngOnInit(): void {
    this.fetchAllUser();
  }

  private fetchAllUser() {
    this.UserSucription = this.UserServices.getAlluser()
      .subscribe({
        next: (response: any) => {
          this.IGetUserList = response.items;
          console.log(response.items);
          this.totalPages = response.totalPages;
          this.totalRecords = response.totalRecords;
        },
        error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }


  ngOnDestroy(): void {
   
  }

}
