import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';

@Component({ selector:'app-create-content', standalone:true, imports:[CommonModule,FormsModule,RouterLink,ShellComponent],
  templateUrl:'./create-content.component.html', styleUrls:['./create-content.component.scss']
})
export class CreateContentComponent {
  navItems: NavItem[] = [{label:"Mi Panel",icon:"🏠",route:"/teacher"},{label:"Mis Salones",icon:"🏫",route:"/teacher/classrooms",badge:3},{label:"Alumnos",icon:"👨‍🎓",route:"/teacher/students"},{label:"Crear Contenido",icon:"📝",route:"/teacher/create"},{label:"Asistente IA",icon:"🤖",route:"/teacher/ai-assistant",badge:"IA"},{label:"Reportes",icon:"📊",route:"/teacher/reports"},{label:"Calendario",icon:"📅",route:"/teacher/calendar"},{label:"Mensajes",icon:"💬",route:"/teacher/messages",badge:5}];
  type='Misión'; types=['Misión','Tarea','Quiz','Proyecto','Material'];
  subject='Python'; subjects=['Python','HTML/CSS/JS','Scratch','Robótica','Roblox Studio','Matemáticas'];
  diff='Medio'; diffs=['Fácil','Medio','Difícil'];
  title=''; desc=''; xp=50; mins=30; grade='4°A'; grades=['2°A','3°B','4°A','5°A'];
  tpls=[
    {n:'Misión Python básica',     s:'Python',         xp:50, m:30,  d:'Fácil'},
    {n:'Proyecto web HTML/CSS',    s:'HTML/CSS/JS',    xp:120,m:90,  d:'Medio'},
    {n:'Quiz de Scratch',          s:'Scratch',        xp:40, m:20,  d:'Fácil'},
    {n:'Reto Roblox Studio',       s:'Roblox Studio',  xp:200,m:120, d:'Difícil'},
    {n:'Ejercicio robótica',       s:'Robótica',       xp:80, m:60,  d:'Medio'},
  ];
  useTpl(t:any){this.subject=t.s;this.xp=t.xp;this.mins=t.m;this.title=t.n;this.diff=t.d;}
  saved=false;
  save(){if(this.title.trim()){this.saved=true;setTimeout(()=>this.saved=false,4000);}}
}
