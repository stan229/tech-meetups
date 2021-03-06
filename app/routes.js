import React from 'react';
import { Route } from 'react-router';

import MeetupList from './view/meetup/MeetupList';
import MeetupDetail from './view/meetup/MeetupDetail';
import About from './view/About';
import Nav from './view/Nav';

export default (
  <Route component={Nav} path="/" >
    <Route component={MeetupList} path="/meetups" />
    <Route component={MeetupDetail} path="/meetup/:id" />
    <Route component={MeetupList} path="/geo/:coords" />
    <Route component={About} path="/about" />
  </Route>
);
