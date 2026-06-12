import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {Modal} from './modal.component';

describe('Modal', () => {
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(Modal);
    await fixture.whenStable();
  });

  it('emits close on escape when open', () => {
    const spy = vi.fn();
    fixture.componentRef.setInput('open', true);
    fixture.componentInstance.close.subscribe(spy);

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(spy).toHaveBeenCalled();
  });

  it('does not emit close on escape when closed', () => {
    const spy = vi.fn();
    fixture.componentRef.setInput('open', false);
    fixture.componentInstance.close.subscribe(spy);

    document.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    expect(spy).not.toHaveBeenCalled();
  });

  it('locks body scroll when open', async () => {
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    fixture.componentRef.setInput('open', true);
    fixture.componentRef.setInput('open', false);
    expect(document.body.style.overflow).toBe('');
  });

  it('emits close on overlay click', () => {
    const spy = vi.fn();
    fixture.componentInstance.close.subscribe(spy);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const overlay = fixture.nativeElement.querySelector('.fixed > div');
    overlay.click();
    expect(spy).toHaveBeenCalled();
  });

  it('does not emit close on panel click', () => {
    const spy = vi.fn();
    fixture.componentInstance.close.subscribe(spy);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('[role="dialog"]');
    panel.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
