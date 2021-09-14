<?php

namespace Drupal\campuschampions\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Component\Utility\Xss;

class JsonApiCCController {

    /**
     * @return JsonResponse
     * Autocomplete Carnegie Code based on institution name
     */
    public function handleAutocomplete(Request $request)
    {
        $results = [];
        $input = $request->query->get('q');
        if (!$input) {
            return new JsonResponse($results);
        }
        $input = Xss::filter($input);

        $database = \Drupal::database();
        $query = $database->select('carnegie_codes', 'cc');
        $query->condition('cc.NAME', '%' . $input . '%', 'LIKE');
        $query->fields('cc', ['UNITID', 'NAME']);
        $query->range(0, 10);

        $rows = $query->execute();
        foreach ($rows as $row) {
            $results[] = [
            'label' => $row->NAME,
            'value' => $row->UNITID
            ];
        }
        return new JsonResponse($results);
    }  
}

?>