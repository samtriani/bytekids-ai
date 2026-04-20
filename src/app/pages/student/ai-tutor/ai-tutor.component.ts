import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ShellComponent, NavItem } from '../../../shared/shell/shell.component';
import { AiTutorService, ChatMessage } from '../../../services/ai-tutor.service';

@Component({
  selector: 'app-ai-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ShellComponent],
  templateUrl: './ai-tutor.component.html',
  styleUrls: ['./ai-tutor.component.scss']
})
export class AiTutorComponent implements AfterViewChecked {
  @ViewChild('chatEnd') chatEnd!: ElementRef;
  @ViewChild('inputRef') inputRef!: ElementRef;

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

  messages: ChatMessage[] = [
    {
      role: 'assistant',
      content: '¡Hola! Soy ByteBot, tu tutor de IA de ByteKids Academy 🤖✨\n\n¿En qué te puedo ayudar hoy? Puedo explicarte Python, Scratch, HTML, Robótica, Roblox Studio, o cualquier materia escolar que necesites.\n\n¡No hay preguntas tontas! Todos somos estudiantes. 🚀',
      timestamp: new Date()
    }
  ];

  userInput = '';
  isLoading = false;
  shouldScroll = false;

  quickQuestions = [
    '¿Qué es una variable en Python? 🐍',
    '¿Cómo hago un bucle for? 🔄',
    '¿Cómo inicio en Roblox Studio? 🎮',
    '¿Qué es HTML? 🌐',
    'Ayúdame con mi tarea de Scratch 🧩',
    '¿Cómo programo un Arduino? 🤖',
  ];

  constructor(private aiService: AiTutorService) {}

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  scrollToBottom() {
    try { this.chatEnd.nativeElement.scrollIntoView({ behavior: 'smooth' }); } catch {}
  }

  async send(text?: string) {
    const msg = (text || this.userInput).trim();
    if (!msg || this.isLoading) return;

    this.messages.push({ role: 'user', content: msg, timestamp: new Date() });
    this.userInput = '';
    this.isLoading = true;
    this.shouldScroll = true;

    try {
      const reply = await this.aiService.sendMessage(this.messages.slice(0, -1), 'student', msg);
      this.messages.push({ role: 'assistant', content: reply, timestamp: new Date() });
    } catch {
      this.messages.push({ role: 'assistant', content: '¡Ups! Algo salió mal. Inténtalo de nuevo 🔧', timestamp: new Date() });
    }
    this.isLoading = false;
    this.shouldScroll = true;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); this.send(); }
  }

  clearChat() {
    this.messages = [this.messages[0]];
  }

  formatMessage(content: string): string {
    return content
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }
}
