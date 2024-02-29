<?php

echo "Running drush deploy...\n";
passthru('drush deploy');
echo "Import of configuration complete.\n";
echo "Rebuilding cache.\n";
passthru('drush cr');
echo "Rebuilding cache complete.\n";
