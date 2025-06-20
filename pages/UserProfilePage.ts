import { Page, Locator } from '@playwright/test';

// Type definition for profile data used in form filling
interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender?: 'Male' | 'Female';
  dob?: string;
  phone?: string;
  address?: string;
  linkedIn?: string;
  github?: string;
}

export class UserProfilePage {
  private readonly page: Page;

  // Locators for all form fields
  private readonly firstNameInput_: Locator;
  private readonly lastNameInput_: Locator;
  private readonly emailInput_: Locator;
  private readonly passwordInput_: Locator;
  private readonly confirmPasswordInput_: Locator;
  private readonly genderMaleRadio_: Locator;
  private readonly genderFemaleRadio_: Locator;
  private readonly dobInput_: Locator;
  private readonly phoneInput_: Locator;
  private readonly addressInput_: Locator;
  private readonly linkedInInput_: Locator;
  private readonly githubInput_: Locator;
  private readonly submitButton_: Locator;

  // Define base URL as constant to improve maintainability
  private readonly formUrl: string = 'https://qa-assessment.pages.dev/';

  constructor(page: Page) {
    this.page = page;

    // Initialize locators using labels and selectors
    this.firstNameInput_ = page.getByLabel('First Name (mandatory):');
    this.lastNameInput_ = page.getByLabel('Last Name (mandatory):');
    this.emailInput_ = page.getByLabel('Email (mandatory):');
    this.passwordInput_ = page.getByLabel('Password (mandatory):', { exact: true });
    this.confirmPasswordInput_ = page.getByLabel('Confirm Password (mandatory):');
    this.genderMaleRadio_ = page.getByLabel('Male', { exact: true });
    this.genderFemaleRadio_ = page.getByLabel('Female', { exact: true });
    this.dobInput_ = page.locator('#dob');
    this.phoneInput_ = page.getByLabel('Phone Number (optional):');
    this.addressInput_ = page.locator('#address');
    this.linkedInInput_ = page.getByLabel('LinkedIn URL (optional):');
    this.githubInput_ = page.getByLabel('GitHub URL (optional):');
    this.submitButton_ = page.getByRole('button', { name: 'Submit' });
  }

  /**
   * Navigates to the user profile form page.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.formUrl);
  }

  /**
   * Fills out the user profile form based on the provided data.
   * Handles both mandatory and optional fields.
   */
  async fillProfileForm(data: UserProfileData): Promise<void> {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      gender = 'Male', // Defaults to Male if not provided
      dob,
      phone,
      address,
      linkedIn,
      github,
    } = data;

    // Fill required fields
    await this.firstNameInput_.fill(firstName);
    await this.lastNameInput_.fill(lastName);
    await this.emailInput_.fill(email);
    await this.passwordInput_.fill(password);
    await this.confirmPasswordInput_.fill(confirmPassword);

    // Select gender
    await this.selectGender(gender);

    // Fill optional fields only if provided
    if (dob) await this.dobInput_.fill(dob);
    if (phone) await this.phoneInput_.fill(phone);
    if (address) await this.addressInput_.fill(address);
    if (linkedIn) await this.linkedInInput_.fill(linkedIn);
    if (github) await this.githubInput_.fill(github);
  }

  /**
   * Selects the appropriate gender radio button.
   * Defaults to 'Male' if the value is invalid or not specified.
   */
  private async selectGender(gender: 'Male' | 'Female'): Promise<void> {
    if (gender === 'Female') {
      await this.genderFemaleRadio_.check();
    } else {
      await this.genderMaleRadio_.check();
    }
  }

  /**
   * Submits the form by clicking the submit button.
   */
  async submit(): Promise<void> {
    await this.submitButton_.click();
  }
}
