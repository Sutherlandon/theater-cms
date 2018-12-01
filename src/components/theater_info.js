import React from 'react';
import SectionTitle from './section_title';
import InfoSection from './info_section';
import ContactCard from './contact_card';

function TheaterInfo(props) {
  return (
    <div className="theater-info">
      <SectionTitle text="Theater Information" />
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

      <InfoSection
        title="Theater Rental"
        content="The Reel Deal is available for conferences, private
          screenings, and daytime entertaining. Movie screens
          and plush seating will help you get your message across
          in style. The concession counter, including desserts
          and/or coffee, can be available for your event.
          To schedule, please call (505) 661-9966."
      />

      <InfoSection
        title="Job Opportunities"
        content=" Are you interested in being part of a local family run cinema
          operation which includes free first-run movies and all the popcorn
          you can eat? Would you like to learn how to become a projectionist
          and learn the cinema business from the inside-out? Would you like to
          become a manager, assistant manager or supervisor? We have flexible
          hours for students. Please contact Jim O'Donnell at (505) 661-9966."
      />

      <ContactCard
        title="Screen Advertising"
        desc= "To inquire about rates and formatting of Reel Deal Screen Advertising, contact:"
        name="Kate O'Donnell"
        phone="(505) 231-5144 or (505) 662-5551"
        email="reeldealpreshow@yahoo.com"
      />
    </div>
  )
}

export default TheaterInfo;
