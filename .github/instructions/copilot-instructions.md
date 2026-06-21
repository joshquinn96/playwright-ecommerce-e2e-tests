# Copilot Repository Instructions

These instructions apply to all code and test changes in this repository.

## Scope and Priority
- Treat these rules as default behavior for every new chat in this workspace.
- Follow existing instructions under `.github/instructions/` as complementary guidance.
- Prefer minimal, targeted edits; do not refactor unrelated code.

## Playwright + TypeScript Standards
- Use role-first, user-facing locators whenever possible:
  - `getByRole`, `getByLabel`, `getByText`, `getByPlaceholder`.
- Avoid brittle CSS/xpath selectors unless no accessible locator is available.
- Use web-first assertions and polling:
  - `await expect(locator).toHaveText(...)`
  - `await expect.poll(...)`
- Keep tests readable with explicit `test.step(...)` blocks for major workflow phases.

## Timing and Waiting Rules
- Do not use hard sleeps (`page.waitForTimeout(...)`) for normal synchronization.
- Replace fixed delays with assertion-driven waits (`expect.poll`, `toHave*`, `toBe*`).
- If a product behavior requires intentional delay, keep it:
  - Explicitly documented in code with a short reason.
  - Configurable via environment variable.
  - Isolated to the specific workflow that needs it.

## Existing Approved Timing Exception
- PAF kiosk flagged-vehicle image rendering has an intentional delay.
- Preserve this behavior in tests via configurable delay and assertion-driven wait logic (not arbitrary sleeps).

## RTV Table Filtering Rule
- RTV workflows should filter by License Plate before row polling when table volume is high.
- Prefer License Plate column context plus role-based textbox lookup.

## Safety and Validation
- Run `npx tsc --noEmit` after TypeScript edits.
- Keep assertions aligned with real UI behavior (do not over-constrain early-stage transient fields).
- Do not remove known business-specific behavior without explicit request.
