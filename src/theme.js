/* widths */
// @max-content-width: 80em;
// @sm-screen: 35.5em;
// @md-screen: 48em;
// @lg-screen: 64em;
// @xl-screen: 80em;

// /* colors */
// @primary-dark: #1f1f1f;
// @primary-light: #f5f5f5;

// @grad-blue: rgba(61, 15, 244, 100%);
// @grad-purple: rgb(173, 15, 244, 100%);
// @primary-grad: linear-gradient(to bottom, fadeout(@grad-blue, 20%), @grad-purple);

import { createMuiTheme } from '@material-ui/core/styles';

const blue = '#3d0ff4';
const purple = '#ad0ff4';
const fadedBlue = 'rgba(61, 15, 244, 0.8)'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue,
    },
    secondary: {
      main: purple,
    },

    mainGradient: `linear-gradient(to bottom, ${blue}, ${purple})`,
    fadedGradient: `linear-gradient(to bottom, ${fadedBlue}, ${purple})`,
    dark: '#1f1f1f',
    light: '#f5f5f5',
  },
});

export default theme;
