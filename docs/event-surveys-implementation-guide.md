# Event Registration Surveys - Implementation Guide

## Overview
Add pre- and post-event survey capabilities to the recurring events registration system. Event organizers can attach webform surveys to their events, and registrants automatically receive survey links via email.

## Data Model Changes

### EventSeries Entity - New Fields
```yaml
field_pre_survey_webform:
  type: entity_reference
  target_type: webform
  label: "Pre-Event Survey"
  description: "Optional survey sent before the event"

field_post_survey_webform:
  type: entity_reference
  target_type: webform
  label: "Post-Event Survey" 
  description: "Optional survey sent after the event"

field_survey_settings:
  type: map
  label: "Survey Settings"
  # Stores timing and reminder configuration
```

### Webform Entity - Enhanced Fields
```yaml
# Additional fields to support template management
field_survey_source:
  type: list_string
  label: "Survey Source Type"
  allowed_values:
    system_template: "System Template"
    personal_template: "Personal Template"
    event_survey: "Event Survey"

field_survey_owner:
  type: entity_reference
  target_type: user
  label: "Template Owner"
  description: "Owner of personal templates"

field_survey_parent:
  type: entity_reference
  target_type: webform
  label: "Parent Template"
  description: "Original template this was cloned from"

field_survey_event:
  type: entity_reference
  target_type: eventseries
  label: "Associated Event"
  description: "Event this survey belongs to (for cleanup)"

field_template_category:
  type: list_string
  label: "Template Category"
  allowed_values:
    pre_event: "Pre-Event"
    post_event: "Post-Event"
    evaluation: "Evaluation"
    assessment: "Assessment"
    custom: "Custom"

field_template_visibility:
  type: list_string
  label: "Template Visibility"
  allowed_values:
    private: "Private (only me)"
    organization: "My Organization"
    public: "Public (all users)"
```

### Registrant Entity - New Fields
```yaml
field_pre_survey_submission:
  type: entity_reference
  target_type: webform_submission
  label: "Pre-Survey Submission"

field_post_survey_submission:
  type: entity_reference
  target_type: webform_submission
  label: "Post-Survey Submission"

field_survey_status:
  type: list_string
  label: "Survey Status"
  allowed_values:
    pending: "Pending"
    pre_sent: "Pre-survey Sent"
    pre_completed: "Pre-survey Completed"
    post_sent: "Post-survey Sent"
    post_completed: "Post-survey Completed"
    completed: "All Surveys Completed"
```

---

## Developer Tasks

### Phase 1: Module Setup & Configuration

#### Task 1.1: Create Module Structure
```bash
# Create module directory
mkdir web/modules/custom/recurring_events_surveys

# Create basic module files
touch recurring_events_surveys.info.yml
touch recurring_events_surveys.module
touch recurring_events_surveys.install
touch recurring_events_surveys.routing.yml
touch recurring_events_surveys.services.yml
```

#### Task 1.2: Define Module Dependencies
```yaml
# recurring_events_surveys.info.yml
name: 'Recurring Events Surveys'
description: 'Adds survey capabilities to recurring events'
type: module
core_version_requirement: ^10
dependencies:
  - recurring_events:recurring_events
  - recurring_events:recurring_events_registration
  - webform:webform
  - drupal:system
```

#### Task 1.3: Add Entity Fields
```php
// recurring_events_surveys.install
function recurring_events_surveys_install() {
  // Add fields to eventseries entity
  $fields = [
    'field_pre_survey_webform' => [
      'type' => 'entity_reference',
      'settings' => ['target_type' => 'webform'],
    ],
    'field_post_survey_webform' => [
      'type' => 'entity_reference', 
      'settings' => ['target_type' => 'webform'],
    ],
    'field_survey_settings' => [
      'type' => 'map',
    ],
  ];
  
  // Implementation to create fields
}
```

### Phase 2: Survey Management Services

