import { Component, Input, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { TodoService } from './todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapCheck2, bootstrapPencil, bootstrapTrash } from '@ng-icons/bootstrap-icons';

interface Todo {
  id: string;
  todo: string;
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    TitleComponent,
    CommonModule,
    NgIconComponent,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  providers: [TodoService],
  viewProviders: [provideIcons({ bootstrapTrash, bootstrapPencil, bootstrapCheck2 })]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private serviceTodos: TodoService) {}

  addTodo(todo: HTMLInputElement) {
    if (todo.value !== '') {
      this.serviceTodos.addTodo(todo.value).subscribe((todos) => {
        this.todos = todos.todos;
      });
      todo.value = '';
      return;
    }

    alert('Preencha sua tarefa');
  }

  deleteTodo(todoId: HTMLInputElement) {
    this.serviceTodos.deleteTodo(todoId.id).subscribe((todos) => {
      this.todos = todos.todos;
    });
  }

  updateTodo(todo: HTMLInputElement, icon: NgIcon) {
    todo.disabled = !todo.disabled;

    if (!todo.disabled) {
      icon.name = 'bootstrapCheck2';
      todo.focus();
      return;
    }

    icon.name = 'bootstrapPencil';
    this.serviceTodos.updateTodo(todo.id, todo.value).subscribe((todos) => {
      this.todos = todos.todos;
    });
  }

  ngOnInit(): void {
    this.serviceTodos.getTodos().subscribe((todos) => {
      this.todos = todos.todos;
    });
  }
}
