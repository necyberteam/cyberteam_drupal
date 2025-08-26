<?php

namespace Drupal\campuschampions\Commands;

use Drush\Commands\DrushCommands;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Component\Utility\SafeMarkup;
use Drupal\Component\Utility\Html;
use Drupal\Core\File\FileSystemInterface;
use Drupal\campuschampions\Plugin\CarnegieCodesLookup;
use Drupal\node\Entity\Node;
use Drupal\user\Entity\User;

/**
 * A Drush commandfile for Campus Champions.
 *
 */
class CampusChampionsCommands extends DrushCommands
{
    /**
     * Drush command that exports affinity groups and emails the csv report.
     *
     * @command campuschampions:exportAffinityGroups
     * @aliases drush-cc affinity-groups
     * @usage --uri="https://campuschampions.cyberinfrastructure.org" campuschampions:exportAffinityGroups
     *
     * Or substitute whatever uri you prefer in the usage command
     *
     */
    public function exportAffinityGroups() {
        $viewId = 'affinity_group';
        $displayId = 'data_export_1';
        $reports = [];
        $host = \Drupal::request()->getHost(); // specified as uri parameter in the command

        $nids = \Drupal::entityQuery('node')
            ->condition('status', 1)
            ->condition('type', 'affinity_group')
            ->accessCheck(FALSE)
            ->execute();
        $nodes = \Drupal\node\Entity\Node::loadMultiple($nids);

        foreach ($nodes as $affinityGroup) {
            $view = \Drupal\views\Views::getView($viewId);
            $view->setDisplay($displayId);
            $view->setArguments([$affinityGroup->id()]); // contextual filter
            $view->execute();
            $rendered = $view->render();
            $output = \Drupal::service('renderer')->renderPlain($rendered);

            $filename = 'affinity-groups/affinity_group_' . $affinityGroup->getTitle() . '_'. date('Y_m_d') . '.csv';
            $filepath = "sites/default/files/" . $filename;
            file_unmanaged_save_data($output, "public://{$filename}", FILE_EXISTS_REPLACE);

            array_push($reports, (object)[
                'name' => $affinityGroup->getTitle(),
                'url' => $host . '/' . $filepath
            ]);
        }
        $to_email = 'andrew@elytra.net';
        $from_email = 'no-reply@wpi.edu';
        $subject = "Cyberteam Affinity Groups";
        $report_list = '<ul>';
        foreach ($reports as $report) {
            $report_list .= '<li><a href="https://' . $report->url . '">' . $report->name . '</a></li>';
        }
        $report_list .= '</ul>';
        $message = '
<html>
<head>
  <title>Cyberteam Affinity Groups</title>
</head>
<body>
<h1>Cyberteam Affinity Groups - ' . date('M d, Y') . '</h1>' .
$report_list . '
</body>
</html>
';
        $this->output()->writeln($message);

        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=iso-8859-1';
        $headers[] = 'From: ' . $from_email;
        $parameters = '';
        mail($to_email, $subject, $message, implode("\r\n", $headers), $parameters);
    }

    /**
     * Drush command that generates the stats used on the front page
     *
     * @command campuschampions:generateBreakdownStats
     * @aliases drush-cc breakdown-stats
     * @usage campuschampions:generateBreakdownStats
     */
    public function generateBreakdownStats($options = array()) {
        $env = getenv('PANTHEON_ENVIRONMENT');
        $dir = $env == 'local' ? 'public://' : '/files' ;
        $file = 'cc-breakdown-stats.json';
        $path = $dir . $file;

        $data = [
            // Champions natiowide
            'nationwide' => 0,
            // Institutions Represented
            'institutions' => 0,
            // Estab­lished Program to Stim­u­late Com­pet­i­tive Research
            'epscor' => 0,
            // Minority Serving Institutes
            'msi' => 0
        ];

        $region = 572; // Campus Champions

        // Nation wide
        $query = \Drupal::database()
            ->select('users_field_data', 'f')
            ->fields('f', ['uid']);
        $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
        $query->condition('n.deleted', 0);
        $query->condition('n.field_region_target_id', $region);
        $query->condition('f.status', 1);

        $data['nationwide'] = $query->countQuery()
            ->execute()
            ->fetchField();

        // Institutions
        $query = \Drupal::database()
            ->select('user__field_institution', 'i')
            ->fields('i', ['field_institution_value']);
        $query->innerJoin('users_field_data', 'f', 'i.entity_id = f.uid');
        $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
        $query->condition('i.deleted', 0);
        $query->condition('n.deleted', 0);
        $query->condition('n.field_region_target_id', $region);
        $query->condition('f.status', 1);

        $data['institutions'] = $query->distinct()
            ->countQuery()
            ->execute()
            ->fetchField();

        // EPSCoR states
        $query = \Drupal::database()
            ->select('user__field_carnegie_code', 'c')
            ->fields('c', ['field_carnegie_code_value']);
        $query->innerJoin('users_field_data', 'f', 'c.entity_id = f.uid');
        $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
        $query->innerJoin('carnegie_codes', 'r', 'r.unitid = c.field_carnegie_code_value');
        $query->condition('n.deleted', 0);
        $query->condition('n.field_region_target_id', $region);
        $query->condition('f.status', 1);
        $query->condition('r.stabbr', CarnegieCodesLookup::EPSCOR_STATES, 'IN');

        $data['epscor'] = $query->distinct()
            ->countQuery()
            ->execute()
            ->fetchField();

        // MSI
        $query = \Drupal::database()
            ->select('user__field_carnegie_code', 'c')
            ->fields('c', ['field_carnegie_code_value']);
        $query->innerJoin('users_field_data', 'f', 'c.entity_id = f.uid');
        $query->innerJoin('user__field_region', 'n', 'n.entity_id = f.uid');
        $query->innerJoin('carnegie_codes', 'r', 'r.unitid = c.field_carnegie_code_value');
        $query->condition('n.deleted', 0);
        $query->condition('n.field_region_target_id', $region);
        $query->condition('f.status', 1);
        $query->condition('r.msi', 1);

        $data['msi'] = $query->distinct()->countQuery()->execute()->fetchField();

        // Write the data to a file
        $fileSystem = \Drupal::service('file_system');

        if (!$fileSystem->prepareDirectory($dir, FileSystemInterface::CREATE_DIRECTORY)) {
            if ($options['verbose']) {
                $this->output()->writeln('<error>Failed to prepare destination directory.</error>');
            }
            return;
        }

        // Store stats in state for the homepage block
        \Drupal::state()->set('cc_stats', json_encode($data));
        
        $fileRepository = \Drupal::service('file.repository');
        $result = $fileRepository->writeData(
            json_encode($data),
            $path,
            FileSystemInterface::EXISTS_REPLACE
        );

        if (!$result) {
            if ($options['verbose']) {
                $this->output()->writeln('<error>Failed to write file.</error>');
            }
            return;
        }

        // If NOT verbose, we don't really need to go beyond this point
        if (!$options['verbose']) {
            return;
        }

        $realpath = $fileSystem->realpath($dir) . '/' . $file;
        $this->output()->writeln('<info>Generated JSON file at ' . $realpath . '</info>');

        $o = array();
        foreach ($data as $key => $val) {
            $o[] = [$key, number_format($val)];
        }

        // Summary table
        $this->output()->writeln('');
        $this->io()->table(
            ['Type', 'Count'],
            $o
        );
    }

