import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';

const NAV: NavItem[] = [
  {label:'Mi Panel',icon:'🏠',route:'/teacher'},{label:'Mis Salones',icon:'🏫',route:'/teacher/classrooms',badge:3},
  {label:'Alumnos',icon:'👨‍🎓',route:'/teacher/students'},{label:'Crear Contenido',icon:'📝',route:'/teacher/create'},
  {label:'Asistente IA',icon:'🤖',route:'/teacher/ai-assistant',badge:'IA'},{label:'Reportes',icon:'📊',route:'/teacher/reports'},
  {label:'Calendario',icon:'📅',route:'/teacher/calendar'},{label:'Mensajes',icon:'💬',route:'/teacher/messages',badge:5},
];

@Component({ selector:'app-teacher-students', standalone:true,
  imports:[CommonModule,FormsModule,RouterLink,ShellComponent],
  templateUrl:'./students.component.html', styleUrls:['./students.component.scss']
})
export class StudentsComponent {
  navItems = NAV;
  search = ''; filt = 'Todos'; view: 'table'|'cards' = 'table';
  filters = ['Todos','Excelente','Regular','Necesita apoyo'];
  selected: any = null;
  toast = '';

  all = [
    {n:'Sofía Ramírez',  av:'SR', cls:'4°A', prog:92, xp:1890, streak:22, status:'Excelente',      last:'Hoy',          subjects:['Python','HTML/CSS'], nextMission:'Funciones avanzadas',   note:'Alumna destacada, siempre entrega a tiempo.',          missions:['Variables y Datos ✅','Condicionales IF/ELSE ✅','Bucles For ✅','Mi Primera Web ✅']},
    {n:'Emilio Torres',  av:'ET', cls:'4°A', prog:88, xp:1600, streak:18, status:'Excelente',      last:'Hoy',          subjects:['Python','Scratch'],   nextMission:'POO básica',            note:'Muy creativo en Scratch, buen ritmo en Python.',        missions:['Variables y Datos ✅','Condicionales IF/ELSE ✅','Bucles For ✅']},
    {n:'Axel Partida',   av:'AP', cls:'4°A', prog:78, xp:1250, streak:12, status:'Regular',        last:'Hoy',          subjects:['Python','HTML/CSS'],  nextMission:'Condicionales IF/ELSE', note:'Progreso sólido. Necesita más práctica en bucles.',     missions:['Variables y Datos ✅','Mi Primera Web ✅','Estilos CSS 🔄']},
    {n:'Valentina Cruz', av:'VC', cls:'4°A', prog:67, xp:980,  streak:7,  status:'Regular',        last:'Ayer',         subjects:['Scratch','HTML/CSS'], nextMission:'Variables y tipos',     note:'Buena actitud, falta constancia en entregas.',          missions:['Variables y Datos ✅','Mi Primera Web 🔄']},
    {n:'Mariana López',  av:'ML', cls:'4°A', prog:53, xp:840,  streak:4,  status:'Regular',        last:'Hoy',          subjects:['Scratch'],            nextMission:'Primeros bucles',       note:'Necesita refuerzo en conceptos básicos de Scratch.',    missions:['Variables y Datos ✅']},
    {n:'Carlos Mendez',  av:'CM', cls:'4°A', prog:42, xp:720,  streak:0,  status:'Necesita apoyo', last:'Hace 5 días',  subjects:['Scratch'],            nextMission:'Módulo 1 incompleto',   note:'⚠️ Sin actividad 5 días. Se recomienda contactar padres.', missions:[]},
  ];

  get rows() {
    return this.all.filter(s =>
      (this.filt==='Todos' || s.status===this.filt) &&
      s.n.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  constructor(private router: Router) {}

  openStudent(s: any) { this.selected = s; }
  closeModal() { this.selected = null; }

  msgStudent(s: any) {
    this.closeModal();
    this.router.navigate(['/teacher/messages'], { queryParams: { to: s.n } });
  }

  assignMission(s: any) {
    this.closeModal();
    this.router.navigate(['/teacher/create'], { queryParams: { for: s.n } });
  }

  sendAlert(s: any) {
    this.showToast(`⚠️ Alerta enviada a padres de ${s.n.split(' ')[0]}`);
  }

  showToast(msg: string) {
    this.toast = msg;
    setTimeout(() => this.toast = '', 3500);
  }

  pc(p:number){ return p>=80?'var(--ok)':p<60?'var(--danger)':'var(--guinda)'; }
  sc(s:string){ return s==='Excelente'?'tag-oro':s==='Necesita apoyo'?'tag-red':'tag-guinda'; }
}
