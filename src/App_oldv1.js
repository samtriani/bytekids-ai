import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, TrendingUp, Award, Calendar, 
  MessageCircle, Activity, Zap, Target, Star,
  ChevronRight, Code, Brain, Sparkles, CheckCircle,
  Clock, ArrowUp, Bell, Settings, LogOut,
  X, Send, Play, Trophy, Flame, Heart, Plus,
  Edit, Trash2, Search, UserPlus, BookMarked, 
  BarChart, DollarSign, Info, Eye, Mail, Phone, 
  MapPin, Save, Users2, GraduationCap, Building,
  TrendingDown, AlertCircle
} from 'lucide-react';

// ============================================================================
// ESTADO GLOBAL
// ============================================================================

const createInitialData = () => ({
  users: {
    teachers: [
      { id: 1, name: "Sam Partida", email: "sam@bytekids.com", groups: [1, 2], students: 12, status: "active", specialties: ["Python", "Scratch"], phone: "6691111111" },
      { id: 2, name: "Laura Mendoza", email: "laura@bytekids.com", groups: [3], students: 6, status: "active", specialties: ["JavaScript"], phone: "6691111112" },
      { id: 3, name: "Carlos Ruiz", email: "carlos@bytekids.com", groups: [4], students: 6, status: "active", specialties: ["Game Design"], phone: "6691111113" },
    ],
    students: [
      { id: 1, name: "Juan Pérez", email: "juan@email.com", age: 10, groupId: 1, parentId: 1, level: 8, xp: 1250, status: "active" },
      { id: 2, name: "María López", email: "maria@email.com", age: 9, groupId: 1, parentId: 2, level: 7, xp: 980, status: "active" },
      { id: 3, name: "Pedro García", email: "pedro@email.com", age: 8, groupId: 1, parentId: 3, level: 5, xp: 650, status: "active" },
      { id: 4, name: "Sofía Martínez", email: "sofia@email.com", age: 10, groupId: 2, parentId: 4, level: 9, xp: 1450, status: "active" },
      { id: 5, name: "Diego Ramírez", email: "diego@email.com", age: 9, groupId: 2, parentId: 5, level: 6, xp: 820, status: "active" },
      { id: 6, name: "Ana Torres", email: "ana@email.com", age: 8, groupId: 2, parentId: 6, level: 7, xp: 1050, status: "active" },
    ],
    parents: [
      { id: 1, name: "Padre de Juan", email: "padre.juan@email.com", phone: "6691234567", children: [1] },
      { id: 2, name: "Madre de María", email: "madre.maria@email.com", phone: "6691234568", children: [2] },
    ],
  },
  groups: [
    { id: 1, name: "Grupo A - Beginners", teacherId: 1, schedule: "Lun/Mie 4-5pm", students: [1, 2, 3], capacity: 6, topic: "Variables" },
    { id: 2, name: "Grupo B - Beginners", teacherId: 1, schedule: "Lun/Mie 5-6pm", students: [4, 5, 6], capacity: 6, topic: "Loops" },
    { id: 3, name: "Grupo C - Intermediate", teacherId: 2, schedule: "Mar/Jue 4-5pm", students: [], capacity: 6, topic: "Funciones" },
    { id: 4, name: "Grupo D - Advanced", teacherId: 3, schedule: "Mar/Jue 5-6pm", students: [], capacity: 6, topic: "Proyectos" },
  ],
  stats: {
    totalStudents: 18,
    activeStudents: 16,
    totalTeachers: 3,
    totalGroups: 4,
    monthlyRevenue: 10782,
    avgAttendance: 92,
    avgGrade: 8.5,
  }
});

const useAppState = () => {
  const [data, setData] = useState(createInitialData());
  
  const addStudent = (student) => {
    setData(prev => ({
      ...prev,
      users: {
        ...prev.users,
        students: [...prev.users.students, { ...student, id: Date.now(), status: 'active', level: 1, xp: 0 }]
      }
    }));
  };
  
  return { data, addStudent };
};

