# ARA Integration with RP Documentation Pages

The ACCESS Resource Advisor (ARA) can link users to RP documentation pages with recommendation context that highlights why specific resources or resource groups were recommended.

## URL Parameters

### Listing Page (`/rp-documentation`)

Link to the listing page with one or more resource groups highlighted.

**Single group recommendation:**
```
/rp-documentation?ara_context=Recommended+for+Python,+Earth+Sciences&ara_group=gpu-computing
```

**Multiple groups, same recommendation context:**
```
/rp-documentation?ara_context=Recommended+for+Python&ara_group=gpu-computing,hpc-clusters
```

**Multiple groups, different contexts:**
```
/rp-documentation?ara_recs=gpu-computing:Recommended+for+Python;hpc-clusters:Good+for+large+memory+jobs
```

### Resource Group Detail Page (`/rp-documentation/{group-slug}`)

Link directly to a resource group page:
```
/rp-documentation/gpu-computing?ara_context=Recommended+for+Python,+Earth+Sciences
```

### Individual Resource Page (`/rp-documentation/{resource-slug}`)

Link directly to an individual resource page:
```
/rp-documentation/bridges-2?ara_context=Recommended+for+Python,+large+memory+jobs
```

## Parameter Reference

| Parameter | Used On | Description |
|-----------|---------|-------------|
| `ara_context` | All pages | The recommendation text to display in the banner (e.g., "Recommended for Python, Earth Sciences"). |
| `ara_group` | Listing page | Resource group slug(s) to highlight. Single slug or comma-separated for multiple groups sharing the same `ara_context`. |
| `ara_recs` | Listing page | Alternative to `ara_context`+`ara_group` for multiple groups with different contexts. Format: `slug1:context1;slug2:context2` |

## Group and Resource Slugs

Slugs are the last segment of the URL path alias. For example:
- Page URL: `/rp-documentation/gpu-computing` -> slug: `gpu-computing`
- Page URL: `/rp-documentation/bridges-2` -> slug: `bridges-2`

Slugs are set by the pathauto pattern from the node title, or manually via the URL alias field on the node edit form.

## Behavior

### Banner Display
- A recommendation banner appears above the targeted resource group or at the top of the resource page
- The banner shows the `ara_context` text explaining why the resource was recommended
- On the listing page, targeted group rows are highlighted with a blue ring border

### Navigation
- The listing page auto-scrolls to the first recommended group
- The `ara_context` parameter is passed through to individual resource links within a highlighted group, so the banner persists when navigating from the listing to a resource page

### Persistence
- Recommendations are stored in the browser's `localStorage` and persist across page reloads
- Each banner has a "Dismiss" button that removes that specific recommendation
- On the listing page, dismissing one group's recommendation does not affect others
- Multiple ARA visits accumulate recommendations — new groups are added, existing ones are updated with the latest context

### localStorage Keys
- Listing page: `ara_rp_recommendations` (JSON array of `{group, context}` objects)
- Detail pages: `ara_recommendation_{node_id}` (context string)
