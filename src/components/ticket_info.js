import React from 'react';
import SectionTitle from './section_title';

/**
 *
 */
const TicketInfo = (props) => {
  return (
    <div className="ticket-info">
      <SectionTitle text="Ticket Information" />
      <div className="info-desc">
        <p>
          Doors open 30 minutes prior to the first showing for that day.
          Tickets can be purchased the day of show or as early as the Tuesday
          before a show that is to be played that week. Free admission on your
          birthday with proof of birth date. Gift cards make the perfect gift
          and can be purchased for any amount from the box office. A Matinee
          is any show before <b>6pm</b>.
        </p>
      </div>
      <table className="D2 pure-table pure-table-bordered pure-table-striped">
        <thead>
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
      <table className="D3 pure-table pure-table-bordered pure-table-striped">
        <thead>
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
    </div>
  )
}

export default TicketInfo;
