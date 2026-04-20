import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';

@Component({ selector:'app-achievements', standalone:true, imports:[CommonModule, RouterLink, ShellComponent],
  templateUrl:'./achievements.component.html', styleUrls:['./achievements.component.scss']
})
export class AchievementsComponent {
  navItems: NavItem[] = [
    { label:'Mi Dashboard',  icon:'🏠', route:'/student' },
    { label:'Mis Misiones',  icon:'🎯', route:'/student/missions', badge:3 },
    { label:'Mi Progreso',   icon:'📈', route:'/student/progress' },
    { label:'Logros',        icon:'🏆', route:'/student/achievements' },
    { label:'Tutor IA',      icon:'🤖', route:'/student/ai-tutor', badge:'✨' },
    { label:'Proyectos',     icon:'💻', route:'/student/projects' },
    { label:'Roblox Studio', icon:'🎮', route:'/student/roblox' },
    { label:'Comunidad',     icon:'👥', route:'/student/community' },
  ];

  categories = ['Todos','Programación','Racha','Proyectos','Social','Especial'];
  activeCategory = 'Todos';

  achievements = [
    { title:'Primer Código',    icon:'⚡', desc:'Completaste tu primera misión de programación', xp:25,  earned:true,  category:'Programación', date:'10 Ene', rarity:'Común' },
    { title:'Bug Hunter',       icon:'🐛', desc:'Encontraste y corregiste 5 errores en tu código', xp:50,  earned:true,  category:'Programación', date:'18 Ene', rarity:'Poco común' },
    { title:'Loop Master',      icon:'🔄', desc:'Usaste bucles en 10 misiones diferentes', xp:75,  earned:true,  category:'Programación', date:'25 Ene', rarity:'Poco común' },
    { title:'Racha 7 días',     icon:'🔥', desc:'Estudió 7 días consecutivos sin parar', xp:100, earned:true,  category:'Racha', date:'01 Feb', rarity:'Raro' },
    { title:'Racha 30 días',    icon:'💎', desc:'Estudió 30 días consecutivos', xp:300, earned:false, category:'Racha', date:null, rarity:'Épico' },
    { title:'Web Wizard',       icon:'🌐', desc:'Completó todas las misiones de HTML/CSS', xp:120, earned:false, category:'Programación', date:null, rarity:'Raro' },
    { title:'Roblox Creator',   icon:'🎮', desc:'Publicó su primer juego en Roblox Studio', xp:200, earned:false, category:'Proyectos', date:null, rarity:'Épico' },
    { title:'Team Player',      icon:'🤝', desc:'Ayudó a 3 compañeros en la comunidad', xp:80,  earned:false, category:'Social', date:null, rarity:'Poco común' },
    { title:'Python Pro',       icon:'🐍', desc:'Alcanzó el nivel 5 en Python', xp:150, earned:false, category:'Programación', date:null, rarity:'Raro' },
    { title:'AI Explorer',      icon:'🤖', desc:'Tuvo 20 conversaciones con ByteBot', xp:60,  earned:false, category:'Especial', date:null, rarity:'Común' },
    { title:'Top Estudiante',   icon:'🌟', desc:'Quedó en el top 10 del ranking mensual', xp:500, earned:false, category:'Especial', date:null, rarity:'Legendario' },
    { title:'Robot Builder',    icon:'⚙️', desc:'Completó el proyecto de robótica completo', xp:180, earned:false, category:'Proyectos', date:null, rarity:'Épico' },
  ];

  rarityColor: Record<string,string> = { 'Común':'#6B7FBB', 'Poco común':'#10B981', 'Raro':'#2563EB', 'Épico':'#7C3AED', 'Legendario':'#F59E0B' };

  get filtered() {
    if (this.activeCategory === 'Todos') return this.achievements;
    return this.achievements.filter(a => a.category === this.activeCategory);
  }
  get earnedCount() { return this.achievements.filter(a => a.earned).length; }
  get totalXp() { return this.achievements.filter(a => a.earned).reduce((s,a) => s+a.xp, 0); }
}
