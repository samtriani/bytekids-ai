import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
const NAV: NavItem[] = [{label:"Panel Ejecutivo",icon:"🏫",route:"/admin"},{label:"Salones",icon:"🎓",route:"/admin/classrooms"},{label:"Maestros",icon:"👩‍🏫",route:"/admin/teachers"},{label:"Estudiantes",icon:"👨‍🎓",route:"/admin/students"},{label:"Reportes IA",icon:"🤖",route:"/admin/ai-reports",badge:"IA"},{label:"Materias",icon:"📚",route:"/admin/subjects"},{label:"Métricas",icon:"📊",route:"/admin/metrics"}];
@Component({ selector:'app-admin-classrooms', standalone:true, imports:[CommonModule,RouterLink,ShellComponent],
  templateUrl:'./classrooms.component.html', styleUrls:['./classrooms.component.scss']
})
export class ClassroomsComponent {
  navItems = NAV;
  rooms = [
    {name:'2°A',teacher:'Prof. Torres',students:20,avg:88,trend:'+12%',up:true,active:19,missions:312,status:'excellent',subjects:['Scratch','HTML/CSS','Arte Digital']},
    {name:'3°B',teacher:'Prof. Ramírez',students:18,avg:82,trend:'+8%',up:true,active:14,missions:278,status:'good',subjects:['Scratch','Robótica','Matemáticas']},
    {name:'4°A',teacher:'Profa. García',students:22,avg:70,trend:'+5%',up:true,active:16,missions:248,status:'good',subjects:['Python','HTML/CSS','Scratch']},
    {name:'5°A',teacher:'Profa. López',students:25,avg:62,trend:'-2%',up:false,active:10,missions:198,status:'warn',subjects:['Python','Roblox Studio','Ciencias']},
  ];
  rc(a:number){ return a>=80?'var(--ok)':a<68?'var(--danger)':'var(--guinda)'; }
}
