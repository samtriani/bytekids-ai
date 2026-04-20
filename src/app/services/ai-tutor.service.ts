import { Injectable } from '@angular/core';

export type TutorRole = 'student' | 'teacher' | 'parent' | 'admin';
export interface ChatMessage { role: 'user' | 'assistant'; content: string; timestamp: Date; }

@Injectable({ providedIn: 'root' })
export class AiTutorService {

  private studentReplies: Record<string, string> = {
    default: '¡Buena pregunta! 🤔 Vamos paso a paso. Primero dime: ¿qué parte no entiendes bien? Así te explico mejor. ¡Tú puedes! 💪',
    variable: '¡Las variables son como cajitas mágicas! 📦\n\nEn Python se crean así:\n```python\nnombre = "Axel"\nedades = 9\npuntos = 1250\n```\n\nLa cajita `nombre` guarda el texto "Axel". ¿Lo entiendes? ¡Intenta crear una variable con tu nombre!',
    bucle: '¡Los bucles son superpoderes! 🔄\n\nUn `for` en Python repite código varias veces:\n```python\nfor i in range(5):\n    print("¡Hola!")\n```\nEsto imprime "¡Hola!" 5 veces. ¡Como un robot que hace lo mismo una y otra vez! 🤖',
    html: '¡HTML es el lenguaje de las páginas web! 🌐\n\nUna página básica se ve así:\n```html\n<h1>Hola Mundo</h1>\n<p>Mi primera web</p>\n```\n\n`<h1>` es un título grande. `<p>` es un párrafo. ¡Como piezas de Lego! 🧱',
    roblox: '¡Roblox Studio usa Lua! 🎮\n\nPara mover a tu personaje:\n```lua\nlocal jugador = game.Players.LocalPlayer\nlocal humanoid = jugador.Character.Humanoid\nhumanoid.WalkSpeed = 50\n```\n\n¡Eso hace que tu personaje corra más rápido! 🏃‍♂️',
    scratch: '¡En Scratch todo es con bloques! 🧩\n\nPara hacer que tu personaje se mueva:\n1. Arrastra el bloque "cuando presionen bandera verde"\n2. Agrega "mover 10 pasos"\n3. ¡Presiona la bandera y mira cómo se mueve!\n\n¿Qué quieres que haga tu personaje? 😊',
    matematicas: '¡Las matemáticas y la programación van juntas! 📐\n\nEn Python puedes hacer cálculos:\n```python\nsuma = 5 + 3      # 8\nresta = 10 - 4    # 6\nmulti = 3 * 7     # 21\ndivision = 15 / 3 # 5.0\n```\n¿Con qué operación tienes dudas? 🔢',
  };

  private teacherReplies: Record<string, string> = {
    default: '¡Excelente consulta pedagógica! 📚 Puedo ayudarte a diseñar actividades, analizar progreso o crear recursos. ¿Qué necesitas específicamente?',
    plan: '📋 **Plan de clase — Python básico (45 min)**\n\n**Objetivo:** Entender variables y tipos de datos\n\n**1. Apertura (5 min)**\n- Pregunta detonadora: "¿Qué guardarías en una caja mágica?"\n\n**2. Desarrollo (30 min)**\n- Demo: crear variables en pantalla\n- Actividad gamificada: cada alumno crea sus propias variables\n- Reto: programa que salude por nombre\n\n**3. Cierre (10 min)**\n- Reflexión: ¿Para qué sirven las variables en la vida real?\n- Tarea: crear 3 variables sobre tu familia\n\n¿Quieres que adapte esto para otro grado o tema?',
    rubrica: '📝 **Rúbrica de evaluación — Programación básica**\n\n| Criterio | Excelente (4) | Bueno (3) | Suficiente (2) | Insuficiente (1) |\n|---|---|---|---|---|\n| Sintaxis | Sin errores | 1-2 errores menores | 3-4 errores | Muchos errores |\n| Lógica | Solución óptima | Funciona correctamente | Funciona parcialmente | No funciona |\n| Creatividad | Solución original | Algo creativo | Sigue el ejemplo | Copia exacta |\n| Comentarios | Todos comentados | Mayoría comentados | Algunos comentarios | Sin comentarios |\n\n¿Ajusto algún criterio o nivel de dificultad?',
    rezago: '⚠️ **Estrategia para alumnos en rezago:**\n\n1. **Diagnóstico rápido** — Identifica si el problema es comprensión, motivación o técnico\n2. **Actividades diferenciadas** — Asigna misiones de nivel anterior para reforzar base\n3. **Tutor IA personalizado** — ByteBot puede dar atención 1:1 fuera del horario\n4. **Comunicación con padres** — Comparte el reporte semanal con sugerencias en casa\n5. **Retos pequeños** — Tareas cortas de 10 min para recuperar confianza\n\n¿Cuántos alumnos tienen esta situación en tu salón?',
    proyecto: '💻 **Ideas de proyectos por materia:**\n\n🐍 **Python:** Calculadora de calificaciones, juego de adivinanzas\n🌐 **HTML/CSS:** Página de presentación personal, blog de clase\n🧩 **Scratch:** Juego de plataformas, historia animada\n🤖 **Robótica:** Sensor de luz con LED, brazo robot de cartón\n🎮 **Roblox Studio:** Mundo temático de su ciudad/escuela\n\n¿Para qué materia y grado necesitas el proyecto?',
  };

