import { TestBed } from '@angular/core/testing';

import { AuthGuardActivate } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthGuardActivate = TestBed.get(AuthGuardActivate);
    expect(service).toBeTruthy();
  });
});