    /**
     * Update Campus Champions stats immediately.
     *
     * @command campuschampions:update-stats
     * @aliases cc-stats
     * @usage campuschampions:update-stats
     *   Force update of Campus Champions homepage stats
     */
    public function updateStats($options = []) {
        $this->output()->writeln('Updating Campus Champions stats...');
        
        \Drupal::service('cc.getStats')->setState();
        \Drupal::state()->set('cc_stats_last_update', \Drupal::time()->getCurrentTime());
        
        $stats = json_decode(\Drupal::state()->get('cc_stats'), true);
        
        $this->output()->writeln('<info>Stats updated successfully!</info>');
        
        $o = [];
        foreach ($stats as $key => $val) {
            $o[] = [ucfirst($key), number_format($val)];
        }

        $this->io()->table(
            ['Metric', 'Count'],
            $o
        );
    }

    /**
     * Identify users with .edu email addresses who are missing Carnegie codes.
     *
     * @command campuschampions:identify-edu-missing-carnegie
     * @aliases cc-edu-missing
     * @option export Export results to CSV file.
     * @option all-users Check all users in system, not just Campus Champions.
     * @usage campuschampions:identify-edu-missing-carnegie
     *   List Campus Champions with .edu emails missing Carnegie codes.
     * @usage campuschampions:identify-edu-missing-carnegie --export
     *   Export the list to a CSV file.
     * @usage campuschampions:identify-edu-missing-carnegie --all-users
     *   Check all users in the system.
     */
    public function identifyEduMissingCarnegie($options = ['export' => FALSE, 'all-users' => FALSE]) {
        $this->output()->writeln('Identifying users with .edu emails missing Carnegie codes...');

        // Build query
        $query = \Drupal::entityQuery('user')
            ->condition('status', 1)
            ->condition('mail', '%.edu', 'LIKE')
            ->accessCheck(FALSE);
        
        // By default, only process Campus Champions users unless --all-users is specified
        if (!$options['all-users']) {
            $query->condition('field_region.target_id', 572); // Campus Champions region ID
        }
        
        // Get users without Carnegie codes or with invalid ones
        $or = $query->orConditionGroup()
            ->notExists('field_carnegie_code')
            ->condition('field_carnegie_code', '', '=');
        $query->condition($or);
        
        $uids = $query->execute();

        if (empty($uids)) {
            $scope = $options['all-users'] ? 'users' : 'Campus Champions users';
            $this->output()->writeln(sprintf('No %s with .edu emails are missing Carnegie codes.', $scope));
            return;
        }

        $scope = $options['all-users'] ? 'users' : 'Campus Champions users';
        $this->output()->writeln(sprintf('Found %d %s with .edu emails missing Carnegie codes.', count($uids), $scope));

        $users_data = [];
        $users = User::loadMultiple($uids);
        
        foreach ($users as $user) {
            $institution = '';
            if ($user->hasField('field_institution')) {
                $inst_value = $user->get('field_institution')->getValue();
                if (!empty($inst_value)) {
                    $institution = $inst_value[0]['value'];
                }
            }
            
            $access_org = '';
            $access_org_value = $user->get('field_access_organization')->getValue();
            if (!empty($access_org_value)) {
                $org_node = Node::load($access_org_value[0]['target_id']);
                if ($org_node) {
                    $access_org = $org_node->getTitle();
                }
            }
            
            $current_carnegie = '';
            $carnegie_value = $user->get('field_carnegie_code')->getValue();
            if (!empty($carnegie_value)) {
                $current_carnegie = $carnegie_value[0]['value'];
                // Check if it's valid
                if (!$this->isValidCarnegieCode($current_carnegie)) {
                    $current_carnegie .= ' (INVALID)';
                }
            }
            
            $users_data[] = [
                'uid' => $user->id(),
                'username' => $user->getAccountName(),
                'email' => $user->getEmail(),
                'institution' => $institution,
                'access_org' => $access_org,
                'current_carnegie' => $current_carnegie,
                'created' => date('Y-m-d', $user->getCreatedTime()),
            ];
        }
        
        // Sort by institution name for easier review
        usort($users_data, function($a, $b) {
            return strcasecmp($a['institution'], $b['institution']);
        });
        
        // Display or export results
        if ($options['export']) {
            $filename = 'edu-users-missing-carnegie-' . date('Y-m-d-His') . '.csv';
            $path = 'private://' . $filename;
            $file_system = \Drupal::service('file_system');
            $real_path = $file_system->realpath($path);
            
            $fp = fopen($real_path, 'w');
            fputcsv($fp, ['User ID', 'Username', 'Email', 'Institution', 'ACCESS Organization', 'Current Carnegie Code', 'Date Joined']);
            
            foreach ($users_data as $user_data) {
                fputcsv($fp, [
                    $user_data['uid'],
                    $user_data['username'],
                    $user_data['email'],
                    $user_data['institution'],
                    $user_data['access_org'],
                    $user_data['current_carnegie'],
                    $user_data['created'],
                ]);
            }
            
            fclose($fp);
            $this->output()->writeln(sprintf('Exported to: %s', $real_path));
        } else {
            // Display in console
            $this->output()->writeln("\nUsers with .edu emails missing Carnegie codes:");
            $this->output()->writeln(str_repeat('-', 120));
            
            foreach ($users_data as $user_data) {
                $this->output()->writeln(sprintf(
                    "User: %s (ID: %d)\n  Email: %s\n  Institution: %s\n  ACCESS Org: %s\n  Current Carnegie: %s\n  Joined: %s\n",
                    $user_data['username'],
                    $user_data['uid'],
                    $user_data['email'],
                    $user_data['institution'] ?: '(none)',
                    $user_data['access_org'] ?: '(none)',
                    $user_data['current_carnegie'] ?: '(none)',
                    $user_data['created']
                ));
            }
        }
        
        // Summary statistics
        $this->output()->writeln("\nSummary:");
        $this->output()->writeln(sprintf("- Total .edu users missing Carnegie codes: %d", count($users_data)));
        
        $with_institution = array_filter($users_data, function($u) { return !empty($u['institution']); });
        $this->output()->writeln(sprintf("- Users with institution field populated: %d", count($with_institution)));
        
        $with_access_org = array_filter($users_data, function($u) { return !empty($u['access_org']); });
        $this->output()->writeln(sprintf("- Users with ACCESS Organization: %d", count($with_access_org)));
        
        $with_invalid = array_filter($users_data, function($u) { return strpos($u['current_carnegie'], 'INVALID') !== false; });
        $this->output()->writeln(sprintf("- Users with invalid Carnegie codes: %d", count($with_invalid)));
        
        // Suggest next steps
        $this->output()->writeln("\nSuggested next steps:");
        $this->output()->writeln("1. Run: drush campuschampions:populate-carnegie-codes --dry-run");
        $this->output()->writeln("   to see what the automatic matching would do.");
        $this->output()->writeln("2. For targeted processing, you can modify the populate command to focus on .edu users.");
        $this->output()->writeln("3. Consider reaching out to users without institution data to collect it.");
    }

