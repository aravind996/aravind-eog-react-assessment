import React from "react";
import {connect} from "react-redux";
import * as actions from "../store/actions";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {withStyles} from "@material-ui/core/styles";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const avatarStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});

const styles = {
  card: {
    margin: "5% 25%"
  },
  droneInfo: {
    margin: "20px 0"
  },
  infoItem: {
    width: "300px",
    display: "flex",
    margin: "auto"
  },
  heading: {
    width: "50%"
  }
};

class Dasboard extends React.Component {
  componentDidMount() {
    setInterval(() => this.props.onLoad(), 4000);
  }
  render() {
    const {classes, metrics} = this.props;
    const data = metrics.length ? metrics.find((o, i)=>i===metrics.length-1) : false;
    return (
      <Card className={classes.card}>
        <CardHeader title="Example Dashboard Visualization"/>
        <CardContent>
          {data ? <div className={classes.droneInfo}>
            <div className={classes.infoItem}>
              <span className={classes.heading}>Temperature</span>
              <span>{data.metric}</span>
            </div>
            <div className={classes.infoItem}>
              <span className={classes.heading}>Latitude</span>
              <span>{data.latitude}</span>
            </div>
            <div className={classes.infoItem}>
              <span className={classes.heading}>Longitude</span>
              <span>{data.longitude}</span>
            </div>
            <div className={classes.infoItem}>
              <span className={classes.heading}>Last Received</span>
              <span>{Math.round((new Date().getTime()-data.timestamp)/1000) + " seconds ago"}</span>
            </div>
          </div> : <h2>loading Metrics...</h2>}
        </CardContent>
      </Card>
    );
  }
};

const mapState = (state, ownProps) => {
  const {loading, metrics} = state.weather;
  return {loading, metrics};
};

const mapDispatch = dispatch => ({
  onLoad: () => dispatch({type: actions.FETCH_WEATHER, longitude: -95.3698, latitude: 29.7604})
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Dasboard));
