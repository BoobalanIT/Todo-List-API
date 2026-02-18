import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TodoService, Todo, TodoResponse } from '../../services/todo.service';

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
    todos: Todo[] = [];
    page = 1;
    limit = 6;
    total = 0;
    searchQuery = '';
    sortBy = '-createdAt';

    // Form state
    showForm = false;
    editingTodo: Todo | null = null;
    formTitle = '';
    formDescription = '';
    formLoading = false;
    formError = '';

    // Toast
    toastMessage = '';
    toastType: 'success' | 'error' = 'success';
    toastVisible = false;

    constructor(
        private todoService: TodoService,
        public authService: AuthService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadTodos();
    }

    loadTodos(): void {
        this.todoService.getTodos(this.page, this.limit, this.searchQuery, this.sortBy).subscribe({
            next: (res: TodoResponse) => {
                this.todos = res.data;
                this.total = res.total;
                this.cdr.detectChanges();
            },
            error: () => {
                this.showToast('Failed to load todos', 'error');
            }
        });
    }

    get totalPages(): number {
        return Math.ceil(this.total / this.limit);
    }

    onSearch(): void {
        this.page = 1;
        this.loadTodos();
    }

    onSortChange(): void {
        this.page = 1;
        this.loadTodos();
    }

    goToPage(p: number): void {
        if (p >= 1 && p <= this.totalPages) {
            this.page = p;
            this.loadTodos();
        }
    }

    openCreateForm(): void {
        this.editingTodo = null;
        this.formTitle = '';
        this.formDescription = '';
        this.formError = '';
        this.showForm = true;
    }

    openEditForm(todo: Todo): void {
        this.editingTodo = todo;
        this.formTitle = todo.title;
        this.formDescription = todo.description || '';
        this.formError = '';
        this.showForm = true;
    }

    closeForm(): void {
        this.showForm = false;
        this.editingTodo = null;
    }

    submitForm(): void {
        if (!this.formTitle.trim()) {
            this.formError = 'Title is required';
            return;
        }

        this.formLoading = true;
        this.formError = '';

        if (this.editingTodo) {
            this.todoService.updateTodo(this.editingTodo._id, this.formTitle, this.formDescription).subscribe({
                next: () => {
                    this.showToast('Todo updated!', 'success');
                    this.closeForm();
                    this.loadTodos();
                    this.formLoading = false;
                },
                error: (err) => {
                    this.formError = err.error?.message || 'Update failed';
                    this.formLoading = false;
                }
            });
        } else {
            this.todoService.createTodo(this.formTitle, this.formDescription).subscribe({
                next: () => {
                    this.showToast('Todo created!', 'success');
                    this.closeForm();
                    this.loadTodos();
                    this.formLoading = false;
                },
                error: (err) => {
                    this.formError = err.error?.message || 'Creation failed';
                    this.formLoading = false;
                }
            });
        }
    }

    deleteTodo(todo: Todo): void {
        if (!confirm('Delete this todo?')) return;

        this.todoService.deleteTodo(todo._id).subscribe({
            next: () => {
                this.showToast('Todo deleted', 'success');
                this.loadTodos();
            },
            error: () => {
                this.showToast('Delete failed', 'error');
            }
        });
    }

    showToast(message: string, type: 'success' | 'error'): void {
        this.toastMessage = message;
        this.toastType = type;
        this.toastVisible = true;
        setTimeout(() => (this.toastVisible = false), 3000);
    }

    logout(): void {
        this.authService.logout();
    }
}
