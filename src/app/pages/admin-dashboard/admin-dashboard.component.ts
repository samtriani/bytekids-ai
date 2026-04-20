import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../shared/shell/shell.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, ShellComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements AfterViewInit {
  @ViewChild('enrollChart')   enrollChart!: ElementRef;
  @ViewChild('perfChart')     perfChart!: ElementRef;
  @ViewChild('subjectsChart') subjectsChart!: ElementRef;

  navItems: NavItem[] = [
    {label:'Panel Ejecutivo',icon:'🏫',route:'/admin'},
    {label:'Salones',        icon:'🎓',route:'/admin/classrooms'},
    {label:'Maestros',       icon:'👩‍🏫',route:'/admin/teachers'},
    {label:'Estudiantes',    icon:'👨‍🎓',route:'/admin/students'},
    {label:'Reportes IA',    icon:'🤖',route:'/admin/ai-reports',badge:'IA'},
    {label:'Materias',       icon:'📚',route:'/admin/subjects'},
    {label:'Métricas',       icon:'📊',route:'/admin/metrics'},
  ];

  classrooms = [
    {name:'2°A',teacher:'Prof. Torres',  avg:88,trend:'+12%',color:'#1A6B3C',status:'Excelente'},
    {name:'3°B',teacher:'Prof. Ramírez', avg:82,trend:'+8%', color:'#7A1535',status:'Bueno'},
    {name:'4°A',teacher:'Profa. García', avg:70,trend:'+5%', color:'#0A4D7A',status:'Bueno'},
    {name:'5°A',teacher:'Profa. López',  avg:62,trend:'-2%', color:'#9B1414',status:'Alerta'},
  ];

  topSubjects = [
    {name:'Roblox Studio',icon:'🎮',engagement:97,color:'#7A1535'},
    {name:'Scratch',      icon:'🧩',engagement:95,color:'#1A6B3C'},
    {name:'Robótica',     icon:'🤖',engagement:91,color:'#C4992A'},
    {name:'HTML/CSS/JS',  icon:'🌐',engagement:85,color:'#0A4D7A'},
    {name:'Python',       icon:'🐍',engagement:82,color:'#7A1535'},
  ];

  teachers = [
    {name:'Prof. Torres',  avatar:'JT',classroom:'2°A',students:20,satisfaction:96,color:'#1A6B3C'},
    {name:'Prof. Ramírez', avatar:'PR',classroom:'3°B',students:18,satisfaction:91,color:'#7A1535'},
    {name:'Profa. García', avatar:'MG',classroom:'4°A',students:22,satisfaction:87,color:'#0A4D7A'},
    {name:'Profa. López',  avatar:'AL',classroom:'5°A',students:25,satisfaction:72,color:'#9B1414'},
  ];

  ngAfterViewInit() {
    new Chart(this.enrollChart.nativeElement, { type:'bar',
      data:{ labels:['Ene','Feb','Mar','Abr','May','Jun'],
        datasets:[{label:'Alumnos',data:[62,68,73,79,82,85],backgroundColor:'rgba(122,21,53,.72)',borderColor:'#7A1535',borderWidth:1.5,borderRadius:4}]},
      options:{ responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false},ticks:{color:'#7A6878',font:{family:'Nunito',size:10}}},
          y:{grid:{color:'#EDEEF1'},ticks:{color:'#7A6878',font:{family:'Nunito',size:10}}}}}});

    new Chart(this.perfChart.nativeElement, { type:'line',
      data:{ labels:['Ene','Feb','Mar','Abr','May'],
        datasets:[
          {label:'2°A',data:[82,84,86,87,88],borderColor:'#1A6B3C',tension:.4,borderWidth:2,pointRadius:2},
          {label:'3°B',data:[76,79,80,81,82],borderColor:'#C4992A',tension:.4,borderWidth:2,pointRadius:2},
          {label:'4°A',data:[64,66,68,69,70],borderColor:'#0A4D7A',tension:.4,borderWidth:2,pointRadius:2},
          {label:'5°A',data:[66,65,63,63,62],borderColor:'#9B1414',tension:.4,borderWidth:2,pointRadius:2,borderDash:[4,2]},
        ]},
      options:{ responsive:true,maintainAspectRatio:false,
        plugins:{legend:{labels:{color:'#3D2D3A',font:{family:'Nunito',size:9},padding:6,boxWidth:8}}},
        scales:{x:{grid:{display:false},ticks:{color:'#7A6878',font:{family:'Nunito',size:10}}},
          y:{grid:{color:'#EDEEF1'},ticks:{color:'#7A6878',font:{family:'Nunito',size:10}},min:50,max:100}}}});

    new Chart(this.subjectsChart.nativeElement, { type:'doughnut',
      data:{ labels:['Roblox','Scratch','Robótica','HTML/CSS','Python','Arte','Matemáticas'],
        datasets:[{data:[97,95,91,85,82,85,78],backgroundColor:['#7A1535','#1A6B3C','#C4992A','#0A4D7A','#9B1A42','#1A6B3C','#5C0F27'],borderWidth:0}]},
      options:{ responsive:true,maintainAspectRatio:false,cutout:'58%',
        plugins:{legend:{position:'bottom',labels:{color:'#3D2D3A',font:{family:'Nunito',size:9},padding:4,boxWidth:8}}}}});
  }
}
