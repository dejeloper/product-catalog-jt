import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {StarRating} from './star-rating.component';

describe('StarRating', () => {
  let fixture: ComponentFixture<StarRating>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(StarRating);
    fixture.componentRef.setInput('rating', 3);
    await fixture.whenStable();
  });

  it('displays correct aria-label', () => {
    const span: HTMLElement = fixture.nativeElement.querySelector('[aria-label]');
    expect(span.getAttribute('aria-label')).toBe('Puntuación 3 de 5');
  });

  it('fills correct width for rating', () => {
    const fill: HTMLElement = fixture.nativeElement.querySelector('.overflow-hidden');
    expect(fill.style.width).toBe('60%');
  });

  it('renders 0% width for rating 0', async () => {
    fixture.componentRef.setInput('rating', 0);
    await fixture.whenStable();
    const fill: HTMLElement = fixture.nativeElement.querySelector('.overflow-hidden');
    expect(fill.style.width).toBe('0%');
  });

  it('renders 100% width for rating 5', async () => {
    fixture.componentRef.setInput('rating', 5);
    await fixture.whenStable();
    const fill: HTMLElement = fixture.nativeElement.querySelector('.overflow-hidden');
    expect(fill.style.width).toBe('100%');
  });

  it('applies text-sm class for sm size', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('text-sm')).toBe(true);
    expect(span.classList.contains('text-lg')).toBe(false);
  });

  it('applies text-lg class for lg size', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.classList.contains('text-lg')).toBe(true);
    expect(span.classList.contains('text-sm')).toBe(false);
  });
});
