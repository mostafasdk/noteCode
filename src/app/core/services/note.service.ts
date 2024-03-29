import { HttpClient } from '@angular/common/http'
import { Note } from '../models/note.model';
import { BehaviorSubject, Observable, Subject, map, switchMap, tap } from 'rxjs'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CodeSnippet } from '../models/codesnippet.model';

@Injectable({
    providedIn: 'root'
})

export class NoteService {
    private userNotes$ = new Subject<Note[]>;

    constructor(private http: HttpClient) {}

    getUserNotesObservable(): Observable<Note[]> {
        return this.userNotes$.asObservable();
    }

    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(`${environment.apiUrl}/admin/notes`)
    }

    getNoteById(id: number): Observable<Note> {
        return this.http.get<Note>(`${environment.apiUrl}/notes/${id}`);
    }

    addNote(note: {title: string, description: string, codes: CodeSnippet[], codetags: string[]}) {
        return this.http.post<Note>(`${environment.apiUrl}/notes`, note).pipe(
            tap(() => this.refreshUserNotes())
        );
    }

    refreshUserNotes() {
        return this.http.get<Note[]>(`${environment.apiUrl}/notes`).pipe(
            tap(notes => this.userNotes$.next(notes))
        ).subscribe();
    }

    updateNote(updatedNote: Note, id: number): Observable<Note> {
        return this.getNoteById(id).pipe(
            switchMap(() => this.http.put<Note>(`${environment.apiUrl}/notes/${id}`, updatedNote))
        )
    }

    deleteNote(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${environment.apiUrl}/notes/${id}`);
    }
}