#### Task 2.1: Create Enhanced Survey Manager Service
```php
// src/SurveyManagerInterface.php
interface SurveyManagerInterface {
  public function attachSurvey(EventSeries $event, string $type, string $webform_id);
  public function getAvailableTemplates(string $type = NULL, $user_id = NULL);
  public function cloneTemplateForEvent(EventSeries $event, string $template_id, string $type, array $customizations = []);
  public function saveAsPersonalTemplate(string $webform_id, string $name, array $settings = []);
  public function getPersonalTemplates($user_id);
  public function getSurveyForRegistrant(Registrant $registrant, string $type);
  public function deleteEventSurvey(string $webform_id);
  public function cleanupEventSurveys(EventSeries $event);
}

// src/SurveyManager.php
class SurveyManager implements SurveyManagerInterface {
  
  public function cloneTemplateForEvent(EventSeries $event, string $template_id, string $type, array $customizations = []) {
    $template = Webform::load($template_id);
    $new_webform = $template->createDuplicate();
    
    // Generate unique ID for this event's survey
    $new_id = $this->generateSurveyId($event, $type, $template_id);
    $new_webform->set('id', $new_id);
    $new_webform->set('title', $this->generateSurveyTitle($event, $type, $template->label()));
    
    // Mark as event-specific survey
    $new_webform->set('survey_source', 'event_survey');
    $new_webform->set('survey_parent', $template_id);
    $new_webform->set('survey_event', $event->id());
    
    // Apply any immediate customizations
    if (!empty($customizations)) {
      $this->applyCustomizations($new_webform, $customizations);
    }
    
    $new_webform->save();
    return $new_webform;
  }
  
  public function saveAsPersonalTemplate(string $webform_id, string $name, array $settings = []) {
    $source_webform = Webform::load($webform_id);
    $template = $source_webform->createDuplicate();
    
    // Generate unique template ID
    $template_id = 'template_' . $this->currentUser->id() . '_' . $this->generateUniqueId();
    $template->set('id', $template_id);
    $template->set('title', $name);
    
    // Mark as personal template
    $template->set('survey_source', 'personal_template');
    $template->set('survey_owner', $this->currentUser->id());
    $template->set('survey_parent', $source_webform->get('survey_parent') ?: $webform_id);
    $template->set('template_category', $settings['category'] ?? 'custom');
    $template->set('template_visibility', $settings['visibility'] ?? 'private');
    
    // Remove event-specific data
    $template->set('survey_event', NULL);
    
    $template->save();
    return $template;
  }
  
  public function getAvailableTemplates(string $type = NULL, $user_id = NULL) {
    $query = \Drupal::entityQuery('webform')
      ->accessCheck(FALSE);
    
    // Include system templates and user's personal templates
    $or_group = $query->orConditionGroup()
      ->condition('survey_source', 'system_template')
      ->condition('survey_source', NULL, 'IS NULL'); // Legacy templates
    
    if ($user_id) {
      $personal_group = $query->andConditionGroup()
        ->condition('survey_source', 'personal_template')
        ->condition('survey_owner', $user_id);
      $or_group->condition($personal_group);
    }
    
    $query->condition($or_group);
    
    if ($type) {
      $query->condition('template_category', $type);
    }
    
    $webform_ids = $query->execute();
    return Webform::loadMultiple($webform_ids);
  }
}
```

#### Task 2.2: Create Survey Distribution Service
```php
// src/SurveyDistributionInterface.php
interface SurveyDistributionInterface {
  public function scheduleSurveyEmail(Registrant $registrant, string $type);
  public function sendSurveyEmail(Registrant $registrant, string $type);
  public function generateSurveyUrl(Registrant $registrant, string $type);
}

// src/SurveyDistribution.php
class SurveyDistribution implements SurveyDistributionInterface {
  // Implement email scheduling and sending logic
}
```

### Phase 3: Form Integration

#### Task 3.1: Extend Event Creation Form
```php
// src/EventSubscriber/EventFormSubscriber.php
class EventFormSubscriber implements EventSubscriberInterface {
  
  public function alterEventForm(array &$form, FormStateInterface $form_state) {
    // Add survey selection fieldset to event creation form
    $form['surveys'] = [
      '#type' => 'fieldset',
      '#title' => 'Event Surveys',
      '#group' => 'advanced',
    ];
    
    $form['surveys']['pre_survey'] = [
      '#type' => 'select',
      '#title' => 'Pre-Event Survey',
      '#options' => $this->getWebformOptions('pre_event'),
      '#empty_option' => '- None -',
    ];
    
    // Similar for post-survey
  }
}
```

