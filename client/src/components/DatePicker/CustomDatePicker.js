import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { OPEN_UP } from "react-dates/lib/constants";
import * as actions from "../../actions";
import "../../styles/styles.css";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

class CustomDatePicker extends Component {
  state = {
    calenderFocused: null
  };

  componentDidMount() {
    this.props.fetchBlockedDates(this.props.roomId);
  }

  isDayBlocked = day => {
    let hit = false;

    // once we have our start date seleced all dates before said date will be blocked
    if (
      this.props.datePickerDates.startDate &&
      this.state.calenderFocused === "endDate"
    ) {
      //from our blocked dates list find the next blocked date in relation to the startDate selected
      let nextBlockedDate = this.props.blockedDates.find(blockedDate => {
        return moment(blockedDate.bookingStartDate).isAfter(
          this.state.startDate
        );
      });

      if (nextBlockedDate) {
        if (day.isSameOrAfter(nextBlockedDate.bookingStartDate)) {
          return true;
        }
      }

      if (day.isBefore(this.state.startDate)) {
        return true;
      }
    }

    // this will display the regular blocked dates according to the previous bookings
    if (this.props.blockedDates) {
      this.props.blockedDates.forEach(blockedDate => {
        if (
          day.isSameOrBefore(blockedDate.bookingEndDate) &&
          day.isSameOrAfter(blockedDate.bookingStartDate)
        ) {
          hit = true;
        }
      });

      return hit;
    }
  };

  onDatesChange = ({ startDate, endDate }) => {
    //updates the start date and the end date in our redux state
    this.props.updateDatePickerDates({ startDate, endDate });
  };

  onFocusChange = focusedInput => {
    this.setState(() => ({ calenderFocused: focusedInput }));
  };

  renderContent() {
    return (
      <React.Fragment>
        <DateRangePicker
          startDate={this.props.datePickerDates.startDate}
          startDateId="your_unique_start_date_id"
          endDate={this.props.datePickerDates.endDate}
          endDateId="your_unique_end_date_id"
          isDayBlocked={this.isDayBlocked}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calenderFocused} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
          onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
          //openDirection={OPEN_UP}
          readOnly
          showClearDates
          // remember that the day argument here is a moment
        />
      </React.Fragment>
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = ({ blockedDates, datePickerDates }) => {
  return {
    blockedDates,
    datePickerDates
  };
};

export default connect(
  mapStateToProps,
  actions
)(CustomDatePicker);
