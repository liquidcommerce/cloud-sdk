import { test, expect } from '@playwright/test';
import addressService from '../../services/address/service';
import { addressSchemas } from '../../data/schemas/address';
import Ajv from 'ajv';

test.describe.serial('Address tests', () => {
  const ajv = new Ajv();

  test('Autocomplete address', async () => {
    const addressResponse = await addressService.autocomplete();
    expect(addressResponse.status).toBe(201);
    ajv.validate(addressSchemas.autocompleteAddressSchema, addressResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });

  test('Get address details', async () => {
    const addressResponse = await addressService.getAddressDetails();
    expect(addressResponse.status).toBe(201);
    ajv.validate(addressSchemas.getAddressDetailsSchema, addressResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });
});
