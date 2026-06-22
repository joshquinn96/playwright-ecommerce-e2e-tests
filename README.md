# E2E E-Commerce Purchase Flow Test Suite

## System Under Test

An end-to-end e-commerce application featuring:
- **Dynamic user registration** with email verification
- **Order management & fulfillment** (cart → checkout → order placement)
- **State persistence** across auth, product selection, and payment flows
- **Order ID tracking** through confirmation pages

This is a **business-critical journey** that validates the entire customer acquisition and payment funnel.

## What This Test Validates

The test suite exercises the complete purchase workflow:

1. **User lifecycle**: Dynamic registration with timestamped email addresses to enable parallel test execution
2. **Product selection**: Adding items to cart and cart state management
3. **Checkout & payment**: Order details entry with order ID capture and validation
4. **Order confirmation**: State verification across the entire flow, including order ID persistence in URL parameters

**Why this matters**: If this flow breaks in production, no revenue is captured. This test prevents that.

---

## Technical Design Approach

### Architecture: Playwright + Page Object Model

Built with **Playwright TypeScript** and an optional **Page Object Model (POM)** layer:
- **pages/**: Reusable page object classes (HomePage, CartPage, CheckoutPage, OrderHistoryPage)
- **tests/**: Test flows using step-based organization for clarity
- **utils/**: Helper utilities for test data and common operations

### Locator Strategy: Role-First & User-Centric

- **Primary**: ARIA roles and accessible labels (`getByRole`, `getByLabel`)
- **Secondary**: Data attributes and semantic HTML
- **Fallback**: Minimal CSS where role-based locators aren't viable

This approach ensures tests remain resilient to UI refactors while mimicking real user interactions.

---

## What Makes This Reliable

### 1. **Dynamic User Creation**
```typescript
const registeredEmail = `quinn${Date.now()}@live.ie`;
```
- Each test run creates a unique user, enabling **parallel execution** and **test isolation**
- Eliminates test data conflicts and flakiness from shared state
- Mimics real-world user onboarding at scale

### 2. **Order ID Validation**
```typescript
const urlMatch = page.url().match(/prop=%5B%22([^%]+)%22%5D/);
if (urlMatch) {
  capturedOrderId = urlMatch[1];
}
```
- **Captures & validates the order ID** from the success page URL
- Proves the order was actually placed (not just UI navigation)
- Enables downstream verification: order confirmation emails, database state, etc.

### 3. **State Verification Across Pages**
- **Registration → Login**: User account creation persisted and authenticated
- **Dashboard → Cart → Checkout**: Product selection preserved across page transitions
- **Checkout → Confirmation**: Order details submitted and order ID generated

Each step validates the **previous state is maintained**, catching integration bugs that unit tests miss.

---

## Design Patterns & Best Practices

- ✅ **Assertion-driven waits**: No hard sleeps; all waits are outcome-based (`expect().toBeVisible()`, `waitForURL()`)
- ✅ **Test steps for clarity**: Each step encapsulates one logical action (register, login, add to cart, etc.)
- ✅ **Network synchronization**: Uses `waitForLoadState('networkidle')` to handle async data loading
- ✅ **Resilient selectors**: Prefers `getByRole` over CSS selectors to survive UI changes
- ✅ **Error recovery**: Handles race conditions (fallback URL navigation if order confirmation times out)

---

## Running the Tests

```bash
npm install
npx playwright test
```

View the HTML report:
```bash
npx playwright show-report
```

---

## CI/CD Integration

Tests are designed for parallel execution:
- Dynamic user creation prevents data conflicts
- No hardcoded test IDs or shared resources
- Ready for GitHub Actions, Jenkins, or other CI platforms

---

## Conclusion

This test suite validates **business outcomes** (order creation), handles **data dynamics** (user creation), and ensures **state consistency** across a multi-page journey. It catches real bugs before they reach customers.
