<?php

namespace Drupal\campuschampions\Commands;

use Drush\Commands\DrushCommands;
use Drupal\Core\Mail\MailManagerInterface;
use Drupal\Component\Utility\SafeMarkup;
use Drupal\Component\Utility\Html;

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
            $filepath = "sites/default/files/{$filename}";
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

}