#### Task 3.2: Create Survey Configuration Form
```php
// src/Form/SurveySettingsForm.php
class SurveySettingsForm extends ConfigFormBase {
  
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['pre_survey_timing'] = [
      '#type' => 'number',
      '#title' => 'Send pre-survey X days before event',
      '#default_value' => 7,
      '#min' => 0,
    ];
    
    $form['post_survey_timing'] = [
      '#type' => 'number', 
      '#title' => 'Send post-survey X days after event',
      '#default_value' => 1,
      '#min' => 0,
    ];
    
    // Additional timing and reminder settings
  }
}
```

### Phase 4: Email & Queue Integration

#### Task 4.1: Create Queue Worker
```php
// src/Plugin/QueueWorker/SurveyEmailQueue.php
/**
 * @QueueWorker(
 *   id = "survey_email_queue",
 *   title = @Translation("Survey Email Queue"),
 *   cron = {"time" = 60}
 * )
 */
class SurveyEmailQueue extends QueueWorkerBase {
  
  public function processItem($data) {
    $registrant = Registrant::load($data['registrant_id']);
    $survey_type = $data['survey_type'];
    
    // Send email with survey link
    // Update registrant survey status
  }
}
```

#### Task 4.2: Hook into Registration Process
```php
// recurring_events_surveys.module
function recurring_events_surveys_entity_insert(EntityInterface $entity) {
  if ($entity instanceof Registrant) {
    // Schedule pre-survey email if enabled
    $survey_manager = \Drupal::service('recurring_events_surveys.manager');
    $survey_manager->schedulePreSurvey($entity);
  }
}

function recurring_events_surveys_cron() {
  // Check for events that ended and need post-surveys sent
  $survey_distribution = \Drupal::service('recurring_events_surveys.distribution');
  $survey_distribution->processPostEventSurveys();
}
```

### Phase 5: Access Control & Security

#### Task 5.1: Create Survey Access Controller
```php
// src/Controller/SurveyAccessController.php
class SurveyAccessController extends ControllerBase {
  
  public function accessSurvey(Request $request, $token) {
    // Validate token
    // Load registrant and survey
    // Redirect to webform with prepopulated data
  }
  
  private function validateSurveyToken($token, $registrant_id, $survey_type) {
    // Validate token hasn't expired
    // Ensure token matches registrant and survey type
  }
}
```

#### Task 5.2: Add Enhanced Permissions
```php
// recurring_events_surveys.permissions.yml
view survey results:
  title: 'View survey results'
  description: 'View survey results for events you manage'

export survey data:
  title: 'Export survey data'
  description: 'Export survey data to CSV/Excel'

manage survey templates:
  title: 'Manage survey templates'
  description: 'Create and modify survey templates'

create personal templates:
  title: 'Create personal templates'
  description: 'Save customized surveys as personal templates'

share templates:
  title: 'Share templates'
  description: 'Share personal templates with organization or publicly'

view all templates:
  title: 'View all templates'
  description: 'View and use templates from all users (admin only)'
```

### Phase 6: Template Management & Results

#### Task 6.1: Create Template Management Interface
```php
// src/Controller/TemplateManagerController.php
class TemplateManagerController extends ControllerBase {
  
  public function listPersonalTemplates() {
    // Show user's personal templates
    // Provide edit, delete, share options
  }
  
  public function saveAsTemplate(Request $request) {
    // Handle "Save as Template" action from customization
    // Show naming and sharing options
  }
  
  public function duplicateTemplate($template_id) {
    // Create copy of existing personal template
  }
  
  public function shareTemplate($template_id, $visibility) {
    // Update template visibility settings
  }
}
```

#### Task 6.2: Create Results View
```php
// src/Controller/SurveyResultsController.php
class SurveyResultsController extends ControllerBase {
  
  public function viewResults(EventSeries $eventseries, $survey_type) {
    // Build results display
    // Show aggregate statistics
    // Provide export options
  }
  
  public function exportResults(EventSeries $eventseries, $survey_type, $format = 'csv') {
    // Generate CSV/Excel export
  }
}
```

---

## Designer Tasks

### Phase 1: User Experience Design

#### Task 1.1: Map Enhanced User Workflows
**Event Organizer Journey:**
1. Creating event → Template selection (System + Personal)
2. Customizing survey → Save as personal template option
3. Managing templates → Personal template library
4. After event → Viewing results and analytics

**Power User Journey:**
1. Creates event with custom survey
2. Saves customized survey as personal template
3. Uses personal template for future events
4. Shares successful templates with team/organization

