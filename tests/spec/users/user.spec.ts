import { describe, test, expect } from '@playwright/test';
import usersService from '../../services/users/service';
import { userSchemas } from '../../data/schemas/users';
import Ajv from 'ajv';

test.describe.serial('Users tests', () => {
  const ajv = new Ajv();
  let userId: string;
  let addressId: string;

  test('Create user', async ({ request }) => {
    const userResponse = await usersService.createUser();
    expect(userResponse.status).toBe(201);
    userId = userResponse.body.data.id;
    ajv.validate(userSchemas.createUserSchema, userResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });

  test('Get user', async ({ request }) => {
    const userResponse = await usersService.getUserById(userId);
    expect(userResponse.status).toBe(200);
    ajv.validate(userSchemas.getUserSchema, userResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
    expect(userId).toBe(userResponse.body.data.id);
  });

  test('Add address', async ({ request }) => {
    const addressResponse = await usersService.addAddress(userId);
    addressId = addressResponse.body.data.id;
    expect(addressResponse.status).toBe(201);
    ajv.validate(userSchemas.addressesSchema, addressResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });

  test('Delete address', async ({ request }) => {
    const addressResponse = await usersService.deleteAddressById(addressId);
    expect(addressResponse.status).toBe(200);
    ajv.validate(userSchemas.deleteAddressSchema, addressResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });

  test('Delete user', async ({ request }) => {
    const userResponse = await usersService.deleteUserById(userId);
    expect(userResponse.status).toBe(200);
    ajv.validate(userSchemas.deleteUserSchema, userResponse.body);
    expect(ajv.errorsText()).toBe('No errors');
  });
});
