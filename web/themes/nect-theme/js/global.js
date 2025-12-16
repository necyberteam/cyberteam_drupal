/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.nect = {
    attach: function (context, settings) {
      $('.campus-champions .hide-campus-champions').remove();
      $('.careers-cyberteam .hide-careers').remove();
      $('.great-plains-cyberteam .hide-great-plains').remove();
      $('.kentucky-cyberteam .hide-kentucky').remove();
      $('.mines-cyberteam .hide-mines').remove();
      $('.northeast-cyberteam .hide-northeast').remove();
      $('.coco .hide-coco').remove();
      $('.usrse .hide-usrse').remove();
      $('.ccmnet .hide-ccmnet').remove();
      $('.pa-science .hide-pa-science').remove();
    }
  };

})(jQuery, Drupal);
