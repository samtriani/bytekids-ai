import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({ selector:'app-teacher-reports', standalone:true, imports:[CommonModule,FormsModule,RouterLink,ShellComponent],
  templateUrl:'./reports.component.html', styleUrls:['./reports.component.scss'] })
export class ReportsComponent implements AfterViewInit {
  @ViewChild('barC') barC!: ElementRef;
  @ViewChild('dntC') dntC!: ElementRef;
  navItems: NavItem[] = [{label:"Mi Panel",icon:"🏠",route:"/teacher"},{label:"Mis Salones",icon:"🏫",route:"/teacher/classrooms",badge:3},{label:"Alumnos",icon:"👨‍🎓",route:"/teacher/students"},{label:"Crear Contenido",icon:"📝",route:"/teacher/create"},{label:"Asistente IA",icon:"🤖",route:"/teacher/ai-assistant",badge:"IA"},{label:"Reportes",icon:"📊",route:"/teacher/reports"},{label:"Calendario",icon:"📅",route:"/teacher/calendar"},{label:"Mensajes",icon:"💬",route:"/teacher/messages",badge:5}];
  period='Marzo 2026'; periods=['Enero 2026','Febrero 2026','Marzo 2026'];
  rows=[
    {n:'Sofía Ramírez',av:'SR',prog:92,mis:13,xp:1890,tr:'↑',st:'Excelente'},
    {n:'Emilio Torres', av:'ET',prog:88,mis:12,xp:1600,tr:'↑',st:'Excelente'},
    {n:'Axel Partida',  av:'AP',prog:78,mis:11,xp:1250,tr:'→',st:'Regular'},
    {n:'Mariana López', av:'ML',prog:67,mis:9, xp:840, tr:'↑',st:'Regular'},
    {n:'Valentina Cruz',av:'VC',prog:53,mis:7, xp:980, tr:'→',st:'Regular'},
    {n:'Carlos Mendez', av:'CM',prog:42,mis:5, xp:720, tr:'↓',st:'Necesita apoyo'},
  ];
  alerts=[
    {ico:'⚠️',txt:'Carlos Mendez lleva 5 días sin actividad',tp:'alert-warn'},
    {ico:'✅',txt:'Sofía Ramírez completó 3 misiones esta semana',tp:'alert-ok'},
    {ico:'ℹ️',txt:'Valentina Cruz bajó 8% respecto al mes anterior',tp:'alert-info'},
  ];
  pc(p:number){return p>=80?'#1A6B3C':p<60?'#9B1414':'#7A1535';}
  sc(s:string){return s==='Excelente'?'tag-oro':s==='Necesita apoyo'?'tag-red':'tag-guinda';}
  tc(t:string){return t==='↑'?'var(--ok)':t==='↓'?'var(--danger)':'var(--tx3)';}
  ngAfterViewInit(){
    new Chart(this.barC.nativeElement,{type:'bar',
      data:{labels:this.rows.map(r=>r.n.split(' ')[0]),
        datasets:[{label:'%',data:this.rows.map(r=>r.prog),backgroundColor:this.rows.map(r=>this.pc(r.prog)+'CC'),borderColor:this.rows.map(r=>this.pc(r.prog)),borderWidth:1.5,borderRadius:5}]},
      options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false},ticks:{color:'#7A6878',font:{family:'Nunito',size:11}}},
          y:{grid:{color:'#EDEEF1'},ticks:{color:'#7A6878',font:{family:'Nunito',size:11}},max:100}}}});
    new Chart(this.dntC.nativeElement,{type:'doughnut',
      data:{labels:['Python','HTML/CSS','Scratch','Robótica','Roblox'],
        datasets:[{data:[35,20,25,10,10],backgroundColor:['#7A1535','#C4992A','#1A6B3C','#0A4D7A','#5C0F27'],borderWidth:0}]},
      options:{responsive:true,maintainAspectRatio:false,cutout:'62%',
        plugins:{legend:{position:'bottom',labels:{color:'#3D2D3A',font:{family:'Nunito',size:11},padding:8,boxWidth:10}}}}});
  }
}
