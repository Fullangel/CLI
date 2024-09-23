import { readFileSync, writeFileSync, existsSync } from 'fs'; 
import { join } from 'path'; 

const TASKS_FILE = join(import.meta.dir, '../tasks.json');

interface Task {
    id: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    createdAt: string;
    updatedAt: string;
};

type TaskStatus = 'todo' | 'in-progress' | 'done';

//Constante para leer el json
const readTask = (): Task[] => {
    if(!existsSync(TASKS_FILE)){
        writeFileSync(TASKS_FILE, JSON.stringify([]));
    }
    const data = readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
};

//Escribir en el json
const writeTask = (tasks: Task[]): void => {
    writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

export const addTask = (description: string): void => {
    try{
        const tasks = readTask();
        const newTask: Task = {
            id: Date.now().toString(),
            description,
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        tasks.push(newTask);
        writeTask(tasks);
        console.log('Tarea agregada', newTask);
    } catch(error){
        console.error('Error al agregar la tarea:', error);
    }
};

export const updateTask = (id: string, status: string): void => {
    // type TaskStatus = 'todo' | 'in-progress' | 'done';
    const tasks = readTask();
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        console.log('Tarea no encontrada');
        return;
    }

    const validStatus: TaskStatus[] = ['todo', 'in-progress', 'done'];

    if(!validStatus.includes(status as TaskStatus)){
        console.log('Estado no valido');
        return;
    }

    const task = tasks[taskIndex];
    task.status = status as TaskStatus;
    task.updatedAt = new Date().toISOString();
    tasks[taskIndex] = task;
    writeTask(tasks);
    console.log('Tarea actualizada', task);
};

export const deleteTask = (id: string): void => {
    let tasks = readTask();
    tasks = tasks.filter(t => t.id !== id);
    writeTask(tasks);
    console.log('Tarea eliminada');
};

export const listenTask = (): void => {
    const tasks = readTask();
    console.log('Todas las tareas', tasks);
};

export const listTaskStatus = (status: 'todo' | 'in-progress' | 'done'): void => {
    const tasks = readTask();
    const filteredTasks = tasks.filter(t => t.status === status);
    console.log(`Tareas con estado: ${status}`, filteredTasks);
};