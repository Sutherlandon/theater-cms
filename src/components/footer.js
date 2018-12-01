import React from 'react';

function Footer(props) {
  return (
    <div className="footer">
      <div className="contact-info">
        <h3>Contact</h3>
        <table className="pure-table pure-table-horizontal pure-table-striped">
          <tbody>
            <tr>
              <td>Showtimes</td>
              <td><a href="tel:5056620617">(505) 662-0617</a></td>
            </tr>
            <tr>
              <td>Theater Staff</td>
              <td><a href="tel:505662-1580">(505) 662-1580</a></td>
            </tr>
            <tr>
              <td>Advertising</td>
              <td>
                <a href="tel:5052315144">(505) 231-5144</a><br/>
                <a href="tel:5056625551">(505) 662-5551</a>
              </td>
            </tr>
            <tr>
              <td>Special Events</td>
              <td><a href="tel:5056629966">(505) 662-9966</a></td>
            </tr>
            <tr>
              <td>Email</td>
              <td><a href="mailto:Odonnell455@gmail.com">Odonnell455@gmail.com</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="location">
        <h3>Location</h3>
        <a href="https://www.google.com/maps/place/Reel+Deal+Theater/@35.8820335,-106.3059371,19z/data=!4m5!3m4!1s0x0:0xd28a8ba3dca947f9!8m2!3d35.8820663!4d-106.3057548">
          Reel Deal Movie Theater<br/>
          2551 Central Avenue<br/>
          Los Alamos, NM 87544
        </a><br/>
        <br/>
        <iframe
          title="location-map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1616.3278122844838!2d-106.30642527599642!3d35.8819552817943!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd28a8ba3dca947f9!2sReel+Deal+Theater!5e0!3m2!1sen!2sus!4v1482798693924"
          width="300"
          height="225"
          frameBorder="0"
          style={{border:0}}
          allowFullScreen>
        </iframe>
      </div>
    </div>
  )
}

export default Footer;
