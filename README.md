# cyberteam_drupal

The Campus Champions custom module implements the following features:

## Campus Champion Features

### Join the Campus Champions form
Implements the _form_alter function to:
- Prepopulate and hide user fields if the user is authenticated
- Add the autocomplete function to the Carnegie code field
- Reorder form components
- Require that the email and username not already be associated with an existing user account

### Create user for new Campus Champions
- Create a new user with custom Webform Handler
- Email welcome message to new user

### Campus Champions field (is_cc)
The is_cc field determines whether a user is eligible to join the Campus Champions program
Implements _alter_form() to:
- Hide is_campus_champion field unless you are an admin
- Don't allow people to join Campus Champions program unless the is_cc field is checked
- Don't allow people to register as Campus Champions

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

### Views Bulk Operations actions
- Set a user's is_cc field and field_region field
- Password reset for selected users

## Affinity Group Features

### Affinity Groups editable by group coordinators
- Implements _node_access() to allow coordinators to edit their affinity group node.
 
### Export affinity group members
Drush command to export members. Currently exports as a csv and emails to an admin.

## Other Features

### Allow HTML in system email messages
- Implements _mail_alter() to allow including html in system messages
- Currently only password_reset is enabled. Uncomment other message types if desired for other messages.

### Hide preview button on contact forms
- Implemented in _form_alter()

### Redirect after password change
Redirect to the user's profile page after changing the password. Requires the following change in change_pwd_page module:
```
  if ($form_id == 'change_pwd_form') {
    $form['actions']['submit']['#submit'] = $form['#submit'];
    $form['actions']['submit']['#submit'][] = 'campuschampions_redirect_to_profile_page_form_submit'; // <-- add this line
```

### Make CV upload field private
- Implement _update_8901() to change the cv_resume field from public to private 
