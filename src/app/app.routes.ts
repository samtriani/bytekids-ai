import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { LoginComponent } from './pages/login/login.component';
import { PortalComponent } from './pages/portal/portal.component';
import { LandingComponent } from './pages/landing/landing.component';

// Student
import { StudentDashboardComponent } from './pages/student-dashboard/student-dashboard.component';
import { MissionsComponent }    from './pages/student/missions/missions.component';
import { ProgressComponent }    from './pages/student/progress/progress.component';
import { AchievementsComponent } from './pages/student/achievements/achievements.component';
import { AiTutorComponent }     from './pages/student/ai-tutor/ai-tutor.component';
import { ProjectsComponent }    from './pages/student/projects/projects.component';
import { RobloxComponent }      from './pages/student/roblox/roblox.component';
import { CommunityComponent }   from './pages/student/community/community.component';

// Teacher
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { ClassroomsComponent as TClassrooms } from './pages/teacher/classrooms/classrooms.component';
import { StudentsComponent as TStudents }     from './pages/teacher/students/students.component';
import { CreateContentComponent }             from './pages/teacher/create-content/create-content.component';
import { AiAssistantComponent as TAiAssist }  from './pages/teacher/ai-assistant/ai-assistant.component';
import { ReportsComponent }                   from './pages/teacher/reports/reports.component';
import { CalendarComponent as TCalendar }     from './pages/teacher/calendar/calendar.component';
import { MessagesComponent as TMessages }     from './pages/teacher/messages/messages.component';

// Parent
import { ParentDashboardComponent } from './pages/parent-dashboard/parent-dashboard.component';
import { ChildrenComponent }                  from './pages/parent/children/children.component';
import { ProgressComponent as PProgress }     from './pages/parent/progress/progress.component';
import { AchievementsComponent as PAchiev }   from './pages/parent/achievements/achievements.component';
import { MessagesComponent as PMessages }     from './pages/parent/messages/messages.component';
import { CalendarComponent as PCalendar }     from './pages/parent/calendar/calendar.component';
import { AiAssistantComponent as PAiAssist }  from './pages/parent/ai-assistant/ai-assistant.component';

// Admin
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ClassroomsComponent as AClassrooms } from './pages/admin/classrooms/classrooms.component';
import { TeachersComponent }                  from './pages/admin/teachers/teachers.component';
import { StudentsComponent as AStudents }     from './pages/admin/students/students.component';
import { AiReportsComponent }                 from './pages/admin/ai-reports/ai-reports.component';
import { SubjectsComponent }                  from './pages/admin/subjects/subjects.component';
import { MetricsComponent }                   from './pages/admin/metrics/metrics.component';

const AUTH   = [authGuard];
const STUDENT = [authGuard, roleGuard(['alumno'])];
const TEACHER = [authGuard, roleGuard(['maestro'])];
const PARENT  = [authGuard, roleGuard(['padre'])];
const ADMIN   = [authGuard, roleGuard(['director'])];

export const routes: Routes = [
  // Public
  { path: 'login',  component: LoginComponent },
  { path: '',       redirectTo: 'login', pathMatch: 'full' },

  // Portal (role selector)
  { path: 'portal',  component: PortalComponent,  canActivate: AUTH },
  { path: 'landing', component: LandingComponent, canActivate: AUTH },

  // Student routes
  { path: 'student',              component: StudentDashboardComponent, canActivate: STUDENT },
  { path: 'student/missions',     component: MissionsComponent,         canActivate: STUDENT },
  { path: 'student/progress',     component: ProgressComponent,         canActivate: STUDENT },
  { path: 'student/achievements', component: AchievementsComponent,     canActivate: STUDENT },
  { path: 'student/ai-tutor',     component: AiTutorComponent,          canActivate: STUDENT },
  { path: 'student/projects',     component: ProjectsComponent,         canActivate: STUDENT },
  { path: 'student/roblox',       component: RobloxComponent,           canActivate: STUDENT },
  { path: 'student/community',    component: CommunityComponent,        canActivate: STUDENT },

  // Teacher routes
  { path: 'teacher',               component: TeacherDashboardComponent, canActivate: TEACHER },
  { path: 'teacher/classrooms',    component: TClassrooms,               canActivate: TEACHER },
  { path: 'teacher/students',      component: TStudents,                 canActivate: TEACHER },
  { path: 'teacher/create',        component: CreateContentComponent,    canActivate: TEACHER },
  { path: 'teacher/ai-assistant',  component: TAiAssist,                 canActivate: TEACHER },
  { path: 'teacher/reports',       component: ReportsComponent,          canActivate: TEACHER },
  { path: 'teacher/calendar',      component: TCalendar,                 canActivate: TEACHER },
  { path: 'teacher/messages',      component: TMessages,                 canActivate: TEACHER },

  // Parent routes
  { path: 'parent',                component: ParentDashboardComponent,  canActivate: PARENT },
  { path: 'parent/children',       component: ChildrenComponent,         canActivate: PARENT },
  { path: 'parent/progress',       component: PProgress,                 canActivate: PARENT },
  { path: 'parent/achievements',   component: PAchiev,                   canActivate: PARENT },
  { path: 'parent/messages',       component: PMessages,                 canActivate: PARENT },
  { path: 'parent/calendar',       component: PCalendar,                 canActivate: PARENT },
  { path: 'parent/ai-assistant',   component: PAiAssist,                 canActivate: PARENT },

  // Admin routes
  { path: 'admin',                 component: AdminDashboardComponent,   canActivate: ADMIN },
  { path: 'admin/classrooms',      component: AClassrooms,               canActivate: ADMIN },
  { path: 'admin/teachers',        component: TeachersComponent,         canActivate: ADMIN },
  { path: 'admin/students',        component: AStudents,                 canActivate: ADMIN },
  { path: 'admin/ai-reports',      component: AiReportsComponent,        canActivate: ADMIN },
  { path: 'admin/subjects',        component: SubjectsComponent,         canActivate: ADMIN },
  { path: 'admin/metrics',         component: MetricsComponent,          canActivate: ADMIN },

  { path: '**', redirectTo: 'login' }
];
