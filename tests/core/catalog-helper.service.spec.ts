import { CatalogHelperService } from '../../src/core/catalog-helper.service';

describe('CatalogHelperService', () => {
  const locationServiceHelper = {
    validateAndNormalizeLocation: vi.fn(),
  };

  beforeEach(() => {
    locationServiceHelper.validateAndNormalizeLocation.mockClear();
  });

  it('accepts non-ObjectId retailer filter strings during search validation', () => {
    const service = new CatalogHelperService(locationServiceHelper as any);

    const result = service.validateAndNormalizeSearchParams({
      query: 'bourbon',
      retailers: ['accelpay-retailer-123'],
      loc: { zip: '10001' } as any,
    } as any);

    expect(result.error).toBeUndefined();
    expect(locationServiceHelper.validateAndNormalizeLocation).toHaveBeenCalled();
  });

  it('rejects empty retailer filter strings during search validation', () => {
    const service = new CatalogHelperService(locationServiceHelper as any);

    const result = service.validateAndNormalizeSearchParams({
      query: 'bourbon',
      retailers: [''],
      loc: { zip: '10001' } as any,
    } as any);

    expect(result.error).toContain('Retailer ID at index 0 must be a non-empty string');
  });
});
