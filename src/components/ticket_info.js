import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SectionTitle from './section_title';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.light,
  },
  content: {
    maxWidth: '80em',
    [theme.breakpoints.up('md')]: {
      //margin: 'auto',
    }
  },
  table: {
    width: '100%',
  },
  tableContainer: {
    overflowX: 'scroll',
  },
}));

/**
 *
 */
function TicketInfo(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.content}>
        <Grid item xs={12}>
          <SectionTitle text="Ticket Information" />
        </Grid>
        <Grid item xs={12}>
          <p>
            Doors open 30 minutes prior to the first showing for that day.
            Tickets can be purchased the day of show or as early as the Tuesday
            before a show that is to be played that week. Free admission on your
            birthday with proof of birth date. Gift cards make the perfect gift
            and can be purchased for any amount from the box office. A Matinee
            is any show before <b>6pm</b>.
          </p>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.tableContainer}>
          <table className={`table table-striped table-bordered ${classes.table}`}>
            <thead className='thead-light'>
              <tr>
                <th>Regular 2D</th>
                <th>Matinee</th>
                <th>Evening</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Children (0-12)</td>
                <td colSpan='2'>$7.50</td>
              </tr>
              <tr>
                <td>Adult</td>
                <td>$7.50</td>
                <td>$8.75</td>
              </tr>
              <tr>
                <td>Seniors (60+)</td>
                <td colSpan='2'>$7.50</td>
              </tr>
              <tr>
                <td>Students</td>
                <td colSpan='2'>$7.50</td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.tableContainer}>
          <table className={`table table-striped table-bordered ${classes.table}`}>
            <thead className='thead-light'>
              <tr>
                <th id="reald3d-logo"></th>
                <th>Matinee</th>
                <th>Evening</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Children (0-12)</td>
                <td colSpan='2'>$9.50</td>
              </tr>
              <tr>
                <td>Adult</td>
                <td>$9.50</td>
                <td>$10.75</td>
              </tr>
              <tr>
                <td>Seniors (60+)</td>
                <td colSpan='2'>$9.50</td>
              </tr>
              <tr>
                <td>Students</td>
                <td colSpan='2'>$9.50</td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
    </div>
  )
}

export default TicketInfo;
