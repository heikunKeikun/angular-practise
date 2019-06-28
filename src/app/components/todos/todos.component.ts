import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';

import { Todo } from '../../models/Todo';
import { PassThrough } from 'stream';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      console.log(todos);
      this.todos = todos;
    });
  }

  // removes all todos with the same description. fix it.
  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo).subscribe(() => {
      console.log(this.todos);
      this.todos = this.todos.filter(t => t.id !== todo.id);
      console.log(this.todos);
    });
  }

  addTodo(todo: Todo) {
    console.log(this.todos);
    console.log(todo);
    let biggest: number = this.todos[0].id;
    for (let todo of this.todos) todo.id > biggest ? biggest = todo.id : 0;
    todo.id = biggest + 1;
    console.log(todo);
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
      console.log(this.todos);
    })
  }
}
