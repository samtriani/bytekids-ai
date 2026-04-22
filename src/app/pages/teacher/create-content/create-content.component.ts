import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
  forStudent = '';
  showPreview = false;
  toast = '';

  tpls=[
    {n:'Misión Python básica',     s:'Python',        xp:50,  m:30,  d:'Fácil'},
    {n:'Proyecto web HTML/CSS',    s:'HTML/CSS/JS',   xp:120, m:90,  d:'Medio'},
    {n:'Quiz de Scratch',          s:'Scratch',       xp:40,  m:20,  d:'Fácil'},
    {n:'Reto Roblox Studio',       s:'Roblox Studio', xp:200, m:120, d:'Difícil'},
    {n:'Ejercicio robótica',       s:'Robótica',      xp:80,  m:60,  d:'Medio'},
  ];

  published: {title:string; type:string; subject:string; grade:string; xp:number; date:string}[] = [
    {title:'Variables y Datos',       type:'Misión',   subject:'Python',      grade:'4°A', xp:50,  date:'20 Mar'},
    {title:'Mi Primera Página Web',   type:'Proyecto', subject:'HTML/CSS/JS', grade:'4°A', xp:120, date:'15 Mar'},
    {title:'Quiz Bucles Scratch',     type:'Quiz',     subject:'Scratch',     grade:'3°B', xp:40,  date:'10 Mar'},
  ];

  constructor(private route: ActivatedRoute) {
    const forParam = this.route.snapshot.queryParamMap.get('for');
    if (forParam) { this.forStudent = forParam; this.title = `Tarea personalizada para ${forParam}`; }
  }

  useTpl(t:any){this.subject=t.s;this.xp=t.xp;this.mins=t.m;this.title=t.n;this.diff=t.d;}

  save() {
    if (!this.title.trim()) return;
    const now = new Date();
    const date = now.getDate() + ' ' + ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][now.getMonth()];
    this.published.unshift({title:this.title, type:this.type, subject:this.subject, grade:this.grade, xp:this.xp, date});
    this.showToast(`✅ "${this.title}" publicado para el salón ${this.grade}`);
    this.title=''; this.desc=''; this.showPreview=false;
  }

  showToast(msg: string) { this.toast=msg; setTimeout(()=>this.toast='',4000); }
}
