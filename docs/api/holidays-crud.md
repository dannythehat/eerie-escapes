# Holiday API CRUD Documentation

## Overview
Complete API documentation for Holiday CRUD operations including authentication and authorization.

## Base URL
```
/api/v1/holidays
```

## Authentication
Most write operations require authentication using JWT tokens.

**Header Format:**
```
Authorization: Bearer <your-jwt-token>
```

**Roles:**
- `USER` - Read-only access
- `PARTNER` - Can create and manage own holidays
- `ADMIN` - Full access to all holidays

---

## Endpoints

### 1. Create Holiday
Create a new holiday listing.

**Endpoint:** `POST /api/v1/holidays`

**Authentication:** Required (ADMIN or PARTNER)

**Request Body:**
```json
{
  "title": "Haunted Salem Tour",
  "subtitle": "Walk the witch trial paths",
  "description": "Experience the dark history of Salem with our expert guides. This comprehensive tour includes...",
  "shortDescription": "3-day haunted tour of Salem's most notorious locations",
  "theme": "HAUNTED_TOURS",
  "difficulty": "MODERATE",
  "status": "DRAFT",
  "country": "USA",
  "city": "Salem",
  "region": "Massachusetts",
  "address": "123 Witch Way, Salem, MA 01970",
  "latitude": 42.5195,
  "longitude": -70.8967,
  "basePrice": 299.99,
  "currency": "USD",
  "discountPrice": 249.99,
  "installmentAvailable": true,
  "durationDays": 3,
  "durationNights": 2,
  "minParticipants": 1,
  "maxParticipants": 20,
  "startDate": "2025-10-01T00:00:00Z",
  "endDate": "2025-10-31T23:59:59Z",
  "isYearRound": false,
  "coverImage": "https://example.com/images/salem-cover.jpg",
  "images": [
    "https://example.com/images/salem-1.jpg",
    "https://example.com/images/salem-2.jpg"
  ],
  "videoUrl": "https://youtube.com/watch?v=example",
  "metaTitle": "Haunted Salem Tour - Witch Trial History",
  "metaDescription": "Join our expert-led tour through Salem's haunted history",
  "keywords": ["haunted", "salem", "witch trials", "paranormal"],
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival & Witch House Tour",
      "description": "Begin your journey at the historic Witch House",
      "activities": ["Check-in", "Witch House visit", "Welcome dinner"],
      "meals": ["Dinner"]
    },
    {
      "day": 2,
      "title": "Cemetery & Trial Sites",
      "description": "Explore the burial grounds and trial locations",
      "activities": ["Old Burying Point", "Salem Witch Trials Memorial"],
      "meals": ["Breakfast", "Lunch"]
    }
  ],
  "inclusions": [
    {
      "item": "Accommodation",
      "description": "2 nights in historic haunted hotel"
    },
    {
      "item": "Guided Tours",
      "description": "Expert paranormal investigators"
    }
  ],
  "exclusions": [
    {
      "item": "Flights",
      "description": "International and domestic flights"
    },
    {
      "item": "Personal Expenses",
      "description": "Souvenirs and personal purchases"
    }
  ]
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Holiday created successfully",
  "data": {
    "id": "uuid",
    "slug": "haunted-salem-tour",
    "title": "Haunted Salem Tour",
    "partnerId": "partner-uuid",
    "status": "DRAFT",
    "createdAt": "2025-11-06T00:00:00Z",
    "itinerary": [...],
    "inclusions": [...],
    "exclusions": [...]
  }
}
```

**Error Responses:**

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Authentication required. Please provide a valid token."
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "Insufficient permissions."
}
```

**400 Bad Request (Validation Error):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "String must contain at least 5 character(s)"
    },
    {
      "field": "description",
      "message": "String must contain at least 50 character(s)"
    }
  ]
}
```

**400 Bad Request (Business Logic Error):**
```json
{
  "success": false,
  "message": "Discount price must be less than base price"
}
```

**409 Conflict:**
```json
{
  "success": false,
  "message": "A holiday with this title already exists"
}
```

---

### 2. Update Holiday
Update an existing holiday. Partners can only update their own holidays, admins can update any.

**Endpoint:** `PUT /api/v1/holidays/:id`

**Authentication:** Required (ADMIN or OWNER)

**URL Parameters:**
- `id` - Holiday UUID

**Request Body:** (All fields optional, partial update supported)
```json
{
  "title": "Updated Haunted Salem Tour",
  "basePrice": 349.99,
  "discountPrice": 299.99,
  "status": "PUBLISHED"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Holiday updated successfully",
  "data": {
    "id": "uuid",
    "slug": "updated-haunted-salem-tour",
    "title": "Updated Haunted Salem Tour",
    "basePrice": 349.99,
    "status": "PUBLISHED",
    "publishedAt": "2025-11-06T00:00:00Z",
    "updatedAt": "2025-11-06T00:00:00Z"
  }
}
```

**Error Responses:**

**404 Not Found:**
```json
{
  "success": false,
  "message": "Holiday not found"
}
```

