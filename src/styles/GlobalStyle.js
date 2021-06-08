/** @jsxImportSource @emotion/react */
import { css, Global, useTheme } from "@emotion/react"

const GlobalStyle = () => {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        @font-face {
          src: url("/fonts/Karla-Regular.ttf") format(truetype);
          font-family: "Karla";
          font-style: normal;
          font-weight: 400;
          font-display: swap;
        }
        @font-face {
          src: url("/fonts/Karla-Italic.ttf") format(truetype);
          font-family: "Karla";
          font-style: italic;
          font-weight: 400;
          font-display: swap;
        }
        @font-face {
          src: url("/fonts/Karla-Light.ttf") format(truetype);
          font-family: "Karla";
          font-style: normal;
          font-weight: 200;
          font-display: swap;
        }
        @font-face {
          src: url("/fonts/Karla-Bold.ttf") format(truetype);
          font-family: "Karla";
          font-style: normal;
          font-weight: 700;
          font-display: swap;
        }

        ::-webkit-scrollbar {
          background: #eaeaea;
          width: 5px;
          border-radius: 50px;
        }

        ::-webkit-scrollbar-thumb {
          background: black;
          border-radius: 50px;
        }

        html {
          font-size: 20px;
          background: #fff;
        }

        @media (prefers-color-scheme: dark) {
          html {
            background: #2f3437;
          }
        }

        body {
          font-family: "Karla", sans-serif;
          font-weight: 400;
          line-height: 1.75;
          font-kerning: normal;
          /* font-feature-settings: 'kern', 'liga', 'clig', 'calt'; */
          /* background: ${theme.colors.bg.default}; */
        }

        p {
          margin-bottom: 1rem;
        }

        h1,
        h2,
        h3,
        h4,
        h5 {
          margin: 3rem 0 1.38rem;
          font-family: "Karla", sans-serif;
          font-weight: 400;
          line-height: 1.3;
        }

        h1 {
          margin-top: 0;
          font-size: 2.488rem;
        }

        h2 {
          font-size: 2.074rem;
        }

        h3 {
          font-size: 1.728rem;
        }

        h4 {
          font-size: 1.44rem;
        }

        h5 {
          font-size: 1.2rem;
        }

        small,
        .text_small {
          font-size: 0.833rem;
        }
      `}
    />
  )
}

export default GlobalStyle
