import React from 'react';
import {
  Paper,
  Table,
  TableHead as THead,
  TableBody as TBody,
  TableCell as TD,
  TableRow as TR,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SectionTitle from './section_title';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.light,
  },
  content: {
    maxWidth: '80em',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      //margin: 'auto',
    }
  },
  p: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  scrollContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    overflowX: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    whiteSpace: 'nowrap',
    '-webkit-overflow-scrolling': 'touch',

    '&:after': {
      content: "",
      flex: `0 0 ${theme.spacing(2)}`,
    },
  },
  table: {
    width: '100%',
  },
  tableContainer: {
    marginBottom: theme.spacing(2),
    width: 500,
  },
}));

/**
 *
 */
function TicketInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <SectionTitle text="Ticket Information" />
        <p className={classes.p}>
          Doors open 30 minutes prior to the first showing for that day.
          Tickets can be purchased the day of show or as early as the Tuesday
          before a show that is to be played that week. Free admission on your
          birthday with proof of birth date. Gift cards make the perfect gift
          and can be purchased for any amount from the box office. A Matinee
          is any show before <b>6pm</b>.
        </p>
        <div className={classes.scrollContainer}>
          <Paper className={classes.tableContainer}>
            <Table size='small' className={classes.table}>
              <THead>
                <TR>
                  <TD></TD>
                  <TD>Matinee / 3D</TD>
                  <TD>Evening / 3D</TD>
                </TR>
              </THead>
              <TBody>
                <TR>
                  <TD>Children (0-12)</TD>
                  <TD colSpan='2'>$7.50 / $9.50</TD>
                </TR>
                <TR>
                  <TD>Adult</TD>
                  <TD>$7.50 / $9.50</TD>
                  <TD>$8.75 / $10.75</TD>
                </TR>
                <TR>
                  <TD>Seniors (60+)</TD>
                  <TD colSpan='2'>$7.50 / $9.50</TD>
                </TR>
                <TR>
                  <TD>Students</TD>
                  <TD colSpan='2'>$7.50 / $9.50</TD>
                </TR>
              </TBody>
            </Table>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default TicketInfo;
