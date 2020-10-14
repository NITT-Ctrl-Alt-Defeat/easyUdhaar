import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { dashboard } from './../../auth/api-dashboard';
import auth from './../../auth/auth-helper';

import {
  AmountLent,
  AmountBorrowed,
  TasksProgress,
  LendingHistory,
  TotalRewards,
  ActiveCampaigns,
  TotalCampaigns
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [myprops, setMyprops] = useState([]);
  const userSession = JSON.parse(auth.getJWT());
  const token = userSession.token;
  const role = userSession.user.role;

  useEffect(() => {
    dashboard(token).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setMyprops(data);
      }
    });
  }, []);
  
  let percent;
  let totalAmountExpected, totalAmountGet, campaignProgress, amountRepayed;
  if(myprops !== [])
    percent = (myprops.totalAmountRecived / myprops.totalAmountLend) * 100 ;
  
  if(myprops.returnObject) {
    totalAmountExpected = myprops.returnObject.totalAmountExpected;
    totalAmountGet = myprops.returnObject.totalAmountGet;
    campaignProgress = myprops.returnObject.campaignProgress;
    amountRepayed = myprops.returnObject.amountRepayed;
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        {
          !role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <AmountLent />
            </Grid>
          )
        }
        {
          !role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalCampaigns />
            </Grid>
          )
        }
        {
          role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <AmountBorrowed
                text="Credit Amount Expected"
                amount={totalAmountExpected}
              />
            </Grid>
          )
        }
        {
          role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <AmountBorrowed
                text="Credit Amount received"
              amount={totalAmountGet}
              />
            </Grid>
          )
        }
        {
          role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TasksProgress
              text="Your Campaign Progress"
              percent={Math.trunc(campaignProgress*100)}
               />
            </Grid>
          )
        }
        {
          role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <AmountBorrowed
                text="Amount Repaid"
                amount={amountRepayed}
              />
            </Grid>
          )
        }
        {
          !role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TasksProgress
              text="Percentage of Investment Returned"
              percent = {percent.toPrecision(2)}
               />
            </Grid>
          )
        }
        {
          !role && (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <TotalRewards />
            </Grid>
          )
        }
        {
          role && (
            <Grid
            item
            lg={12}
            md={12}
            xl={9}
            xs={12}
          >
            <ActiveCampaigns />
          </Grid>
          )
        }
        {
          !role && (
            <Grid
              item
              lg={12}
              md={12}
              xl={9}
              xs={12}
            >
              <LendingHistory />
            </Grid>
          )
        }
      </Grid>
    </div>
  );
};

export default Dashboard;