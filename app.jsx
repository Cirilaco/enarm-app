import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Calendar, BookOpen, Clock, Trophy, ChevronRight, ChevronLeft, Save } from 'lucide-react';

const App = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState({});
  const totalDays = 180;

  // Temas estructurados por importancia AMIR México
  const subjects = [
    { name: 'Pediatría', color: 'bg-blue-500', weight: 0.17 },
    { name: 'Gineco-Obstetricia', color: 'bg-pink-500', weight: 0.17 },
    { name: 'Cirugía General', color: 'bg-orange-500', weight: 0.15 },
    { name: 'Medicina Interna', color: 'bg-emerald-500', weight: 0.35 },
    { name: 'Especialidades/Miscelánea', color: 'bg-purple-500', weight: 0.16 }
  ];

  // Generación lógica del calendario de 180 días (6 meses)
  const generateSchedule = () => {
    const schedule = [];
    const topics = {
      pediatria: ['Recién Nacido Sano', 'Reanimación Neonatal', 'Crecimiento y Desarrollo', 'Vacunas', 'Infecciosas Exantemáticas', 'Gastroenteritis', 'Deshidratación', 'Neumonías', 'Asma Pediátrica', 'Maltrato Infantil', 'Tamiz Neonatal'],
      gineco: ['Control Prenatal', 'Hemorragias 1er Trimestre', 'Hemorragias 2do Trimestre', 'Preeclampsia/Eclampsia', 'Diabetes Gestacional', 'Parto y Puerperio', 'Cáncer Cervicouterino', 'Cáncer de Mama', 'SOP', 'Infecciones Vaginales'],
      cirugia: ['Apendicitis Aguda', 'Colecistitis/Colelitiasis', 'Hernsias de Pared', 'Trauma Abdominal (ATLS)', 'Obstrucción Intestinal', 'Quemaduras', 'Patología Anorrectal', 'Urología Básica'],
      interna: ['Cardio: HTA e Infarto', 'Endocrino: Diabetes y Tiroides', 'Neumo: EPOC y Asma', 'Infecto: VIH y TB', 'Nefro: LRA y ERC', 'Neuro: EVC y Cefaleas', 'Hematología: Anemias'],
      repaso: ['Repaso GPC: Hipertensión', 'Repaso GPC: Diabetes', 'Repaso GPC: Vacunas', 'Simulacro 100 preguntas']
    };

    for (let i = 1; i <= totalDays; i++) {
      let dailyTopics = [];
      const phase = Math.ceil(i / 60); // 1: Cimentación, 2: GPC, 3: Repaso

      // Lunes a Sábado (Día de estudio), Domingo (Descanso)
      if (i % 7 === 0) {
        dailyTopics = [{ title: 'DESCANSO TOTAL - Recarga energías', time: '0h', category: 'Descanso' }];
      } else {
        // Mezclamos temas para no aburrir
        if (i <= 60) { // Fase 1
          if (i % 2 === 0) {
            dailyTopics = [
              { title: topics.pediatria[i % topics.pediatria.length], time: '2h', category: 'Pediatría' },
              { title: topics.interna[i % topics.interna.length], time: '2h', category: 'Medicina Interna' }
            ];
          } else {
            dailyTopics = [
              { title: topics.gineco[i % topics.gineco.length], time: '2h', category: 'Gineco-Obstetricia' },
              { title: topics.cirugia[i % topics.cirugia.length], time: '2h', category: 'Cirugía General' }
            ];
          }
        } else if (i <= 150) { // Fase 2
           dailyTopics = [
              { title: `GPC + Algoritmos: ${topics.interna[i % topics.interna.length]}`, time: '1.5h', category: 'Medicina Interna' },
              { title: `Caso Clínico: ${topics.gineco[i % topics.gineco.length]}`, time: '1.5h', category: 'Gineco-Obstetricia' },
              { title: 'Flashcards Repaso Rápido', time: '1h', category: 'Especialidades' }
            ];
        } else { // Fase 3 (Sprint)
          dailyTopics = [
            { title: 'Simulacro de Bloque (50-100 preguntas)', time: '2h', category: 'Repaso' },
            { title: 'Flashcards Puntos Clave AMIR', time: '1h', category: 'Repaso' },
            { title: 'Lectura de Notas Propias', time: '1h', category: 'Repaso' }
          ];
        }
      }
      schedule.push({ day: i, tasks: dailyTopics });
    }
    return schedule;
  };

  const schedule = generateSchedule();

  const toggleTask = (day, taskIndex) => {
    const key = `${day}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateProgress = () => {
    const totalTasks = schedule.reduce((acc, day) => acc + day.tasks.length, 0);
    const completed = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completed / totalTasks) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Plan ENARM 180 Días</h1>
              <p className="text-slate-500">Manuales AMIR México • 4h Efectivas</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Progreso Total</p>
                <p className="text-2xl font-bold text-emerald-600">{calculateProgress()}%</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                <Trophy className="text-amber-400" size={24} />
              </div>
            </div>
          </div>
          
          <div className="mt-6 w-full bg-slate-100 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navegación Lateral */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <Calendar size={18} /> Navegación
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {[...Array(totalDays)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentDay(i + 1)}
                    className={`h-8 w-8 rounded-md text-xs font-medium transition-colors ${
                      currentDay === i + 1 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                )).slice(Math.max(0, currentDay - 13), Math.min(totalDays, currentDay + 12))}
              </div>
              <p className="text-[10px] text-center mt-4 text-slate-400">Mostrando días cercanos al actual</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <BookOpen size={18} /> Prioridades AMIR
              </h2>
              <ul className="space-y-2">
                {subjects.map(s => (
                  <li key={s.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${s.color}`}></span>
                      {s.name}
                    </span>
                    <span className="text-slate-400 font-mono">{Math.round(s.weight * 100)}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Panel Principal */}
          <main className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-slate-400 font-bold">Sesión de Estudio</h3>
                  <h2 className="text-2xl font-bold">Día {currentDay} de {totalDays}</h2>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentDay(prev => Math.max(1, prev - 1))}
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    <ChevronLeft />
                  </button>
                  <button 
                    onClick={() => setCurrentDay(prev => Math.min(totalDays, prev + 1))}
                    className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    <ChevronRight />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {schedule[currentDay - 1].tasks.map((task, idx) => (
                    <div 
                      key={idx}
                      onClick={() => toggleTask(currentDay, idx)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        completedTasks[`${currentDay}-${idx}`] 
                        ? 'border-emerald-200 bg-emerald-50' 
                        : 'border-slate-100 hover:border-blue-200 bg-white shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {completedTasks[`${currentDay}-${idx}`] ? (
                          <CheckCircle className="text-emerald-500 shrink-0" />
                        ) : (
                          <Circle className="text-slate-300 shrink-0" />
                        )}
                        <div>
                          <p className={`font-bold ${completedTasks[`${currentDay}-${idx}`] ? 'text-emerald-700 line-through' : 'text-slate-700'}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                              {task.category}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <Clock size={12} /> {task.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Save size={16} className={completedTasks[`${currentDay}-${idx}`] ? 'text-emerald-400' : 'text-slate-200'} />
                    </div>
                  ))}
                </div>

                {schedule[currentDay - 1].tasks[0].category === 'Descanso' && (
                  <div className="py-12 text-center">
                    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="text-blue-500" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">¡Día de Recuperación!</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mt-2 text-sm">
                      Dormir y descansar es parte del aprendizaje. El cerebro consolida lo estudiado hoy.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>Tip del experto: Usa la Técnica Pomodoro (50 min estudio / 10 min descanso).</span>
                <span className="font-mono">Estudio Efectivo: 4h/día</span>
              </div>
            </div>

            {/* Sugerencias de Método */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                <h4 className="font-bold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <BookOpen size={14} /> Método AMIR
                </h4>
                <p className="text-xs text-amber-700 leading-relaxed">
                  No intentes memorizar todo el manual. Enfócate en las tablas, los "Recuerda" y los algoritmos de la GPC de México que vienen al final de cada capítulo.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <h4 className="font-bold text-blue-800 text-sm mb-2 flex items-center gap-2">
                  <Clock size={14} /> Gestión de Tiempo
                </h4>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Si un día no terminas un tema, no lo arrastres. Manten la agenda del día siguiente para no perder el ritmo del calendario de 6 meses.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
