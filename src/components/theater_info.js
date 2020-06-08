import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SectionTitle from './section_title';
import ContactCard from './contact_card';

function InfoSection(props) { return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.content}</p>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#1f1f1f',
    color: '#DDD',
  },
  content: {
    maxWidth: '80em',
    margin: 'auto',
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  }
}));

function TheaterInfo(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SectionTitle text="Theater Information" />
      <Grid container spacing={2} className={classes.content}>
        <Grid item xs={12} sm={6}>
          <InfoSection
            title="About Us"
            content="The Reel Deal Theater is a family owned and operated
              independent movie theater located in Los Alamos, NM. In operation
              since December 2003, this theater is a state of the art facility
              committed to the community. Dolby digital and stereo surround sound
              enhances enjoyment of our first-run and other film offerings. Our
              concession stand offers the standard fare (with delicious popcorn) and
              specialty food items. Special events may be planned by contacting the
              theater manager for rental."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoSection
            title="Theater Rental"
            content="The Reel Deal is available for conferences, private
              screenings, and daytime entertaining. Movie screens
              and plush seating will help you get your message across
              in style. The concession counter, including desserts
              and/or coffee, can be available for your event.
              To schedule, please call (505) 661-9966."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoSection
            title="Job Opportunities"
            content=" Are you interested in being part of a local family run cinema
              operation which includes free first-run movies and all the popcorn
              you can eat? Would you like to learn how to become a projectionist
              and learn the cinema business from the inside-out? Would you like to
              become a manager, assistant manager or supervisor? We have flexible
              hours for students. Please contact Jim O'Donnell at (505) 661-9966."
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ContactCard
            title="Screen Advertising"
            desc= "To inquire about rates and formatting of Reel Deal Screen Advertising, contact:"
            name="Kate O'Donnell"
            phone="(505) 231-5144 or (505) 662-5551"
            email="reeldealpreshow@yahoo.com"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default TheaterInfo;
