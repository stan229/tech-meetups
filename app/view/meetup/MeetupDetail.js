import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getMeetupById } from '../../actions/Meetup';
import './meetup.less';

let lastRoute = '';

@connect(state => ({
  meetup: state.meetup.single,
  isLoading: state.meetup.single.isLoading,
}))
export default class MeetupDetail extends Component {
  static propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    group_photo: PropTypes.object,
    organizer: PropTypes.object,
    params: PropTypes.object,
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object,
  };

  static defaultProps = {
    group_photo: {},
    organizer: {},
  };

  componentWillMount() {
    const { dispatch, params } = this.props;
    const { id } = params;
    const { pathname } = this.props.location;
    lastRoute = pathname;

    dispatch(getMeetupById(id));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, params } = nextProps;
    const { id } = params;
    const { pathname } = nextProps.location;

    if (lastRoute !== pathname) {
      lastRoute = pathname;
      dispatch(getMeetupById(id));
    } else {
      this.setState(nextProps.meetup);
    }
  }

  getGroupPhoto() {
    const { name, group_photo } = this.state;

    if (group_photo.thumb_link) {
      return (
        <figure>
          <img src={group_photo.thumb_link} alt={name}/>
        </figure>
      );
    }

    return '';
  }

  getLoadingIndicator() {
    const { isLoading } = this.props;

    return isLoading ? (
      <div className="main-content loading">
        <i className="ionicons ion-load-c"></i>
      </div>
    ) : null;
  }

  getContent() {
    const { name, link, description, organizer } = this.state;

    return (
      <article className="meetup main-content">
        <aside>
          <a href={link} target="_blank">
            <div className="meetup-name">
              {name}
            </div>
            {this.getGroupPhoto()}
          </a>
          <div className="meetup-organizer-name">{organizer.name}</div>
        </aside>
        <div className="meetup-description" dangerouslySetInnerHTML={{__html: description}}></div>
      </article>
    );
  }

  render() {
    const { isLoading } = this.props;

    return isLoading ? this.getLoadingIndicator() : this.getContent();
  }

  state = {
    group_photo: {},
    organizer: {},
  }
}