**Registrant Journey:**
1. Registration confirmation → Optional pre-survey mention
2. Pre-event email → Survey completion
3. Post-event email → Feedback submission

#### Task 1.2: Design Survey Selection Interface
**Location:** Event creation/edit form
**Requirements:**
- Clear labeling for pre/post surveys
- Preview option for selected surveys
- Template library browser
- Settings for timing and reminders

**Key Elements:**
- Survey type selector (pre/post)
- Template preview modal
- Timing configuration (days before/after)
- Required vs optional toggle
- Custom message field for survey emails

### Phase 2: Form & Interface Design

#### Task 2.1: Event Creation Form Integration
**Design Specifications:**
```
┌─────────────────────────────────────────┐
│ Event Details                           │
│ ├── Basic Information                   │
│ ├── Date & Time                        │
│ ├── Registration Settings              │
│ └── Survey Settings                    │
│     ├── Pre-Event Survey              │
│     │   ├── [ ] Enable Pre-Survey     │
│     │   ├── Template: [Dropdown ▼]    │
│     │   ├── Send: [7] days before     │
│     │   └── [Preview] [Customize]     │
│     └── Post-Event Survey             │
│         ├── [ ] Enable Post-Survey    │
│         ├── Template: [Dropdown ▼]    │
│         ├── Send: [1] days after      │
│         └── [Preview] [Customize]     │
└─────────────────────────────────────────┘
```

#### Task 2.2: Enhanced Template Library Interface
**Modal Design for Template Selection:**
```
┌─────────────────────────────────────────────────────┐
│ Choose Survey Template                              │
├─────────────────────────────────────────────────────┤
│ [System Templates] [My Templates] [Shared]         │
├─────────────────────────────────────────────────────┤
│ Filter: [All Types ▼] Search: [____________] 🔍    │
├─────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│ │ ⭐ Standard │ │   My Custom │ │   Skills    │    │
│ │   Pre-Event │ │   Workshop  │ │   Assessment│    │
│ │   System    │ │   Personal  │ │   System    │    │
│ │ [Select]    │ │ [Select]    │ │ [Select]    │    │
│ └─────────────┘ └─────────────┘ └─────────────┘    │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐    │
│ │   Team      │ │   Feedback  │ │ [+ Create   │    │
│ │   Retro     │ │   Form      │ │    New      │    │
│ │   Shared    │ │   Personal  │ │   Template] │    │
│ │ [Select]    │ │ [Select]    │ │             │    │
│ └─────────────┘ └─────────────┘ └─────────────┘    │
└─────────────────────────────────────────────────────┘
```

**Template Card Features:**
- Template source indicator (System/Personal/Shared)
- Usage statistics ("Used in 23 events")
- Last modified date
- Category tags
- Owner name (for shared templates)
- Preview and select options

