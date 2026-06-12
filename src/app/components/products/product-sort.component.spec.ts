import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {ProductSort, SortField} from './product-sort.component';

describe('ProductSort', () => {
  let fixture: ComponentFixture<ProductSort>;

  const options = [
    {key: 'id' as SortField, label: 'ID'},
    {key: 'title' as SortField, label: 'Nombre'},
    {key: 'price' as SortField, label: 'Precio'},
  ];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(ProductSort);
    fixture.componentRef.setInput('activeKey', 'id');
    fixture.componentRef.setInput('ascending', true);
    fixture.componentRef.setInput('options', options);
    await fixture.whenStable();
  });

  it('emits toggleSort on button click', () => {
    const spy = vi.fn();
    fixture.componentInstance.toggleSort.subscribe(spy);

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[1].click();
    expect(spy).toHaveBeenCalledWith('title');
  });

  it('marks active button', () => {
    fixture.componentRef.setInput('activeKey', 'price');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[2].getAttribute('aria-pressed')).toBe('true');
  });

  it('shows arrow direction', () => {
    fixture.componentRef.setInput('ascending', true);
    fixture.componentRef.setInput('activeKey', 'title');
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[1].textContent).toContain('↑');

    fixture.componentRef.setInput('ascending', false);
    fixture.detectChanges();
    expect(buttons[1].textContent).toContain('↓');
  });
});