    /**
     * Populate Carnegie codes and ACCESS Organizations for all users.
     *
     * @command campuschampions:populate-carnegie-codes
     * @aliases cc-populate
     * @option dry-run Run without saving changes
     * @option limit Process only N users
     * @option organizations-only Only match ACCESS Organizations, don't populate Carnegie codes
     * @option auto-approve Automatically approve partial matches without prompting
     * @option all-users Process all users, not just Campus Champions
     * @option edu-only Only process users with .edu email addresses
     * @usage campuschampions:populate-carnegie-codes
     *   Populate Carnegie codes and ACCESS Organizations for all users based on their institution.
     * @usage campuschampions:populate-carnegie-codes --dry-run
     *   Show what would be updated without saving.
     * @usage campuschampions:populate-carnegie-codes --organizations-only
     *   Only match ACCESS Organizations, don't populate Carnegie codes.
     * @usage campuschampions:populate-carnegie-codes --auto-approve
     *   Automatically approve partial matches without interactive prompts.
     * @usage campuschampions:populate-carnegie-codes --all-users
     *   Process all users in system, not just Campus Champions.
     * @usage campuschampions:populate-carnegie-codes --edu-only
     *   Only process users with .edu email addresses.
     */
    public function populateCarnegieCodes($options = ['dry-run' => FALSE, 'limit' => NULL, 'organizations-only' => FALSE, 'auto-approve' => FALSE, 'all-users' => FALSE, 'edu-only' => FALSE]) {
        $this->output()->writeln('Starting Carnegie code and ACCESS Organization population...');

        // Build query based on options.
        $query = \Drupal::entityQuery('user')
            ->condition('status', 1)
            ->accessCheck(FALSE);
        
        // By default, only process Campus Champions users unless --all-users is specified.
        if (!$options['all-users']) {
            $query->condition('field_region.target_id', 572); // Campus Champions region ID
        }
        
        // Filter to .edu users if specified
        if ($options['edu-only']) {
            $query->condition('mail', '%.edu', 'LIKE');
        }
        
        if ($options['organizations-only']) {
            $query->notExists('field_access_organization');
        } else {
            // Get users without Carnegie codes OR without ACCESS Organizations OR with invalid Carnegie codes.
            $or = $query->orConditionGroup()
                ->notExists('field_carnegie_code')
                ->notExists('field_access_organization')
                ->exists('field_carnegie_code'); // Include users with Carnegie codes to validate them
            $query->condition($or);
        }
        
        if ($options['limit']) {
            $query->range(0, $options['limit']);
        }
        
        $uids = $query->execute();

        if (empty($uids)) {
            $type = $options['organizations-only'] ? 'ACCESS Organizations' : 'Carnegie codes or ACCESS Organizations';
            $scope = $options['all-users'] ? 'users' : 'Campus Champions users';
            $this->output()->writeln(sprintf('No %s found without %s.', $scope, $type));
            return;
        }

        $type = $options['organizations-only'] ? 'ACCESS Organizations' : 'Carnegie codes or ACCESS Organizations';
        $scope = $options['all-users'] ? 'users' : 'Campus Champions users';
        $this->output()->writeln(sprintf('Found %d %s without %s.', count($uids), $scope, $type));

        $processed = 0;
        $updated_carnegie = 0;
        $updated_org = 0;
        $batch_size = 50;

        // Process users in batches.
        foreach (array_chunk($uids, $batch_size) as $batch) {
            $users = User::loadMultiple($batch);

            foreach ($users as $user) {
                $processed++;
                $changes_made = FALSE;

                // Try to match ACCESS Organization if missing.
                if (!$user->get('field_access_organization')->getValue()) {
                    $match_result = $this->findAccessOrganization($user, $options['auto-approve']);
                    if ($match_result && $match_result['org']) {
                        $access_org = $match_result['org'];
                        $match_type = $match_result['match_type'];
                        
                        if ($options['dry-run']) {
                            $this->output()->writeln(sprintf('[DRY-RUN] Would update user %s (%d) with ACCESS Organization: %s (%s match)', 
                                $user->getAccountName(), $user->id(), $access_org->getTitle(), $match_type));
                        } else {
                            $user->set('field_access_organization', $access_org->id());
                            $changes_made = TRUE;
                            $this->output()->writeln(sprintf('Updated user %s (%d) with ACCESS Organization: %s (%s match)', 
                                $user->getAccountName(), $user->id(), $access_org->getTitle(), $match_type));
                        }
                        $updated_org++;
                    }
                }

                // Handle Carnegie code validation and population.
                if (!$options['organizations-only']) {
                    $current_carnegie = $user->get('field_carnegie_code')->getValue();
                    $needs_carnegie_update = FALSE;
                    $validation_message = '';
                    
                    if (!empty($current_carnegie)) {
                        // Validate existing Carnegie code
                        $carnegie_code = $current_carnegie[0]['value'];
                        if (!$this->isValidCarnegieCode($carnegie_code)) {
                            $needs_carnegie_update = TRUE;
                            $validation_message = sprintf('Invalid Carnegie code: %s', $carnegie_code);
                        }
                    } else {
                        // No Carnegie code at all
                        $needs_carnegie_update = TRUE;
                        $validation_message = 'No Carnegie code';
                    }
                    
                    if ($needs_carnegie_update) {
                        if ($validation_message) {
                            $this->output()->writeln(sprintf('User %s (%d): %s', 
                                $user->getAccountName(), $user->id(), $validation_message));
                        }
                        
                        // Get ACCESS Organization info to help with Carnegie code search
                        $access_org_name = '';
                        $access_org = $user->get('field_access_organization')->getValue();
                        if (!empty($access_org)) {
                            $org_node = \Drupal\node\Entity\Node::load($access_org[0]['target_id']);
                            if ($org_node) {
                                if ($org_node->hasField('field_organization_name')) {
                                    $org_name_field = $org_node->get('field_organization_name')->getValue();
                                    if (!empty($org_name_field)) {
                                        $access_org_name = $org_name_field[0]['value'];
                                    } else {
                                        $access_org_name = $org_node->getTitle();
                                    }
                                } else {
                                    $access_org_name = $org_node->getTitle();
                                }
                            }
                        }
                        
                        // Only offer Carnegie code search if it looks like an academic context
                        if ($this->looksAcademic($user, $access_org_name)) {
                            $carnegie_code = $this->findCarnegieCode($user, $options['auto-approve'], $access_org_name);
                            if ($carnegie_code) {
                                if ($options['dry-run']) {
                                    $this->output()->writeln(sprintf('[DRY-RUN] Would update user %s (%d) with Carnegie code: %s', 
                                        $user->getAccountName(), $user->id(), $carnegie_code));
                                } else {
                                    $user->set('field_carnegie_code', $carnegie_code);
                                    $changes_made = TRUE;
                                    $this->output()->writeln(sprintf('Updated user %s (%d) with Carnegie code: %s', 
                                        $user->getAccountName(), $user->id(), $carnegie_code));
                                }
                                $updated_carnegie++;
                            }
                        } else {
                            // Non-academic context - clear invalid Carnegie code if present
                            if (!empty($current_carnegie) && !$this->isValidCarnegieCode($current_carnegie[0]['value'])) {
                                if ($options['dry-run']) {
                                    $this->output()->writeln(sprintf('[DRY-RUN] Would clear invalid Carnegie code for non-academic user %s (%d)', 
                                        $user->getAccountName(), $user->id()));
                                } else {
                                    $user->set('field_carnegie_code', '');
                                    $changes_made = TRUE;
                                    $this->output()->writeln(sprintf('Cleared invalid Carnegie code for non-academic user %s (%d)', 
                                        $user->getAccountName(), $user->id()));
                                }
                            }
                        }
                    }
                }

                // Save user if any changes were made.
                if ($changes_made && !$options['dry-run']) {
                    $user->save();
                }

                if ($processed % 100 == 0) {
                    $this->output()->writeln(sprintf('Processed %d/%d users...', $processed, count($uids)));
                }
            }
        }

        $action = $options['dry-run'] ? 'Would update' : 'Updated';
        if ($options['organizations-only']) {
            $this->output()->writeln(sprintf('Completed! %s %d users with ACCESS Organizations out of %d processed.', $action, $updated_org, $processed));
        } else {
            $this->output()->writeln(sprintf('Completed! %s %d users with Carnegie codes and %d users with ACCESS Organizations out of %d processed.', $action, $updated_carnegie, $updated_org, $processed));
        }
    }

