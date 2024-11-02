// tests/pages/HomePage.ts
import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  // Header and navigation selectors
  readonly headerTitle: Locator;
  readonly navItems: Locator;

  // Hero section selectors
  readonly heroImage: Locator;
  readonly heroMessage: Locator;

  // Language selector
  readonly languageButton: Locator;

  // Search bar
  readonly searchBar: Locator;
  readonly searchIcon: Locator;

  // Featured items
  readonly featuredItems: Locator;

  // Footer
  readonly footerLinks: Locator;
  readonly footerMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header and navigation
    this.headerTitle = page.locator('header h1');
    this.navItems = page.locator('nav button');

    // Hero section
    this.heroImage = page.locator('.bg-[url("/images/hero.webp")], .bg-[url("/images/hero.png")]');
    this.heroMessage = page.locator('.text-xs.md\\:text-base.text-neutral-12');

    // Language selector
    this.languageButton = page.locator('.langSelector_toggle__1uTpc');

    // Search bar
    this.searchBar = page.locator('input[placeholder="Search anything about Rust..."]');
    this.searchIcon = page.locator('.order-2 svg');

    // Featured items
    this.featuredItems = page.locator('a[href^="/en/items/"], a[href^="/en/building/"]');

    // Footer
    this.footerLinks = page.locator('footer a');
    this.footerMessage = page.locator('footer p');
  }
  
  async open() {
    await this.page.goto('https://rusthelp.com');
  }

  async searchFor(query: string) {
    await this.searchBar.fill(query);
    await this.searchIcon.click();
  }

  async clickNavItem(itemName: string) {
    await this.navItems.locator(`text=${itemName}`).click();
  }

  async selectLanguage(languageCode: string) {
    await this.languageButton.click();
    await this.page.locator(`button:has-text("${languageCode}")`).click();
  }

  async clickFeaturedItem(index: number) {
    await this.featuredItems.nth(index).click();
  }
}
