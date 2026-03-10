(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.communitySpotlight = {
    attach: function (context) {
      once('community-spotlight', '.community-spotlight-wrapper', context).forEach(function (block) {
        var featured = block.querySelector('.community-spotlight__featured');
        var thumbContainer = block.querySelector('.community-spotlight__others');

        if (!featured || !thumbContainer) {
          return;
        }

        // Inject slide-up keyframes once.
        if (!document.getElementById('community-spotlight-anim')) {
          var style = document.createElement('style');
          style.id = 'community-spotlight-anim';
          style.textContent =
            '@keyframes cs-fade-in {' +
            '  from { opacity: 0; }' +
            '  to { opacity: 1; }' +
            '}';
          document.head.appendChild(style);
        }

        thumbContainer.addEventListener('click', function (e) {
          var thumb = e.target.closest('.community-spotlight__thumb');
          if (!thumb) {
            return;
          }

          // Read current featured user data.
          var currentData = {
            uid: featured.getAttribute('data-uid'),
            photo: featured.getAttribute('data-photo'),
            first: featured.getAttribute('data-first'),
            last: featured.getAttribute('data-last'),
            org: featured.getAttribute('data-org'),
            text: featured.getAttribute('data-text')
          };

          // Read clicked user data.
          var newData = {
            uid: thumb.getAttribute('data-uid'),
            photo: thumb.getAttribute('data-photo'),
            first: thumb.getAttribute('data-first'),
            last: thumb.getAttribute('data-last'),
            org: thumb.getAttribute('data-org'),
            text: thumb.getAttribute('data-text')
          };

          // Update the featured area.
          featured.setAttribute('data-uid', newData.uid);
          featured.setAttribute('data-photo', newData.photo);
          featured.setAttribute('data-first', newData.first);
          featured.setAttribute('data-last', newData.last);
          featured.setAttribute('data-org', newData.org);
          featured.setAttribute('data-text', newData.text);

          var photoLink = featured.querySelector('.community-spotlight__photo-link');
          photoLink.href = '/community-persona/' + newData.uid;

          var photoImg = featured.querySelector('.community-spotlight__photo img');
          photoImg.src = newData.photo;
          photoImg.alt = newData.first + ' ' + newData.last;

          var nameLink = featured.querySelector('.community-spotlight__name');
          nameLink.href = '/community-persona/' + newData.uid;
          nameLink.textContent = newData.first + ' ' + newData.last;

          var orgEl = featured.querySelector('.community-spotlight__org');
          orgEl.textContent = newData.org;

          var textEl = featured.querySelector('.community-spotlight__text');
          if (newData.text) {
            if (textEl) {
              textEl.innerHTML = newData.text;
            }
            else {
              textEl = document.createElement('div');
              textEl.className = 'community-spotlight__text p-3';
              textEl.innerHTML = newData.text;
              featured.appendChild(textEl);
            }
          }
          else if (textEl) {
            textEl.remove();
          }

          // Trigger slide-up animation on the featured content.
          featured.style.animation = 'none';
          // Force reflow so the animation restarts.
          featured.offsetHeight;
          featured.style.animation = 'cs-fade-in 0.75s ease-out';

          // Replace the clicked thumbnail with the previous featured user.
          thumb.setAttribute('data-uid', currentData.uid);
          thumb.setAttribute('data-photo', currentData.photo);
          thumb.setAttribute('data-first', currentData.first);
          thumb.setAttribute('data-last', currentData.last);
          thumb.setAttribute('data-org', currentData.org);
          thumb.setAttribute('data-text', currentData.text);
          thumb.title = currentData.first + ' ' + currentData.last;

          var thumbImg = thumb.querySelector('img');
          thumbImg.src = currentData.photo;
          thumbImg.alt = currentData.first + ' ' + currentData.last;
        });
      });
    }
  };
})(Drupal, once);
