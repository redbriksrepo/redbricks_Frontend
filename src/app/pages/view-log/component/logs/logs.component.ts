import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatCell, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import { FormControl, FormGroup } from "@angular/forms";

import { HttpClient } from '@angular/common/http';
export interface LogsData {
  name: string;
  id: string;
  createdate: string;
  updatedate:string;
  action: string;
  message: string;
 
}

// 

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
  
})
export class LogsComponent implements OnInit, AfterViewInit  {
// serverdata=this.http.get('https://redbricks-server.herokuapp.com/logs/proposal-log');

 change: boolean=true;
 proposalExtraDetailForm = new FormGroup({

  'change': new FormControl('')
});

  constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient){

  }
  ngOnInit(): void {
    this.getlog();
  //   this.serverdata.subscribe((result:any)=>{
  //     let newdata = result[0];
  
  // console.log(result);
  // console.log(newdata);
  
    // });
    
    // this.http.get('https://redbricks-server.herokuapp.com/logs/proposal-log').subscribe((result: any) => {
    //   this.dataSource = result;
    //   console.log('DataSource::',this.dataSource);
    //   console.log('Result::',result);
    // })
  }
  Logs:any;
  // let ELEMENT_DATA: PeriodicElement[] = [
    //   {id:'RBOHYDSA02111145' , name: 'Aditya', date: new Date('08/12/2022').toString(),action:'viewproposal',message:"Client info"},
    //   {id:'RBOHYDSA02111245' , name: 'Atul', date: new Date('07/01/2022').toString(),action:'viewproposal',message:"Requirement"},
    //   {id:'RBOHYDSA02111315' , name: 'Varun',date: new Date('07/22/2022').toString(),action:'viewproposal',message:"Layout genrated" },
    //   {id:'RBOHYDSA02111456' , name: 'Manprit',date: new Date('09/01/2022').toString(),action:'viewproposal',message:"Proposal genrated"},
    //   {id:'RBOHYDSA02111246' , name: 'Rahul', date: new Date('04/05/2022').toString(),action:'viewproposal',message:"Client info"},
    //   {id:'RBOPUNKH12110900' , name: 'Akshay', date: new Date('05/06/2022').toString(),action:'viewproposal',message:"Requirement"},
    //   {id:'RBOPUNKH12111323' , name: 'Manpreet', date: new Date('08/04/2022').toString(),action:'viewproposal',message:"Layout genrated"},
    //   {id:'RBOPUNKH12111122' , name: 'Dhiraj', date: new Date('12/08/2022').toString(),action:'viewproposal',message:"Proposal genrated"},
    //   {id:'RBOPUNKH12111025' , name: 'Raj', date: new Date('09/12/2022').toString(),action:'viewproposal',message:"Proposal genrated"},
    //   {id:'RBOPUNKH12111250' , name: 'Shubham', date: new Date('01/01/2022').toString(),action:'viewproposal',message:"Layout genrated"},
    //   {id:'RBOPUNKH12111670' , name: 'Shub', date: new Date('08/05/2022').toString(),action:'viewproposal',message:"Client info"},
    //   {id:'RBOPUNKH12111270' , name: 'Hritik', date: new Date('11/09/2022').toString(),action:'viewproposal',message:"Client info"},
    
    // ];
  displayedColumns: string[] = ['id', 'message', 'name','createdate','updatedate','action'];
   dataSource!:MatTableDataSource<LogsData>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatCell) datesort!: MatCell;
@ViewChild(MatTable) table!: MatTable<LogsData>;



getlog(){
  this.http.get('https://redbricks-server.herokuapp.com/logs/proposal-log').subscribe((result: any) => {
      this.tableDataSource(result);
      console.log('Result::',result);
    });
  // this.serverdata.subscribe((result:any)=>{
  //   this.Logs = result;
  //   console.log(result);
  //   console.log(this.Logs);
  //   this.tableDataSource(this.Logs);
  // })
}
tableDataSource(data: any) {
  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.paginator;
  console.log(this.dataSource);
 
  // this.table.renderRows();
}
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
   
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // getExpiredOrNot = (currentElementdate: string,i: any) => {
  //   let current = new Date();
  //   let currnetMonth = current.getMonth();
  //   let currentDate = current.getDate();
  //   let elementDate = new Date(currentElementdate);
  //     let month = elementDate.getMonth();
  //     let date = elementDate.getDate();
  //     console.group(i);
  //     console.log("Date:",currentDate);
  //     console.log(current.toLocaleDateString())
  //     console.log(elementDate.toLocaleDateString())
  //     if((currnetMonth -2) >= month && currentDate > date){
  //       console.log(true)
  //       console.groupEnd();
  //       return true
  //     }
  //     else{
  //       console.log(false)
  //       console.groupEnd();
  //       return false
  //     }
  //   console.log(ELEMENT_DATA);
  // }

  sorted(){
//     const current = new Date();
    
//     const numberOfDaysToSubstract = 90; //Dates to be subtracted
//     const expiry = new Date().setDate(current.getDate() - numberOfDaysToSubstract);  //current date - 90 days
//     const dateprint = new Date(expiry).getMonth(); 
//     console.log(dateprint);

//     for(let i=0;i<this.dataSource.data.length;i++){

//       if ( new Date(this.dataSource.data[i].date).getMonth() <= dateprint ) {
// // if date is less than the current date-90days
//     //  this.change =true;
//      this.change = true;
//     //  mat-sort-header sortActionDescription="Sort by date"
     
//         console.log('Expired',this.dataSource.data[i].date);
//       } else {
       
//         console.log('Not Expired',this.dataSource.data[i].date);
//         this.change=false;
      
//       }
//   }
  }
}
