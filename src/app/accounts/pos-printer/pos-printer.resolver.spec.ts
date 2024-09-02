import { TestBed } from '@angular/core/testing';

import { PosPrinterResolver } from './pos-printer.resolver';

describe('PosPrinterResolver', () => {
  let resolver: PosPrinterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PosPrinterResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
