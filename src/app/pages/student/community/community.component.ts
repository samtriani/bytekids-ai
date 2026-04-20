import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';

@Component({ selector:'app-community', standalone:true, imports:[CommonModule, RouterLink, ShellComponent],
  templateUrl:'./community.component.html', styleUrls:['./community.component.scss']
})
export class CommunityComponent {
  navItems: NavItem[] = [
    { label:'Mi Dashboard',  icon:'🏠', route:'/student' }, { label:'Mis Misiones', icon:'🎯', route:'/student/missions', badge:3 },
    { label:'Mi Progreso',   icon:'📈', route:'/student/progress' }, { label:'Logros', icon:'🏆', route:'/student/achievements' },
    { label:'Tutor IA',      icon:'🤖', route:'/student/ai-tutor', badge:'✨' }, { label:'Proyectos', icon:'💻', route:'/student/projects' },
    { label:'Roblox Studio', icon:'🎮', route:'/student/roblox' }, { label:'Comunidad', icon:'👥', route:'/student/community' },
  ];

  posts = [
    { author:'Sofía R.', avatar:'SR', color:'#7C3AED', time:'Hace 1h', subject:'Python', title:'¡Terminé mi calculadora! 🎉', body:'¡Por fin funcionó sin errores! Me tomó 3 días pero lo logré. El truco fue usar try/except para los inputs inválidos.', likes:12, comments:5 },
    { author:'Emilio T.', avatar:'ET', color:'#2563EB', time:'Hace 2h', subject:'Roblox', title:'Mi primer mapa 3D', body:'Construí un laberinto en Roblox Studio. Tardé mucho en entender las partes pero ByteBot me ayudó mucho 🤖', likes:8, comments:3 },
    { author:'Valentina C.', avatar:'VC', color:'#10B981', time:'Ayer', subject:'Scratch', title:'Pregunta sobre sprites', body:'¿Cómo hago para que mi sprite cambie de disfraz cuando toca un objeto? No encuentro el bloque correcto', likes:2, comments:7 },
    { author:'Carlos M.', avatar:'CM', color:'#F59E0B', time:'Ayer', subject:'HTML/CSS', title:'¿Cómo centrar en CSS? 😅', body:'Llevo 1 hora intentando centrar un div. Ya sé que es el meme clásico jaja. Flexbox al rescate', likes:15, comments:9 },
  ];

  topStudents = [
    { name:'Sofía Ramírez', xp:1890, avatar:'SR', color:'#7C3AED', rank:1 },
    { name:'Emilio Torres',  xp:1600, avatar:'ET', color:'#2563EB', rank:2 },
    { name:'Axel Partida',   xp:1250, avatar:'AP', color:'#06B6D4', rank:3 },
    { name:'Valentina Cruz', xp:980,  avatar:'VC', color:'#10B981', rank:4 },
    { name:'Mariana López',  xp:840,  avatar:'ML', color:'#EC4899', rank:5 },
  ];
  liked: Set<number> = new Set();
  toggleLike(i: number) { this.liked.has(i)?this.liked.delete(i):this.liked.add(i); }
}
