<?php

namespace Drupal\campuschampions\Commands;

use Drush\Commands\DrushCommands;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Component\Utility\SafeMarkup;
use Drupal\Component\Utility\Html;
use Drupal\Core\File\FileSystemInterface;
use Drupal\campuschampions\Plugin\CarnegieCodesLookup;

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
}
