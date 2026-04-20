import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AppUser {
  username: string;
  displayName: string;
  role: 'admin';
  initials: string;
  panels: string[];
}

const USERS: Record<string, { password: string; user: AppUser }> = {
  'samuel.partida': {
    password: '4dmin.Edomex#',
    user: {
      username: 'samuel.partida',
      displayName: 'Samuel Partida',
      role: 'admin',
      initials: 'SP',
      panels: ['alumno', 'maestro', 'padre', 'director'],
    }
  }
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