**403 Forbidden (Partner trying to update another's holiday):**
```json
{
  "success": false,
  "message": "You can only modify your own holidays."
}
```

---

### 3. Delete Holiday
Soft delete a holiday by setting status to ARCHIVED.

**Endpoint:** `DELETE /api/v1/holidays/:id`

**Authentication:** Required (ADMIN or OWNER)

**URL Parameters:**
- `id` - Holiday UUID

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Holiday deleted successfully"
}
```

**Error Responses:**

**404 Not Found:**
```json
{
  "success": false,
  "message": "Holiday not found"
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "message": "You can only modify your own holidays."
}
```

---

## Validation Rules

### Required Fields (Create)
- `title` (5-200 characters)
- `description` (minimum 50 characters)
- `theme` (valid enum value)
- `difficulty` (valid enum value)
- `country` (2-100 characters)
- `city` (2-100 characters)
- `basePrice` (positive number)
- `durationDays` (positive integer)
- `durationNights` (non-negative integer)
- `maxParticipants` (positive integer)
- `coverImage` (valid URL)

### Business Logic Validations
1. **Pricing:** `discountPrice` must be less than `basePrice`
2. **Dates:** `endDate` must be after `startDate`
3. **Duration:** `durationNights` cannot exceed `durationDays`
4. **Participants:** `maxParticipants` must be >= `minParticipants`
5. **Slug:** Auto-generated from title, must be unique

### Optional Fields
- `subtitle`, `shortDescription`, `region`, `address`
- `latitude`, `longitude`, `videoUrl`
- `metaTitle`, `metaDescription`, `keywords`
- `images`, `itinerary`, `inclusions`, `exclusions`

---

## Status Workflow

```
DRAFT → PUBLISHED → ARCHIVED
  ↓         ↓
SOLD_OUT  SOLD_OUT
```

**Status Descriptions:**
- `DRAFT` - Not visible to public, editable
- `PUBLISHED` - Visible to public, bookable
- `SOLD_OUT` - Visible but not bookable
- `ARCHIVED` - Hidden from public (soft deleted)

**Publishing:**
- When status changes to `PUBLISHED`, `publishedAt` is automatically set
- Only `PUBLISHED` holidays appear in public listings

---

## Authorization Matrix

| Operation | USER | PARTNER | ADMIN |
|-----------|------|---------|-------|
| Create Holiday | ❌ | ✅ (own) | ✅ (any) |
| Update Holiday | ❌ | ✅ (own) | ✅ (any) |
| Delete Holiday | ❌ | ✅ (own) | ✅ (any) |
| View Published | ✅ | ✅ | ✅ |
| View Draft | ❌ | ✅ (own) | ✅ (any) |

---

## Examples

### Create a Holiday as Partner
```bash
curl -X POST https://api.eerieescapes.com/api/v1/holidays \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Haunted Castle Tour",
    "description": "Explore the most haunted castle in Europe...",
    "theme": "HAUNTED_TOURS",
    "difficulty": "MODERATE",
    "country": "Romania",
    "city": "Transylvania",
    "basePrice": 499.99,
    "durationDays": 3,
    "durationNights": 2,
    "maxParticipants": 15,
    "coverImage": "https://example.com/castle.jpg"
  }'
```

### Update Holiday Price
```bash
curl -X PUT https://api.eerieescapes.com/api/v1/holidays/uuid \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "basePrice": 549.99,
    "discountPrice": 499.99
  }'
```

### Publish a Draft Holiday
```bash
curl -X PUT https://api.eerieescapes.com/api/v1/holidays/uuid \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "PUBLISHED"
  }'
```

### Delete a Holiday
```bash
curl -X DELETE https://api.eerieescapes.com/api/v1/holidays/uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting
- 100 requests per minute per IP address
- 1000 requests per hour per IP address
- Write operations (POST/PUT/DELETE) count double

---

## Best Practices

1. **Always validate data client-side** before sending to API
2. **Use HTTPS** for all requests containing authentication tokens
3. **Store JWT tokens securely** (httpOnly cookies recommended)
4. **Handle 401 errors** by refreshing tokens or re-authenticating
5. **Implement retry logic** for 500 errors with exponential backoff
6. **Cache GET responses** to reduce API calls
7. **Use webhooks** for real-time updates instead of polling

---

## Common Errors

### "Discount price must be less than base price"
Ensure `discountPrice` < `basePrice` when both are provided.

### "A holiday with this title already exists"
Title must be unique. Modify the title or update the existing holiday.

### "You can only modify your own holidays"
Partners can only modify holidays they created. Contact admin for help.

### "End date must be after start date"
Ensure `endDate` > `startDate` when both are provided.

### "Token expired"
JWT token has expired. Refresh the token or re-authenticate.

---

## Support

For API issues or questions:
- Documentation: https://docs.eerieescapes.com
- Support: support@eerieescapes.com
- GitHub Issues: https://github.com/dannythehat/eerie-escapes/issues