// ============================================================================
// COMPONENTES COMPARTIDOS
// ============================================================================

const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = value / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count}</span>;
};

const StatCard = ({ icon: Icon, label, value, trend, color = "violet" }) => {
  const colors = {
    violet: "from-violet-500 to-purple-600",
    orange: "from-orange-500 to-amber-600",
    blue: "from-blue-500 to-cyan-600",
    green: "from-green-500 to-emerald-600",
  };
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative">
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${colors[color]} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div className="text-3xl font-bold text-gray-800 mb-1">
          {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
        </div>
        
        <div className="text-sm text-gray-600 mb-3">{label}</div>
        
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-xs">
            <ArrowUp className="w-3 h-3 text-green-500" />
            <span className="text-green-600 font-semibold">+{trend}%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ProgressRing = ({ progress, size = 120 }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="8" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#10b981" strokeWidth="8" fill="none" 
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{progress}%</span>
      </div>
    </div>
  );
};

// ============================================================================
// DASHBOARD COORDINADOR
// ============================================================================

const AdminDashboard = ({ onLogout, appState }) => {
  const { data } = appState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Settings className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Panel de Coordinación</h1>
                <p className="text-sm text-gray-600">ByteKids Academy</p>
              </div>
            </div>
            
            <button onClick={onLogout} className="px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2">
              <LogOut className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} label="Estudiantes Totales" value={data.stats.totalStudents} trend={15} color="violet" />
          <StatCard icon={BookMarked} label="Maestros Activos" value={data.stats.totalTeachers} color="orange" />
          <StatCard icon={Users2} label="Grupos Activos" value={data.stats.totalGroups} color="blue" />
          <StatCard icon={TrendingUp} label="Promedio General" value={`${data.stats.avgGrade}/10`} trend={5} color="green" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6 text-violet-600" />
            Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
              <UserPlus className="w-5 h-5" />
              Agregar Estudiante
            </button>
            <button className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
              <UserPlus className="w-5 h-5" />
              Agregar Maestro
            </button>
            <button className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
              <Plus className="w-5 h-5" />
              Crear Grupo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Estudiantes</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Grupo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nivel</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.users.students.map(student => {
                  const group = data.groups.find(g => g.id === student.groupId);
                  return (
                    <tr key={student.id} className="hover:bg-violet-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-semibold">
                          {group ? group.name : 'Sin asignar'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <span className="font-semibold">{student.level}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Activo
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DASHBOARD DIRECTOR
// ============================================================================

const DirectorDashboard = ({ onLogout, appState }) => {
  const { data } = appState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Panel Directivo</h1>
                <p className="text-sm text-gray-600">Escuela Primaria Benito Juárez</p>
              </div>
            </div>
            
            <button onClick={onLogout} className="px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2">
              <LogOut className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">Escuela Primaria Benito Juárez</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-blue-100 mb-1">Estudiantes</div>
              <div className="text-2xl font-bold">240</div>
            </div>
            <div>
              <div className="text-blue-100 mb-1">Maestros</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div>
              <div className="text-blue-100 mb-1">Grupos</div>
              <div className="text-2xl font-bold">8</div>
            </div>
            <div>
              <div className="text-blue-100 mb-1">Promedio</div>
              <div className="text-2xl font-bold">8.5/10</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} label="Estudiantes Activos" value={16} color="blue" />
          <StatCard icon={BookMarked} label="Maestros Activos" value={3} color="violet" />
          <StatCard icon={TrendingUp} label="Promedio General" value="8.5/10" trend={5} color="green" />
          <StatCard icon={Activity} label="Asistencia" value="92%" trend={3} color="orange" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart className="w-6 h-6 text-blue-600" />
              Indicadores Clave
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Tasa de Completación</span>
                  <span className="text-lg font-bold text-blue-600">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full transition-all duration-1000" style={{ width: '87%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Satisfacción General</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-bold text-yellow-600">4.6/5</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className={`w-6 h-6 ${star <= 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-violet-600" />
              Destacados de la Semana
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <Trophy className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-900 text-sm">Top Performance</div>
                    <div className="text-sm text-green-700 mt-1">El Grupo C alcanzó 100% de asistencia</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-blue-900 text-sm">Logros Destacados</div>
                    <div className="text-sm text-blue-700 mt-1">15 estudiantes ganaron badges nuevos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DASHBOARD MAESTRO
// ============================================================================

const TeacherDashboard = ({ onLogout, appState }) => {
  const { data } = appState;
  
  const studentsInClass = data.users.students.slice(0, 6).map((s, idx) => ({
    ...s,
    avatar: ['👦', '👧', '👦', '👧', '👦', '👧'][idx],
    status: idx === 2 ? 'stuck' : idx === 5 ? 'distracted' : 'active',
    progress: [85, 100, 30, 95, 70, 45][idx],
    exercise: [`${idx + 5}/10`, '10/10', '3/10', '9/10', '7/10', '4/10'][idx],
    alert: idx === 2 || idx === 5
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-orange-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">ByteKids Academy</h1>
                <p className="text-sm text-gray-600">Maestro: Sam Partida</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-md">
                <Brain className="w-5 h-5" />
                <span className="hidden sm:inline">Asistente IA</span>
              </button>
              <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={Users} label="Estudiantes Activos" value={24} trend={12} color="violet" />
          <StatCard icon={BookOpen} label="Clases Esta Semana" value={8} color="orange" />
          <StatCard icon={TrendingUp} label="Promedio Grupal" value={87} trend={5} color="blue" />
          <StatCard icon={Award} label="Badges Ganados" value={156} trend={23} color="green" />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-gray-800">Clase en Vivo</h2>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Grupo A - Variables
              </span>
            </div>
            <div className="text-sm text-gray-600">⏱️ 25:30 min</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {studentsInClass.map((student) => (
              <div 
                key={student.id}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  student.status === 'stuck' ? 'border-red-300 bg-red-50' :
                  student.status === 'distracted' ? 'border-orange-300 bg-orange-50' :
                  'border-green-300 bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{student.avatar}</div>
                    <div>
                      <div className="font-semibold text-gray-800">{student.name}</div>
                      <div className="text-xs text-gray-600">Ejercicio: {student.exercise}</div>
                    </div>
                  </div>
                  {student.alert && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progreso</span>
                    <span className="font-semibold">{student.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        student.status === 'stuck' ? 'bg-red-500' :
                        student.status === 'distracted' ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                </div>

                {student.alert && (
                  <div className="mt-3 pt-3 border-t border-gray-300">
                    <button className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Generar Ayuda IA
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">🤖 Asistente IA</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Pedro lleva 5 minutos sin avanzar. Ana está distraída.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-white border border-violet-300 rounded-lg text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors">
                    💡 Ejercicio más fácil
                  </button>
                  <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">
                    💬 Hablar con IA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DASHBOARD ESTUDIANTE
// ============================================================================

const StudentDashboard = ({ onLogout }) => {
  const [exerciseCode, setExerciseCode] = useState('');
  const [exerciseResult, setExerciseResult] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: '¡Hola Juan! 👋 ¿Listo para practicar loops hoy?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const studentData = {
    name: "Juan Pérez",
    avatar: "👦",
    level: 8,
    xp: 1250,
    xpToNext: 1500,
    streak: 5,
    progress: { variables: 85, loops: 65, functions: 35 }
  };

  const handleRunCode = () => {
    setExerciseResult({
      success: exerciseCode.includes('for'),
      output: exerciseCode.includes('for') ? 'Gol!\nGol!\nGol!\nGol!\nGol!' : 'Error: No se detectó un loop',
      feedback: exerciseCode.includes('for') ? '¡Excelente! 🎉' : 'Intenta usar un loop for'
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { id: messages.length + 1, role: 'user', content: inputMessage }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'assistant',
        content: '¡Excelente pregunta! Los loops son como practicar tiros 10 veces seguidas. 🎯'
      }]);
    }, 1000);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{studentData.avatar}</div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">¡Hola {studentData.name}! 👋</h1>
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-gray-700">Nivel {studentData.level}</span>
                  <span className="text-gray-500">•</span>
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-semibold text-orange-600">{studentData.streak} días</span>
                </div>
              </div>
            </div>
            
            <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">{studentData.xp} XP</span>
            </div>
            <span className="text-sm text-gray-600">Siguiente nivel: {studentData.xpToNext} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-1000" 
              style={{ width: `${(studentData.xp / studentData.xpToNext) * 100}%` }}></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-600" />
                Misiones de Hoy
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <div className="flex-1 text-gray-800">Completar 3 ejercicios de loops</div>
                  <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors">
                    Empezar
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Code className="w-6 h-6" />
                  Loops en Minecraft
                </h2>
                <p className="text-orange-100 text-sm mt-1">Dificultad: Media 🟡</p>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">📝 Crea un loop que imprima "Gol!" 5 veces</p>
                
                <textarea
                  value={exerciseCode}
                  onChange={(e) => setExerciseCode(e.target.value)}
                  placeholder="# Escribe tu código aquí&#10;for i in range(5):&#10;    print('Gol!')"
                  className="w-full h-40 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg border-2 border-gray-700 focus:outline-none focus:border-violet-500 mb-4"
                />
                
                <button
                  onClick={handleRunCode}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
                >
                  <Play className="w-5 h-5" />
                  Ejecutar Código
                </button>
                
                {exerciseResult && (
                  <div className={`p-4 rounded-xl border-2 ${exerciseResult.success ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                    <div className="font-bold mb-2">{exerciseResult.success ? '✅ ¡Correcto!' : '❌ Error'}</div>
                    <pre className="text-sm mb-3 font-mono bg-white p-3 rounded">{exerciseResult.output}</pre>
                    <p className="text-sm font-semibold">{exerciseResult.feedback}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Tu AI Tutor - CodeMaster 🤖
                </h2>
                <p className="text-violet-100 text-sm mt-1">Disponible 24/7</p>
              </div>
              
              <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-violet-50 to-white">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-white border-2 border-violet-200 text-gray-800'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu pregunta..."
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-violet-500"
                  />
                  <button onClick={handleSendMessage} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 flex items-center gap-2">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Tu Progreso</h2>
              <div className="space-y-6">
                {Object.entries(studentData.progress).map(([topic, value]) => (
                  <div key={topic}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-700 capitalize">{topic}</span>
                      <span className="text-sm font-bold text-violet-600">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full transition-all duration-1000" 
                        style={{ width: `${value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5" />
                <span className="font-bold">Próxima Clase</span>
              </div>
              <div className="text-2xl font-bold mb-2">Hoy - 4:00 PM</div>
              <div className="text-orange-100 mb-4">Loops Avanzados</div>
              <button className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Entrar a Clase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DASHBOARD PADRES
// ============================================================================

const ParentDashboard = ({ onLogout }) => {
  const childData = {
    name: "Juan Pérez",
    averageGrade: 8.7,
    attendance: 95,
    streak: 5,
    topicsProgress: [
      { name: 'Variables', progress: 85, trend: 15 },
      { name: 'Loops', progress: 65, trend: 20 },
      { name: 'Funciones', progress: 35, trend: 35 },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Progreso de {childData.name}</h1>
                <p className="text-sm text-gray-600">Panel para Padres</p>
              </div>
            </div>
            
            <button onClick={onLogout} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={TrendingUp} label="Promedio General" value={childData.averageGrade} color="green" />
          <StatCard icon={Calendar} label="Asistencia" value={`${childData.attendance}%`} color="blue" />
          <StatCard icon={CheckCircle} label="Tareas Completas" value={18} color="violet" />
          <StatCard icon={Flame} label="Racha de Días" value={childData.streak} color="orange" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-green-600" />
                Resumen Semanal
              </h2>
              
              <div className="space-y-6">
                {childData.topicsProgress.map((topic, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{topic.name}</div>
                          <div className="text-xs text-gray-600">{topic.progress}% completado</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm">
                          <ArrowUp className="w-4 h-4 text-green-500" />
                          <span className="text-green-600 font-bold">+{topic.trend}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000" 
                        style={{ width: `${topic.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Mensaje del Maestro</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    "{childData.name} tuvo una semana excelente. Destacó con una pregunta muy inteligente sobre loops. 
                    Para la próxima semana vamos a empezar funciones. Si pueden practicar 15 min/día sería ideal. 📱"
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Responder
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-violet-600" />
                Análisis de Talento
              </h2>
              
              <div className="mb-6 flex justify-center">
                <ProgressRing progress={85} />
              </div>
              
              <div className="p-4 bg-violet-50 border-2 border-violet-200 rounded-xl">
                <div className="font-bold text-violet-900 mb-2">💡 Recomendación:</div>
                <p className="text-sm text-violet-800">
                  {childData.name} tiene perfil para Game Design. Sugerimos track avanzado en 3 meses.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold mb-4">Suscripción</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-violet-100">Plan:</span>
                  <span className="font-bold">Mensual</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-violet-100">Precio:</span>
                  <span className="font-bold">$599 MXN</span>
                </div>
              </div>
              <button className="w-full mt-4 py-3 bg-white text-violet-600 rounded-xl font-bold hover:bg-violet-50 transition-colors">
                Ver Factura
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// APP PRINCIPAL
// ============================================================================

function App() {
  const [currentView, setCurrentView] = useState('select');
  const appState = useAppState();

  if (currentView === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-6 transform hover:scale-110 transition-transform">
              <Brain className="w-14 h-14 text-violet-600" />
            </div>
            <h1 className="text-6xl font-bold text-white mb-3 drop-shadow-lg">ByteKids Academy</h1>
            <p className="text-2xl text-violet-100">Selecciona tu dashboard</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'admin', title: 'Coordinador', desc: 'Gestión de estudiantes y grupos', icon: Settings, color: 'from-gray-700 to-gray-900' },
              { id: 'director', title: 'Director', desc: 'Vista ejecutiva', icon: Building, color: 'from-blue-600 to-indigo-700' },
              { id: 'teacher', title: 'Maestro', desc: 'Panel con IA', icon: Users, color: 'from-violet-500 to-purple-600' },
              { id: 'student', title: 'Estudiante', desc: 'Aprende y practica', icon: Zap, color: 'from-blue-500 to-cyan-600' },
              { id: 'parent', title: 'Padres', desc: 'Monitorea progreso', icon: Heart, color: 'from-green-500 to-emerald-600' },
            ].map(card => {
              const Icon = card.icon;
              return (
                <button
                  key={card.id}
                  onClick={() => setCurrentView(card.id)}
                  className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.color} opacity-10 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500`}></div>
                  <div className="relative">
                    <div className={`w-20 h-20 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform shadow-lg`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-gray-600 mb-4">{card.desc}</p>
                    <ChevronRight className="absolute bottom-2 right-2 w-6 h-6 text-gray-400 group-hover:translate-x-1 group-hover:text-violet-600 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === 'admin' && <AdminDashboard onLogout={() => setCurrentView('select')} appState={appState} />}
      {currentView === 'director' && <DirectorDashboard onLogout={() => setCurrentView('select')} appState={appState} />}
      {currentView === 'teacher' && <TeacherDashboard onLogout={() => setCurrentView('select')} appState={appState} />}
      {currentView === 'student' && <StudentDashboard onLogout={() => setCurrentView('select')} />}
      {currentView === 'parent' && <ParentDashboard onLogout={() => setCurrentView('select')} />}
    </>
  );
}

export default App;
