import { TestBed } from '@angular/core/testing';

import { RoleWaitressGuard } from './role-waitress.guard';

describe('RoleWaitressGuard', () => {
  let guard: RoleWaitressGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleWaitressGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
