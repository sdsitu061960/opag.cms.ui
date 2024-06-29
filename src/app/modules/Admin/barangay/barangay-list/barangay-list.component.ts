import { Component, OnInit } from '@angular/core';
import { BarangayService } from '../service/barangay-service.service';
import { IBarangay, IBarangayInput } from '../model/barangay.model';

@Component({
  selector: 'app-barangay-list',
  templateUrl: './barangay-list.component.html',
  styleUrls: ['./barangay-list.component.css']
})
export class BarangayListComponent implements OnInit {
  barangayList: IBarangay[] = [];
  inputs: IBarangayInput = { barangays: '' };
  barangay: IBarangay | any;

  constructor(private barangayService: BarangayService) { }

  ngOnInit(): void {
    this.fetchBarangay();
  }

  private fetchBarangay() {
    this.barangayService.getAll()
      .subscribe({
        next: (response) => {
          this.barangayList = response;
        }, error: (error) => {
          console.error('Error fetching Data:', error);
        }
      });
  }
}
