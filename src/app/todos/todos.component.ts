import { Component, OnInit } from '@angular/core';

import { Todo } from "../todo";
import { TodosService } from '../services/todos.service';

@Component({
	selector: 'todos',
	templateUrl: './todos.component.html',
	styleUrls: [ './todos.component.css' ]
})
export class TodosComponent implements OnInit {
	todos: Todo[];
	newTodo: Todo = {
		_id: "",
		nom: "",
		presentation: ""
	};
	recherche: Todo = {
		_id: "",
		nom: "",
		presentation: ""
	};
	chargement: Boolean;

	constructor(
		private todosService: TodosService) { }

	ngOnInit(): void {
		this.chargement = true;
		this.getTodos();
		this.toutSelectionne = false;
	}


	// Fonctions CRUD
	getTodos(): void {
		this.todosService
				.getTodos()
				.subscribe(todos => {
					this.todos = todos;
					this.chargement = false;

					for (var i = 0; i < this.todos.length; i++) {
						this.selectionne[i] = false;
						this.edit[i] = false;	
					}
				});
		}

	ajouterTodo(newTodo: Todo): void {
		this.todosService
				.postTodo(newTodo)
				.subscribe(newTodo => {
					this.todos.push(newTodo);
					this.newTodo = {
						_id: "",
						nom: "",
						presentation: ""
					}
					this.toutSelectionne = false;
					this.selectionne.push(false);
					this.edit.push(false);
				});
	}

	supprimerTodo(todo: Todo, index: number): void {
		this.todosService
				.deleteTodo(todo._id)
				.subscribe(() => {
					this.todos.splice(index, 1);
					this.selectionne.splice(index, 1);
					this.edit.splice(index, 1);

					// Si tous les autres item sont sélectionnés, il faut actualiser 'toutSelectionne'
					var nbSelectionne = 0; 
					for (var i = 0; i < this.todos.length; i++) {
						if (this.selectionne[i] === true) {
							nbSelectionne++;
						}	
					}
					if(nbSelectionne === this.todos.length) {
						this.toutSelectionne = true;
					}
					if(this.todos.length === 0) {
						this.toutSelectionne = false;
					}
				});
	}

	supprimeToutSelectionne(): void {
		for (var i=this.todos.length-1; i>=0; i--) {
			if( this.selectionne[i] === true ) {
				this.supprimerTodo(this.todos[i], i);
			}
		}
		this.toutSelectionne = false;
	};

	// Fonctions modifier
	changeTodo: Todo = {
		_id: "",
		nom: "",
		presentation: ""
	};
	edit = [];

	modifier(index): void {
		if( this.edit[index] === true) {
			this.edit[index] = false;
			this.changeTodo = {
				_id: "",
				nom: "",
				presentation: ""
			};
		}
		else {
			for (var i = 0; i < this.edit.length; i++) {
				this.edit[i] = false;
			}
			this.edit[index] = true;
			this.changeTodo.nom = this.todos[index].nom;
		}
	};

	confirmer(item, index): void {
		this.todosService
				.putTodo(item._id, this.changeTodo)
				.subscribe(() => {
					this.todos[index].nom = this.changeTodo.nom;
					this.modifier(index);
				});
	};

	// Fonctions sur la sélection
	selectionne = [];
	toutSelectionne;

	changeSelectionTotalBouton(): void {
		if( this.toutSelectionne === false	 ){
			this.toutSelectionne = true;
			for (var i = 0; i < this.selectionne.length; i++) {
				this.selectionne[i] = true;
			}
		}
		else {
			this.toutSelectionne = false;
			for (var i = 0; i < this.selectionne.length; i++) {
				this.selectionne[i] = false;
			}
		}
	};

	changeSelectionTotal(): void {
		if( this.toutSelectionne === true ){
			for (var i = 0; i < this.selectionne.length; i++) {
				this.selectionne[i] = true;
			}
		}
		else {
			for (var i = 0; i < this.selectionne.length; i++) {
				this.selectionne[i] = false;
			}
		}
	};

	changeSelectionIndex(index): void {
		if( this.selectionne[index] === false ){
			this.toutSelectionne = false;
		}
		else {
			this.toutSelectionne = true;
			for (var i = 0; i < this.selectionne.length; i++) {
				if (this.selectionne[i] === false) {
					this.toutSelectionne = false;
				}
			}
		}
	};
}

