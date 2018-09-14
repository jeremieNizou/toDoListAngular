import { Injectable }    from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Todo } from "../todo";

@Injectable()
export class TodosService {

	private todosUrl = 'https://jeremie-nizou-todolist-api.herokuapp.com/todos/';

	constructor(private http: HttpClient) { }

	getTodos(): Observable<Todo[]> {
		return this.http.get<Todo[]>(this.todosUrl)
								.pipe(
									tap(todos => console.log(todos)),
									catchError(this.handleError('getTodos', []))
								);
	}

	getTodo(id: string): Observable<Todo> {
		return this.http.get<Todo>(this.todosUrl + id)
							 	.pipe(
									tap(_ => console.log(_)),
									catchError(this.handleError<Todo>('getTodo'))
								);
	}

	postTodo(newTodo: Todo): Observable<Todo> {
		return this.http.post<Todo>(this.todosUrl, newTodo)
							 	.pipe(
									tap(todos => console.log(todos)),
									catchError(this.handleError<Todo>('postTodo'))
								);
	}

	putTodo(id: string, newTodo: Todo): Observable<Todo> {
		return this.http.put<Todo>(this.todosUrl + "nom/" + id, newTodo)
							 	.pipe(
									tap(todos => console.log(todos)),
									catchError(this.handleError<Todo>('putTodo'))
								);
	}

	putTodoPres(id: string, newTodo: Todo): Observable<Todo> {
		return this.http.put<Todo>(this.todosUrl + "presentation/" + id, newTodo)
							 	.pipe(
									tap(todos => console.log(todos)),
									catchError(this.handleError<Todo>('putTodoPres'))
								);
	}

	deleteTodo(id: string): Observable<Todo> {
		return this.http.delete<Todo>(this.todosUrl + id)
								 .pipe(
									tap(todos => console.log(todos)),
									catchError(this.handleError<Todo>('deleteTodo'))
								);
	}




	/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
}
