# Events API Documentation

## Overview
The Events API provides access to event data with comprehensive filtering capabilities. This API supports both relative date filtering (dynamic dates like "today", "+1week") and absolute date filtering (fixed dates like "2024-08-30").

## Endpoints
- `/api/2.0/events` - Legacy endpoint (uses Eastern Time for date fields)
- `/api/2.1/events` - Current endpoint (uses UTC for all date fields)

## Method
GET

## Response Format
JSON array of event objects

## Event Object Structure
Each event contains the following fields:
- `id` - Unique identifier (string)
- `title` - Event title (string)
- `description` - Event description (string)
- `date` - Start date/time in UTC (YYYY-MM-DDTHH:MM:SSZ)
- `date_1` - End date/time in UTC (YYYY-MM-DDTHH:MM:SSZ)
- `location` - Event location (string)
- `event_type` - Type of event (string)
- `event_affiliation` - Organizational affiliation (string)
- `custom_event_tags` - Comma-separated tags (string)
- `skill_level` - Required skill level (string)
- `speakers` - Event speakers (string)
- `contact` - Contact information (string)
- `registration` - Registration URL/info (string)
- `field_video` - Video content reference (string)
- `created` - Creation timestamp in UTC (YYYY-MM-DDTHH:MM:SSZ)
- `changed` - Last modified timestamp in UTC (YYYY-MM-DDTHH:MM:SSZ)

## Date Filtering Parameters

### Relative Date Parameters
Use these for dynamic date filtering that updates daily:

- `beginning_date_relative` - Start date using relative values
- `end_date_relative` - End date using relative values

**Supported relative values:**
- `today` - Current date
- `+1week`, `+2week` - Future weeks
- `+1month`, `+2month` - Future months
- `+1year` - Future year
- `-1week`, `-1month` - Past periods

**Examples:**
```
# Get events from today onward
/api/2.1/events?beginning_date_relative=today

# Get events for the next week
/api/2.1/events?beginning_date_relative=today&end_date_relative=+1week

# Get events from the past month
/api/2.1/events?beginning_date_relative=-1month&end_date_relative=today
```

**Note:** Relative date calculations default to UTC timezone. Use the `timezone` parameter to specify a different timezone for calculations. For example, "today" means today in UTC unless overridden with the `timezone` parameter.

### Absolute Date Parameters
Use these for fixed date filtering:

- `beginning_date` - Start date in YYYY-MM-DD or YYYY-MM-DD HH:MM:SS format
- `end_date` - End date in YYYY-MM-DD or YYYY-MM-DD HH:MM:SS format

**Examples:**
```
# Get events on a specific date
/api/2.1/events?beginning_date=2022-08-30&end_date=2022-08-30

# Get events in a date range
/api/2.1/events?beginning_date=2022-08-01&end_date=2022-12-31

# With time (optional)
/api/2.1/events?beginning_date=2022-08-30 09:00:00&end_date=2022-08-30 17:00:00
```

### Mixed Date Parameters
You can combine absolute and relative dates:

```
# Events from a fixed date with relative end
/api/2.1/events?beginning_date=2022-01-01&end_date_relative=+1year

# Events from relative start with fixed end
/api/2.1/events?beginning_date_relative=today&end_date=2024-12-31
```

## Faceted Search Filters

### Format
Faceted filters use the format: `f[n]=field:value` where `n` is the filter index (0, 1, 2, etc.)

### Available Facets

**Event Type:**
```
/api/2.1/events?f[0]=custom_event_type:workshop
/api/2.1/events?f[0]=custom_event_type:webinar
```

**Event Affiliation:**
```
/api/2.1/events?f[0]=custom_event_affiliation:Community
/api/2.1/events?f[0]=custom_event_affiliation:ACCESS
```

**Skill Level:**
```
/api/2.1/events?f[0]=skill_level:beginner
/api/2.1/events?f[0]=skill_level:intermediate
/api/2.1/events?f[0]=skill_level:advanced
```

**Event Tags:**
```
/api/2.1/events?f[0]=custom_event_tags:python
/api/2.1/events?f[0]=custom_event_tags:big-data
/api/2.1/events?f[0]=custom_event_tags:machine-learning
```

**Date Fields (relative only):**
```
/api/2.1/events?f[0]=field_date:today
/api/2.1/events?f[0]=field_date:+1week
/api/2.1/events?f[0]=field_date_1:+1month
```

