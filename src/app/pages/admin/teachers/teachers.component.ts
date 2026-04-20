import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
const NAV: NavItem[] = [{label:"Panel Ejecutivo",icon:"🏫",route:"/admin"},{label:"Salones",icon:"🎓",route:"/admin/classrooms"},{label:"Maestros",icon:"👩‍🏫",route:"/admin/teachers"},{label:"Estudiantes",icon:"👨‍🎓",route:"/admin/students"},{label:"Reportes IA",icon:"🤖",route:"/admin/ai-reports",badge:"IA"},{label:"Materias",icon:"📚",route:"/admin/subjects"},{label:"Métricas",icon:"📊",route:"/admin/metrics"}];
@Component({ selector:'app-admin-teachers', standalone:true, imports:[CommonModule,RouterLink,ShellComponent],
  templateUrl:'./teachers.component.html', styleUrls:['./teachers.component.scss']
})
export class TeachersComponent {
  navItems = NAV;
  teachers = [
    {name:'Prof. Torres',  av:'JT',cls:'2°A',students:20,sat:96,missions:312,avg:88,subjects:['Scratch','HTML/CSS','Arte Digital'],status:'Excelente'},
    {name:'Prof. Ramírez', av:'PR',cls:'3°B',students:18,sat:91,missions:278,avg:82,subjects:['Scratch','Robótica','Matemáticas'],status:'Excelente'},
    {name:'Profa. García', av:'MG',cls:'4°A',students:22,sat:87,missions:248,avg:70,subjects:['Python','HTML/CSS','Scratch'],status:'Bueno'},
    {name:'Profa. López',  av:'AL',cls:'5°A',students:25,sat:72,missions:198,avg:62,subjects:['Python','Roblox','Ciencias'],status:'Necesita apoyo'},
  ];
  sc(s:string){ return s==='Excelente'?'tag-oro':s==='Necesita apoyo'?'tag-red':'tag-guinda'; }
  satC(v:number){ return v>=90?'var(--ok)':v>=75?'var(--guinda)':'var(--danger)'; }
  avgC(v:number){ return v>=80?'var(--ok)':v<68?'var(--danger)':'var(--guinda)'; }
}
