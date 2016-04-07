'use strict';

function getMessage(a, b) {

  if (typeof a === 'boolean') {

    if (a === true) {
      return ( 'Я попал в ' + b );
    }
    return ( 'Я никуда не попал' );

  }

  if (typeof a === 'number') {
    return ( 'Я прыгнул на ' + a * 100 + ' сантиметров' );
  }

  if (Array.isArray(a)) {

    if (Array.isArray(b)) {
      var s = 0;
      for (var i = 0; i < a.length; i++) {
        s += a[i] * b[i];
      }
      return ('Я прошёл ' + s + ' метров');
    }

    s = 0;
    for (i = 0; i < a.length; i++) {
      s += a[i];
    }
    return ('Я прошёл ' + s + ' шагов');

  }

}
