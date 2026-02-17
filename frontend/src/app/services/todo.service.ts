import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    user: string;
    createdAt: string;
}

export interface TodoResponse {
    data: Todo[];
    page: number;
    limit: number;
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private apiUrl = '/api/todos';

    constructor(private http: HttpClient) { }

    getTodos(page = 1, limit = 1, title = '', sort = '-createdAt'): Observable<TodoResponse> {
        let params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('sort', sort);

        if (title) {
            params = params.set('title', title);
        }

        return this.http.get<TodoResponse>(this.apiUrl, { params });
    }

    createTodo(title: string, description: string): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, { title, description });
    }

    updateTodo(id: string, title: string, description: string): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, { title, description });
    }

    deleteTodo(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
