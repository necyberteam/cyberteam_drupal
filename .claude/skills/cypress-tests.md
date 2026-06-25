# Cypress Test Authoring — cyberteam_drupal

## Project layout

- Tests live in `cypress/e2e/accessmatch3/<feature-dir>/<test>.cy.js`
- Run a single spec: `npx cypress run --spec "cypress/e2e/accessmatch3/..."`
- Config / support in `cypress/support/commands.js`

---

## Login commands

| Command | Login path | Use when |
|---|---|---|
| `cy.loginWith(user, pass)` | `/user/login` | Local DDEV — **always use this one** |
| `cy.loginAs(user, pass)` | UUID alias `/f64816be-...` | Only works on staging/prod where the alias resolves to a login form |
| `cy.loginUser(user, pass)` | `/user` | Fallback |

**Default credentials:** `administrator@amptesting.com` / `b8QW]X9h7#5n`

**Admin username in DB:** `administrator_test_user` (uid 64764) — use this for entity-reference autocomplete fields that reference users.

---

## Common gotchas

### Submit button selector
`#edit-submit` is not unique — the site header search bar also has `id="edit-submit"`.  
Always scope to the form:
```js
cy.get('form.node-<bundle>-form #edit-submit').scrollIntoView().click();
```

### List string fields rendered as radio buttons
Drupal `list_string` fields with `options_buttons` widget render as `<div>` + radio inputs, not `<select>`.  
Use `.check()` on the specific radio:
```js
cy.get('#edit-field-tcs-allocation-type-explore').check();
// pattern: #edit-<field-machine-name>-<key>
```

### Content moderation vs. simple publish
Check whether the content type uses a moderation workflow:
```bash
ddev drush php-eval "
\$workflows = \Drupal::entityTypeManager()->getStorage('workflow')->loadMultiple();
foreach (\$workflows as \$id => \$w) {
  \$tc = \$w->getTypePlugin()->getConfiguration();
  if (isset(\$tc['entity_types']['node']) && in_array('<bundle>', \$tc['entity_types']['node'])) {
    echo 'workflow: ' . \$id;
  }
}"
```
- **With workflow:** `cy.get('#edit-moderation-state-0-state').select('Published')`
- **Without workflow:** `cy.get('#edit-status-value').check()`

### Entity-reference autocomplete
Type into the autocomplete field, wait for the dropdown to be visible, then click:
```js
cy.get('#edit-<field>-0-target-id').type('administrator_test_user', { delay: 0 });
cy.get('.ui-autocomplete').should('be.visible').find('li').first().click();
```

### CKEditor body fields
```js
cy.get('.field--name-body .ck-content').then(el => {
  el[0].ckeditorInstance.setData('your content here');
});
```

---

## Discovering field info before writing a test

```bash
# List all custom fields on a content type
ddev drush php-eval "
\$fields = \Drupal::service('entity_field.manager')->getFieldDefinitions('node', '<bundle>');
foreach (\$fields as \$name => \$def) {
  if (strpos(\$name, 'field_') === 0)
    echo \$name . ' => ' . \$def->getType() . ' (' . \$def->getLabel() . \")\n\";
}"

# Find required fields
ddev drush php-eval "
\$def = \Drupal::service('entity_field.manager')->getFieldDefinitions('node', '<bundle>');
echo 'required: ';
foreach (\$def as \$name => \$d) { if (\$d->isRequired()) echo \$name . ' '; }"

# Find the widget type for a field
ddev drush php-eval "
\$fd = \Drupal::entityTypeManager()->getStorage('entity_form_display')->load('node.<bundle>.default');
echo json_encode(\$fd->getComponent('<field_name>'));"

# Find allowed values for a list_string field
ddev drush php-eval "
\$def = \Drupal::service('entity_field.manager')->getFieldDefinitions('node', '<bundle>');
echo json_encode(\$def['<field_name>']->getSettings()['allowed_values']);"

# Find what view/path a content type appears on
ddev drush php-eval "
\$views = \Drupal::entityTypeManager()->getStorage('view')->loadMultiple();
foreach (\$views as \$id => \$v) {
  foreach (\$v->get('display') as \$did => \$d) {
    if (isset(\$d['display_options']['path']))
      echo \$id . ' / ' . \$did . ': ' . \$d['display_options']['path'] . \"\n\";
  }
}"
```

---

## Test structure template

```js
const TITLE = 'cypress-<feature>-' + Date.now();

describe('<Feature> - <what is tested>', () => {
  it('<assertion>', () => {
    cy.loginWith('administrator@amptesting.com', 'b8QW]X9h7#5n');

    cy.visit('/node/add/<bundle>');
    cy.get('h1').contains('Create');

    cy.get('#edit-title-0-value').type(TITLE, { delay: 0 });
    // ... fill required fields ...

    cy.get('form.node-<bundle>-form #edit-submit').scrollIntoView().click();

    // assert node page
    cy.get('h1').contains(TITLE);

    // assert appears on view
    cy.visit('/<view-path>');
    cy.contains(TITLE);

    cy.drupalLogout();
  });
});
```