  private parentReplies: Record<string, string> = {
    default: '¡Hola! 💙 Estoy aquí para ayudarte a entender el progreso de tu hijo/a y apoyarlo en casa. ¿Qué te gustaría saber?',
    progreso: '📊 **¿Qué significa el progreso del 78%?**\n\nSignifica que tu hijo/a ha completado el 78% de las actividades asignadas este período. ¡Es un avance muy bueno! 🌟\n\n**Para seguir mejorando:**\n• Reserva 20 min al día para practicar\n• Pregúntale qué aprendió hoy\n• Celebra cada logro, por pequeño que sea\n\n¿Quieres ver en qué materia específica necesita más apoyo?',
    motivar: '💪 **Cómo motivar a tu hijo/a:**\n\n1. **Conecta con sus intereses** — ¿Le gustan los videojuegos? ¡Roblox Studio los convierte en creadores!\n2. **Rutina fija** — 20 minutos después de la comida, sin teléfono\n3. **Celebra pequeños logros** — Cada misión completada merece un "¡bravo!"\n4. **Programa juntos** — Pídele que te explique lo que está aprendiendo\n5. **Retos familiares** — Hagan un mini-proyecto juntos el fin de semana\n\n¿Cuál de estas ideas te parece más fácil de empezar?',
    python: '🐍 **¿Qué es Python?**\n\nPython es uno de los lenguajes de programación más populares del mundo — y es perfecto para niños porque se lee casi como español.\n\nCon Python tu hijo/a puede:\n• Crear videojuegos 🎮\n• Hacer cálculos matemáticos 📐\n• Analizar datos como un científico 🔬\n• Construir páginas web 🌐\n\n**Empresas como Google, Netflix e Instagram usan Python.** ¡Tu hijo/a está aprendiendo una habilidad del futuro!',
    roblox: '🎮 **¿Roblox Studio es educativo?**\n\n¡Absolutamente! Roblox Studio no es solo jugar — es **crear** videojuegos usando Lua, un lenguaje de programación real.\n\nTu hijo/a aprende:\n• Programación y lógica 💻\n• Diseño 3D y modelado 🏗️\n• Matemáticas aplicadas 📐\n• Trabajo en equipo 👥\n\n¡Muchos jóvenes generan ingresos reales publicando sus juegos en Roblox!',
  };

