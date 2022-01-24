import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { BestSellingProductDetailDto } from 'src/app/models/bestSellingProductDetailDto';
import { UserDetailDto } from 'src/app/models/userDetailDto';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  bestSellingProducts: BestSellingProductDetailDto[] = [];
  employees: UserDetailDto[] = [];
  restaurantIdFromStorage: number = parseInt(
    localStorage.getItem('restaurantId')
  );
  constructor(
    private reportService: ReportService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getTop10BestSellingProducts();
    this.getAllEmployees();
  }

  getTop10BestSellingProducts() {
    this.reportService.getTop10BestSellingProducts().subscribe((response) => {
      this.bestSellingProducts = response.data;
      this.createChartForTop10BestSellingProducts();
    });
  }
  createChartForTop10BestSellingProducts() {
    Chart.register(...registerables);
    var datas = this.bestSellingProducts.map((response) => response.quantity);
    var dataLabels = this.bestSellingProducts.map(
      (response) => response.productName
    );
    var chartBarColors = this.createRandomColors(datas.length)
    const myChart = new Chart('top10BestSellingProductsChart', {
      type: 'bar',
      data: {
        labels: dataLabels, 
        datasets: [
          {
            label: 'Satış Miktarı',
            data: datas,
            backgroundColor: chartBarColors,
            borderColor: [
              'black'
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'EN ÇOK SATILAN 10 ÜRÜN',
          },
        },

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  getAllEmployees() {
    this.userService
      .getAllUserByRestaurantIdAndStatus(this.restaurantIdFromStorage, true)
      .subscribe((response) => {
        this.employees = response.data;
        this.createChartForUserSalary();
      });
  }
  createChartForUserSalary() {
    Chart.register(...registerables);
    var datas = this.employees.map((response) =>
      response.titleId != 1 ? response.salary : null
    );

    var dataLabels = this.employees.map((response) =>
      response.titleId != 1
        ? response.firstName +
          ' ' +
          response.lastName +
          ' ' +
          '(' +
          response.title +
          ')'
        : null
    );
    const myChart = new Chart('userSalary', {
      type: 'bar',
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: 'Maaş',
            data: datas,
            backgroundColor: this.createRandomColors(datas.length),
            borderColor: 'black',
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'ÇALIŞANLARIN MAAŞLARI',
          },
        },

        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createRandomColors(itemCount:number) {
    var color;
    var colorArray = [];

    for (let i = 0; i < itemCount; i++) {
      color='#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6)
      colorArray.push(color);
    }
    return colorArray;
  }
}
