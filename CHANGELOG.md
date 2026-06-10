# Changelog

## 0.0.5

- Remove `HelloAsso Trigger` node — webhook management (`/v5/partners/me/api-notifications`) requires partner-level API access unavailable to standard users.
- Remove organization `Get Many` operation — it used `/v5/partners/me/organizations`, also partner-only. Organization `Get` (by slug) is retained.

## 0.0.4

- Add a **HelloAsso Trigger** node that auto-registers an n8n webhook URL with the
  HelloAsso notification API (global or per-organization scope), subscribes to the
  selected event types (Order, Payment, Form, Organization), verifies the
  `x-ha-signature` HMAC, and removes the registration when the workflow is
  deactivated.

## 0.0.3

- Replace the placeholder `user`/`company` resources with real HelloAsso v5
  resources: Organization, Form, Order, Payment, Item, and Checkout Intent.
- Add list operations with continuation-token pagination (Return All / Limit),
  date and search filters, and write operations (order cancel, payment refund,
  checkout intent create).

## 0.0.2

- Set HelloAsso-specific OAuth2 credential defaults (token URL, documentation URL).
- Remove hardcoded default scope from credential.