#### Task 2.3: Template Management Dashboard
**Personal Templates Page:**
```
┌─────────────────────────────────────────────────────┐
│ My Survey Templates                                 │
├─────────────────────────────────────────────────────┤
│ [+ Create New Template] [Import Template]           │
├─────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────┐ │
│ │ My Custom Workshop Survey        [Edit] [Share] │ │
│ │ Pre-Event • Created Dec 15 • Used 5 times      │ │
│ │ Based on: Standard Pre-Event                    │ │
│ └─────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Team Retrospective Form          [Edit] [Share] │ │
│ │ Post-Event • Created Nov 28 • Used 12 times    │ │
│ │ Based on: Custom Creation                       │ │
│ └─────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Skills Assessment v2             [Edit] [Share] │ │
│ │ Assessment • Created Oct 10 • Used 3 times     │ │
│ │ Based on: Skills Assessment                     │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

#### Task 2.4: Survey Results Dashboard
**Results Page Layout:**
```
┌─────────────────────────────────────────┐
│ Event Title - Survey Results           │
├─────────────────────────────────────────┤
│ [Pre-Survey] [Post-Survey] [Both]      │
├─────────────────────────────────────────┤
│ Overview                                │
│ ├── 85% Response Rate (34/40)         │
│ ├── Avg. Completion Time: 4m 32s      │
│ └── Last Updated: 2 hours ago         │
├─────────────────────────────────────────┤
│ Quick Stats                            │
│ [Chart/Graph visualization]            │
├─────────────────────────────────────────┤
│ Individual Responses                   │
│ [Filterable table of submissions]     │
├─────────────────────────────────────────┤
│ [Export CSV] [Export Excel] [Print]   │
│ [💾 Save Survey as Template]          │
└─────────────────────────────────────────┘
```

### Phase 3: Email Templates Design

#### Task 3.1: Pre-Survey Email Template
**Subject:** Survey for [Event Title] - Help us prepare for you!

**Design Requirements:**
- Branded header matching site theme
- Clear call-to-action button
- Event details summary
- Expected completion time
- Mobile-responsive design

#### Task 3.2: Post-Survey Email Template
**Subject:** How was [Event Title]? Share your feedback

**Design Requirements:**
- Thank you message
- Event recap/highlights
- Survey completion incentive
- Social sharing options
- Unsubscribe option

### Phase 4: Mobile & Accessibility

#### Task 4.1: Mobile Survey Experience
**Requirements:**
- Touch-friendly form elements
- Progress indicator for multi-page surveys
- Save and continue functionality
- Optimized for various screen sizes

#### Task 4.2: Accessibility Compliance
**WCAG 2.1 AA Requirements:**
- Proper heading hierarchy
- Color contrast ratios
- Keyboard navigation
- Screen reader compatibility
- Focus indicators

### Phase 5: Visual Design System

#### Task 5.1: Survey UI Components
**Design Components:**
- Survey progress bar
- Question types styling
- Response validation messages
- Success/completion screens
- Error states

#### Task 5.2: Results Visualization
**Chart Types:**
- Response rate metrics
- Rating scale summaries
- Text response word clouds
- Time-based completion trends
- Demographic breakdowns (if applicable)

---

## User Workflows

### Enhanced Event Organizer Workflow

1. **Event Creation with Template Selection**
   - Navigate to Create Event form
   - Complete basic event details
   - In Survey Settings section:
     - Toggle on pre/post surveys
     - Choose template source (System/Personal/Shared)
     - Preview templates before selection
     - Select template or create from scratch

2. **Survey Customization**
   - Customize selected template if needed
   - Modify questions, add/remove sections
   - Preview customized survey
   - Save customizations as personal template (optional)

3. **Survey Configuration**
   - Configure timing (days before/after event)
   - Set as required or optional
   - Customize email templates
   - Test survey functionality

4. **Template Management**
   - Access personal template library
   - Edit existing personal templates
   - Share templates with organization
   - Organize templates by category

5. **Results Analysis**
   - Access results dashboard after surveys are sent
   - View aggregate statistics
   - Filter and sort individual responses
   - Export data for further analysis
   - Save successful survey as template for reuse

### Registrant Workflow

1. **Registration**
   - Complete event registration
   - Receive confirmation with optional survey mention

2. **Pre-Event Survey**
   - Receive personalized email with survey link
   - Access survey via secure, tokenized URL
   - Complete survey (save and continue if needed)
   - Receive confirmation of submission
   - Automatic reminders if incomplete (configurable)

3. **Post-Event Survey**
   - Receive follow-up email after event
   - Provide feedback and ratings
   - Submit final evaluation
   - Thank you message with event highlights

### Power User Workflow (Template Creators)

1. **Template Creation**
   - Start from existing system template
   - Customize for specific needs/audience
   - Test with sample data
   - Save as personal template

2. **Template Refinement**
   - Use template across multiple events
   - Analyze response patterns
   - Refine questions based on feedback
   - Update template for improved results

3. **Template Sharing**
   - Share successful templates with team
   - Contribute to organizational template library
   - Receive feedback from other users
   - Iterate based on community input

---

## Configuration Options

### Site-wide Settings
- Default survey timing (days before/after)
- Email sender information
- Reminder schedule settings
- Data retention policies

### Event-specific Settings
- Survey selection (pre/post)
- Custom timing overrides
- Required vs optional
- Custom email messages
- Reminder frequency

### Survey Template Settings
- Question types and order
- Conditional logic
- Validation rules
- Completion actions
- Styling options

---

## Success Metrics

### For Event Organizers
- Increased feedback collection rates
- Improved event quality through insights
- Time saved on manual survey management
- Better attendee engagement

### For Attendees
- Streamlined survey experience
- Mobile-friendly completion
- Clear progress indication
- Timely and relevant questions

### Technical Metrics
- Survey delivery success rate
- Response completion rates
- System performance under load
- Email deliverability rates