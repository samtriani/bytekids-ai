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
    totalStudents: 6,
    activeStudents: 6,
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
      },
      stats: {
        ...prev.stats,
        totalStudents: prev.stats.totalStudents + 1,
        activeStudents: prev.stats.activeStudents + 1
      }
    }));
  };

  const addTeacher = (teacher) => {
    setData(prev => ({
      ...prev,
      users: {
        ...prev.users,
        teachers: [...prev.users.teachers, { ...teacher, id: Date.now(), groups: [], students: 0, status: 'active' }]
      },
      stats: {
        ...prev.stats,
        totalTeachers: prev.stats.totalTeachers + 1
      }
    }));
  };

  const addGroup = (group) => {
    setData(prev => ({
      ...prev,
      groups: [...prev.groups, { ...group, id: Date.now(), students: [] }],
      stats: {
        ...prev.stats,
        totalGroups: prev.stats.totalGroups + 1
      }
    }));
  };

  const deleteStudent = (id) => {
    setData(prev => ({
      ...prev,
      users: {
        ...prev.users,
        students: prev.users.students.filter(s => s.id !== id)
      },
      stats: {
        ...prev.stats,
        totalStudents: prev.stats.totalStudents - 1,
        activeStudents: prev.stats.activeStudents - 1
      }
    }));
  };
  
  return { data, addStudent, addTeacher, addGroup, deleteStudent };
};

// ============================================================================
// COMPONENTES COMPARTIDOS
// ============================================================================

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

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

