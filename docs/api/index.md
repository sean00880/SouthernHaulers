# API Documentation

## Authentication
- [Login](/docs/api/authentication/login)
- [Logout](/docs/api/authentication/logout)
- [Register](/docs/api/authentication/register)

## User Management
- [Get User Profile](/docs/api/user/profile)
- [Update User Profile](/docs/api/user/update-profile)

## Services
- [Get Services](/docs/api/services/list)
- [Get Service Details](/docs/api/services/details)
- [Create Service Request](/docs/api/services/create-request)

## Contact
- [Submit Contact Form](/docs/api/contact/submit)

## Careers
- [Get Job Openings](/docs/api/careers/list)
- [Apply for Job](/docs/api/careers/apply)

## Usage Examples
```typescript
// Example: Fetching services
const response = await fetch('/api/services/list');
const data = await response.json();
```

## Error Handling
All API endpoints return standardized error responses:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
