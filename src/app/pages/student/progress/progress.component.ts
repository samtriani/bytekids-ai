import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({ selector: 'app-student-progress', standalone: true,
  imports: [CommonModule, RouterLink, ShellComponent],
  templateUrl: './progress.component.html', styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements AfterViewInit {
  @ViewChild('xpLine')   xpLine!: ElementRef;
  @ViewChild('skillBar') skillBar!: ElementRef;
  @ViewChild('subjectPie') subjectPie!: ElementRef;

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

  skillProgress = [
    { name:'Python',        icon:'🐍', level:3, pct:75, color:'#06B6D4', xp:620 },
    { name:'HTML/CSS/JS',   icon:'🌐', level:2, pct:45, color:'#7C3AED', xp:380 },
    { name:'Scratch',       icon:'🧩', level:4, pct:90, color:'#2563EB', xp:810 },
    { name:'Robótica',      icon:'🤖', level:1, pct:30, color:'#F59E0B', xp:210 },
    { name:'Roblox Studio', icon:'🎮', level:2, pct:35, color:'#10B981', xp:290 },
    { name:'Lógica',        icon:'🧠', level:3, pct:80, color:'#EC4899', xp:680 },
  ];

  weekActivity = [
    { day:'L', active:true, missions:2, xp:80 },
    { day:'M', active:true, missions:3, xp:145 },
    { day:'X', active:false, missions:0, xp:0 },
    { day:'J', active:true, missions:2, xp:95 },
    { day:'V', active:true, missions:4, xp:180 },
    { day:'S', active:true, missions:1, xp:60 },
    { day:'D', active:false, missions:0, xp:0 },
  ];

  ngAfterViewInit() {
    new Chart(this.xpLine.nativeElement, {
      type:'line', data:{ labels:['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'],
        datasets:[{label:'XP', data:[80,145,210,190,290,350,420,385], borderColor:'#7C3AED', backgroundColor:'rgba(124,58,237,0.1)', fill:true, tension:.4, pointBackgroundColor:'#7C3AED', pointRadius:5}]},
      options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{x:{grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#6B7FBB',font:{family:'Nunito',weight:'bold'}}}, y:{grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#6B7FBB',font:{family:'Nunito',weight:'bold'}}}}}
    });
    new Chart(this.skillBar.nativeElement, {
      type:'bar', data:{ labels:['Python','HTML/CSS','Scratch','Robótica','Roblox','Lógica'],
        datasets:[{label:'Nivel %', data:[75,45,90,30,35,80], backgroundColor:['#06B6D4','#7C3AED','#2563EB','#F59E0B','#10B981','#EC4899'], borderRadius:8}]},
      options:{responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{x:{grid:{display:false}, ticks:{color:'#6B7FBB',font:{family:'Nunito',weight:'bold'}}}, y:{grid:{color:'rgba(255,255,255,0.04)'}, ticks:{color:'#6B7FBB',font:{family:'Nunito',weight:'bold'}}, max:100}}}
    });
    new Chart(this.subjectPie.nativeElement, {
      type:'doughnut', data:{ labels:['Python','HTML/CSS','Scratch','Robótica','Roblox','Lógica'],
        datasets:[{data:[620,380,810,210,290,680], backgroundColor:['#06B6D4','#7C3AED','#2563EB','#F59E0B','#10B981','#EC4899'], borderWidth:0}]},
      options:{responsive:true, maintainAspectRatio:false, cutout:'68%',
        plugins:{legend:{position:'right', labels:{color:'#6B7FBB', font:{family:'Nunito',weight:'bold'}, padding:8, boxWidth:10}}}}
    });
  }
}
