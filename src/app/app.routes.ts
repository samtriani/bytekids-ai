import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
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

const GUARDED = { canActivate: [authGuard] };

export const routes: Routes = [
  // Public
  { path: 'login',  component: LoginComponent },
  { path: '',       redirectTo: 'login', pathMatch: 'full' },

  // Portal (role selector) — guarded
  { path: 'portal', component: PortalComponent, ...GUARDED },

  // Legacy landing
  { path: 'landing', component: LandingComponent, ...GUARDED },

  // Student routes — guarded
  { path: 'student',              component: StudentDashboardComponent, ...GUARDED },
  { path: 'student/missions',     component: MissionsComponent,         ...GUARDED },
  { path: 'student/progress',     component: ProgressComponent,         ...GUARDED },
  { path: 'student/achievements', component: AchievementsComponent,     ...GUARDED },
  { path: 'student/ai-tutor',     component: AiTutorComponent,          ...GUARDED },
  { path: 'student/projects',     component: ProjectsComponent,         ...GUARDED },
  { path: 'student/roblox',       component: RobloxComponent,           ...GUARDED },
  { path: 'student/community',    component: CommunityComponent,        ...GUARDED },

  // Teacher routes — guarded
  { path: 'teacher',               component: TeacherDashboardComponent, ...GUARDED },
  { path: 'teacher/classrooms',    component: TClassrooms,               ...GUARDED },
  { path: 'teacher/students',      component: TStudents,                 ...GUARDED },
  { path: 'teacher/create',        component: CreateContentComponent,    ...GUARDED },
  { path: 'teacher/ai-assistant',  component: TAiAssist,                 ...GUARDED },
  { path: 'teacher/reports',       component: ReportsComponent,          ...GUARDED },
  { path: 'teacher/calendar',      component: TCalendar,                 ...GUARDED },
  { path: 'teacher/messages',      component: TMessages,                 ...GUARDED },

  // Parent routes — guarded
  { path: 'parent',                component: ParentDashboardComponent,  ...GUARDED },
  { path: 'parent/children',       component: ChildrenComponent,         ...GUARDED },
  { path: 'parent/progress',       component: PProgress,                 ...GUARDED },
  { path: 'parent/achievements',   component: PAchiev,                   ...GUARDED },
  { path: 'parent/messages',       component: PMessages,                 ...GUARDED },
  { path: 'parent/calendar',       component: PCalendar,                 ...GUARDED },
  { path: 'parent/ai-assistant',   component: PAiAssist,                 ...GUARDED },

  // Admin routes — guarded
  { path: 'admin',                 component: AdminDashboardComponent,   ...GUARDED },
  { path: 'admin/classrooms',      component: AClassrooms,               ...GUARDED },
  { path: 'admin/teachers',        component: TeachersComponent,         ...GUARDED },
  { path: 'admin/students',        component: AStudents,                 ...GUARDED },
  { path: 'admin/ai-reports',      component: AiReportsComponent,        ...GUARDED },
  { path: 'admin/subjects',        component: SubjectsComponent,         ...GUARDED },
  { path: 'admin/metrics',         component: MetricsComponent,          ...GUARDED },

  { path: '**', redirectTo: 'login' }
];
