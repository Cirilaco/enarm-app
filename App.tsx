import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  FlatList,
  StatusBar,
} from 'react-native';
import { CheckCircle2, Circle, Calendar, BookOpen, Clock, Trophy, ChevronRight, ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Task {
  title: string;
  time: string;
  category: string;
}

interface DaySchedule {
  day: number;
  tasks: Task[];
}

interface Subject {
  name: string;
  weight: number;
}

const subjects: Subject[] = [
  { name: 'Pediatría', weight: 0.17 },
  { name: 'Gineco-Obstetricia', weight: 0.17 },
  { name: 'Cirugía General', weight: 0.15 },
  { name: 'Medicina Interna', weight: 0.35 },
  { name: 'Especialidades/Miscelánea', weight: 0.16 }
];

const generateSchedule = (): DaySchedule[] => {
  const totalDays = 180;
  const schedule: DaySchedule[] = [];
  const topics = {
    pediatria: ['Recién Nacido Sano', 'Reanimación Neonatal', 'Crecimiento y Desarrollo', 'Vacunas', 'Infecciosas Exantemáticas', 'Gastroenteritis', 'Deshidratación', 'Neumonías', 'Asma Pediátrica', 'Maltrato Infantil', 'Tamiz Neonatal'],
    gineco: ['Control Prenatal', 'Hemorragias 1er Trimestre', 'Hemorragias 2do Trimestre', 'Preeclampsia/Eclampsia', 'Diabetes Gestacional', 'Parto y Puerperio', 'Cáncer Cervicouterino', 'Cáncer de Mama', 'SOP', 'Infecciones Vaginales'],
    cirugia: ['Apendicitis Aguda', 'Colecistitis/Colelitiasis', 'Hernsias de Pared', 'Trauma Abdominal (ATLS)', 'Obstrucción Intestinal', 'Quemaduras', 'Patología Anorrectal', 'Urología Básica'],
    interna: ['Cardio: HTA e Infarto', 'Endocrino: Diabetes y Tiroides', 'Neumo: EPOC y Asma', 'Infecto: VIH y TB', 'Nefro: LRA y ERC', 'Neuro: EVC y Cefaleas', 'Hematología: Anemias'],
    repaso: ['Repaso GPC: Hipertensión', 'Repaso GPC: Diabetes', 'Repaso GPC: Vacunas', 'Simulacro 100 preguntas']
  };

  for (let i = 1; i <= totalDays; i++) {
    let dailyTopics: Task[] = [];

    if (i % 7 === 0) {
      dailyTopics = [{ title: 'DESCANSO TOTAL - Recarga energías', time: '0h', category: 'Descanso' }];
    } else {
      if (i <= 60) {
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
      } else if (i <= 150) {
        dailyTopics = [
          { title: `GPC + Algoritmos: ${topics.interna[i % topics.interna.length]}`, time: '1.5h', category: 'Medicina Interna' },
          { title: `Caso Clínico: ${topics.gineco[i % topics.gineco.length]}`, time: '1.5h', category: 'Gineco-Obstetricia' },
          { title: 'Flashcards Repaso Rápido', time: '1h', category: 'Especialidades' }
        ];
      } else {
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

const App: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  useEffect(() => {
    setSchedule(generateSchedule());
  }, []);

  const toggleTask = (day: number, taskIndex: number) => {
    const key = `${day}-${taskIndex}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateProgress = (): number => {
    if (schedule.length === 0) return 0;
    const totalTasks = schedule.reduce((acc, day) => acc + day.tasks.length, 0);
    const completed = Object.values(completedTasks).filter(Boolean).length;
    return Math.round((completed / totalTasks) * 100);
  };

  const currentDaySchedule = schedule[currentDay - 1];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Plan ENARM 180 Días</Text>
            <Text style={styles.subtitle}>Manuales AMIR México • 4h Efectivas</Text>
          </View>
          <View style={styles.progressSection}>
            <View style={styles.progressText}>
              <Text style={styles.progressLabel}>Progreso Total</Text>
              <Text style={styles.progressValue}>{calculateProgress()}%</Text>
            </View>
            <View style={styles.trophy}>
              <Trophy size={24} color="#fbbf24" />
            </View>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${calculateProgress()}%` }]} />
        </View>

        {/* Navigation Grid */}
        <View style={styles.navigationCard}>
          <View style={styles.navigationHeader}>
            <Calendar size={18} color="#000" />
            <Text style={styles.navigationTitle}>Navegación</Text>
          </View>
          <View style={styles.navigationGrid}>
            {schedule.slice(Math.max(0, currentDay - 13), Math.min(180, currentDay + 12)).map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setCurrentDay(item.day)}
                style={[
                  styles.dayButton,
                  currentDay === item.day && styles.dayButtonActive
                ]}
              >
                <Text style={[styles.dayButtonText, currentDay === item.day && styles.dayButtonTextActive]}>
                  {item.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Priority Subjects */}
        <View style={styles.subjectsCard}>
          <View style={styles.navigationHeader}>
            <BookOpen size={18} color="#000" />
            <Text style={styles.navigationTitle}>Prioridades AMIR</Text>
          </View>
          <View style={styles.subjectsList}>
            {subjects.map(subject => (
              <View key={subject.name} style={styles.subjectItem}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectWeight}>{Math.round(subject.weight * 100)}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Main Study Content */}
        {currentDaySchedule && (
          <View style={styles.mainCard}>
            <View style={styles.dayHeader}>
              <View>
                <Text style={styles.dayLabel}>Sesión de Estudio</Text>
                <Text style={styles.dayNumber}>Día {currentDay} de 180</Text>
              </View>
              <View style={styles.navButtons}>
                <TouchableOpacity
                  onPress={() => setCurrentDay(prev => Math.max(1, prev - 1))}
                  style={styles.navButton}
                >
                  <ChevronLeft size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setCurrentDay(prev => Math.min(180, prev + 1))}
                  style={styles.navButton}
                >
                  <ChevronRight size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tasksContainer}>
              {currentDaySchedule.tasks.map((task, idx) => {
                const isCompleted = completedTasks[`${currentDay}-${idx}`];
                const isRestDay = task.category === 'Descanso';

                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => toggleTask(currentDay, idx)}
                    style={[
                      styles.taskItem,
                      isCompleted && styles.taskItemCompleted
                    ]}
                  >
                    <View style={styles.taskLeft}>
                      {isCompleted ? (
                        <CheckCircle2 size={24} color="#10b981" />
                      ) : (
                        <Circle size={24} color="#d1d5db" />
                      )}
                      <View style={styles.taskContent}>
                        <Text style={[styles.taskTitle, isCompleted && styles.taskTitleCompleted]}>
                          {task.title}
                        </Text>
                        <View style={styles.taskMeta}>
                          <Text style={styles.taskCategory}>{task.category}</Text>
                          <View style={styles.taskTime}>
                            <Clock size={12} color="#9ca3af" />
                            <Text style={styles.taskTimeText}>{task.time}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}

              {currentDaySchedule.tasks[0]?.category === 'Descanso' && (
                <View style={styles.restMessage}>
                  <View style={styles.restIcon}>
                    <Clock size={32} color="#3b82f6" />
                  </View>
                  <Text style={styles.restTitle}>¡Día de Recuperación!</Text>
                  <Text style={styles.restText}>Dormir y descansar es parte del aprendizaje. El cerebro consolida lo estudiado hoy.</Text>
                </View>
              )}
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Tip del experto: Usa la Técnica Pomodoro (50 min estudio / 10 min descanso).</Text>
              <Text style={styles.footerTime}>Estudio Efectivo: 4h/día</Text>
            </View>
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipCard}>
            <View style={styles.tipHeader}>
              <BookOpen size={14} color="#b45309" />
              <Text style={styles.tipTitle}>Método AMIR</Text>
            </View>
            <Text style={styles.tipText}>No intentes memorizar todo el manual. Enfócate en las tablas, los "Recuerda" y los algoritmos de la GPC de México.</Text>
          </View>
          <View style={[styles.tipCard, styles.tipCard2]}>
            <View style={styles.tipHeader}>
              <Clock size={14} color="#1e40af" />
              <Text style={[styles.tipTitle, styles.tipTitle2]}>Gestión de Tiempo</Text>
            </View>
            <Text style={[styles.tipText, styles.tipText2]}>Si un día no terminas un tema, no lo arrastres. Manten la agenda del día siguiente para no perder el ritmo.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressText: {
    alignItems: 'flex-end',
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  trophy: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  navigationCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  navigationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  navigationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    width: width / 6 - 16,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayButtonActive: {
    backgroundColor: '#2563eb',
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94a3b8',
  },
  dayButtonTextActive: {
    color: '#fff',
  },
  subjectsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  subjectsList: {
    gap: 8,
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectName: {
    fontSize: 14,
    color: '#334155',
  },
  subjectWeight: {
    fontSize: 12,
    color: '#94a3b8',
    fontFamily: 'Courier New',
  },
  mainCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  dayHeader: {
    backgroundColor: '#1e293b',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  navButton: {
    padding: 8,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  tasksContainer: {
    padding: 24,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  taskItemCompleted: {
    borderColor: '#a7f3d0',
    backgroundColor: '#f0fdf4',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    color: '#059669',
    textDecorationLine: 'line-through',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskCategory: {
    fontSize: 10,
    backgroundColor: '#f1f5f9',
    color: '#475569',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  taskTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  taskTimeText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  restMessage: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  restIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  restTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  restText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 240,
  },
  footer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748b',
    flex: 1,
  },
  footerTime: {
    fontSize: 12,
    color: '#64748b',
    fontFamily: 'Courier New',
  },
  tipsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  tipCard: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fde68a',
    borderRadius: 12,
    padding: 16,
  },
  tipCard2: {
    backgroundColor: '#dbeafe',
    borderColor: '#bfdbfe',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#92400e',
  },
  tipTitle2: {
    color: '#1e40af',
  },
  tipText: {
    fontSize: 12,
    color: '#b45309',
    lineHeight: 18,
  },
  tipText2: {
    color: '#1e40af',
  },
});

export default App;