    /**
     * Find Carnegie code for a user.
     *
     * @param \Drupal\user\Entity\User $user
     *   The user entity.
     * @param bool $auto_approve
     *   Whether to automatically approve partial matches.
     * @param string $access_org_name
     *   The ACCESS Organization name for context.
     *
     * @return string|null
     *   The Carnegie code or NULL if not found.
     */
    protected function findCarnegieCode(User $user, $auto_approve = FALSE, $access_org_name = '') {
        // Try to get the ACCESS Organization first (may have been just populated).
        if ($user->hasField('field_access_organization')) {
            $org = $user->get('field_access_organization')->getValue();
            if (!empty($org)) {
                $org_node = Node::load($org[0]['target_id']);
                if ($org_node && $org_node->hasField('field_carnegie_code')) {
                    $carnegie_code = $org_node->get('field_carnegie_code')->getValue();
                    if (!empty($carnegie_code)) {
                        return $carnegie_code[0]['value'];
                    }
                }
            } else {
                // If no ACCESS Organization set, try to find one and get the Carnegie code from it.
                $match_result = $this->findAccessOrganization($user, TRUE); // Auto-approve for Carnegie code lookup
                if ($match_result && $match_result['org'] && $match_result['org']->hasField('field_carnegie_code')) {
                    $carnegie_code = $match_result['org']->get('field_carnegie_code')->getValue();
                    if (!empty($carnegie_code)) {
                        return $carnegie_code[0]['value'];
                    }
                }
            }
        }

        // Try institution field and/or interactive search for Carnegie codes.
        $institution_name = '';
        if ($user->hasField('field_institution')) {
            $institution = $user->get('field_institution')->getValue();
            if (!empty($institution)) {
                $institution_name = $institution[0]['value'];
            }
        }
        
        if (!empty($institution_name)) {
            // Use static caching to avoid repeated queries and decisions.
            static $carnegie_cache = [];
            static $user_decisions = [];
            
            $cache_key = $institution_name . '|' . ($auto_approve ? 'auto' : 'interactive');
            
            if (!isset($carnegie_cache[$cache_key])) {
                // Try exact match first.
                $query = \Drupal::database()
                    ->select('carnegie_codes', 'cc')
                    ->fields('cc', ['UNITID', 'NAME']);
                $query->condition('NAME', $institution_name, '=');
                $exact_result = $query->execute()->fetchAssoc();
                
                if ($exact_result) {
                    $carnegie_cache[$cache_key] = $exact_result['UNITID'];
                } else {
                    // Try LIKE search for partial matches.
                    $like_query = \Drupal::database()
                        ->select('carnegie_codes', 'cc')
                        ->fields('cc', ['UNITID', 'NAME']);
                    $like_query->condition('NAME', '%' . $institution_name . '%', 'LIKE');
                    $like_query->range(0, 10); // Limit to 10 matches
                    $partial_results = $like_query->execute()->fetchAll();
                    
                    if (!empty($partial_results)) {
                        if ($auto_approve) {
                            // Take first partial match.
                            $carnegie_cache[$cache_key] = $partial_results[0]->UNITID;
                        } else {
                            // Interactive selection.
                            $decision_key = $institution_name . '_carnegie';
                            
                            if (!isset($user_decisions[$decision_key])) {
                                $this->output()->writeln(sprintf("\nUser institution: '%s'", $institution_name));
                                $this->output()->writeln("Found potential Carnegie code matches:");
                                
                                $options = [];
                                foreach ($partial_results as $i => $result) {
                                    $this->output()->writeln(sprintf("  [%d] %s (ID: %s)", $i + 1, $result->NAME, $result->UNITID));
                                    $options[$i + 1] = $result->UNITID;
                                }
                                $this->output()->writeln("  [s] Search for other institutions");
                                $this->output()->writeln("  [0] Skip this institution");
                                
                                $choice = $this->io()->ask('Select an option (0-' . count($partial_results) . ', s)', '0');
                                
                                if ($choice === 's' || $choice === 'S') {
                                    $search_result = $this->interactiveCarnegieSearch($institution_name, $access_org_name);
                                    $user_decisions[$decision_key] = $search_result;
                                } elseif ($choice > 0 && isset($options[$choice])) {
                                    $user_decisions[$decision_key] = $options[$choice];
                                } else {
                                    $user_decisions[$decision_key] = NULL;
                                }
                            }
                            
                            $carnegie_cache[$cache_key] = $user_decisions[$decision_key];
                        }
                    } else {
                        // No partial matches found, offer interactive search if not auto-approve.
                        if (!$auto_approve) {
                            $decision_key = $institution_name . '_carnegie';
                            
                            if (!isset($user_decisions[$decision_key])) {
                                $this->output()->writeln(sprintf("\nUser institution: '%s'", $institution_name));
                                if (!empty($access_org_name)) {
                                    $this->output()->writeln(sprintf("ACCESS Organization: '%s'", $access_org_name));
                                }
                                $this->output()->writeln("No automatic Carnegie code matches found.");
                                
                                $search = $this->io()->confirm('Would you like to search for institutions?', FALSE);
                                
                                if ($search) {
                                    $search_result = $this->interactiveCarnegieSearch($institution_name, $access_org_name);
                                    $user_decisions[$decision_key] = $search_result;
                                } else {
                                    $user_decisions[$decision_key] = NULL;
                                }
                            }
                            
                            $carnegie_cache[$cache_key] = $user_decisions[$decision_key];
                        } else {
                            $carnegie_cache[$cache_key] = NULL;
                        }
                    }
                }
            }
            
            return $carnegie_cache[$cache_key];
        }

        // If we get here, no Carnegie code was found through automatic methods.
        // Offer interactive search for all users without Carnegie codes (not just those without ACCESS Orgs).
        if (!$auto_approve) {
            static $user_decisions = [];
            
            // Create a unique decision key based on available information
            $context_info = [];
            if (!empty($institution_name)) {
                $context_info[] = 'inst:' . $institution_name;
            }
            if (!empty($access_org_name)) {
                $context_info[] = 'org:' . $access_org_name;
            }
            if (empty($context_info)) {
                $context_info[] = 'user:' . $user->id();
            }
            $decision_key = 'carnegie_search_' . implode('|', $context_info);
            
            if (!isset($user_decisions[$decision_key])) {
                $this->output()->writeln(sprintf("\nUser: %s (%s)", $user->getAccountName(), $user->getEmail()));
                if (!empty($institution_name)) {
                    $this->output()->writeln(sprintf("Institution field: '%s'", $institution_name));
                }
                if (!empty($access_org_name)) {
                    $this->output()->writeln(sprintf("ACCESS Organization: '%s'", $access_org_name));
                }
                if (empty($institution_name) && empty($access_org_name)) {
                    $this->output()->writeln("No institution field or ACCESS Organization found.");
                }
                $this->output()->writeln("No Carnegie code found through automatic matching.");
                
                $search = $this->io()->confirm('Would you like to search for a Carnegie code?', FALSE);
                
                if ($search) {
                    $search_context = !empty($institution_name) ? $institution_name : '';
                    $search_result = $this->interactiveCarnegieSearch($search_context, $access_org_name);
                    $user_decisions[$decision_key] = $search_result;
                    return $search_result;
                } else {
                    $user_decisions[$decision_key] = NULL;
                }
            }
            
            return $user_decisions[$decision_key];
        }

        return NULL;
    }

