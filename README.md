# cyberteam_drupal

## Campus Champions Module

The Campus Champions custom module implements the following features:

### Filter Approved Campus Champions
Implements the _views_query_alter function to filter Campus Champions on the approved field in the campus_champions table for the people_card_view and the people_list_view.

### Join the Campus Champions form
Implements the _form_alter function to:
- Prepopulate and hide user fields if the user is authenticated
- Add the autocomplete function to the Carnegie code field
- Reorder form components
- Require that the email not already be associated with an existing user account

### Autocomplete Carnegie Codes
Implements a JSON endpoint for the Carnegie code autocomplete.

The route
```
/autocomplete/carnegiecode?q=searchterm
```
returns
```json
[
    'label': 'School name',
    'value': 123456 // Carnegie code 
]
```
### Campus Champions Banner Block
A full width banner for the home page with Campus Champions statistics. Includes the Odometer library to animate number transitions.

### Views Bulk Operations action
A VBO action to set a user's is_cc field and field_region field.