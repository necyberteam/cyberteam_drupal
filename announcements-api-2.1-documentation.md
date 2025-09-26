# Announcements 2.1 Faceted API Documentation

## Overview

The ACCESS Announcements API 2.1 provides faceted search capabilities for ACCESS news and announcements. It's built on Drupal's Search API with a REST export endpoint that supports filtering, sorting, and pagination.

**Base URL**: `/api/2.1/announcements`  
**Method**: `GET`  
**Content Type**: `application/json`  
**Data Source**: Search API index on `access_news` content type

## Endpoint

```
GET /api/2.1/announcements
```

## Response Format

Returns a JSON array of announcement objects with the following fields:

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `field_published_date` | `date` | Publication date of the announcement |
| `title` | `string` | Title of the announcement |
| `body` | `object` | Full body content with HTML formatting |
| `custom_announcement_ag` | `string` | Associated affinity groups (processed field) |
| `custom_announcement_tags` | `string` | Associated tags (processed field) |
| `field_affiliation` | `array` | Affiliation values (ACCESS, Campus Champions, etc.) |

## Query Parameters

### Filtering Parameters

#### `tags` (string)
Filter announcements by tags.
- **Parameter**: `tags`
- **Operator**: Equals
- **Example**: `?tags=maintenance`

#### `ag` (string) 
Filter announcements by affinity group.
- **Parameter**: `ag`
- **Operator**: Equals  
- **Example**: `?ag=Storage and Data`

#### `affiliation` (array)
Filter by affiliation (multi-select).
- **Parameter**: `affiliation`
- **Operator**: OR
- **Example**: `?affiliation[]=access&affiliation[]=campus-champions`

### Date Range Parameters

#### Relative Date Filters

**`relative_start_date`** - Filter announcements published after a relative date
- **Format**: Relative date string
- **Operator**: `>=`
- **Example**: `?relative_start_date=-30 days`

**`relative_end_date`** - Filter announcements published before a relative date  
- **Format**: Relative date string
- **Operator**: `<=`
- **Example**: `?relative_end_date=now`

#### Absolute Date Filters

**`start_date`** - Filter announcements published on or after specific date
- **Format**: `YYYY-MM-DD`
- **Operator**: `>=`
- **Example**: `?start_date=2024-01-01`

**`end_date`** - Filter announcements published on or before specific date
- **Format**: `YYYY-MM-DD` 
- **Operator**: `<=`
- **Example**: `?end_date=2024-12-31`

### Pagination Parameters

The API uses Drupal's mini pager with the following defaults:
- **Items per page**: 10
- **Offset**: 0

Standard Drupal pager query parameters are supported:
- `page` - Page number (0-indexed)

## Example Requests

### Basic Request
```
GET /api/2.1/announcements
```

### Filter by Tags
```
GET /api/2.1/announcements?tags=outage
```

### Filter by Affinity Group
```
GET /api/2.1/announcements?ag=Data%20Management
```

### Filter by Date Range
```
GET /api/2.1/announcements?start_date=2024-01-01&end_date=2024-03-31
```

### Filter by Relative Date
```
GET /api/2.1/announcements?relative_start_date=-7%20days
```

### Multiple Filters
```
GET /api/2.1/announcements?tags=maintenance&affiliation[]=access&relative_start_date=-30%20days
```

## Example Response

```json
[
  {
    "field_published_date": [
      {
        "value": "2024-01-15T10:00:00"
      }
    ],
    "title": [
      {
        "value": "Scheduled Maintenance Window"
      }
    ],
    "body": [
      {
        "value": "<p>We will be performing scheduled maintenance...</p>",
        "format": "basic_html"
      }
    ],
    "custom_announcement_ag": [
      "Storage and Data", "Compute"
    ],
    "custom_announcement_tags": [
      "maintenance", "outage"
    ],
    "field_affiliation": [
      {
        "value": "access"
      }
    ]
  }
]
```

## Search API Index Details

The API is powered by the `announcements` Search API index with the following configuration:

### Indexed Fields
- `body` - Full text search on announcement body
- `title` - Announcement title
- `field_published_date` - Publication date
- `field_affiliation` - Organizational affiliation
- `custom_announcement_ag` - Processed affinity group associations
- `custom_announcement_tags` - Processed tag associations

### Search API Processors
The index uses custom processors for enhanced faceting:
- `custom_announcement_affinity_group` - Extracts affinity group relationships
- `announcement_tags` - Processes and indexes tags for faceted search

## Authentication

Currently configured with `_access: 'TRUE'` (public access). Authentication requirements may vary based on deployment configuration.

## Rate Limiting

No specific rate limiting is configured at the API level. Standard Drupal caching and performance considerations apply.

## Error Handling

Standard Drupal REST API error responses:
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Not Found
- `500` - Internal Server Error

## Cache Strategy

- **Cache Type**: `search_api_none` (no search API specific caching)
- **Cache Max Age**: -1 (no max age limit)
- **Cache Contexts**: URL, query args, language, user permissions
- **Cache Tags**: Includes field storage and search API index tags for proper invalidation

## Version History

**Version 2.1**: Current version with faceted search capabilities
- Faceted filtering by tags, affinity groups, and affiliations  
- Multiple date filtering options (relative and absolute)
- Search API powered backend for better performance
- Enhanced field processing for improved search capabilities