const StatCard = ({ icon: Icon, label, value, trend, color = "violet", onClick }) => {
  const colors = {
    violet: "from-violet-500 to-purple-600",
    orange: "from-orange-500 to-amber-600",
    blue: "from-blue-500 to-cyan-600",
    green: "from-green-500 to-emerald-600",
  };
  
  return (
    <div 
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 ${onClick ? 'cursor-pointer' : ''}`}
    >
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

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`fixed top-4 right-4 ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-fade-in flex items-center gap-3`}>
      <CheckCircle className="w-5 h-5" />
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 hover:bg-white/20 p-1 rounded">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const CustomAlert = ({ isOpen, onClose, title, message, icon: Icon, type = 'info' }) => {
  if (!isOpen) return null;

  const colors = {
    info: { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-900', iconBg: 'bg-blue-100' },
    success: { bg: 'from-green-500 to-emerald-600', text: 'text-green-900', iconBg: 'bg-green-100' },
    warning: { bg: 'from-orange-500 to-amber-600', text: 'text-orange-900', iconBg: 'bg-orange-100' },
    error: { bg: 'from-red-500 to-rose-600', text: 'text-red-900', iconBg: 'bg-red-100' },
  };

  const color = colors[type] || colors.info;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-r ${color.bg} p-6 text-white`}>
          <div className="flex items-center gap-4">
            {Icon && (
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Icon className="w-8 h-8" />
              </div>
            )}
            <h2 className="text-2xl font-bold flex-1">{title}</h2>
          </div>
        </div>
        
        <div className="p-6">
          <p className={`text-lg ${color.text} mb-6 leading-relaxed`}>{message}</p>
          
          <button
            onClick={onClose}
            className={`w-full py-3 bg-gradient-to-r ${color.bg} text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de Chat IA reutilizable
const AIChatWidget = ({ role = 'student', onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  // Respuestas según el rol
  const aiResponsesByRole = {
    coordinator: [
      '¡Hola! Como coordinador, puedo ayudarte con la gestión de estudiantes y grupos. ¿Qué necesitas organizar hoy? 📊',
      'Para asignar estudiantes a grupos, te recomiendo primero verificar la capacidad disponible. ¿Quieres que te muestre los grupos con espacio? 📋',
      'La mejor práctica es mantener grupos de máximo 6 estudiantes para atención personalizada. ¿Necesitas crear un nuevo grupo? ➕',
      'Puedo ayudarte a generar reportes de asistencia y progreso. ¿Qué métricas te interesan? 📈',
      'Para gestionar maestros, recuerda balancear la carga de trabajo. Te sugiero revisar cuántos grupos tiene cada uno. 👥'
    ],
    director: [
      '¡Saludos! Como director, puedo proporcionarte análisis y reportes ejecutivos. ¿Qué información necesitas? 📊',
      'Los indicadores muestran buen rendimiento general. ¿Quieres profundizar en algún área específica? 🎯',
      'Te sugiero revisar semanalmente el promedio de asistencia y las tasas de completación. ¿Generamos un reporte? 📈',
      'Para mejorar los resultados, considera reconocer públicamente a los maestros de mejor desempeño. 🏆',
      'Puedo ayudarte a identificar patrones en el rendimiento estudiantil. ¿Qué período quieres analizar? 📅'
    ],
    teacher: [
      '¡Hola Maestro! Estoy aquí para ayudarte con la gestión de tu clase. ¿Qué necesitas hoy? 👨‍🏫',
      'Para estudiantes que van atrasados, te recomiendo ejercicios de refuerzo personalizados. ¿Quieres que genere algunos? 📝',
      'Los estudiantes aprenden mejor con ejemplos prácticos. ¿Necesitas ideas para tu próxima clase? 💡',
      'Puedo generar ejercicios adaptados al nivel de cada estudiante. ¿Para qué tema los necesitas? 🎯',
      'Para mantener la motivación, intenta gamificar las actividades. ¿Quieres sugerencias específicas? 🎮',
      'Si un estudiante está atascado, a veces ayuda explicar el concepto con una analogía diferente. ¿En qué tema? 🤔',
      'Las pausas activas cada 20 minutos mejoran la concentración. ¿Necesitas ideas de actividades rápidas? ⚡'
    ],
    student: [
      '¡Excelente pregunta! 🎯 Los loops son como cuando practicas tiros al gol 10 veces seguidas. Cada vez mejoras un poquito más. ¿Quieres intentar crear un loop?',
      '¡Me encanta tu curiosidad! 🌟 Piensa en los loops como instrucciones para tu robot favorito. Si le dices "camina 10 pasos", el loop se asegura de que camine exactamente 10 veces.',
      '¡Buena observación! 💡 Las variables son como cajas mágicas donde guardas cosas. Por ejemplo, una caja llamada "puntos" guarda tu puntaje del juego.',
      '¡Qué inteligente! 🚀 Las funciones son como recetas de cocina. Una vez que escribes la receta, puedes usarla todas las veces que quieras sin escribirla de nuevo.',
      '¡Wow, pregunta avanzada! 🏆 Cuando combinas loops con if, es como tener un robot que no solo repite acciones, sino que también toma decisiones.',
      '¡Perfecto timing! ⚡ Los arrays son como mochilas donde guardas muchas cosas del mismo tipo. Por ejemplo, una mochila de "frutas" puede tener: manzana, plátano, uva.',
      '¡Te veo muy enfocado! 🎨 El debugging es como ser detective. Buscas pistas en tu código para encontrar qué salió mal. ¡Todos lo hacen!'
    ],
    parent: [
      '¡Hola! Como padre/madre, puedo ayudarte a entender el progreso de tu hijo/a. ¿Qué te gustaría saber? 👨‍👩‍👧',
      'Es normal que al principio algunos conceptos sean difíciles. Lo importante es la práctica constante. ¿Necesitas consejos para apoyar en casa? 🏠',
      'El promedio de tu hijo/a es excelente. Para mantenerlo, sugiero 15-20 minutos de práctica diaria. ¿Quieres un plan de estudio? 📚',
      'La comunicación con el maestro es clave. ¿Tienes alguna pregunta específica sobre las clases? 💬',
      'Puedo sugerirte recursos adicionales para practicar en casa. ¿Qué tema está estudiando actualmente? 🎯',
      'Celebrar los pequeños logros motiva mucho a los niños. ¿Has visto los badges que ha ganado? 🏆'
    ]
  };

  // Mensaje inicial según el rol
  const initialMessages = {
    coordinator: { role: 'assistant', content: '¡Hola! Soy tu asistente IA para coordinación. Puedo ayudarte con gestión de estudiantes, maestros y grupos. ¿En qué te ayudo hoy? 📊' },
    director: { role: 'assistant', content: '¡Bienvenido! Soy tu asistente de análisis ejecutivo. Puedo ayudarte con reportes, métricas y estrategias. ¿Qué información necesitas? 📈' },
    teacher: { role: 'assistant', content: '¡Hola Maestro! Soy tu asistente de enseñanza. Puedo generar ejercicios, darte sugerencias pedagógicas y ayudarte a gestionar tu clase. ¿Qué necesitas? 👨‍🏫' },
    student: { role: 'assistant', content: '¡Hola! 👋 Soy tu AI Tutor. Estoy aquí para ayudarte a aprender programación de forma divertida. ¿Qué quieres aprender hoy? 🚀' },
    parent: { role: 'assistant', content: '¡Hola! Soy el asistente para padres. Puedo ayudarte a entender el progreso de tu hijo/a y darte consejos para apoyarlo. ¿En qué te ayudo? 👨‍👩‍👧' }
  };

  useEffect(() => {
    setMessages([{ id: 1, ...initialMessages[role] }]);
  }, [role]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages([...messages, { 
      id: messages.length + 1, 
      role: 'user', 
      content: inputMessage 
    }]);
    
    setTimeout(() => {
      const responses = aiResponsesByRole[role] || aiResponsesByRole.student;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'assistant',
        content: randomResponse
      }]);
    }, 800);
    
    setInputMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full h-[600px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">🤖 Tu AI Tutor - CodeMaster</h2>
              <p className="text-violet-100 text-sm">Disponible 24/7</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-violet-50 to-white">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-violet-600 text-white rounded-br-none shadow-md' 
                  : 'bg-white border-2 border-violet-200 text-gray-800 rounded-bl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu pregunta..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button 
              onClick={handleSendMessage} 
              className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 flex items-center gap-2 transition-colors shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// DASHBOARD COORDINADOR
// ============================================================================

const AdminDashboard = ({ onLogout, appState }) => {
  const { data, addStudent, addTeacher, addGroup, deleteStudent } = appState;
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [customAlert, setCustomAlert] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);

  // Form states
  const [newStudent, setNewStudent] = useState({ name: '', email: '', age: '', groupId: '' });
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', phone: '' });
  const [newGroup, setNewGroup] = useState({ name: '', teacherId: '', schedule: '', topic: '' });

  const handleAddStudent = (e) => {
    e.preventDefault();
    addStudent({
      name: newStudent.name,
      email: newStudent.email,
      age: parseInt(newStudent.age),
      groupId: newStudent.groupId ? parseInt(newStudent.groupId) : null,
      parentId: Date.now()
    });
    setShowAddStudent(false);
    setNewStudent({ name: '', email: '', age: '', groupId: '' });
    setNotification({ message: '¡Estudiante agregado exitosamente!', type: 'success' });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    addTeacher({
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      specialties: ['Python']
    });
    setShowAddTeacher(false);
    setNewTeacher({ name: '', email: '', phone: '' });
    setNotification({ message: '¡Maestro agregado exitosamente!', type: 'success' });
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    addGroup({
      name: newGroup.name,
      teacherId: parseInt(newGroup.teacherId),
      schedule: newGroup.schedule,
      topic: newGroup.topic,
      students: [],
      capacity: 6
    });
    setShowAddGroup(false);
    setNewGroup({ name: '', teacherId: '', schedule: '', topic: '' });
    setNotification({ message: '¡Grupo creado exitosamente!', type: 'success' });
  };

  const handleDeleteStudent = (id, name) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${name}?`)) {
      deleteStudent(id);
      setNotification({ message: 'Estudiante eliminado', type: 'info' });
    }
  };

  const filteredStudents = data.users.students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-violet-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
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
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-md"
              >
                <Brain className="w-5 h-5" />
                <span className="hidden sm:inline">Consultar IA</span>
              </button>
              <button onClick={onLogout} className="px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2">
                <LogOut className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Salir</span>
              </button>
            </div>
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
            <button 
              onClick={() => setShowAddStudent(true)}
              className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <UserPlus className="w-5 h-5" />
              Agregar Estudiante
            </button>
            <button 
              onClick={() => setShowAddTeacher(true)}
              className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <UserPlus className="w-5 h-5" />
              Agregar Maestro
            </button>
            <button 
              onClick={() => setShowAddGroup(true)}
              className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Crear Grupo
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Lista de Estudiantes</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar estudiante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Grupo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nivel</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map(student => {
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
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setCustomAlert({
                              isOpen: true,
                              title: 'Detalles del Estudiante',
                              message: `Nombre: ${student.name}\nEmail: ${student.email}\nNivel: ${student.level}\nXP: ${student.xp}`,
                              icon: Eye,
                              type: 'info'
                            })}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Ver detalles"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => setCustomAlert({
                              isOpen: true,
                              title: 'Editar Estudiante',
                              message: `La función de edición para ${student.name} estará disponible próximamente.`,
                              icon: Edit,
                              type: 'info'
                            })}
                            className="p-2 text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id, student.name)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Agregar Estudiante */}
      <Modal isOpen={showAddStudent} onClose={() => setShowAddStudent(false)} title="Agregar Nuevo Estudiante">
        <form onSubmit={handleAddStudent}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo *</label>
              <input
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Edad *</label>
              <input
                type="number"
                value={newStudent.age}
                onChange={(e) => setNewStudent({...newStudent, age: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Grupo (Opcional)</label>
              <select
                value={newStudent.groupId}
                onChange={(e) => setNewStudent({...newStudent, groupId: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 bg-white"
              >
                <option value="">Sin asignar</option>
                {data.groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddStudent(false)}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              Guardar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Agregar Maestro */}
      <Modal isOpen={showAddTeacher} onClose={() => setShowAddTeacher(false)} title="Agregar Nuevo Maestro">
        <form onSubmit={handleAddTeacher}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo *</label>
              <input
                type="text"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={newTeacher.email}
                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
              <input
                type="tel"
                value={newTeacher.phone}
                onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddTeacher(false)}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              Guardar
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Crear Grupo */}
      <Modal isOpen={showAddGroup} onClose={() => setShowAddGroup(false)} title="Crear Nuevo Grupo">
        <form onSubmit={handleAddGroup}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Grupo *</label>
              <input
                type="text"
                value={newGroup.name}
                onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                placeholder="Ej: Grupo E - Beginners"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Maestro *</label>
              <select
                value={newGroup.teacherId}
                onChange={(e) => setNewGroup({...newGroup, teacherId: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 bg-white"
                required
              >
                <option value="">Seleccionar maestro...</option>
                {data.users.teachers.map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Horario *</label>
              <input
                type="text"
                value={newGroup.schedule}
                onChange={(e) => setNewGroup({...newGroup, schedule: e.target.value})}
                placeholder="Ej: Lun/Mie 6-7pm"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tema Inicial *</label>
              <input
                type="text"
                value={newGroup.topic}
                onChange={(e) => setNewGroup({...newGroup, topic: e.target.value})}
                placeholder="Ej: Variables"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddGroup(false)}
              className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              Crear Grupo
            </button>
          </div>
        </form>
      </Modal>
      
      {/* Custom Alert */}
      {customAlert && (
        <CustomAlert
          isOpen={customAlert.isOpen}
          onClose={() => setCustomAlert(null)}
          title={customAlert.title}
          message={customAlert.message}
          icon={customAlert.icon}
          type={customAlert.type}
        />
      )}
      
      {/* AI Chat */}
      {showAIChat && (
        <AIChatWidget
          role="coordinator"
          onClose={() => setShowAIChat(false)}
        />
      )}
    </div>
  );
};

// ============================================================================
// DASHBOARD DIRECTOR
// ============================================================================

const DirectorDashboard = ({ onLogout, appState }) => {
  const { data } = appState;
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [customAlert, setCustomAlert] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);

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
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                <Brain className="w-5 h-5" />
                <span className="hidden sm:inline">Consultar IA</span>
              </button>
              <button onClick={onLogout} className="px-4 py-2 hover:bg-gray-100 rounded-xl transition-colors flex items-center gap-2">
                <LogOut className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">Salir</span>
              </button>
            </div>
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

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Maestros</h2>
          <div className="grid gap-4">
            {data.users.teachers.map(teacher => (
              <div key={teacher.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{teacher.name}</div>
                    <div className="text-sm text-gray-600">{teacher.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeacher(teacher)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Ver Detalles
                </button>
              </div>
            ))}
          </div>
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

      {/* Modal Detalles del Maestro */}
      <Modal isOpen={!!selectedTeacher} onClose={() => setSelectedTeacher(null)} title={`Detalles: ${selectedTeacher?.name}`}>
        {selectedTeacher && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 mb-1">Email</div>
                  <div className="font-semibold">{selectedTeacher.email}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Teléfono</div>
                  <div className="font-semibold">{selectedTeacher.phone}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Grupos</div>
                  <div className="font-semibold">{selectedTeacher.groups.length}</div>
                </div>
                <div>
                  <div className="text-gray-600 mb-1">Estudiantes</div>
                  <div className="font-semibold">{selectedTeacher.students}</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setCustomAlert({
                  isOpen: true,
                  title: '📨 Mensaje Enviado',
                  message: `Tu mensaje ha sido enviado a ${selectedTeacher.name}. El maestro lo recibirá en su panel.`,
                  icon: MessageCircle,
                  type: 'success'
                });
                setSelectedTeacher(null);
              }}
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar Mensaje
            </button>
          </div>
        )}
      </Modal>
      
      {/* Custom Alert */}
      {customAlert && (
        <CustomAlert
          isOpen={customAlert.isOpen}
          onClose={() => setCustomAlert(null)}
          title={customAlert.title}
          message={customAlert.message}
          icon={customAlert.icon}
          type={customAlert.type}
        />
      )}
      
      {/* AI Chat */}
      {showAIChat && (
        <AIChatWidget
          role="director"
          onClose={() => setShowAIChat(false)}
        />
      )}
    </div>
  );
};

// Continúa en el siguiente mensaje...

// ============================================================================
// DASHBOARD MAESTRO
// ============================================================================

const TeacherDashboard = ({ onLogout, appState }) => {
  const { data } = appState;
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [customAlert, setCustomAlert] = useState(null);
  
  const studentsInClass = data.users.students.slice(0, 6).map((s, idx) => ({
    ...s,
    avatar: ['👦', '👧', '👦', '👧', '👦', '👧'][idx],
    status: idx === 2 ? 'stuck' : idx === 5 ? 'distracted' : 'active',
    progress: [85, 100, 30, 95, 70, 45][idx],
    exercise: [`${idx + 5}/10`, '10/10', '3/10', '9/10', '7/10', '4/10'][idx],
    alert: idx === 2 || idx === 5
  }));

  const handleGenerateHelp = (student) => {
    setCustomAlert({
      isOpen: true,
      title: '✨ Ejercicio Generado',
      message: `He creado un ejercicio personalizado para ${student.name}:\n\n"${student.name}, intenta este ejercicio más simple sobre variables"\n\nDificultad: ${student.level > 7 ? 'Media' : 'Fácil'}\n\n¡El ejercicio ha sido enviado al estudiante!`,
      icon: Sparkles,
      type: 'success'
    });
  };

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
              <button 
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-md"
              >
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
          <StatCard icon={Users} label="Estudiantes Activos" value={24} trend={12} color="violet" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Estudiantes Activos',
            message: 'Tienes 24 estudiantes activos en tus grupos. 12 más que el mes pasado. ¡Excelente crecimiento!',
            icon: Users,
            type: 'info'
          })} />
          <StatCard icon={BookOpen} label="Clases Esta Semana" value={8} color="orange" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Clases Programadas',
            message: 'Tienes 8 clases programadas esta semana:\n\nLunes: 2 clases\nMiércoles: 2 clases\nJueves: 2 clases\nViernes: 2 clases',
            icon: Calendar,
            type: 'info'
          })} />
          <StatCard icon={TrendingUp} label="Promedio Grupal" value={87} trend={5} color="blue" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Promedio Grupal',
            message: 'El promedio general de tus grupos es 87/100. ¡Ha mejorado un 5% respecto al mes anterior! 🎉',
            icon: TrendingUp,
            type: 'success'
          })} />
          <StatCard icon={Award} label="Badges Ganados" value={156} trend={23} color="green" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Logros Desbloqueados',
            message: 'Tus estudiantes han ganado 156 badges este mes. ¡23% más que el mes pasado! Sigue motivándolos. 🏆',
            icon: Award,
            type: 'success'
          })} />
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
                onClick={() => setSelectedStudent(student)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  student.status === 'stuck' ? 'border-red-300 bg-red-50' :
                  student.status === 'distracted' ? 'border-orange-300 bg-orange-50' :
                  'border-green-300 bg-green-50 hover:shadow-lg'
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
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGenerateHelp(student);
                      }}
                      className="w-full px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
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
                  <button 
                    onClick={() => handleGenerateHelp(studentsInClass[2])}
                    className="px-4 py-2 bg-white border border-violet-300 rounded-lg text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
                  >
                    💡 Ejercicio más fácil
                  </button>
                  <button 
                    onClick={() => setShowAIChat(true)}
                    className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
                  >
                    💬 Hablar con IA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detalles Estudiante */}
      <Modal isOpen={!!selectedStudent} onClose={() => setSelectedStudent(null)} title={`Detalles: ${selectedStudent?.name}`}>
        {selectedStudent && (
          <div className="space-y-4">
            <div className="bg-violet-50 rounded-xl p-4 flex items-center gap-4">
              <div className="text-5xl">{selectedStudent.avatar}</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{selectedStudent.name}</h3>
                <p className="text-sm text-gray-600">Nivel {selectedStudent.level} • {selectedStudent.xp} XP</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleGenerateHelp(selectedStudent)}
                className="px-4 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-5 h-5" />
                Generar Ejercicio
              </button>
              <button
                onClick={() => {
                  setCustomAlert({
                    isOpen: true,
                    title: '📨 Mensaje Enviado',
                    message: `Tu mensaje ha sido enviado a ${selectedStudent.name}. El estudiante lo verá en su panel principal.`,
                    icon: MessageCircle,
                    type: 'success'
                  });
                  setSelectedStudent(null);
                }}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar Mensaje
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Chat IA */}
      {/* AI Chat */}
      {showAIChat && (
        <AIChatWidget
          role="teacher"
          onClose={() => setShowAIChat(false)}
        />
      )}
      
      {/* Custom Alert */}
      {customAlert && (
        <CustomAlert
          isOpen={customAlert.isOpen}
          onClose={() => setCustomAlert(null)}
          title={customAlert.title}
          message={customAlert.message}
          icon={customAlert.icon}
          type={customAlert.type}
        />
      )}
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
  const [missionCompleted, setMissionCompleted] = useState([false, false, false]);
  const [customAlert, setCustomAlert] = useState(null);

  const studentData = {
    name: "Juan Pérez",
    avatar: "👦",
    level: 8,
    xp: 1250,
    xpToNext: 1500,
    streak: 5,
    progress: { variables: 85, loops: 65, functions: 35 }
  };

  // AI Tutor respuestas variadas
  const aiResponses = [
    '¡Excelente pregunta! 🎯 Los loops son como cuando practicas tiros al gol 10 veces seguidas. Cada vez mejoras un poquito más. ¿Quieres intentar crear un loop que imprima "Gol!" 5 veces?',
    '¡Me encanta tu curiosidad! 🌟 Piensa en los loops como instrucciones para tu robot favorito. Si le dices "camina 10 pasos", el loop se asegura de que camine exactamente 10 veces, ¡ni una más ni una menos!',
    '¡Buena observación! 💡 Las variables son como cajas mágicas donde guardas cosas. Por ejemplo, si tienes una caja llamada "puntos", puedes guardar ahí tu puntaje del juego y cambiarlo cada vez que ganes puntos.',
    '¡Qué inteligente! 🚀 Las funciones son como recetas de cocina. Una vez que escribes la receta (la función), puedes usarla todas las veces que quieras sin tener que escribirla de nuevo. ¡Súper útil!',
    '¡Wow, esa es una pregunta avanzada! 🏆 Cuando combinas loops con if, es como tener un robot que no solo repite acciones, sino que también toma decisiones. ¡Es como darle superpoderes a tu código!',
    '¡Perfecto timing para esa pregunta! ⚡ Los arrays son como mochilas donde guardas muchas cosas del mismo tipo. Por ejemplo, una mochila de "frutas" puede tener: manzana, plátano, uva. ¡Y puedes sacar cualquiera cuando quieras!',
    '¡Te veo muy enfocado! 🎨 El debugging (encontrar errores) es como ser detective. Buscas pistas en tu código para encontrar qué salió mal. ¡Todos los programadores lo hacen, incluso los expertos!'
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    setMessages([...messages, { id: messages.length + 1, role: 'user', content: inputMessage }]);
    setTimeout(() => {
      // Seleccionar respuesta random
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'assistant',
        content: randomResponse
      }]);
    }, 1000);
    setInputMessage('');
  };

  const handleRunCode = () => {
    const success = exerciseCode.includes('for') || exerciseCode.includes('while');
    setExerciseResult({
      success,
      output: success ? 'Gol!\nGol!\nGol!\nGol!\nGol!' : 'Error: No se detectó un loop',
      feedback: success ? '¡Excelente! Tu loop funciona perfectamente 🎉' : 'Intenta usar un loop for. Ejemplo: for i in range(5):'
    });
    if (success && !missionCompleted[0]) {
      const newCompleted = [...missionCompleted];
      newCompleted[0] = true;
      setMissionCompleted(newCompleted);
      setCustomAlert({
        isOpen: true,
        title: '¡Misión Completada!',
        message: '¡Felicidades! Has completado tu primera misión y ganado +50 XP. ¡Sigue así! 🎉',
        icon: Trophy,
        type: 'success'
      });
    }
  };

  const handleStartMission = (index) => {
    if (index === 0) {
      setCustomAlert({
        isOpen: true,
        title: 'Comenzar Ejercicio',
        message: '¡Perfecto! Comienza con el ejercicio de código de abajo 👇 Escribe un loop que imprima "Gol!" 5 veces.',
        icon: Code,
        type: 'info'
      });
    } else if (index === 1) {
      setCustomAlert({
        isOpen: true,
        title: 'Proyectos Próximamente',
        message: '🎮 Los proyectos estarán disponibles muy pronto. Por ahora, practica con los ejercicios básicos para subir de nivel.',
        icon: Sparkles,
        type: 'info'
      });
    } else {
      setCustomAlert({
        isOpen: true,
        title: 'Chat AI Tutor',
        message: '💬 ¡El chat con AI Tutor está justo abajo! Comienza a hacer preguntas y el AI te responderá al instante.',
        icon: Brain,
        type: 'info'
      });
    }
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
                {['Completar 3 ejercicios de loops', 'Hacer proyecto: Juego simple', 'Hablar con AI Tutor 10 min'].map((mission, idx) => (
                  <div 
                    key={idx}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                      missionCompleted[idx]
                        ? 'bg-green-50 border-2 border-green-300' 
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-violet-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      missionCompleted[idx] ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {missionCompleted[idx] && <CheckCircle className="w-5 h-5 text-white" />}
                    </div>
                    <div className={`flex-1 ${missionCompleted[idx] ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {mission}
                    </div>
                    {!missionCompleted[idx] && (
                      <button 
                        onClick={() => handleStartMission(idx)}
                        className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-semibold hover:bg-violet-700 transition-colors"
                      >
                        Empezar
                      </button>
                    )}
                  </div>
                ))}
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
                
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={handleRunCode}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    Ejecutar Código
                  </button>
                  <button
                    onClick={() => setCustomAlert({
                      isOpen: true,
                      title: '💡 Pista',
                      message: 'Usa un loop for con range(5) y print("Gol!"). Ejemplo:\n\nfor i in range(5):\n    print("Gol!")',
                      icon: Sparkles,
                      type: 'info'
                    })}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-violet-600 text-violet-600 rounded-lg font-semibold hover:bg-violet-50 transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                    Pista
                  </button>
                </div>
                
                {exerciseResult && (
                  <div className={`p-4 rounded-xl border-2 ${exerciseResult.success ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                    <div className="font-bold mb-2 flex items-center gap-2">
                      {exerciseResult.success ? (
                        <><CheckCircle className="w-5 h-5 text-green-600" /> ✅ ¡Correcto!</>
                      ) : (
                        <><AlertCircle className="w-5 h-5 text-red-600" /> ❌ Error</>
                      )}
                    </div>
                    <pre className="text-sm mb-3 font-mono bg-white p-3 rounded border">{exerciseResult.output}</pre>
                    <p className={`text-sm font-semibold ${exerciseResult.success ? 'text-green-700' : 'text-red-700'}`}>
                      {exerciseResult.feedback}
                    </p>
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
                      msg.role === 'user' ? 'bg-violet-600 text-white rounded-br-none' : 'bg-white border-2 border-violet-200 text-gray-800 rounded-bl-none'
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
                  <button 
                    onClick={handleSendMessage} 
                    className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 flex items-center gap-2 transition-colors"
                  >
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
              <div className="text-orange-100 mb-4">Loops Avanzados con Maestro Sam</div>
              <button 
                onClick={() => setCustomAlert({
                  isOpen: true,
                  title: 'Conectando a Clase',
                  message: '🎥 Conectando a clase en vivo con Maestro Sam... La clase comenzará en unos segundos.',
                  icon: Play,
                  type: 'success'
                })}
                className="w-full py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Entrar a Clase
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Alert */}
      {customAlert && (
        <CustomAlert
          isOpen={customAlert.isOpen}
          onClose={() => setCustomAlert(null)}
          title={customAlert.title}
          message={customAlert.message}
          icon={customAlert.icon}
          type={customAlert.type}
        />
      )}
    </div>
  );
};

// ============================================================================
// DASHBOARD PADRES
// ============================================================================

const ParentDashboard = ({ onLogout }) => {
  const [customAlert, setCustomAlert] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  
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
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAIChat(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-md"
              >
                <Brain className="w-5 h-5" />
                <span className="hidden sm:inline">Consultar IA</span>
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
          <StatCard icon={TrendingUp} label="Promedio General" value={childData.averageGrade} color="green" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Promedio General',
            message: `${childData.name} tiene un promedio de ${childData.averageGrade}/10. ¡Está por encima del promedio de la clase!`,
            icon: TrendingUp,
            type: 'success'
          })} />
          <StatCard icon={Calendar} label="Asistencia" value={`${childData.attendance}%`} color="blue" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Historial de Asistencia',
            message: `${childData.name} tiene ${childData.attendance}% de asistencia. ¡Excelente compromiso!\n\nClases este mes: 16/17`,
            icon: Calendar,
            type: 'success'
          })} />
          <StatCard icon={CheckCircle} label="Tareas Completas" value={18} color="violet" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Tareas Completadas',
            message: `${childData.name} ha completado 18 de 18 tareas este mes. ¡100% de cumplimiento! 🎉`,
            icon: CheckCircle,
            type: 'success'
          })} />
          <StatCard icon={Flame} label="Racha de Días" value={childData.streak} color="orange" onClick={() => setCustomAlert({
            isOpen: true,
            title: 'Racha de Práctica',
            message: `${childData.name} lleva ${childData.streak} días consecutivos practicando. ¡Mantén la motivación!`,
            icon: Flame,
            type: 'info'
          })} />
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
                  <button 
                    onClick={() => setCustomAlert({
                      isOpen: true,
                      title: 'Chat con Maestro',
                      message: 'Abriendo chat con el Maestro Sam... Podrás enviar tu respuesta y hacer preguntas sobre el progreso de tu hijo.',
                      icon: MessageCircle,
                      type: 'info'
                    })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
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
              <button 
                onClick={() => setCustomAlert({
                  isOpen: true,
                  title: 'Detalles de Facturación',
                  message: 'Suscripción: Mensual\nPrecio: $599 MXN\nPróximo pago: 1 Marzo 2026\n\nMétodo de pago: Tarjeta •••• 4242\nEstado: Activo ✅',
                  icon: DollarSign,
                  type: 'info'
                })}
                className="w-full mt-4 py-3 bg-white text-violet-600 rounded-xl font-bold hover:bg-violet-50 transition-colors"
              >
                Ver Factura
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Alert */}
      {customAlert && (
        <CustomAlert
          isOpen={customAlert.isOpen}
          onClose={() => setCustomAlert(null)}
          title={customAlert.title}
          message={customAlert.message}
          icon={customAlert.icon}
          type={customAlert.type}
        />
      )}
      
      {/* AI Chat */}
      {showAIChat && (
        <AIChatWidget
          role="parent"
          onClose={() => setShowAIChat(false)}
        />
      )}
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
