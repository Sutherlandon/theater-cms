import { makeStyles } from '@material-ui/core/styles';

function formStyles(props) {
  return  makeStyles((theme) => ({
    fieldGroup: {
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    label: {
      display: 'block',
      padding: theme.spacing()/2,
    },
  }));
}

export default formStyles();
