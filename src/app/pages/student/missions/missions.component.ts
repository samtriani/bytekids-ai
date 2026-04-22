import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
import { MissionStateService } from '../../../services/mission-state.service';

@Component({ selector: 'app-missions', standalone: true, imports: [CommonModule, RouterLink, ShellComponent],
  templateUrl: './missions.component.html', styleUrls: ['./missions.component.scss'] })
export class MissionsComponent {
  constructor(private router: Router, private missionState: MissionStateService) {}

  navItems: NavItem[] = [
    { label:'Mi Dashboard', icon:'🏠', route:'/student' },
    { label:'Mis Misiones', icon:'🎯', route:'/student/missions', badge:3 },
    { label:'Mi Progreso',  icon:'📈', route:'/student/progress' },
    { label:'Logros',       icon:'🏆', route:'/student/achievements' },
    { label:'Tutor IA',     icon:'🤖', route:'/student/ai-tutor', badge:'✨' },
    { label:'Proyectos',    icon:'💻', route:'/student/projects' },
    { label:'Roblox Studio',icon:'🎮', route:'/student/roblox' },
    { label:'Comunidad',    icon:'👥', route:'/student/community' },
  ];

  activeFilter = 'Todas';
  filters = ['Todas', 'Python', 'HTML/CSS', 'Scratch', 'Robótica', 'Roblox'];

  missions = [
    { title:'Variables y Datos', subject:'Python', xp:50, progress:80, status:'En progreso', icon:'🐍', color:'#06B6D4', difficulty:'Fácil', time:'30 min', locked:false },
    { title:'Condicionales IF/ELSE', subject:'Python', xp:75, progress:0, status:'Disponible', icon:'🐍', color:'#06B6D4', difficulty:'Medio', time:'45 min', locked:false },
    { title:'Bucles For', subject:'Python', xp:100, progress:0, status:'Bloqueado', icon:'🐍', color:'#06B6D4', difficulty:'Medio', time:'60 min', locked:true },
    { title:'Mi Primera Web', subject:'HTML/CSS', xp:75, progress:100, status:'Completado', icon:'🌐', color:'#7C3AED', difficulty:'Fácil', time:'40 min', locked:false },
    { title:'Estilos CSS', subject:'HTML/CSS', xp:80, progress:45, status:'En progreso', icon:'🌐', color:'#7C3AED', difficulty:'Medio', time:'50 min', locked:false },
    { title:'Juego de Plataformas', subject:'Scratch', xp:120, progress:55, status:'En progreso', icon:'🧩', color:'#2563EB', difficulty:'Difícil', time:'90 min', locked:false },
    { title:'Controla el LED', subject:'Robótica', xp:100, progress:0, status:'Disponible', icon:'🤖', color:'#F59E0B', difficulty:'Medio', time:'60 min', locked:false },
    { title:'Construye tu ciudad', subject:'Roblox Studio', xp:200, progress:30, status:'En progreso', icon:'🎮', color:'#10B981', difficulty:'Difícil', time:'2 hrs', locked:false },
  ];

  getMission(m: any) {
    const saved = this.missionState.get(m.title);
    return saved ? { ...m, ...saved } : m;
  }

  get filtered() {
    const base = this.activeFilter === 'Todas' ? this.missions : this.missions.filter(m => m.subject.includes(this.activeFilter));
    return base.map(m => this.getMission(m));
  }
  setFilter(f: string) { this.activeFilter = f; }

  startMission(m: { title: string; subject: string; status: string; locked: boolean }) {
    if (m.locked) return;
    const action = m.status === 'En progreso' ? 'Continuar' : m.status === 'Completado' ? 'Repasar' : 'Empezar';
    const q = `${action} misión: "${m.title}" de ${m.subject}. Ayúdame con esta misión.`;
    this.router.navigate(['/student/ai-tutor'], { queryParams: { q } });
  }
}
