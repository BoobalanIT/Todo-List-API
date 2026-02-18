import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://todo-list-api-tt9t.onrender.com/api/';
    private tokenKey = 'todo_token';
    private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    isLoggedIn$ = this.loggedIn.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    private hasToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    register(name: string, email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, { name, email, password }).pipe(
            tap(res => {
                localStorage.setItem(this.tokenKey, res.token);
                this.loggedIn.next(true);
            })
        );
    }

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(res => {
                localStorage.setItem(this.tokenKey, res.token);
                this.loggedIn.next(true);
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
    }
}
