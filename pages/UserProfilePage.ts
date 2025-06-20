import { Page, Locator } from '@playwright/test';

interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob?: string;
  phone?: string;
  address?: string;
  linkedIn?: string;
  github?: string;
}

export class UserProfilePage {
  readonly page: Page;

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private passwordInput: Locator;
  private confirmPasswordInput: Locator;
  private genderMaleRadio: Locator;
  private dobInputId = 'dob';
  private phoneInput: Locator;
  private addressInputId = 'address';
  private linkedInInput: Locator;
  private githubInput: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name (mandatory):');
    this.lastNameInput = page.getByLabel('Last Name (mandatory):');
    this.emailInput = page.getByLabel('Email (mandatory):');
    this.passwordInput = page.getByLabel('Password (mandatory):', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirm Password (mandatory):');
    this.genderMaleRadio = page.getByLabel('Male', { exact: true });
    this.phoneInput = page.getByLabel('Phone Number (optional):');
    this.linkedInInput = page.getByLabel('LinkedIn URL (optional):');
    this.githubInput = page.getByLabel('GitHub URL (optional):');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async goto() {
    await this.page.goto('https://qa-assessment.pages.dev/');
  }

  async fillProfileForm(data: UserProfileData) {
    const {
      firstName, lastName, email, password, confirmPassword,
      dob, phone, address, linkedIn, github
    } = data;

    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.genderMaleRadio.check();

    if (dob) {
      await this.page.evaluate((date) => {
        const el = document.getElementById('dob') as HTMLInputElement;
        if (el) el.value = date;
      }, dob);
    }

    if (phone) await this.phoneInput.fill(phone);

    if (address) {
      await this.page.evaluate((addr) => {
        const el = document.getElementById('address') as HTMLInputElement;
        if (el) el.value = addr;
      }, address);
    }

    if (linkedIn) await this.linkedInInput.fill(linkedIn);
    if (github) await this.githubInput.fill(github);
  }

  async submit() {
    await this.submitButton.click();
  }
}
