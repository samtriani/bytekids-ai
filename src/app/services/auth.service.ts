import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'admin' | 'student' | 'teacher' | 'parent';

export interface AppUser {
  username: string;
  displayName: string;
  role: UserRole;
  initials: string;
  panels: string[];
}

const USERS: Record<string, { password: string; user: AppUser }> = {
  'samuel.partida': {
    password: '4dmin.ByteKids#',
    user: {
      username: 'samuel.partida',
      displayName: 'Samuel Partida',
      role: 'admin',
      initials: 'SP',
      panels: ['alumno', 'maestro', 'padre', 'director'],
    }
  },
  'yamileth': {
    password: '4dmin.ByteKids#',
    user: {
      username: 'yamileth',
      displayName: 'Yamileth',
      role: 'admin',
      initials: 'SP',
      panels: ['alumno', 'maestro', 'padre', 'director'],
    }
  },
  'monserrat.navarro': {
    password: '4dmin.ByteKids#',
    user: {
      username: 'monserrat.navarro',
      displayName: 'Monserrat Navarro',
      role: 'admin',
      initials: 'MN',
      panels: ['alumno', 'maestro', 'padre', 'director'],
    }
  },
  'axel.partida': {
    password: 'alumno123',
    user: {
      username: 'axel.partida',
      displayName: 'Axel Partida',
      role: 'student',
      initials: 'AP',
      panels: ['alumno'],
    }
  },
  'prof.yamileth': {
    password: 'maestro123',
    user: {
      username: 'prof.yamileth',
      displayName: 'Profra. Yamileth',
      role: 'teacher',
      initials: 'PM',
      panels: ['maestro'],
    }
  },
  'jose.partida': {
    password: 'padre123',
    user: {
      username: 'jose.partida',
      displayName: 'José Partida',
      role: 'parent',
      initials: 'JP',
      panels: ['padre'],
    }
  },
};

const SESSION_KEY = 'bk_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): { ok: boolean; error?: string } {
    const entry = USERS[username.trim().toLowerCase()];
    if (!entry) return { ok: false, error: 'Usuario no encontrado' };
    if (entry.password !== password) return { ok: false, error: 'Contraseña incorrecta' };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(entry.user));
    return { ok: true };
  }

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/login']);
  }

  getUser(): AppUser | null {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
