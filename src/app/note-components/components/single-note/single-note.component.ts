import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/core/models/note.model';
import { NoteService } from 'src/app/core/services/note.service';
import { Observable, catchError, tap } from 'rxjs';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.scss']
})

export class SingleNoteComponent {
  @Input() note!: Note;
  note$!: Observable<Note>;
  codesEditingModes: boolean[] = [];

  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private highlightService: HighlightService,
              private router: Router) {}

  ngOnInit() {
    const noteId = this.route.snapshot.params['id'];
    this.note$ = this.noteService.getNoteById(noteId);
    // if(this.note && this.note.codes) {
    //   for(let _ of this.note.codes) {
    //     this.codesEditingModes.push(false);
    //   }
    // }

  }
  
}
