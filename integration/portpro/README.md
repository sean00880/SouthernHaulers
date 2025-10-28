# PortPro Integration

This directory contains a thin wrapper around the PortPro Drayage TMS API. The goal of this module is to
provide typed fetchers, webhook verification, and data mappers so that the rest of the Southern Haulers
platform can interact with PortPro behind a clean interface. The integration is feature‑flagged, meaning
it can be enabled or disabled via environment variables without changing application code.

## Features

- **Token management:** fetch and refresh access tokens using your PortPro credentials.
- **Webhook verification:** validate `X‑Hub‑Signature` headers using the shared secret.
- **Endpoint wrappers:** functions that wrap the PortPro REST API endpoints for loads, drivers, invoices and
  more.
- **Data mappers:** convert PortPro payloads into internal domain models used throughout the platform.

> **Note:** At this stage the implementation is a stub. It demonstrates how the integration might be
structured, but does not contain production-ready code. See `client.ts` for an example.