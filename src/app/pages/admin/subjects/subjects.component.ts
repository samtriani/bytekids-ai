import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
const NAV: NavItem[] = [{label:"Panel Ejecutivo",icon:"🏫",route:"/admin"},{label:"Salones",icon:"🎓",route:"/admin/classrooms"},{label:"Maestros",icon:"👩‍🏫",route:"/admin/teachers"},{label:"Estudiantes",icon:"👨‍🎓",route:"/admin/students"},{label:"Reportes IA",icon:"🤖",route:"/admin/ai-reports",badge:"IA"},{label:"Materias",icon:"📚",route:"/admin/subjects"},{label:"Métricas",icon:"📊",route:"/admin/metrics"}];
@Component({ selector:'app-admin-subjects', standalone:true, imports:[CommonModule,RouterLink,ShellComponent],
  templateUrl:'./subjects.component.html', styleUrls:['./subjects.component.scss']
})
export class SubjectsComponent {
  navItems = NAV;
  subjects = [
    {name:'Python',       icon:'🐍',students:45,missions:180,eng:88,diff:'Intermedio',cls:['4°A','5°A'],         desc:'Variables, funciones y programación orientada a objetos'},
    {name:'Scratch',      icon:'🧩',students:60,missions:240,eng:95,diff:'Básico',    cls:['2°A','3°B','4°A'],   desc:'Programación visual con bloques — ideal para primeros pasos'},
    {name:'HTML/CSS/JS',  icon:'🌐',students:40,missions:160,eng:82,diff:'Intermedio',cls:['2°A','4°A'],         desc:'Desarrollo web front-end con tecnologías estándar'},
    {name:'Robótica',     icon:'🤖',students:30,missions:120,eng:91,diff:'Avanzado',  cls:['3°B'],               desc:'Arduino y sensores — programación física del mundo real'},
    {name:'Roblox Studio',icon:'🎮',students:35,missions:140,eng:97,diff:'Intermedio',cls:['5°A'],               desc:'Creación de videojuegos con Lua y motor Roblox'},
    {name:'Arte Digital', icon:'🎨',students:25,missions:80, eng:85,diff:'Básico',    cls:['2°A'],               desc:'Diseño e ilustración digital — creatividad con tecnología'},
    {name:'Matemáticas IA',icon:'📐',students:50,missions:200,eng:78,diff:'Todos',   cls:['3°B','4°A','5°A'],   desc:'Matemáticas aplicadas mediante proyectos de programación'},
  ];
  ec(v:number){ return v>=90?'var(--ok)':v>=80?'var(--guinda)':'var(--tx3)'; }
  dc(d:string){ return {Básico:'var(--ok)',Intermedio:'var(--info)',Avanzado:'var(--guinda)',Todos:'var(--oro)'}[d]||'var(--tx3)'; }
}
