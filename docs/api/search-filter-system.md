# Search & Filter System Documentation

## Overview

The Eerie Escapes search and filter system provides powerful capabilities for discovering holidays with advanced filtering, sorting, and relevance-based search.

## Features

### 1. Full-Text Search
- Multi-field search across title, description, city, country, region
- Word-level matching for better relevance
- Keyword-based search support

### 2. Advanced Filters
- **Location**: Country, city filtering
- **Theme**: Filter by holiday theme (haunted tours, paranormal, etc.)
- **Difficulty**: Easy, Moderate, Challenging, Extreme
- **Price Range**: Min/max price filtering
- **Duration**: Min/max days filtering
- **Rating**: Minimum rating filter

### 3. Sorting Options
- **Relevance**: Multi-factor scoring (rating, reviews, bookings)
- **Popularity**: Based on bookings, views, and reviews
- **Price**: Ascending or descending
- **Rating**: Highest or lowest rated
- **Date**: Recently published or oldest
- **Duration**: Shortest or longest trips

### 4. Search Analytics
- Track all search queries
- Monitor search performance
- Identify popular search terms
- Zero-result search tracking

### 5. Search Suggestions
- Real-time autocomplete
- Holiday title suggestions
- Location-based suggestions

## API Endpoints

### Search Holidays
```
GET /api/v1/holidays/search
```

**Query Parameters:**
- `q` (required): Search query string
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)
- `theme` (optional): Filter by theme
- `difficulty` (optional): Filter by difficulty level
- `country` (optional): Filter by country
- `city` (optional): Filter by city
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `minDuration` (optional): Minimum duration in days
- `maxDuration` (optional): Maximum duration in days
- `minRating` (optional): Minimum average rating
- `sortBy` (optional): Sort field (relevance, popularity, price, rating, date, duration)
- `sortOrder` (optional): Sort direction (asc, desc)

**Example Request:**
```bash
GET /api/v1/holidays/search?q=haunted&country=USA&minPrice=500&maxPrice=2000&sortBy=popularity
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "slug": "haunted-mansion-tour",
      "title": "Haunted Mansion Tour",
      "shortDescription": "Experience the most haunted mansion...",
      "theme": "HAUNTED_TOURS",
      "difficulty": "MODERATE",
      "country": "USA",
      "city": "New Orleans",
      "basePrice": 899.00,
      "currency": "USD",
      "durationDays": 3,
      "averageRating": 4.8,
      "reviewCount": 156,
      "bookingCount": 342
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "search": {
    "query": "haunted",
    "resultsCount": 45,
    "filters": {
      "country": "USA",
      "minPrice": "500",
      "maxPrice": "2000",
      "sortBy": "popularity"
    }
  }
}
```

