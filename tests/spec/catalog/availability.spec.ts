import { test, expect } from '@playwright/test';
import catalogService from '../../services/catalog/service';
import { catalogSchemas } from '../../data/schemas/catalog';
import Ajv from 'ajv';

test.describe.serial('Catalog tests', () => {
  const ajv = new Ajv();

  test('Availability', async () => {
    const availabilityResponse = await catalogService.availability();
    expect(availabilityResponse.status).toBe(201);
    console.log(JSON.stringify(availabilityResponse.body))
    ajv.validate(catalogSchemas.availabilitySchema, availabilityResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });
});
