import React, { useEffect } from 'react'

const BoardToken = '11458d69-22cb-55ac-7e94-c918c58abe7d'

const FeedbackWidget = ({ token }) => {
  useEffect(() => {
    if (!token) return
    ;(function (w, d, i, s) {
      function l() {
        if (!d.getElementById(i)) {
          var f = d.getElementsByTagName(s)[0],
            e = d.createElement(s)
          ;(e.type = 'text/javascript'),
            (e.async = !0),
            (e.src = 'https://canny.io/sdk.js'),
            f.parentNode.insertBefore(e, f)
        }
      }
      if ('function' != typeof w.Canny) {
        var c = function () {
          c.q.push(arguments)
        }
        ;(c.q = []),
          (w.Canny = c),
          'complete' === d.readyState
            ? l()
            : w.attachEvent
            ? w.attachEvent('onload', l)
            : w.addEventListener('load', l, !1)
      }
    })(window, document, 'canny-jssdk', 'script')

    Canny('render', {
      boardToken: BoardToken,
      basePath: '/feedback',
      ssoToken: token,
      theme: 'dark'
    })
  }, [token])

  return <div data-canny />
}

export default FeedbackWidget
