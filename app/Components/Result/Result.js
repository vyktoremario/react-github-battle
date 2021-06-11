import React, { Component, Fragment, Profiler } from "react";
import { battle } from "../../utils/app";
import Card from "../Card/Card";
import PropTypes from "prop-types";
import Loading from "../Loading/Loading";
import Tooltip from "../ToolTip/ToolTip";
import queryString from 'query-string';
import { Link } from 'react-router-dom' 
import {
  FaUser,
  FaUsers,
  FaCompass,
  FaBriefcase,
  FaUserFriends,
  FaCode,
} from "react-icons/fa";

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's Location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}

      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}

ProfileList.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default class Results extends Component {
  state = {
    winner: null,
    looser: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search);
    battle([playerOne, playerTwo])
      .then((players) => {
        this.setState({
          winner: players[0],
          looser: players[1],
          error: null,
          loading: false,
        });
      })
      .catch(({ message }) => {
        this.setState({
          error: message,
          loading: false,
        });
      });
  }
  render() {
    const { winner, looser, error, loading } = this.state;

    if (loading == true) {
      return <Loading text="Battling" />;
    }

    if (error) {
      return <p className="center-text error">{error}</p>;
    }
    return (
      <Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === looser.score ? "Tie" : "Winner"}
            avatar={winner.profile.avatar_url}
            subheader={` Score: ${winner.score.toLocaleString()}`}
            href={winner.profile.html_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile} />
          </Card>

          <Card
            header={winner.score === looser.score ? "Tie" : "Looser"}
            avatar={looser.profile.avatar_url}
            subheader={` Score: ${looser.score.toLocaleString()}`}
            href={looser.profile.html_url}
            name={looser.profile.login}
          >
            <ProfileList profile={looser.profile} />
          </Card>
        </div>
        <Link className="btn dark-btn btn-space" to='/battle' >
          Reset
        </Link>
      </Fragment>
    );
  }
}
