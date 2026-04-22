import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, AppUser } from '../../services/auth.service';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent {
  user!: AppUser;
  panels: typeof ALL_PANELS = [];

  constructor(private auth: AuthService, private router: Router) {
    const u = this.auth.getUser();
    if (!u) { this.router.navigate(['/login']); return; }
    this.user = u;

    this.panels = ALL_PANELS.filter(p => u.panels.includes(p.id));

    if (this.panels.length === 1) {
      this.router.navigate([this.panels[0].route]);
    }
  }

  go(route: string) { this.router.navigate([route]); }

  logout() { this.auth.logout(); }
}

const ALL_PANELS = [
  {
    id: 'alumno', label: 'Panel Alumno', icon: '🎓',
    desc: 'Misiones, progreso, logros y Tutor IA',
    route: '/student', color: '#7A1535', badge: 'Axel Partida',
    stats: ['14 misiones', '78% progreso', 'Nivel 5']
  },
  {
    id: 'maestro', label: 'Panel Maestro', icon: '👩‍🏫',
    desc: 'Salones, alumnos, reportes y calendario',
    route: '/teacher', color: '#0A4D7A', badge: 'Salón 4°A',
    stats: ['22 alumnos', '70% promedio', '3 salones']
  },
  {
    id: 'padre', label: 'Panel Padre', icon: '👪',
    desc: 'Seguimiento de hijos, mensajes y logros',
    route: '/parent', color: '#1A6B3C', badge: 'Axel & Antonella',
    stats: ['2 hijos', '78% / 45%', '6 logros']
  },
  {
    id: 'director', label: 'Panel Director', icon: '🏛️',
    desc: 'Métricas institucionales, maestros y IA',
    route: '/admin', color: '#C4992A', badge: 'ByteKids Academy',
    stats: ['85 alumnos', '76% promedio', 'Reporte IA']
  },
];
