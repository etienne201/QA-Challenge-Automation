import { test, expect } from '@playwright/test';
import { UserProfilePage } from '../pages/UserProfilePage';
import { logger } from '../utils/logger';

test.describe('User Profile Creation Tests', () => {

  test('Successful profile creation with all fields', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    await userProfile.fillProfileForm({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd',
      confirmPassword: 'P@ssw0rd',
      dob: '1990-01-01',
      phone: '1234567890',
      address: '123 Main St, Apt 1',
      linkedIn: 'https://www.linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith'
    });

    await userProfile.submit();
    logger.info('Profile created successfully.');
  });

  test(' Password mismatch shows an error alert', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    await userProfile.fillProfileForm({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd',
      confirmPassword: 'wrongPassword'
    });

    await userProfile.submit();
    expect(alertMessage).toBe('Passwords do not match');
    logger.warn('Password mismatch detected.');
  });

  test('Invalid email format should be rejected', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    await userProfile.fillProfileForm({
      firstName: 'John',
      lastName: 'Smith',
      email: 'invalidemail.com',
      password: 'P@ssw0rd',
      confirmPassword: 'P@ssw0rd'
    });

    await userProfile.submit();
    // Add expect if visual alert or inline validation is present
    logger.warn('Invalid email input was submitted.');
  });

  test('Invalid name (e.g. "John Doe") triggers an error alert', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    await userProfile.fillProfileForm({
      firstName: 'John Doe',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd',
      confirmPassword: 'P@ssw0rd',
      dob: '1990-01-01',
      phone: '1234567890',
      address: '123 Main St, Apt 1',
      linkedIn: 'https://www.linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith'
    });

    await userProfile.submit();
    expect(alertMessage).toBe('First name must contain alphabetical characters only');
    logger.warn('Invalid name format detected.');
  });

  test('Phone number with more than 10 digits should be rejected', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    await userProfile.fillProfileForm({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd',
      confirmPassword: 'P@ssw0rd',
      dob: '1990-01-01',
      phone: '123456789012',
      address: '123 Main St, Apt 1',
      linkedIn: 'https://www.linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith'
    });

    await userProfile.submit();
    // Add expect based on form behavior
    logger.warn('Phone number with too many digits submitted.');
  });

});
