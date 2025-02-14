# API Documentation

## Contact Form Endpoint

### POST /api/contact
Submit contact form data.

```typescript
interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
}
```

Rate limiting:
- 5 requests per IP per hour
- 429 Too Many Requests response when exceeded

## Service Data

### GET /api/services
Retrieve all available services.

```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  slug: string;
}

type ServicesResponse = Service[];
```

### GET /api/services/[slug]
Retrieve detailed information for a specific service.

```typescript
interface ServiceDetail extends Service {
  longDescription: string;
  benefits: string[];
  coverImage: string;
  relatedServices: string[];
  contactInfo?: {
    email?: string;
    phone?: string;
  };
}
```

## Error Handling

### Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}
```

Common error codes:
- `INVALID_INPUT`: Request validation failed
- `RATE_LIMITED`: Too many requests
- `NOT_FOUND`: Resource not found
- `SERVER_ERROR`: Internal server error

## API Guidelines

### Authentication
- No authentication required for public endpoints
- Rate limiting based on IP address
- CORS configured for production domain only

### Request Headers
```
Content-Type: application/json
Accept: application/json
```

### Response Headers
```
Content-Type: application/json
Cache-Control: public, max-age=300
```

### Caching Strategy
- Services data: 5 minutes cache
- Contact form: No caching
- Error responses: No caching

## Data Validation

### Contact Form
```typescript
const contactValidation = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    format: 'email'
  },
  phone: {
    required: false,
    format: 'phone'
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};
```

### Service Slugs
- Lowercase alphanumeric
- Hyphens allowed
- No special characters
- Maximum length: 50 characters

## Implementation Notes

### Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5 // 5 requests per window
});
```

### CORS Configuration
```typescript
const corsOptions = {
  origin: process.env.NEXT_PUBLIC_SITE_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 86400 // 24 hours
};
```

### Error Handling Middleware
```typescript
const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err);
  
  res.status(500).json({
    error: {
      code: 'SERVER_ERROR',
      message: 'An unexpected error occurred'
    }
  });
};
```

## Testing

### Endpoint Tests
- [ ] Valid contact form submission
- [ ] Invalid contact form data
- [ ] Rate limiting
- [ ] Services list retrieval
- [ ] Individual service retrieval
- [ ] Not found handling

### Load Testing
- [ ] Contact form: 100 concurrent users
- [ ] Services API: 1000 requests per minute
- [ ] Error handling under load

## Security Considerations

### Form Submission
- CSRF protection
- Input sanitization
- Rate limiting
- IP blocking for abuse

### Data Access
- Public read-only access
- No sensitive data exposure
- Proper error handling
- Security headers

## Monitoring

### Metrics to Track
- Request success rate
- Response times
- Error rates
- Rate limit hits
- Cache hit ratio

### Alerting
- 5xx errors > 1%
- Response time > 500ms
- Rate limit exceeded > 100/hour

This API documentation provides a comprehensive guide for implementing the backend services required for the hauling website. Follow these specifications to ensure secure and efficient API operations.
