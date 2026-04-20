import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';

@Component({ selector:'app-projects', standalone:true, imports:[CommonModule, RouterLink, ShellComponent],
  templateUrl:'./projects.component.html', styleUrls:['./projects.component.scss']
})
export class ProjectsComponent {
  navItems: NavItem[] = [
    { label:'Mi Dashboard',  icon:'🏠', route:'/student' }, { label:'Mis Misiones', icon:'🎯', route:'/student/missions', badge:3 },
    { label:'Mi Progreso',   icon:'📈', route:'/student/progress' }, { label:'Logros', icon:'🏆', route:'/student/achievements' },
    { label:'Tutor IA',      icon:'🤖', route:'/student/ai-tutor', badge:'✨' }, { label:'Proyectos', icon:'💻', route:'/student/projects' },
    { label:'Roblox Studio', icon:'🎮', route:'/student/roblox' }, { label:'Comunidad', icon:'👥', route:'/student/community' },
  ];

  myProjects = [
    { title:'Mi Primera Web', subject:'HTML/CSS', icon:'🌐', color:'#7C3AED', status:'Completado', desc:'Una página personal con mi nombre, foto y hobbies.', xp:120, date:'20 Ene' },
    { title:'Calculadora Python', subject:'Python', icon:'🐍', color:'#06B6D4', status:'En progreso', desc:'Calculadora que suma, resta, multiplica y divide.', xp:150, date:'En curso' },
    { title:'Juego de Carreras', subject:'Scratch', icon:'🧩', color:'#2563EB', status:'En progreso', desc:'Un juego donde dos coches compiten en una pista.', xp:200, date:'En curso' },
  ];

  ideaProjects = [
    { title:'Chatbot de tareas', subject:'Python', icon:'🤖', color:'#EC4899', desc:'Un bot que responde preguntas de matemáticas', xp:300, difficulty:'Difícil' },
    { title:'Portafolio web', subject:'HTML/CSS/JS', icon:'🌐', color:'#7C3AED', desc:'Muestra todos tus proyectos en una web bonita', xp:250, difficulty:'Medio' },
    { title:'Simulador de vida', subject:'Roblox Studio', icon:'🎮', color:'#10B981', desc:'Tu propio juego de simulación en Roblox', xp:400, difficulty:'Difícil' },
    { title:'Sensor de temperatura', subject:'Robótica', icon:'🌡️', color:'#F59E0B', desc:'Mide la temperatura del salón con Arduino', xp:180, difficulty:'Medio' },
  ];
}
