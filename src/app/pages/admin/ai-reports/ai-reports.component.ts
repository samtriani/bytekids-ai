import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
import { AiTutorService, ChatMessage } from '../../../services/ai-tutor.service';

@Component({ selector: 'app-ai-reports', standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ShellComponent],
  templateUrl: './ai-reports.component.html', styleUrls: ['./ai-reports.component.scss']
})
export class AiReportsComponent implements AfterViewChecked {
  @ViewChild('chatEnd') chatEnd!: ElementRef;

  navItems: NavItem[] = [
    { label:'Dashboard Ejecutivo', icon:'🏫', route:'/admin' },
    { label:'Todos los Salones',   icon:'🎓', route:'/admin/classrooms' },
    { label:'Maestros',            icon:'👩‍🏫', route:'/admin/teachers' },
    { label:'Estudiantes',         icon:'👨‍🎓', route:'/admin/students' },
    { label:'Reportes IA',         icon:'🤖', route:'/admin/ai-reports', badge:'✨' },
    { label:'Materias',            icon:'📚', route:'/admin/subjects' },
    { label:'Métricas',            icon:'📊', route:'/admin/metrics' },
    { label:'Configuración',       icon:'⚙️', route:'/admin/settings' },
  ];

  schoolData = {
    totalStudents: 85, avgProgress: 76, totalTeachers: 4, completedMissions: 1840,
    topClass: '2°A (88%)', needsAttention: '5°A (62%)', activeStreak: 42
  };

  messages: ChatMessage[] = [{
    role: 'assistant',
    content: `¡Buen día! Soy el Analista Ejecutivo IA de ByteKids Academy 📊\n\nResumen de hoy:\n• **85 alumnos activos** — +12 este mes\n• **Promedio escolar: 76%** — ↑ +5% vs mes anterior\n• **1,840 misiones completadas** — esta semana\n• **Alerta:** 5°A requiere atención (62% promedio)\n\n¿Qué análisis o reporte necesitas hoy?`,
    timestamp: new Date()
  }];

  userInput = ''; isLoading = false; shouldScroll = false;

  quickPrompts = [
    '📊 Genera reporte ejecutivo completo de la escuela',
    '⚠️ ¿Qué salones están en riesgo de rezago?',
    '🏆 ¿Qué materias tienen mayor engagement?',
    '👩‍🏫 Análisis de desempeño de maestros',
    '📈 Proyección de rendimiento próximo mes',
    '🇲🇽 Estrategia para expandir a más escuelas',
  ];

  constructor(private aiService: AiTutorService) {}
  ngAfterViewChecked() { if(this.shouldScroll){try{this.chatEnd.nativeElement.scrollIntoView({behavior:'smooth'});}catch{}this.shouldScroll=false;} }

  async send(text?: string) {
    const msg = (text || this.userInput).trim();
    if (!msg || this.isLoading) return;
    const contextualMsg = `Datos de la escuela: ${JSON.stringify(this.schoolData)}. Consulta: ${msg}`;
    this.messages.push({role:'user', content:msg, timestamp:new Date()});
    this.userInput=''; this.isLoading=true; this.shouldScroll=true;
    try {
      const reply = await this.aiService.sendMessage(this.messages.slice(0,-1), 'admin', contextualMsg);
      this.messages.push({role:'assistant', content:reply, timestamp:new Date()});
    } catch { this.messages.push({role:'assistant', content:'Error al conectar con el servidor de IA.', timestamp:new Date()}); }
    this.isLoading=false; this.shouldScroll=true;
  }
  onKeydown(e: KeyboardEvent) { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();this.send();} }
  formatMessage(c: string) { return c.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>'); }
  clearChat() { this.messages = [this.messages[0]]; }
}
