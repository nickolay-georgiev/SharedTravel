import { MatSnackBar } from '@angular/material/snack-bar';

export function snackBarInfo(message: string, snackBar: MatSnackBar) {
    snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: ['green-snackbar'],
    });
}

export function snackBarError(message: string, snackBar: MatSnackBar) {
    snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: ['red-snackbar'],
    });
}