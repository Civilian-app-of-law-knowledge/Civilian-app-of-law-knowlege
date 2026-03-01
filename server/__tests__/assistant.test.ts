import { describe, it, expect } from 'vitest';

// Test the legal content data structure
describe('Legal Content Data', () => {
  it('should have valid rights data structure', async () => {
    const { rights, rightsCategories } = await import('../../data/legal-content');
    
    expect(Array.isArray(rights)).toBe(true);
    expect(rights.length).toBeGreaterThan(0);
    
    // Check that each right has required fields
    rights.forEach((right) => {
      expect(right).toHaveProperty('id');
      expect(right).toHaveProperty('category');
      expect(right).toHaveProperty('title');
      expect(right).toHaveProperty('summary');
      expect(right).toHaveProperty('fullText');
      expect(right).toHaveProperty('legalBasis');
      expect(right).toHaveProperty('sourceUrl');
      expect(right).toHaveProperty('sourceName');
    });
    
    // Check that categories exist
    expect(Array.isArray(rightsCategories)).toBe(true);
    expect(rightsCategories.length).toBeGreaterThan(0);
  });

  it('should have valid law updates data structure', async () => {
    const { lawUpdates } = await import('../../data/legal-content');
    
    expect(Array.isArray(lawUpdates)).toBe(true);
    expect(lawUpdates.length).toBeGreaterThan(0);
    
    // Check that each update has required fields
    lawUpdates.forEach((update) => {
      expect(update).toHaveProperty('id');
      expect(update).toHaveProperty('priority');
      expect(update).toHaveProperty('title');
      expect(update).toHaveProperty('summary');
      expect(update).toHaveProperty('effectiveDate');
      expect(update).toHaveProperty('sourceUrl');
      expect(['critical', 'important', 'informational']).toContain(update.priority);
    });
  });

  it('should have valid facilities data structure', async () => {
    const { facilities } = await import('../../data/legal-content');
    
    expect(Array.isArray(facilities)).toBe(true);
    expect(facilities.length).toBeGreaterThan(0);
    
    // Check that each facility has required fields
    facilities.forEach((facility) => {
      expect(facility).toHaveProperty('id');
      expect(facility).toHaveProperty('name');
      expect(facility).toHaveProperty('type');
      expect(facility).toHaveProperty('address');
      expect(facility).toHaveProperty('phone');
      expect(['county', 'state', 'federal']).toContain(facility.type);
    });
  });

  it('should have valid FAQs data structure', async () => {
    const { faqs } = await import('../../data/legal-content');
    
    expect(Array.isArray(faqs)).toBe(true);
    expect(faqs.length).toBeGreaterThan(0);
    
    // Check that each FAQ has required fields
    faqs.forEach((faq) => {
      expect(faq).toHaveProperty('id');
      expect(faq).toHaveProperty('category');
      expect(faq).toHaveProperty('question');
      expect(faq).toHaveProperty('answer');
    });
  });

  it('should have valid resources data structure', async () => {
    const { resources } = await import('../../data/legal-content');
    
    expect(Array.isArray(resources)).toBe(true);
    expect(resources.length).toBeGreaterThan(0);
    
    // Check that each resource has required fields
    resources.forEach((resource) => {
      expect(resource).toHaveProperty('id');
      expect(resource).toHaveProperty('category');
      expect(resource).toHaveProperty('name');
      expect(resource).toHaveProperty('description');
      expect(resource).toHaveProperty('websiteUrl');
      expect(typeof resource.national).toBe('boolean');
    });
  });

  it('should have valid emergency contacts data structure', async () => {
    const { emergencyContacts } = await import('../../data/legal-content');
    
    expect(Array.isArray(emergencyContacts)).toBe(true);
    expect(emergencyContacts.length).toBeGreaterThan(0);
    
    // Check that each contact has required fields
    emergencyContacts.forEach((contact) => {
      expect(contact).toHaveProperty('id');
      expect(contact).toHaveProperty('name');
      expect(contact).toHaveProperty('phone');
      expect(contact).toHaveProperty('description');
    });
  });
});

// Test the app router exists and has the correct structure
describe('App Router', () => {
  it('should export the app router', async () => {
    const { appRouter } = await import('../routers');
    expect(appRouter).toBeDefined();
  });
});
