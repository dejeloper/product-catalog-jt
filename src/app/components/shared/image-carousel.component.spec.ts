import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {ImageCarousel} from './image-carousel.component';

describe('ImageCarousel', () => {
  let fixture: ComponentFixture<ImageCarousel>;

  const images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(ImageCarousel);
    fixture.componentRef.setInput('images', images);
    fixture.componentRef.setInput('alt', 'Test');
    await fixture.whenStable();
  });

  it('starts at index 0', () => {
    expect(fixture.componentInstance.currentIndex).toBe(0);
  });

  describe('prev', () => {
    it('goes to last index when at 0', () => {
      fixture.componentInstance.prev();
      expect(fixture.componentInstance.currentIndex).toBe(2);
    });

    it('decrements when not at 0', () => {
      fixture.componentInstance.currentIndex = 1;
      fixture.componentInstance.prev();
      expect(fixture.componentInstance.currentIndex).toBe(0);
    });
  });

  describe('next', () => {
    it('goes to 0 when at last index', () => {
      fixture.componentInstance.currentIndex = 2;
      fixture.componentInstance.next();
      expect(fixture.componentInstance.currentIndex).toBe(0);
    });

    it('increments when not at last', () => {
      fixture.componentInstance.next();
      expect(fixture.componentInstance.currentIndex).toBe(1);
    });
  });

  describe('goTo', () => {
    it('jumps to the given index', () => {
      fixture.componentInstance.goTo(2);
      expect(fixture.componentInstance.currentIndex).toBe(2);
    });
  });

  describe('isSingle', () => {
    it('returns true with 0 images', () => {
      fixture.componentRef.setInput('images', []);
      expect(fixture.componentInstance.isSingle).toBe(true);
    });

    it('returns true with 1 image', async () => {
      fixture.componentRef.setInput('images', ['only.jpg']);
      await fixture.whenStable();
      expect(fixture.componentInstance.isSingle).toBe(true);
    });

    it('returns false with multiple images', () => {
      expect(fixture.componentInstance.isSingle).toBe(false);
    });
  });

  describe('template', () => {
    it('renders img with correct src and alt', () => {
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.src).toContain('img1.jpg');
      expect(img.alt).toBe('Test imagen 1');
    });

    it('updates img on navigation', () => {
      fixture.componentRef.setInput('images', ['new1.jpg', 'new2.jpg']);
      fixture.componentInstance.currentIndex = 1;
      fixture.detectChanges();
      const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
      expect(img.src).toContain('new2.jpg');
      expect(img.alt).toBe('Test imagen 2');
    });

    it('shows prev/next buttons when multiple images', () => {
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[aria-label="Imagen anterior"]')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('[aria-label="Imagen siguiente"]')).toBeTruthy();
    });

    it('hides prev/next buttons when single image', async () => {
      fixture.componentRef.setInput('images', ['only.jpg']);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[aria-label="Imagen anterior"]')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('[aria-label="Imagen siguiente"]')).toBeFalsy();
    });

    it('renders dot indicators for each image', () => {
      fixture.detectChanges();
      const dots = fixture.nativeElement.querySelectorAll('[role="tab"]');
      expect(dots.length).toBe(3);
    });

    it('marks current dot as selected', () => {
      fixture.detectChanges();
      const dots = fixture.nativeElement.querySelectorAll('[role="tab"]');
      expect(dots[0].getAttribute('aria-selected')).toBe('true');
      expect(dots[1].getAttribute('aria-selected')).toBe('false');
      expect(dots[2].getAttribute('aria-selected')).toBe('false');
    });

    it('navigates on dot click', () => {
      fixture.detectChanges();
      const dots = fixture.nativeElement.querySelectorAll('[role="tab"]');
      (dots[2] as HTMLButtonElement).click();
      expect(fixture.componentInstance.currentIndex).toBe(2);
    });

    it('navigates on prev button click', () => {
      fixture.detectChanges();
      const prev = fixture.nativeElement.querySelector('[aria-label="Imagen anterior"]') as HTMLButtonElement;
      prev.click();
      expect(fixture.componentInstance.currentIndex).toBe(2);
    });

    it('navigates on next button click', () => {
      fixture.detectChanges();
      const next = fixture.nativeElement.querySelector('[aria-label="Imagen siguiente"]') as HTMLButtonElement;
      next.click();
      expect(fixture.componentInstance.currentIndex).toBe(1);
    });

    it('hides dots when single image', async () => {
      fixture.componentRef.setInput('images', ['only.jpg']);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('[role="tablist"]')).toBeFalsy();
    });
  });
});
