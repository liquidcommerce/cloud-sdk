import { test, expect } from '@playwright/test';
import sendRequest from '../../services/sendRequest';
import loginService from '../../services/authentication/service';
import usersService from '../../services/users/service';



test('get started link', async ({ request }) => {
   const userResponse = await usersService.createUser()
console.log(userResponse)
});