### Get All Holidays (with filters)
```
GET /api/v1/holidays
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)
- `country` (optional): Filter by country
- `city` (optional): Filter by city
- `theme` (optional): Filter by theme
- `difficulty` (optional): Filter by difficulty
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `minDuration` (optional): Minimum duration
- `maxDuration` (optional): Maximum duration
- `startDate` (optional): Filter by start date
- `endDate` (optional): Filter by end date
- `sortBy` (optional): Sort field (default: createdAt)
- `sortOrder` (optional): Sort direction (default: desc)

**Valid Sort Fields:**
- `createdAt`: Creation date
- `updatedAt`: Last update date
- `publishedAt`: Publication date
- `basePrice`: Price
- `averageRating`: Rating
- `reviewCount`: Number of reviews
- `bookingCount`: Number of bookings
- `viewCount`: Number of views
- `durationDays`: Duration
- `title`: Alphabetical

**Example Request:**
```bash
GET /api/v1/holidays?theme=PARANORMAL&difficulty=CHALLENGING&sortBy=averageRating&sortOrder=desc
```

### Search Suggestions
```
GET /api/v1/holidays/search/suggestions
```

**Query Parameters:**
- `q` (required): Partial search query (min 2 characters)
- `limit` (optional): Max suggestions (default: 5)

**Example Request:**
```bash
GET /api/v1/holidays/search/suggestions?q=haun&limit=5
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "type": "holiday",
      "text": "Haunted Mansion Tour",
      "slug": "haunted-mansion-tour"
    },
    {
      "type": "location",
      "text": "Haunted Hills, USA"
    }
  ]
}
```

### Popular Searches
```
GET /api/v1/holidays/search/popular
```

**Query Parameters:**
- `limit` (optional): Max results (default: 10)

**Example Request:**
```bash
GET /api/v1/holidays/search/popular?limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "term": "haunted tours",
      "searchCount": 1247,
      "avgResults": 23
    },
    {
      "term": "paranormal",
      "searchCount": 892,
      "avgResults": 18
    }
  ]
}
```

## Database Optimization

### Indexes Added
The following indexes optimize query performance:

**Holiday Table:**
- `slug` - Unique index for fast slug lookups
- `theme` - Filter by theme
- `country, city` - Composite index for location filtering
- `status` - Filter by publication status
- `partnerId` - Partner relationship queries
- `basePrice` - Price range filtering and sorting
- `averageRating` - Rating filtering and sorting
- `bookingCount` - Popularity sorting
- `durationDays` - Duration filtering and sorting

**SearchAnalytics Table:**
- `searchTerm` - Fast lookup of search terms
- `createdAt` - Time-based analytics queries

### Query Optimization Tips

1. **Use specific filters**: More filters = faster queries
2. **Limit results**: Use pagination with reasonable limits
3. **Avoid wildcards at start**: `%term` is slower than `term%`
4. **Use indexed fields for sorting**: Stick to indexed sort fields

## Search Relevance Algorithm

The relevance scoring considers multiple factors:

1. **Exact matches** in title (highest priority)
2. **Partial matches** in description
3. **Location matches** (city, country, region)
4. **Keyword matches**
5. **Average rating** (secondary sort)
6. **Review count** (tertiary sort)
7. **Booking count** (quaternary sort)

## Analytics Tracking

All searches are tracked asynchronously with:
- Search term
- Applied filters
- Results count
- User ID (if authenticated)
- Timestamp

This data powers:
- Popular searches endpoint
- Search performance monitoring
- Zero-result search identification
- User behavior analysis

## Performance Considerations

### Response Times (Expected)
- Simple search: < 100ms
- Complex multi-filter search: < 200ms
- Suggestions: < 50ms
- Popular searches: < 100ms

### Caching Strategy
Consider implementing Redis caching for:
- Popular searches (TTL: 1 hour)
- Search suggestions (TTL: 30 minutes)
- Frequently accessed holidays (TTL: 15 minutes)

## Error Handling

### Common Errors

**400 Bad Request**
```json
{
  "success": false,
  "message": "Search query is required"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Failed to search holidays",
  "error": "Detailed error (development only)"
}
```

## Usage Examples

### Frontend Integration

```typescript
// Search with filters
const searchHolidays = async (query: string, filters: SearchFilters) => {
  const params = new URLSearchParams({
    q: query,
    ...filters,
  });
  
  const response = await fetch(`/api/v1/holidays/search?${params}`);
  return response.json();
};

// Get suggestions for autocomplete
const getSuggestions = async (query: string) => {
  if (query.length < 2) return [];
  
  const response = await fetch(
    `/api/v1/holidays/search/suggestions?q=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.data;
};

// Get popular searches for trending section
const getPopularSearches = async () => {
  const response = await fetch('/api/v1/holidays/search/popular?limit=5');
  const data = await response.json();
  return data.data;
};
```

### Advanced Search Example

```typescript
const advancedSearch = {
  q: 'haunted',
  theme: 'HAUNTED_TOURS',
  difficulty: 'MODERATE',
  country: 'USA',
  minPrice: 500,
  maxPrice: 2000,
  minDuration: 2,
  maxDuration: 7,
  minRating: 4.0,
  sortBy: 'popularity',
  sortOrder: 'desc',
  page: 1,
  limit: 20
};

const results = await searchHolidays(advancedSearch.q, advancedSearch);
```

## Testing

### Test Cases

1. **Basic search**: Query with single term
2. **Multi-word search**: Query with multiple words
3. **Location search**: Search by city/country
4. **Price filtering**: Min/max price ranges
5. **Duration filtering**: Min/max duration
6. **Combined filters**: Multiple filters together
7. **Sorting**: Each sort option
8. **Pagination**: Multiple pages
9. **Empty results**: Queries with no matches
10. **Special characters**: Queries with special chars

### Sample Test Queries

```bash
# Basic search
curl "http://localhost:3000/api/v1/holidays/search?q=haunted"

# Advanced search with filters
curl "http://localhost:3000/api/v1/holidays/search?q=paranormal&country=USA&minPrice=500&maxPrice=1500&sortBy=rating&sortOrder=desc"

# Get suggestions
curl "http://localhost:3000/api/v1/holidays/search/suggestions?q=haun"

# Popular searches
curl "http://localhost:3000/api/v1/holidays/search/popular?limit=10"
```

## Future Enhancements

1. **Fuzzy matching**: Handle typos and misspellings
2. **Geolocation search**: Find holidays near user location
3. **Date availability**: Filter by specific travel dates
4. **Price alerts**: Notify users of price drops
5. **Saved searches**: Save and rerun searches
6. **Search history**: Personal search history
7. **AI recommendations**: ML-based suggestions
8. **Voice search**: Speech-to-text search
9. **Image search**: Find holidays by image
10. **Collaborative filtering**: "Users who searched X also searched Y"
