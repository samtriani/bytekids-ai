import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';

@Component({ selector:'app-teacher-calendar', standalone:true, imports:[CommonModule, RouterLink, ShellComponent],
  templateUrl:'./calendar.component.html', styleUrls:['./calendar.component.scss']
})
export class CalendarComponent {
  navItems: NavItem[] = [{ label:'Mi Panel', icon:'🏠', route:'/teacher' },{ label:'Mis Salones', icon:'🏫', route:'/teacher/classrooms', badge:3 },{ label:'Alumnos', icon:'👨‍🎓', route:'/teacher/students' },{ label:'Crear Contenido', icon:'📝', route:'/teacher/create' },{ label:'Asistente IA', icon:'🤖', route:'/teacher/ai-assistant', badge:'✨' },{ label:'Reportes', icon:'📊', route:'/teacher/reports' },{ label:'Calendario', icon:'📅', route:'/teacher/calendar' },{ label:'Mensajes', icon:'💬', route:'/teacher/messages', badge:5 }];
  monthName = 'Marzo 2026'; days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  weeks: (number|null)[][] = []; today = 12; selectedDay = 12;
  events: Record<number,any[]> = {
    5:[{ title:'Examen Python 4°A', time:'10:00', color:'#7B1034', type:'exam' }],
    10:[{ title:'Entrega proyecto HTML', time:'15:00', color:'#0A5C8B', type:'task' }],
    12:[{ title:'Clase Robótica 4°A', time:'09:00', color:'#C9A84C', type:'class' }, { title:'Tutoría — Carlos M.', time:'14:00', color:'#B01A1A', type:'meeting' }],
    15:[{ title:'Junta de maestros', time:'16:00', color:'#1B7A3C', type:'meeting' }],
    20:[{ title:'Feria de proyectos', time:'11:00', color:'#7B1034', type:'event' }],
    25:[{ title:'Entrega calificaciones', time:'17:00', color:'#C9A84C', type:'task' }],
  };
  constructor() {
    const startDay=6,totalDays=31; let week:(number|null)[]=Array(startDay).fill(null); const grid:(number|null)[][]=[];
    for(let d=1;d<=totalDays;d++){ week.push(d); if(week.length===7){grid.push(week);week=[];} }
    if(week.length){while(week.length<7)week.push(null);grid.push(week);} this.weeks=grid;
  }
  get selectedEvents() { return this.events[this.selectedDay]||[]; }
  hasEvent(d: number|null) { return d && this.events[d]; }
  typeLabel(t: string) { return {class:'Clase',exam:'Examen',task:'Tarea',meeting:'Reunión',event:'Evento'}[t]||'Otro'; }
}