    /**
     * Find ACCESS Organization for a user based on their institution.
     *
     * @param \Drupal\user\Entity\User $user
     *   The user entity.
     * @param bool $auto_approve
     *   Whether to automatically approve partial matches.
     *
     * @return array|null
     *   Array with 'org' and 'match_type' keys, or NULL if not found.
     */
    protected function findAccessOrganization(User $user, $auto_approve = FALSE) {
        if (!$user->hasField('field_institution')) {
            return NULL;
        }

        $institution = $user->get('field_institution')->getValue();
        if (empty($institution)) {
            return NULL;
        }

        $institution_name = $institution[0]['value'];

        // Use static caching to avoid repeated queries.
        static $org_cache = [];
        static $user_decisions = [];
        
        $cache_key = $institution_name . '|' . ($auto_approve ? 'auto' : 'interactive');
        
        if (!isset($org_cache[$cache_key])) {
            // Search for ACCESS Organizations by name.
            $query = \Drupal::entityQuery('node')
                ->condition('type', 'access_organization')
                ->condition('status', 1)
                ->accessCheck(FALSE);
            
            $org_node = NULL;
            $match_type = '';
            
            // Try exact match on organization name first.
            $exact_query = clone $query;
            $exact_query->condition('field_organization_name', $institution_name, '=');
            $nids = $exact_query->execute();
            
            if (!empty($nids)) {
                $org_node = Node::load(reset($nids));
                $match_type = 'exact';
            }
            
            // Try exact match on title if no organization name match.
            if (!$org_node) {
                $title_query = clone $query;
                $title_query->condition('title', $institution_name, '=');
                $nids = $title_query->execute();
                
                if (!empty($nids)) {
                    $org_node = Node::load(reset($nids));
                    $match_type = 'exact-title';
                }
            }
            
            // Try partial matches if no exact match and get user approval.
            if (!$org_node) {
                $partial_matches = [];
                
                // LIKE search on organization name.
                $like_query = clone $query;
                $like_query->condition('field_organization_name', '%' . $institution_name . '%', 'LIKE');
                $like_query->range(0, 10); // Limit to first 10 matches
                $nids = $like_query->execute();
                
                foreach ($nids as $nid) {
                    $node = Node::load($nid);
                    if ($node && $node->hasField('field_organization_name')) {
                        $org_name = $node->get('field_organization_name')->getValue();
                        if (!empty($org_name)) {
                            $partial_matches[] = [
                                'node' => $node,
                                'name' => $org_name[0]['value'],
                                'type' => 'partial-name'
                            ];
                        }
                    }
                }
                
                // LIKE search on title.
                $title_like_query = clone $query;
                $title_like_query->condition('title', '%' . $institution_name . '%', 'LIKE');
                $title_like_query->range(0, 10);
                $nids = $title_like_query->execute();
                
                foreach ($nids as $nid) {
                    $node = Node::load($nid);
                    if ($node) {
                        // Avoid duplicates.
                        $exists = FALSE;
                        foreach ($partial_matches as $match) {
                            if ($match['node']->id() == $node->id()) {
                                $exists = TRUE;
                                break;
                            }
                        }
                        if (!$exists) {
                            $partial_matches[] = [
                                'node' => $node,
                                'name' => $node->getTitle(),
                                'type' => 'partial-title'
                            ];
                        }
                    }
                }
                
                // Handle partial matches.
                if (!empty($partial_matches)) {
                    if ($auto_approve) {
                        // Take the first partial match.
                        $org_node = $partial_matches[0]['node'];
                        $match_type = $partial_matches[0]['type'];
                    } else {
                        // Ask for user approval.
                        $decision_key = $institution_name;
                        
                        if (!isset($user_decisions[$decision_key])) {
                            $this->output()->writeln(sprintf("\nUser institution: '%s'", $institution_name));
                            $this->output()->writeln("Found potential ACCESS Organization matches:");
                            
                            $options = [];
                            foreach ($partial_matches as $i => $match) {
                                $this->output()->writeln(sprintf("  [%d] %s (%s)", $i + 1, $match['name'], $match['type']));
                                $options[$i + 1] = $match;
                            }
                            $this->output()->writeln("  [s] Search for other organizations");
                            $this->output()->writeln("  [0] Skip this institution");
                            
                            $choice = $this->io()->ask('Select an option (0-' . count($partial_matches) . ', s)', '0');
                            
                            if ($choice === 's' || $choice === 'S') {
                                // Interactive search
                                $search_result = $this->interactiveSearch($institution_name);
                                if ($search_result) {
                                    $user_decisions[$decision_key] = $search_result;
                                } else {
                                    $user_decisions[$decision_key] = NULL;
                                }
                            } elseif ($choice > 0 && isset($options[$choice])) {
                                $user_decisions[$decision_key] = $options[$choice];
                            } else {
                                $user_decisions[$decision_key] = NULL;
                            }
                        }
                        
                        if ($user_decisions[$decision_key]) {
                            $org_node = $user_decisions[$decision_key]['node'];
                            $match_type = $user_decisions[$decision_key]['type'] . '-approved';
                        }
                    }
                } else {
                    // No partial matches found, offer interactive search if not auto-approve
                    if (!$auto_approve) {
                        $decision_key = $institution_name;
                        
                        if (!isset($user_decisions[$decision_key])) {
                            $this->output()->writeln(sprintf("\nUser institution: '%s'", $institution_name));
                            $this->output()->writeln("No automatic matches found.");
                            
                            $search = $this->io()->confirm('Would you like to search for organizations?', FALSE);
                            
                            if ($search) {
                                $search_result = $this->interactiveSearch($institution_name);
                                if ($search_result) {
                                    $user_decisions[$decision_key] = $search_result;
                                    $org_node = $search_result['node'];
                                    $match_type = $search_result['type'] . '-search';
                                } else {
                                    $user_decisions[$decision_key] = NULL;
                                }
                            } else {
                                $user_decisions[$decision_key] = NULL;
                            }
                        } elseif ($user_decisions[$decision_key]) {
                            $org_node = $user_decisions[$decision_key]['node'];
                            $match_type = $user_decisions[$decision_key]['type'] . '-search';
                        }
                    }
                }
            }
            
            if ($org_node) {
                $org_cache[$cache_key] = [
                    'org' => $org_node,
                    'match_type' => $match_type
                ];
            } else {
                $org_cache[$cache_key] = NULL;
            }
        }
        
        return $org_cache[$cache_key];
    }