## Combining Filters

Multiple filters are combined with AND logic:

```
# Python workshops in the next month
/api/2.1/events?beginning_date_relative=today&end_date_relative=+1month&f[0]=custom_event_tags:python&f[1]=custom_event_type:workshop

# Beginner events this week
/api/2.1/events?beginning_date_relative=today&end_date_relative=+1week&f[0]=skill_level:beginner
```

## Common Use Cases

### Get upcoming events
```
GET /api/2.1/events?beginning_date_relative=today
```

### Get events for a specific month
```
GET /api/2.1/events?beginning_date=2024-08-01&end_date=2024-08-31
```

### Find workshops with a specific tag
```
GET /api/2.1/events?beginning_date_relative=today&f[0]=custom_event_type:workshop&f[1]=custom_event_tags:python
```

### Get past events for archival
```
GET /api/2.1/events?beginning_date_relative=-1year&end_date_relative=today
```

## Response Examples

### Success Response
```json
[
  {
    "id": "1",
    "title": "Python Workshop",
    "description": "Learn Python basics...",
    "date": "2024-08-30T13:00:00Z",
    "date_1": "2024-08-30T21:00:00Z",
    "location": "Online",
    "event_type": "workshop",
    "event_affiliation": "ACCESS",
    "custom_event_tags": "python,programming",
    "skill_level": "beginner",
    "speakers": "Dr. Smith",
    "contact": "events@example.com",
    "registration": "https://example.com/register",
    "field_video": "",
    "created": "2024-08-01T14:00:00Z",
    "changed": "2024-08-15T18:30:00Z"
  }
]
```

### Empty Results
```json
[]
```

## Important Notes

### Timezone Handling (v2.1)
- All date/time fields are returned in UTC with 'Z' suffix (ISO 8601 format)
- Relative date parameters default to UTC timezone for calculation
- Use the `timezone` parameter to specify timezone for relative date calculations

### Timezone Parameter (v2.1)
The `timezone` parameter controls how relative dates are calculated:

**Syntax:** `timezone=<timezone_identifier>`

**Default:** `UTC`

**Examples:**
```
# Today in UTC (default)
/api/2.1/events?beginning_date_relative=today

# Today in Eastern Time
/api/2.1/events?beginning_date_relative=today&timezone=America/New_York

# This week in Pacific Time
/api/2.1/events?beginning_date_relative=today&end_date_relative=+1week&timezone=America/Los_Angeles

# Today in Central European Time
/api/2.1/events?beginning_date_relative=today&timezone=Europe/Berlin
```

**Valid timezone values:** Any valid PHP timezone identifier (see [PHP Timezones](https://www.php.net/manual/en/timezones.php))

**Common timezones:**
- `UTC` - Coordinated Universal Time
- `America/New_York` - Eastern Time
- `America/Chicago` - Central Time  
- `America/Denver` - Mountain Time
- `America/Los_Angeles` - Pacific Time
- `Europe/London` - British Time
- `Europe/Berlin` - Central European Time

**Notes:**
- Invalid timezone identifiers default to UTC
- Only affects relative date parameters (not absolute dates)
- All output timestamps remain in UTC regardless of timezone parameter

### Date Filtering Capabilities
- **Relative dates work perfectly**: `beginning_date_relative=today`, `end_date_relative=+1week`
- **Absolute dates work correctly**: `beginning_date=2024-08-30`, `end_date=2024-12-31`
- **Faceted date filtering is NOT supported**: `f[0]=field_date:...` returns all events unfiltered
- **Mixed filtering works**: You can combine absolute and relative dates in the same query

### Technical Details
- All date comparisons use the event's start date (`date` field)
- URL encode special characters in filter values (e.g., `+1week` becomes `%2B1week`)
- Response typically completes in under 5 seconds
- Results are not paginated - all matching events are returned
- Time portion is optional for absolute dates (defaults to 00:00:00 if omitted)
- Both `YYYY-MM-DD` and `YYYY-MM-DD HH:MM:SS` formats work for absolute dates

### Test Coverage
The API includes comprehensive test coverage with 28 automated tests covering:
- All 16 event fields validation
- Relative and absolute date filtering
- Faceted search capabilities
- Performance and error handling
- Field format validation
- Mixed parameter combinations