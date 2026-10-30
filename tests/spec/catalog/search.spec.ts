import { test, expect } from '@playwright/test';
import catalogService from '../../services/catalog/service';
import { catalogSchemas } from '../../data/schemas/catalog';
import Ajv from 'ajv';

test.describe.serial('Search tests', () => {
  const ajv = new Ajv();

  test('Search', async () => {
    const searchResponse = await catalogService.search();
    expect(searchResponse.status).toBe(200);
    ajv.validate(catalogSchemas.searchSchema, searchResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });
});