    /**
     * Interactive search for ACCESS Organizations.
     *
     * @param string $institution_name
     *   The original institution name for context.
     *
     * @return array|null
     *   Array with 'node' and 'type' keys, or NULL if not found.
     */
    protected function interactiveSearch($institution_name) {
        while (TRUE) {
            $search_term = $this->io()->ask(sprintf('Enter search term (or "q" to quit) [original: %s]', $institution_name));
            
            if ($search_term === 'q' || $search_term === 'Q' || empty($search_term)) {
                return NULL;
            }
            
            // Search ACCESS Organizations with the user's term
            $query = \Drupal::entityQuery('node')
                ->condition('type', 'access_organization')
                ->condition('status', 1)
                ->accessCheck(FALSE)
                ->range(0, 20); // Limit to 20 results
            
            // Search in both organization name and title
            $or = $query->orConditionGroup()
                ->condition('field_organization_name', '%' . $search_term . '%', 'LIKE')
                ->condition('title', '%' . $search_term . '%', 'LIKE');
            $query->condition($or);
            
            $nids = $query->execute();
            
            if (empty($nids)) {
                $this->output()->writeln("No organizations found matching '{$search_term}'. Try a different search term.");
                continue;
            }
            
            $this->output()->writeln(sprintf("\nFound %d organizations matching '%s':", count($nids), $search_term));
            
            $options = [];
            $i = 1;
            
            foreach ($nids as $nid) {
                $node = Node::load($nid);
                if ($node) {
                    $org_name = '';
                    if ($node->hasField('field_organization_name')) {
                        $org_name_field = $node->get('field_organization_name')->getValue();
                        if (!empty($org_name_field)) {
                            $org_name = $org_name_field[0]['value'];
                        }
                    }
                    
                    // Use organization name if available, otherwise title
                    $display_name = !empty($org_name) ? $org_name : $node->getTitle();
                    
                    $this->output()->writeln(sprintf("  [%d] %s", $i, $display_name));
                    $options[$i] = [
                        'node' => $node,
                        'name' => $display_name,
                        'type' => 'interactive-search'
                    ];
                    $i++;
                }
            }
            
            $this->output()->writeln("  [s] Search again with different term");
            $this->output()->writeln("  [0] Skip this institution");
            
            $choice = $this->io()->ask('Select an option (0-' . (count($options)) . ', s)', '0');
            
            if ($choice === 's' || $choice === 'S') {
                continue; // Go back to search prompt
            } elseif ($choice > 0 && isset($options[$choice])) {
                return $options[$choice];
            } else {
                return NULL; // Skip
            }
        }
    }

