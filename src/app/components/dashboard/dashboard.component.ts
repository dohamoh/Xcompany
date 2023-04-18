import { ReqsService } from 'src/app/services/reqs.service';
import { Component, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  allOrders: any;
  allUser: any;
  allClients: any;
  allServices: any;
  Project: any;
  Earning = 0;
  Duration = 'LastWeek';
  constructor(
    private ElementRef: ElementRef,
    private SharedService: SharedService,
    private ReqsService: ReqsService
  ) {}
  public lineChartData: Array<any> = [];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartType: any = 'line';
  public chartClicked(e: any): void {}
  public chartHovered(e: any): void {}

  ngOnInit(): void {
   

    this.SharedService.currentOrders.subscribe((orders: any) => {
      this.ReqsService.getAllUser().subscribe((users: any) => {
        this.handel(orders, users.allUser);
        this.SharedService.currentServices.subscribe((services: any) => {
          this.allServices = services;
        });
      });
    });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getNewData(data: any) {
    this.lineChartData = [];
    this.Duration = data.value;
    this.SharedService.updateOrders();
  }

  handel(allOrders: any, allUsers: any) {
    this.lineChartData = []
    this.lineChartLabels =[]
    if (this.Duration == 'today') {
      this.lastDay(allOrders, allUsers);
    } else if (this.Duration == 'LastWeek') {
      this.lastWeek(allOrders, allUsers);
    } else if (this.Duration == 'LastMonth') {
      this.lastMonth(allOrders, allUsers);
    } else if (this.Duration == 'LastYear') {
      this.lastYear(allOrders, allUsers);
    }
  }

  handelDate(date: any) {
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  }

  lastDay(allOrders: any, allUsers: any) {
    const today = new Date();
    const toDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    let dateNaw = this.handelDate(toDay);
    this.allUser = allUsers?.filter(
      (item: any) => this.handelDate(new Date(item.createdAt)) == dateNaw
    );
    console.log(dateNaw);

    this.allOrders = allOrders?.filter(
      (item: any) => this.handelDate(new Date(item.createdAt)) == dateNaw
    );
    let hourNow = new Date().getHours();
    let lineX = [];
    for (let i = 0; i <= hourNow; i++) {
      let label;
      if (i == 0) {
        label = 12;
      } else {
        label = i;
      }
      lineX.push(label);
    }
    this.lineChartLabels = lineX;
    let data;
    for (let i = 0; i < this.allServices?.length; i++) {
      const element = this.allServices[i];
      data = [];
      for (let x = 0; x <= new Date().getHours(); x++) {
        let num = [];
        for (let z = 0; z < element?.orders.length; z++) {
          const order = element?.orders[z];
          let today = new Date();
          let date = new Date();
          date.setDate(date.getHours() - x);
          if (new Date(order.createdAt).getDate() == today.getDate()) {
            if (
              new Date(order.createdAt).getHours() ==
              new Date().getHours() - x
            ) {
              num.push(order);
            }
          }
        }
        data.push(`${num.length}`);
      }
      data.reverse();
      this.lineChartData.push({
        label: `${element.servicesName}`,
        data: data,
        backgroundColor: this.getRandomColor(),
      });
    }
    this.setData();
  }

  lastWeek(allOrders: any, allUsers: any) {
    const today = new Date();
    const Week:any = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 6
    );
    this.allUser = allUsers?.filter(
      (item: any) => new Date(item.createdAt) >=  new Date(Week)
    );
    this.allOrders = allOrders?.filter(
      (item: any) => new Date(item.createdAt) >=  new Date(Week)
    );
    this.setData();
    let labels = [];
    for (let i = 0; i <= 6; i++) {
      let label = this.handelDate(
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
      );
      labels.unshift(label);
    }
    this.lineChartLabels = labels;
    let data;
    for (let i = 0; i < this.allServices?.length; i++) {
      const element = this.allServices[i];
      data = [];
      for (let x = 0; x < 7; x++) {
        let num = [];
        for (let z = 0; z < element?.orders.length; z++) {
          const order = element?.orders[z];
          let date = new Date();
          date.setDate(date.getDate() - x);
          if (new Date(order.createdAt).getDate() == date.getDate()) {
            num.push(order);
          }
        }
        data.push(`${num.length}`);
      }
      data.reverse();
      this.lineChartData.push({
        label: `${element.servicesName}`,
        data: data,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: this.getRandomColor(),
      });
    }
  }

  lastMonth(allOrders: any, allUsers: any) {
    this.allUser = allUsers?.filter(
      (item: any) => new Date(item.createdAt).getMonth()+1==  new Date().getMonth()+1
    );
    this.allOrders = allOrders?.filter(
      (item: any) => new Date(item.createdAt).getMonth()+1==  new Date().getMonth()+1
    );
    const today = new Date();
    let dayNow = new Date().getDate();
    let cc = [];
    let month = new Date().getMonth() + 1;
    for (let i = 0; i <= dayNow; i++) {
      if (
        new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - i
        ).getMonth() +
          1 ==
        month
      ) {
        let label = this.handelDate(
          new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
        );
        cc.unshift(label);
      } else {
        this.lineChartLabels = cc;
      }
    }
    this.lineChartLabels = cc;
    let data;
    for (let i = 0; i < this.allServices?.length; i++) {
      const element = this.allServices[i];
      data = [];
      for (let x = 0; x < new Date().getDate(); x++) {
        let num = [];
        for (let z = 0; z < element?.orders.length; z++) {
          const order = element?.orders[z];
          let date = new Date();
          date.setDate(date.getDate() - x);
          if (new Date(order.createdAt).getDate() == date.getDate()) {
            num.push(order);
          }
        }
        data.push(`${num.length}`);
      }
      data.reverse();
      this.lineChartData.push({
        label: `${element.servicesName}`,
        data: data,
        backgroundColor: this.getRandomColor(),
      });
    }
  }

  lastYear(allOrders: any, allUsers: any) {
    console.log( new Date().getFullYear());

    this.allUser = allUsers?.filter(
      (item: any) => new Date(item.createdAt).getFullYear()==  new Date().getFullYear()
    );
    this.allOrders = allOrders?.filter(
      (item: any) => new Date(item.createdAt).getFullYear()==  new Date().getFullYear()

    );

    let month = new Date().getUTCMonth() + 1;
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let x: any = [];
    for (let i = 0; i < month; i++) {
      x.push(months[i]);
    }
    this.lineChartLabels = x;
    let data;
    for (let i = 0; i < this.allServices?.length; i++) {
      const element = this.allServices[i];
      data = [];
      for (let x = 0; x < new Date().getUTCMonth() + 1; x++) {
        let num = [];
        for (let z = 0; z < element?.orders.length; z++) {
          const order = element?.orders[z];
          let date = new Date();
          date.setDate(date.getUTCMonth() - x);
          if (new Date(order.createdAt).getUTCMonth() == date.getDate()) {
            num.push(order);
          }
        }
        data.push(`${num.length}`);
      }
      data.reverse();
      this.lineChartData.push({
        label: `${element.servicesName}`,
        data: data,
        backgroundColor: this.getRandomColor(),
      });
    }
  }

  setData() {
    this.Earning = 0;
    this.Project = this.allOrders?.filter((item: any) => item.status == 'Done');
    for (let i = 0; i < this.allOrders?.length; i++) {
      const element = this.allOrders[i];
      if (element.status != 'Canceled') {
        this.Earning += element.service.servicesPrice;
      }
    }
    for (let i = 0; i < this.allUser?.length; i++) {
      const element = this.allUser[i];
    }
    this.allClients = this.allUser?.filter(
      (item: any) => item.orders.length != 0
    );
  }
  updateStatus(status:any,id:any){
    let data = {
      id,
      status
    }
    console.log(data);

    this.ReqsService.updateOrderStatus(data).subscribe((data:any)=>{
      console.log(data);
if (data.message == 'Done') {
this.SharedService.updateOrders()
}
    })
  }
}