  private adminReplies: Record<string, string> = {
    default: '📊 Analizando los datos disponibles... ¿Qué aspecto institucional deseas revisar? Puedo generar reportes de rendimiento, identificar tendencias o diseñar estrategias de mejora.',
    reporte: '📄 **REPORTE EJECUTIVO — ByteKids Academy**\n_Período: Marzo 2026_\n\n**RESUMEN EJECUTIVO**\nLa institución muestra un crecimiento sólido con 85 alumnos activos (+12 este mes). El promedio escolar de 76% supera el objetivo trimestral del 72%.\n\n**INDICADORES CLAVE**\n✅ Alumnos activos: 85 (+16%)\n✅ Promedio escolar: 76% (+5pp)\n✅ Misiones completadas: 1,840 esta semana\n⚠️ Salón 5°A requiere intervención: 62% promedio\n\n**RECOMENDACIONES**\n1. Reforzar 5°A con sesiones de tutoría adicionales\n2. Replicar metodología de 2°A (88%) en otros grupos\n3. Aumentar uso del Tutor IA en horario extraescolar\n\n¿Deseas el reporte completo por salón o por materia?',
    rezago: '⚠️ **Análisis de salones en riesgo:**\n\n🔴 **5°A — Atención urgente (62%)**\n- Materias más afectadas: Python (-18%), Robótica (-22%)\n- Maestro: Profa. López (satisfacción 87% — revisar)\n- Acción recomendada: Sesión de nivelación + revisión metodológica\n\n🟡 **4°A — Seguimiento (70%)**\n- Tendencia positiva +5% — mantener estrategia actual\n\n🟢 **2°A, 3°B — Excelente (88%, 82%)**\n- Compartir buenas prácticas con otros docentes\n\n¿Autorizas generar un plan de intervención para 5°A?',
    expansion: '🇲🇽 **Estrategia de expansión — México**\n\n**Fase 1 (Ya lista):** Plataforma funcional con 4 roles\n**Fase 2 (3 meses):** Piloto con 5 escuelas públicas CDMX\n**Fase 3 (6 meses):** Convenio con SEP para programa estatal\n**Fase 4 (12 meses):** 100 escuelas en Edo. Méx., CDMX, Jalisco\n\n**Propuesta de valor para gobierno:**\n- IA en cada aula sin costo adicional de infraestructura\n- Reportes automáticos de impacto educativo\n- Compatible con programa SEP existente\n\n¿Quieres que prepare la presentación ejecutiva para la propuesta?',
  };

  private getBestReply(input: string, replies: Record<string, string>): string {
    const lower = input.toLowerCase();
    const keys = Object.keys(replies).filter(k => k !== 'default');
    for (const key of keys) {
      if (lower.includes(key)) return replies[key];
    }
    // Check partial matches
    if (lower.includes('plan') || lower.includes('clase')) return replies['plan'] || replies['default'];
    if (lower.includes('progreso') || lower.includes('%')) return replies['progreso'] || replies['default'];
    if (lower.includes('reporte') || lower.includes('ejecutivo')) return replies['reporte'] || replies['default'];
    if (lower.includes('rezago') || lower.includes('apoyo') || lower.includes('riesgo')) return replies['rezago'] || replies['default'];
    if (lower.includes('motiv')) return replies['motivar'] || replies['default'];
    if (lower.includes('roblox')) return replies['roblox'] || replies['roblox'];
    if (lower.includes('python')) return replies['python'] || replies['python'];
    if (lower.includes('scratch')) return replies['scratch'] || replies['scratch'];
    if (lower.includes('html') || lower.includes('web')) return replies['html'] || replies['default'];
    if (lower.includes('matemat') || lower.includes('calculo')) return replies['matematicas'] || replies['default'];
    if (lower.includes('expan') || lower.includes('mexico') || lower.includes('escuela')) return replies['expansion'] || replies['default'];
    if (lower.includes('proyecto')) return replies['proyecto'] || replies['default'];
    if (lower.includes('rúbrica') || lower.includes('evaluac')) return replies['rubrica'] || replies['default'];
    return replies['default'];
  }

  async sendMessage(messages: ChatMessage[], role: TutorRole, userMessage: string): Promise<string> {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
    const lower = userMessage.toLowerCase();
    switch (role) {
      case 'student': return this.getBestReply(lower, this.studentReplies);
      case 'teacher': return this.getBestReply(lower, this.teacherReplies);
      case 'parent':  return this.getBestReply(lower, this.parentReplies);
      case 'admin':   return this.getBestReply(lower, this.adminReplies);
      default: return '¡Hola! ¿En qué puedo ayudarte?';
    }
  }
}