    /**
     * Interactive search for Carnegie codes.
     *
     * @param string $institution_name
     *   The original institution name for context.
     * @param string $access_org_name
     *   The ACCESS Organization name for additional context.
     *
     * @return string|null
     *   The Carnegie code (UNITID) or NULL if not found.
     */
    protected function interactiveCarnegieSearch($institution_name, $access_org_name = '') {
        while (TRUE) {
            $context = $institution_name;
            if (!empty($access_org_name) && $access_org_name !== $institution_name) {
                $context .= sprintf(' | ACCESS Org: %s', $access_org_name);
            }
            $search_term = $this->io()->ask(sprintf('Enter search term (or "q" to quit) [%s]', $context));
            
            if ($search_term === 'q' || $search_term === 'Q' || empty($search_term)) {
                return NULL;
            }
            
            // Search Carnegie codes database with the user's term
            $query = \Drupal::database()
                ->select('carnegie_codes', 'cc')
                ->fields('cc', ['UNITID', 'NAME'])
                ->condition('NAME', '%' . $search_term . '%', 'LIKE')
                ->range(0, 20); // Limit to 20 results
            
            $results = $query->execute()->fetchAll();
            
            if (empty($results)) {
                $this->output()->writeln("No institutions found matching '{$search_term}'. Try a different search term.");
                continue;
            }
            
            $this->output()->writeln(sprintf("\nFound %d institutions matching '%s':", count($results), $search_term));
            
            $options = [];
            $i = 1;
            
            foreach ($results as $result) {
                $this->output()->writeln(sprintf("  [%d] %s (ID: %s)", $i, $result->NAME, $result->UNITID));
                $options[$i] = $result->UNITID;
                $i++;
            }
            
            $this->output()->writeln("  [s] Search again with different term");
            $this->output()->writeln("  [0] Skip this institution");
            
            $choice = $this->io()->ask('Select an option (0-' . (count($options)) . ', s)', '0');
            
            if ($choice === 's' || $choice === 'S') {
                continue; // Go back to search prompt
            } elseif ($choice > 0 && isset($options[$choice])) {
                return $options[$choice];
            } else {
                return NULL; // Skip
            }
        }
    }

