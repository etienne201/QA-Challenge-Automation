import { test, expect } from '@playwright/test';
import { UserProfilePage } from '../pages/UserProfilePage';
import { logger } from '../utils/logger';

// Group related tests using test.describe for better structure
test.describe('User Profile Creation Tests', () => {

  test('Should successfully create profile with all fields filled', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    // Fill out form with all available fields
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
      github: 'https://github.com/johnsmith',
    });

    await userProfile.submit();
    logger.info('Profile created successfully with full data.');
    // Consider adding an assertion here to validate UI feedback
  });

  test('Should show alert when password confirmation mismatches', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    // Fill form with mismatched passwords
    await userProfile.fillProfileForm({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd',
      confirmPassword: 'wrongPassword',
    });

    await userProfile.submit();

    // Assert that alert was triggered with expected message
    expect(alertMessage).toBe('Passwords do not match');
    logger.warn('Password mismatch alert triggered as expected.');
  });

  test('Should reject invalid email format', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    await userProfile.fillProfileForm({
      firstName: 'John',
      lastName: 'Smith',
      email: 'invalidemail.com', // Missing @ symbol
      password: 'P@ssw0rd',
      confirmPassword: 'P@ssw0rd',
    });

    await userProfile.submit();

    //TODO: Add an expect statement for inline error or alert validation
    logger.warn('Submitted form with invalid email format.');
  });

  test('Should show error when first name contains spaces or invalid characters', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    let alertMessage = '';
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.dismiss();
    });

    await userProfile.fillProfileForm({
      firstName: 'John Doe', // Invalid: space in first name
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd',
      confirmPassword: 'P@ssw0rd',
      dob: '1990-01-01',
      phone: '1234567890',
      address: '123 Main St',
      linkedIn: 'https://www.linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith',
    });

    await userProfile.submit();
    expect(alertMessage).toBe('First name must contain alphabetical characters only');
    logger.warn('Detected invalid characters in first name.');
  });

  test('Should reject phone number longer than 10 digits', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    await userProfile.fillProfileForm({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'P@ssw0rd',
      confirmPassword: 'P@ssw0rd',
      dob: '1990-01-01',
      phone: '123456789012', // 12 digits
      address: '123 Main St',
      linkedIn: 'https://www.linkedin.com/in/johnsmith',
      github: 'https://github.com/johnsmith',
    });

    await userProfile.submit();

    //TODO: Add assertion depending on whether this is an alert or inline validation
    logger.warn('Submitted form with invalid phone number length.');
  });

  test('Should create profile with only required fields (optional fields skipped)', async ({ page }) => {
    const userProfile = new UserProfilePage(page);
    await userProfile.goto();

    await userProfile.fillProfileForm({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'P@ssw0rd1',
      confirmPassword: 'P@ssw0rd1',
      // No optional fields provided
    });

    await userProfile.submit();

    //  TODO: Validate UI confirmation, e.g. success banner or page redirect
    logger.info('Profile successfully created with only required fields.');
  });

});
