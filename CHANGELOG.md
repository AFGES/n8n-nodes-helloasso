# Changelog

## 0.0.3

- Replace the placeholder `user`/`company` resources with real HelloAsso v5
  resources: Organization, Form, Order, Payment, Item, and Checkout Intent.
- Add list operations with continuation-token pagination (Return All / Limit),
  date and search filters, and write operations (order cancel, payment refund,
  checkout intent create).

## 0.0.2

- Set HelloAsso-specific OAuth2 credential defaults (token URL, documentation URL).
- Remove hardcoded default scope from credential.
