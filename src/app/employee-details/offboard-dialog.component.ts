import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-offboard-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    template: `
    <h2 mat-dialog-title>Offboard</h2>
    <mat-dialog-content class="dialog-content">
      <form [formGroup]="form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Receiver</mat-label>
          <input matInput formControlName="receiver">
          <mat-error *ngIf="form.controls['receiver'].errors?.['required']">
            Receiver name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email">
          <mat-error *ngIf="form.controls['email'].errors?.['required']">
            Email is required
          </mat-error>
          <mat-error *ngIf="form.controls['email'].errors?.['email']">
            Please enter a valid email address
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone">
          <mat-error *ngIf="form.controls['phone'].errors?.['pattern']">
            Please enter a valid phone number
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Street line</mat-label>
          <input matInput formControlName="streetLine">
        </mat-form-field>

        <div class="row">
          <mat-form-field appearance="outline" class="half-width">
            <mat-label>City</mat-label>
            <input matInput formControlName="city">
          </mat-form-field>

          <mat-form-field appearance="outline" class="half-width">
            <mat-label>Postal code</mat-label>
            <input matInput formControlName="postalCode">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Country</mat-label>
          <input matInput formControlName="country">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Notes</mat-label>
          <textarea matInput formControlName="notes" rows="3" maxlength="500"></textarea>
          <mat-hint align="end">{{form.controls['notes'].value?.length || 0}}/500</mat-hint>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">CANCEL</button>
      <button mat-raised-button color="primary" (click)="onConfirm()" [disabled]="!form.valid">
        CONFIRM
      </button>
    </mat-dialog-actions>
  `,
    styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .dialog-content {
      padding-top: 10px !important;
    }
    .row {
      display: flex;
      gap: 15px;
    }
    .half-width {
      width: 50%;
    }
  `]
})
export class OffboardDialogComponent {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<OffboardDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.fb.group({
            receiver: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.pattern(/^\+?[\d\s-]+$/)]],
            streetLine: [''],
            city: [''],
            postalCode: [''],
            country: [''],
            notes: ['', [Validators.maxLength(500)]]
        });

        // Initialize form with existing data
        if (data) {
            this.form.patchValue({
                receiver: data.receiver || '',
                email: data.email || '',
                phone: data.phone || '',
                streetLine: data.streetLine || '',
                city: data.city || '',
                postalCode: data.postalCode || '',
                country: data.country || '',
                notes: data.notes || ''
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    onConfirm(): void {
        if (this.form.valid) {
            this.dialogRef.close({
                id: this.data.employeeId,
                ...this.form.value
            });
        }
    }
} 