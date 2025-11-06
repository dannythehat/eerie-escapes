# Holiday API Documentation

## Overview
The Holiday API provides endpoints for browsing, searching, and retrieving horror-themed travel experiences.

## Base URL
```
/api/v1/holidays
```

---

## Endpoints

### 1. Get All Holidays
Retrieve a paginated list of holidays with optional filtering.

**Endpoint:** `GET /api/v1/holidays`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | integer | No | 1 | Page number for pagination |
| `limit` | integer | No | 10 | Number of items per page |
| `country` | string | No | - | Filter by country (case-insensitive) |
| `city` | string | No | - | Filter by city (case-insensitive) |
| `theme` | enum | No | - | Filter by theme (see Theme enum below) |
| `startDate` | date | No | - | Filter by start date (ISO 8601 format) |
| `endDate` | date | No | - | Filter by end date (ISO 8601 format) |
| `minPrice` | number | No | - | Minimum price filter |
| `maxPrice` | number | No | - | Maximum price filter |
| `status` | enum | No | PUBLISHED | Filter by status (DRAFT, PUBLISHED, ARCHIVED, SOLD_OUT) |

**Theme Enum Values:**
- `HAUNTED_TOURS`
- `CRIME_SCENES`
- `PARANORMAL`
- `DARK_HISTORY`
- `MACABRE_FESTIVALS`
- `HORROR_ATTRACTIONS`
- `SUPERNATURAL`
- `GOTHIC_ARCHITECTURE`
- `CEMETERY_TOURS`
- `OCCULT_EXPERIENCES`

**Example Request:**
```bash
GET /api/v1/holidays?page=1&limit=10&country=USA&theme=HAUNTED_TOURS&minPrice=100&maxPrice=500
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "haunted-salem-tour",
      "title": "Haunted Salem Tour",
      "subtitle": "Walk the witch trial paths",
      "shortDescription": "Experience the dark history of Salem...",
      "theme": "HAUNTED_TOURS",
      "difficulty": "MODERATE",
      "country": "USA",
      "city": "Salem",
      "region": "Massachusetts",
      "basePrice": 299.99,
      "currency": "USD",
      "discountPrice": 249.99,
      "durationDays": 3,
      "durationNights": 2,
      "coverImage": "https://...",
      "averageRating": 4.5,
      "reviewCount": 127,
      "startDate": "2025-10-01T00:00:00Z",
      "endDate": "2025-10-31T23:59:59Z",
      "isYearRound": false,
      "maxParticipants": 20
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Failed to fetch holidays",
  "error": "Error details (only in development mode)"
}
```

---

### 2. Get Single Holiday
Retrieve detailed information about a specific holiday by ID or slug.

**Endpoint:** `GET /api/v1/holidays/:id`

**URL Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Holiday UUID or slug |

**Example Request:**
```bash
GET /api/v1/holidays/haunted-salem-tour
# or
GET /api/v1/holidays/550e8400-e29b-41d4-a716-446655440000
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "slug": "haunted-salem-tour",
    "title": "Haunted Salem Tour",
    "subtitle": "Walk the witch trial paths",
    "description": "Full detailed description...",
    "shortDescription": "Brief description...",
    "theme": "HAUNTED_TOURS",
    "difficulty": "MODERATE",
    "status": "PUBLISHED",
    "country": "USA",
    "city": "Salem",
    "region": "Massachusetts",
    "address": "123 Witch Way, Salem, MA",
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
    "coverImage": "https://...",
    "images": ["https://...", "https://..."],
    "videoUrl": "https://...",
    "metaTitle": "SEO title",
    "metaDescription": "SEO description",
    "keywords": ["haunted", "salem", "witch"],
    "viewCount": 1523,
    "bookingCount": 87,
    "averageRating": 4.5,
    "reviewCount": 127,
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-11-05T00:00:00Z",
    "publishedAt": "2025-01-15T00:00:00Z",
    "itinerary": [
      {
        "id": "uuid",
        "day": 1,
        "title": "Arrival & Witch House Tour",
        "description": "Begin your journey...",
        "activities": ["Check-in", "Witch House visit"],
        "meals": ["Dinner"]
      }
    ],
    "inclusions": [
      {
        "id": "uuid",
        "item": "Accommodation",
        "description": "2 nights in haunted hotel"
      }
    ],
    "exclusions": [
      {
        "id": "uuid",
        "item": "Flights",
        "description": "International flights not included"
      }
    ],
    "partner": {
      "id": "uuid",
      "companyName": "Spooky Tours Inc",
      "logo": "https://...",
      "rating": 4.7,
      "verified": true
    },
    "reviews": [
      {
        "id": "uuid",
        "rating": 5,
        "title": "Amazing experience!",
        "comment": "Best horror tour ever...",
        "createdAt": "2025-10-15T00:00:00Z",
        "user": {
          "id": "uuid",
          "displayName": "John Doe",
          "avatar": "https://..."
        }
      }
    ]
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Holiday not found"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Failed to fetch holiday",
  "error": "Error details (only in development mode)"
}
```

---

### 3. Search Holidays
Search holidays using full-text search across multiple fields.

**Endpoint:** `GET /api/v1/holidays/search`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `q` | string | Yes | - | Search query |
| `page` | integer | No | 1 | Page number for pagination |
| `limit` | integer | No | 10 | Number of items per page |

**Search Fields:**
- Title
- Description
- City
- Country

**Example Request:**
```bash
GET /api/v1/holidays/search?q=haunted&page=1&limit=10
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "haunted-salem-tour",
      "title": "Haunted Salem Tour",
      "shortDescription": "Experience the dark history...",
      "theme": "HAUNTED_TOURS",
      "country": "USA",
      "city": "Salem",
      "basePrice": 299.99,
      "currency": "USD",
      "coverImage": "https://...",
      "averageRating": 4.5,
      "reviewCount": 127
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 23,
    "totalPages": 3
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Search query is required"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "message": "Failed to search holidays",
  "error": "Error details (only in development mode)"
}
```

---

## Common Response Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

---

## Rate Limiting
- 100 requests per minute per IP address
- 1000 requests per hour per IP address

---

## Notes

1. **Pagination**: All list endpoints support pagination. Use `page` and `limit` parameters to navigate through results.

2. **Filtering**: Multiple filters can be combined. All filters use AND logic.

3. **Case Sensitivity**: Text filters (country, city) are case-insensitive.

4. **Date Format**: All dates should be in ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ).

5. **View Count**: The view count is automatically incremented when fetching a single holiday.

6. **Published Only**: By default, only PUBLISHED holidays are returned to public users.

---

## Examples

### Get all haunted tours in USA under $500
```bash
GET /api/v1/holidays?country=USA&theme=HAUNTED_TOURS&maxPrice=500
```

### Get holidays available in October 2025
```bash
GET /api/v1/holidays?startDate=2025-10-01&endDate=2025-10-31
```

### Search for "witch" related holidays
```bash
GET /api/v1/holidays/search?q=witch
```

### Get second page with 20 items per page
```bash
GET /api/v1/holidays?page=2&limit=20
```
