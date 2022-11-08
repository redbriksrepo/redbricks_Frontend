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
 change: boolean=false;
 
 proposalExtraDetailForm = new FormGroup({

  'change': new FormControl('')
});

  constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient){

  }
  ngOnInit(): void {
   
    this.getlog();
    this.sorted();

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
    result.forEach((element:any) => {
      console.log(element.createdAt);
      const date =  new Date(element.createdAt);
      const current = new Date();
      var diff = current.getTime() - date.getTime(); 
      var daydiff = diff / (1000 * 60 * 60 * 24); 
        console.log("difference",daydiff);
       
        
     if(daydiff>90)
     {
      this.change=true;
      console.log("expired");
     }else{
      this.change=false;
       console.log(" not expired");
     }    
    });
    for(let i=0;i<result.length;i++)
    {
      if(this.change==false){
        result[i].createdAt+="Not expired";
      }else{
        result[i].createdAt+="Expired";
      }
    }
    this.tableDataSource(result);
      
     // console.log('Result::',result);
    });
}

changecolor(val: boolean){
  val=this.change;
  if(val==false){
    return false;
  }else{
    return true;
  }

}

tableDataSource(data: any) {
  this.dataSource = new MatTableDataSource(data);
  this.dataSource.paginator = this.paginator;

  this.dataSource.sort = this.sort;
  // this.table.renderRows();
}
  ngAfterViewInit() {
    
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

  sorted(){
    this.http.get('https://redbricks-server.herokuapp.com/logs/proposal-log').subscribe((GetDate:any)=>{
      // GetDate.forEach((element:any) => {
      //   console.log(element.createdAt);
      //   const date =  new Date(element.createdAt);
      //   const current = new Date();
     
      //   var diff = current.getTime() - date.getTime(); 
      //   var daydiff = diff / (1000 * 60 * 60 * 24); 
      //     console.log("difference",daydiff);
      //  if(daydiff>90)
      //  {
      //    console.log("expired");
         
      //  }else{
 
      //    console.log(" not expired");
      //  }
      // });
   
   
      // console.log(GetDate.crea)
    
    });

  }
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
  }
  
// }
// import { Component, OnInit } from '@angular/core';
// import { ViewChild } from '@angular/core';
// import { MatCell, MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import {LiveAnnouncer} from '@angular/cdk/a11y';
// import {AfterViewInit} from '@angular/core';
// import {MatSort, Sort} from '@angular/material/sort';
// import { FormControl, FormGroup } from "@angular/forms";
// import { HttpClient } from '@angular/common/http';
// export interface PeriodicElement {
//   name: string;
//     id: string;
//     createdate: string;
//     updatedate:string;
//     action: string;
//     message: string;
 
// }

// let ELEMENT_DATA: PeriodicElement[] = [
//   {id:'RBOHYDSA02111145' , name: 'Aditya', createdate:new Date('01/01/2022').toString(),updatedate:new Date().toString(),action:'viewproposal',message:"Client info"},
//   {id:'RBOHYDSA02111245' , name: 'Atul', createdate: new Date('09/01/2022').toString(),updatedate:new Date().toString(),action:'viewproposal',message:"Requirement"},
 
// ];

// @Component({
//   selector: 'app-logs',
//   templateUrl: './logs.component.html',
//   styleUrls: ['./logs.component.scss']
  
// })
// export class LogsComponent implements OnInit, AfterViewInit  {
//  change: boolean=true;
//  proposalExtraDetailForm = new FormGroup({

//   'change': new FormControl('')
// });

//   constructor(private _liveAnnouncer: LiveAnnouncer, private http: HttpClient){

//   }
//   displayedColumns: string[] = ['id', 'message', 'name','createdate','updatedate','action'];
//   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

//   @ViewChild(MatPaginator)
//   paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;
// @ViewChild(MatCell) datesort!: MatCell;

  

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
    
// }
// ngOnInit(): void {
//   this.sorted()
//   // this.http.get('https://redbricks-server.herokuapp.com/logs/proposal-log').subscribe((result: any) => {
//   //   this.dataSource = result;
//   //   console.log('DataSource::',this.dataSource);
//   //   console.log('Result::',result);
//   // })
// }
//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
  
//   }
//   announceSortChange(sortState: Sort) {
//     if (sortState.direction) {
//       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
//     } else {
//       this._liveAnnouncer.announce('Sorting cleared');
//     }
//   }

//   // getExpiredOrNot = (currentElementdate: string,i: any) => {
//   //   let current = new Date();
//   //   let currnetMonth = current.getMonth();
//   //   let currentDate = current.getDate();
//   //   let elementDate = new Date(currentElementdate);
//   //     let month = elementDate.getMonth();
//   //     let date = elementDate.getDate();
//   //     console.group(i);
//   //     console.log("Date:",currentDate);
//   //     console.log(current.toLocaleDateString())
//   //     console.log(elementDate.toLocaleDateString())
//   //     if((currnetMonth -2) >= month && currentDate > date){
//   //       console.log(true)
//   //       console.groupEnd();
//   //       return true
//   //     }
//   //     else{
//   //       console.log(false)
//   //       console.groupEnd();
//   //       return false
//   //     }
//   //   console.log(ELEMENT_DATA);
//   // }

//   sorted(){
   
//     ELEMENT_DATA.forEach((element:any)=>{
//       console.log(element.createdate);
//               const date =  new Date(element.createdate);
//               const current = new Date();
            
//               var diff = current.getTime() - date.getTime(); 
//               var daydiff = diff / (1000 * 60 * 60 * 24); 
//                 console.log("difference",daydiff);
//              if(daydiff>90)
//              {
//               this.change=true;
//                console.log("expired");
//              }else{
//               this.change=false;
//                console.log(" not expired");
//              }
//     });
             
            
//   }
// }
