import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { ExploreCard } from './components';
import { explore } from './../../auth/api-explore';
import auth from './../../auth/auth-helper';

const useStyles = makeStyles(theme => ({
  root: {
        width:"500px"
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  payText: {
    paddingTop: "10px",
    paddingLeft: "55px",
    maxWidth: "200px",
    justifyContent: "center",
    alignItems: "center"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  horiz : {
    display: 'flex',
    flexDirection: 'row',
    padding: 0, 
  },
  card : {
    padding:"10px"
  }
}));

const ExploreCampaigns = () => {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);
  const [myprops, setMyprops] = useState([]);
  const userSession = JSON.parse(auth.getJWT());
  const token = userSession.token;

  // console.log(myprops);
  
  useEffect(() => {
    explore(token).then((data) => {
      if (data && data.error) {
          myprops = data[0];
      } else {
        setMyprops(data);
      }
    });
  }, []);
// console.log("myprops", myprops)
  return (
    <div className={classes.root}>
      <div style={{ padding: '20px' }}>
        <Typography variant="h1">Explore Active Campaigns</Typography>
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"></ListSubheader>
        }
        className={classes.root}>
        <div className={classes.horiz}>
          {myprops.map((currDetail, index) => (
            <div>
              {
                <ExploreCard
                  borrowerName= {currDetail.borrowerName}
                  amountInital={currDetail.amountInital}
                  amountReq={currDetail.amountReq}
                  campaignId={currDetail.campaignId}
                  campaignProgress={currDetail.campaignProgress}
                  campaignType={currDetail.campaignType}
                  index = {index}
                  creditScore={currDetail.creditScore}></ExploreCard>
              }
            </div>
          ))}
        </div>
      </List>
    </div>
  );
};

export default ExploreCampaigns;
