var DISQUS = require('./disqus');

/**
 * Contstructor
 * @namespace
 */
var creative = {};


/**
 * Configure listeners
 */
creative.on = {
  modal: {
    hide: function (e) {
      var modal   = $(this);
      var elm = $('[data-disqus-url="'+$(this).data('url')+'"]');
      DISQUS.commentCount(elm);
    },

    show: function (e) {
      var button  = $(e.relatedTarget);
      var data    = button.data();
      var modal   = $(this);
      var title   = modal.find('.modal-title');

      // Set the modal id (the image url)
      modal.data('url', data.download);

      // Set the title
      title.html(data.title);

      // Set the download button link
      var dbtn = modal.find('a[aria-label="download"]')
          dbtn.attr('href', data.download);

      // Get content zone
      var body = modal.find('.creative-preview').html('');

      var html = [];

      if (data.action === 'view') {
        html.push('<div><a href="'+data.image+'" target="_blank"><img src="'+data.image+'" /></a></div>');
      }

      if (data.action === 'comment') {
        html.push('<div><a href="'+data.image+'" target="_blank"><img src="'+data.image+'" /></a></div>');
        html.push('<div class="disqus-container"><div id="disqus_thread"></div></div>');
      }
      body.html(html.join(''));
    },

    shown: function (e) {
      var button  = $(e.relatedTarget);
      var data    = button.data();
      if (data.action === 'comment') {
        DISQUS.init(data.download, data.download, data.title);
      }
    }
  }
};

creative.initListeners = () => {
  $(document).on('show.bs.modal', '#creative-modal', creative.on.modal.show);
  $(document).on('shown.bs.modal', '#creative-modal', creative.on.modal.shown);
  $(document).on('hide.bs.modal', '#creative-modal', creative.on.modal.hide);

  return creative;
};


/**
 * moveModal function
 * @description Moves all .modal elements to the <body> so that they are on
 * top of the backdrop.
 */
creative.moveModal = () => {
  $('.modal').each(function () { $('body').append($(this)); });
  return creative;
};


/**
 * getComments function
 * @description Retrieve comment counts from disqus.
 */
creative.getComments = () => {
  DISQUS.commentCount($('[data-disqus-url]'));

  return creative;
};


/**
 * Page load listener
 */
document.addEventListener("DOMContentLoaded", function(event) {
  creative
  .initListeners()
  .getComments()
  .moveModal();
});



/**
 * Exports
 */
module.exports = creative;