    /**
     * Check if a Carnegie code is valid (exists in the database).
     *
     * @param string $carnegie_code
     *   The Carnegie code to validate.
     *
     * @return bool
     *   TRUE if valid, FALSE otherwise.
     */
    protected function isValidCarnegieCode($carnegie_code) {
        if (empty($carnegie_code)) {
            return FALSE;
        }
        
        // Use static caching to avoid repeated lookups
        static $validation_cache = [];
        
        if (!isset($validation_cache[$carnegie_code])) {
            $query = \Drupal::database()
                ->select('carnegie_codes', 'cc')
                ->fields('cc', ['UNITID'])
                ->condition('UNITID', $carnegie_code, '=')
                ->range(0, 1);
            
            $result = $query->execute()->fetchField();
            $validation_cache[$carnegie_code] = !empty($result);
        }
        
        return $validation_cache[$carnegie_code];
    }

    /**
     * Determine if a user appears to be in an academic context.
     *
     * @param \Drupal\user\Entity\User $user
     *   The user entity.
     * @param string $access_org_name
     *   The ACCESS Organization name.
     *
     * @return bool
     *   TRUE if looks academic, FALSE otherwise.
     */
    protected function looksAcademic(User $user, $access_org_name = '') {
        // Academic keywords to look for
        $academic_keywords = [
            'university', 'college', 'school', 'institute of technology',
            'polytechnic', 'academy', 'seminary', 'conservatory'
        ];
        
        $non_academic_keywords = [
            'national laboratory', 'lab', 'corporation', 'company', 'inc.',
            'llc', 'foundation', 'government', 'federal', 'department of',
            'agency', 'center for', 'institute for', 'consortium'
        ];
        
        // Check ACCESS Organization name
        if (!empty($access_org_name)) {
            $org_lower = strtolower($access_org_name);
            
            // Strong indicators of non-academic
            foreach ($non_academic_keywords as $keyword) {
                if (strpos($org_lower, $keyword) !== FALSE) {
                    return FALSE;
                }
            }
            
            // Strong indicators of academic
            foreach ($academic_keywords as $keyword) {
                if (strpos($org_lower, $keyword) !== FALSE) {
                    return TRUE;
                }
            }
        }
        
        // Check institution field
        if ($user->hasField('field_institution')) {
            $institution = $user->get('field_institution')->getValue();
            if (!empty($institution)) {
                $inst_lower = strtolower($institution[0]['value']);
                
                // Strong indicators of non-academic
                foreach ($non_academic_keywords as $keyword) {
                    if (strpos($inst_lower, $keyword) !== FALSE) {
                        return FALSE;
                    }
                }
                
                // Strong indicators of academic
                foreach ($academic_keywords as $keyword) {
                    if (strpos($inst_lower, $keyword) !== FALSE) {
                        return TRUE;
                    }
                }
            }
        }
        
        // Check email domain for obvious non-academic patterns
        $email = $user->getEmail();
        if (!empty($email)) {
            $domain = strtolower(substr(strrchr($email, "@"), 1));
            
            // Strong academic indicators
            if (preg_match('/\.(edu|ac\.|edu\.)/', $domain)) {
                return TRUE;
            }
            
            // Only exclude for very obvious non-academic government domains
            // Be much more conservative here - many academics use personal emails
            if (preg_match('/\.(gov|mil)$/', $domain)) {
                // Even .gov could be academic (some state universities use .gov)
                // So only exclude federal agencies we're confident about
                $federal_domains = ['nasa.gov', 'nsf.gov', 'doe.gov', 'energy.gov', 'nih.gov'];
                foreach ($federal_domains as $fed_domain) {
                    if (strpos($domain, $fed_domain) !== FALSE) {
                        return FALSE;
                    }
                }
            }
        }
        
        // Default to academic (very inclusive approach)
        // Better to offer Carnegie code search to someone who doesn't need it
        // than to skip someone who does need it
        return TRUE;
    }
}
