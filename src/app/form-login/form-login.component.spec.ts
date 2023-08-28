import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';

import { FormLoginComponent } from './form-login.component';
import { HttpClientModule } from '@angular/common/http';
import { NumberFormatStyle } from '@angular/common';

fdescribe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLoginComponent],
      imports: [ReactiveFormsModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return is form is invalid', () => {
    const result = component.isValidForm();

    expect(result).toBe(false);
  });

  it('should return is form is valid', () => {
    component.form.controls['email'].setValue('eduarda@gmail.com');
    component.form.controls['password'].setValue('123456');

    const result = component.isValidForm();

    expect(result).toBe(true);
  });

  it('should turn button off when form is invalid', () => {
    const button = fixture.debugElement;

    expect(button.nativeElement.querySelector('.btn-login').disabled).toBe(
      true
    );
  });

  it('should turn button on when form is valid', () => {
    component.form.controls['email'].setValue('eduarda@gmail.com');
    component.form.controls['password'].setValue('123456');

    const button = fixture.debugElement;

    fixture.detectChanges();

    expect(button.nativeElement.querySelector('.btn-login').disabled).toBe(
      false
    );
  });
});
