import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import { BooksService } from "../shared/services";
import { BooksPageActions, BooksApiActions } from "./actions";
import {of} from "rxjs";


@Injectable()
export class BooksApiEffects {
    constructor(private booksService: BooksService, private actions$: Actions) {}

    loadBooks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BooksPageActions.enter),
            mergeMap(() =>
                this.booksService
                    .all()
                    .pipe(
                        map(books => BooksApiActions.booksLoaded({ books })),
                        catchError(err => of({ type: 'Books Loaded Failure'})))
            )
        )
    );
}