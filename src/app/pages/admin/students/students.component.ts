import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
const NAV: NavItem[] = [{label:"Panel Ejecutivo",icon:"🏫",route:"/admin"},{label:"Salones",icon:"🎓",route:"/admin/classrooms"},{label:"Maestros",icon:"👩‍🏫",route:"/admin/teachers"},{label:"Estudiantes",icon:"👨‍🎓",route:"/admin/students"},{label:"Reportes IA",icon:"🤖",route:"/admin/ai-reports",badge:"IA"},{label:"Materias",icon:"📚",route:"/admin/subjects"},{label:"Métricas",icon:"📊",route:"/admin/metrics"}];
@Component({ selector:'app-admin-students', standalone:true, imports:[CommonModule,FormsModule,RouterLink,ShellComponent],
  templateUrl:'./students.component.html', styleUrls:['./students.component.scss']
})
export class StudentsComponent {
  navItems = NAV;
  search=''; filt='Todos'; clsFilt='Todos';
  clsList=['Todos','2°A','3°B','4°A','5°A'];
  all=[
    {n:'Sofía Ramírez', av:'SR',cls:'4°A',prog:92,xp:1890,streak:22,status:'Excelente'},
    {n:'Emilio Torres', av:'ET',cls:'3°B',prog:88,xp:1600,streak:18,status:'Excelente'},
    {n:'Diego Ríos',    av:'DR',cls:'2°A',prog:86,xp:1420,streak:15,status:'Excelente'},
    {n:'Axel Partida',  av:'AP',cls:'4°A',prog:78,xp:1250,streak:12,status:'Bueno'},
    {n:'Valentina Cruz',av:'VC',cls:'4°A',prog:67,xp:980, streak:7, status:'Bueno'},
    {n:'Mariana López', av:'ML',cls:'4°A',prog:53,xp:840, streak:4, status:'Bueno'},
    {n:'Carlos Mendez', av:'CM',cls:'4°A',prog:42,xp:720, streak:0, status:'Necesita apoyo'},
    {n:'Ana Hernández', av:'AH',cls:'5°A',prog:38,xp:550, streak:1, status:'Necesita apoyo'},
  ];
  get rows(){ return this.all.filter(s=>(this.filt==='Todos'||s.status===this.filt)&&(this.clsFilt==='Todos'||s.cls===this.clsFilt)&&s.n.toLowerCase().includes(this.search.toLowerCase())); }
  pc(p:number){ return p>=80?'var(--ok)':p<60?'var(--danger)':'var(--guinda)'; }
  sc(s:string){ return s==='Excelente'?'tag-oro':s==='Necesita apoyo'?'tag-red':'tag-guinda'; }
}
