import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const NAV: NavItem[] = [{label:"Panel Ejecutivo",icon:"🏫",route:"/admin"},{label:"Salones",icon:"🎓",route:"/admin/classrooms"},{label:"Maestros",icon:"👩‍🏫",route:"/admin/teachers"},{label:"Estudiantes",icon:"👨‍🎓",route:"/admin/students"},{label:"Reportes IA",icon:"🤖",route:"/admin/ai-reports",badge:"IA"},{label:"Materias",icon:"📚",route:"/admin/subjects"},{label:"Métricas",icon:"📊",route:"/admin/metrics"}];
@Component({ selector:'app-admin-metrics', standalone:true, imports:[CommonModule,RouterLink,ShellComponent],
  templateUrl:'./metrics.component.html', styleUrls:['./metrics.component.scss']
})
export class MetricsComponent implements AfterViewInit {
  @ViewChild('enrollC') enrollC!: ElementRef;
  @ViewChild('perfC') perfC!: ElementRef;
  @ViewChild('engC') engC!: ElementRef;
  navItems = NAV;
  ngAfterViewInit() {
    new Chart(this.enrollC.nativeElement, { type:'bar',
      data:{ labels:['Ene','Feb','Mar','Abr','May','Jun'],
        datasets:[{label:'Alumnos',data:[62,68,73,79,82,85],backgroundColor:'rgba(122,21,53,.7)',borderColor:'#7A1535',borderWidth:1.5,borderRadius:5}]},
      options:{ responsive:true,maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false},ticks:{color:'#7A6878',font:{family:'Nunito',size:11}}},
          y:{grid:{color:'#EDEEF1'},ticks:{color:'#7A6878',font:{family:'Nunito',size:11}}}}}});

    new Chart(this.perfC.nativeElement, { type:'line',
      data:{ labels:['Ene','Feb','Mar','Abr','May','Jun'],
        datasets:[
          {label:'2°A',data:[82,84,85,86,87,88],borderColor:'#1A6B3C',tension:.4,borderWidth:2},
          {label:'3°B',data:[76,78,80,80,81,82],borderColor:'#7A1535',tension:.4,borderWidth:2},
          {label:'4°A',data:[64,65,68,69,70,70],borderColor:'#0A4D7A',tension:.4,borderWidth:2},
          {label:'5°A',data:[68,66,65,63,63,62],borderColor:'#9B1414',tension:.4,borderWidth:2,borderDash:[5,3]},
        ]},
      options:{ responsive:true,maintainAspectRatio:false,
        plugins:{legend:{labels:{color:'#3D2D3A',font:{family:'Nunito',size:11},padding:10,boxWidth:10}}},
        scales:{x:{grid:{display:false},ticks:{color:'#7A6878',font:{family:'Nunito',size:11}}},
          y:{grid:{color:'#EDEEF1'},ticks:{color:'#7A6878',font:{family:'Nunito',size:11}},min:50,max:100}}}});

    new Chart(this.engC.nativeElement, { type:'doughnut',
      data:{ labels:['Roblox','Scratch','Robótica','Arte','Python','HTML','Matemáticas'],
        datasets:[{data:[97,95,91,85,88,82,78],backgroundColor:['#7A1535','#1A6B3C','#C4992A','#0A4D7A','#9B1A42','#1A6B3C','#5C0F27'],borderWidth:0}]},
      options:{ responsive:true,maintainAspectRatio:false,cutout:'60%',
        plugins:{legend:{position:'right',labels:{color:'#3D2D3A',font:{family:'Nunito',size:11},padding:6,boxWidth:10}}}}});
  }
}
