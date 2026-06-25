(function (Drupal, once) {
  'use strict';
  Drupal.behaviors.appverseDocSidebar = {
    attach: function attach(context) {
      once('appverse-doc-sidebar', '.appverse-doc-node', context);
    }
  };
})(Drupal, once);
