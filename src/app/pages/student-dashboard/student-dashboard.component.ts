import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../shared/shell/shell.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements AfterViewInit {
  @ViewChild('xpChart')     xpChart!: ElementRef;
  @ViewChild('skillsChart') skillsChart!: ElementRef;

  navItems: NavItem[] = [
    { label: 'Mi Dashboard',  icon: '🏠', route: '/student' },
    { label: 'Mis Misiones',  icon: '🎯', route: '/student/missions', badge: 3 },
    { label: 'Mi Progreso',   icon: '📈', route: '/student/progress' },
    { label: 'Logros',        icon: '🏆', route: '/student/achievements' },
    { label: 'Tutor IA',      icon: '🤖', route: '/student/ai-tutor', badge: '✨' },
    { label: 'Proyectos',     icon: '💻', route: '/student/projects' },
    { label: 'Roblox Studio', icon: '🎮', route: '/student/roblox' },
    { label: 'Comunidad',     icon: '👥', route: '/student/community' },
  ];

  stats = [
    { icon:'⭐', value:'1,250', label:'XP Total',      change:'+180 esta semana', cls:'up',      color:'#06B6D4' },
    { icon:'🎯', value:'14',    label:'Misiones',       change:'3 activas',         cls:'neutral', color:'#7C3AED' },
    { icon:'🏆', value:'7',     label:'Logros',         change:'+2 nuevos',         cls:'up',      color:'#F59E0B' },
    { icon:'🔥', value:'12d',   label:'Racha activa',   change:'¡Sigue así!',       cls:'neutral', color:'#EC4899' },
  ];

  missions = [
    { title:'Variables y Datos',   subject:'Python',       xp:50,  progress:80,  cls:'active', icon:'🐍', color:'#06B6D4' },
    { title:'Mi Primera Web',      subject:'HTML/CSS/JS',  xp:75,  progress:100, cls:'done',   icon:'🌐', color:'#7C3AED' },
    { title:'Juego en Scratch',    subject:'Scratch',      xp:60,  progress:55,  cls:'active', icon:'🧩', color:'#2563EB' },
    { title:'Construye tu ciudad', subject:'Roblox Studio',xp:200, progress:30,  cls:'active', icon:'🎮', color:'#10B981' },
    { title:'Sensor Arduino',      subject:'Robótica',     xp:150, progress:0,   cls:'new',    icon:'🤖', color:'#F59E0B' },
  ];

  achievements = [
    { title:'Primer Código', icon:'⚡', earned:true },
    { title:'Bug Hunter',    icon:'🐛', earned:true },
    { title:'Loop Master',   icon:'🔄', earned:true },
    { title:'Web Wizard',    icon:'🌐', earned:false },
    { title:'Roblox Pro',    icon:'🎮', earned:false },
    { title:'AI Explorer',   icon:'🤖', earned:false },
  ];

  ngAfterViewInit() {
    new Chart(this.xpChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6'],
        datasets: [{ label:'XP', data:[80,145,210,190,290,350], borderColor:'#7C3AED', backgroundColor:'rgba(124,58,237,0.1)', fill:true, tension:.4, pointBackgroundColor:'#7C3AED', pointRadius:5 }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ x:{grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#6B7FBB',font:{family:'Nunito',weight:'bold'}}}, y:{grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#6B7FBB',font:{family:'Nunito',weight:'bold'}}} } }
    });
    new Chart(this.skillsChart.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Python','HTML/CSS','Scratch','Robótica','Roblox','Lógica'],
        datasets: [{ data:[75,45,90,30,35,80], borderColor:'#2563EB', backgroundColor:'rgba(37,99,235,0.15)', pointBackgroundColor:'#2563EB' }]
      },
      options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ r:{ grid:{color:'rgba(255,255,255,0.06)'}, pointLabels:{color:'#6B7FBB',font:{family:'Nunito',size:11,weight:'bold'}}, ticks:{display:false}, suggestedMin:0, suggestedMax:100 } } }
    });
  }
}
