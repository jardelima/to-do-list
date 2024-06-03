import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Todo {
  message: string;
  todos: [
    {
      id: string;
      todo: string;
    }
  ];
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  addTodo(todo: string): Observable<Todo> {
    return this.http.post<Todo>('http://localhost:3000/add-todo', { todo });
  }

  deleteTodo(todoId: string) {
    return this.http.delete<Todo>(`http://localhost:3000/delete-todo/${todoId}`);
  }

  updateTodo(todoId: string, todoUpdated: string) {
    return this.http.patch<Todo>(`http://localhost:3000/update-todo/${todoId}`, { todoUpdated });
  }

  getTodos(): Observable<Todo> {
    return this.http.get<Todo>('http://localhost:3000/todos');
  }
}
