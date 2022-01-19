wow = new WOW(
    {
      boxClass:     'wow',
      animateClass: 'animated',
      offset:       100,
      callback:     function(box) {
        console.log('WOW: animating <' + box.tagName.toLowerCase() + '>')
      }
    }
  );
  wow.init();