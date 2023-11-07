import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });

  it('should set and get a value in localStorage', () => {
    localStorageService.setStorage('testKey', 'testValue');
    const retrievedValue = localStorage.getItem('testKey');
    expect(retrievedValue).toBe('testValue');
  });

  it('should clear localStorage', () => {
    localStorage.setItem('testKey', 'testValue');
    localStorageService.clearStorage();
    const retrievedValue = localStorage.getItem('testKey');
    expect(retrievedValue).toBeNull();
  });
});
