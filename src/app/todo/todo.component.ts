import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Todo } from "../todo";
import { TodosService } from '../services/todos.service';

@Component({
	selector: 'todo',
	templateUrl: './todo.component.html',
	styleUrls: [ './todo.component.css' ]
})
export class TodoComponent implements OnInit {

	todo: Todo = {
		_id: "",
		nom: "",
		presentation: ""
	};
	changeTodo: Todo = {
		_id: "",
		nom: "",
		presentation: ""
	};
	editTodo = false;
	editPres = false;
	presExiste = false;

	constructor(
		private todosService: TodosService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		
		this.afficheItem();

	}

	afficheItem(): void {
		this.todosService.getTodo(this.route.snapshot.paramMap.get('id'))
			.subscribe(todo => {
				this.todo = todo[0];
				
				if( this.todo.presentation === undefined 
				 || this.todo.presentation === null 
				 || this.todo.presentation === "" ) {
					this.presExiste = false;
				}
				else {
					this.presExiste = true;
				}
			});
	};

	// Fonction modifier tache
	modifierTodo(): void {
		if( this.editTodo === false) {
			this.changeTodo = {
				_id: "",
				nom: "",
				presentation: ""
			};
			this.changeTodo.nom = this.todo.nom;
		}
		else {
			this.changeTodo = {
				_id: "",
				nom: "",
				presentation: ""
			};
		}
		this.editTodo = !this.editTodo;
		this.editPres = false;		
	};

	confirmerTodo(item): void {
		this.todosService.putTodo(item._id, this.changeTodo)
			.subscribe(() => {
				this.todo.nom = this.changeTodo.nom;
				this.modifierTodo();
			});
	};


// Fonction modifier presentation
	modifierPres(): void {
		if( this.editPres === false) {
			this.changeTodo = {
				_id: "",
				nom: "",
				presentation: ""
			};
			this.changeTodo.presentation = this.todo.presentation;
		}
		else {
			this.changeTodo = {
				_id: "",
				nom: "",
				presentation: ""
			};
		}
		this.editPres = !this.editPres;
		this.editTodo = false;
	};

	confirmerPres(item) : void{
		this.todosService.putTodoPres(item._id, this.changeTodo)
			.subscribe(() => {
				this.todo.presentation = this.changeTodo.presentation;

			// S'il n'y a plus de présentation	
				if( this.todo.presentation === undefined 
				 || this.todo.presentation === null 
				 || this.todo.presentation === "" ) {
					this.presExiste = false;
				}
				else {
					this.presExiste = true;
				}

				this.modifierPres();
			});
	};
}