import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

// import 
import {
  // Card,
  // CardContent,
  // // Grid,
  // Typography,
  // Avatar,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
            width:"500px"
    },
    list :{
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



const ExploreCard = (props) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const uri = "/farmer.jpg";
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    const borrowerName = props.borrowerName;
    const amountInital= props.amountInital
    const amountReq= props.amountReq
    // const borrowerName= props.borrowerName;
    const campaignId= props.campaignId
    const campaignProgress= Math.trunc(props.campaignProgress*100)
    const campaignType= props.campaignType
    const creditScore= props.creditScore; 
    const date= props.date;
    const title = props.title;
    
    const descriptions = [
      'to buy compost and fertilizers for maintaining five plots of coffee for harvest. As a result, she will be able to obtain better crop output.',
      'Seeking a loan to purchase another quality breed of dairy cow that will help in producing milk and manure to be used on her farm. Milk from the cow will be sold to the local market, and this will mean improved cash flow',
      'helps to buy taro roots and banana tube (seedlings), and chemicals, a backpack sprayer, and chainsaw.',
      'helps to buy fertilizers and potato seeds to cultivate it in the new season.',
      'helps to buy seeds, fertiliser and pesticide in order to grow corn.',
      'helps a woman-owned business overcome the challenges posed by the COVID-19 crisis.',
      'helps to pay his educational fees at the university.',
    ];
    const desc = props.index%descriptions.length;
    return (
      <div className={classes.card}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {borrowerName[0]}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={borrowerName}
            subheader={date} //"June 14, 2020"
          />
          {/* <CardMedia
            className={classes.media}
            component="img"
            image='/client/assets/images/farmer.jpg'
            // title="Paella dish"
          /> */}
          {/* <img
            src={require('farmer.jpg')}></img> */}
          <CardContent>
            <div style={{ paddingBottom: '10px' }}>
              <Typography variant="h6" component="p">
                {descriptions[desc]}
                {/* Bhola is a cotton farmer based in Gondia, Madhya Pradesh */}
              </Typography>
            </div>
            <div>
              <div style={{ paddingTop: '0px' }}>
                <Typography>
                  Amount required: {amountReq} of {amountInital}
                </Typography>
              </div>
              <div style={{ paddingTop: '0px' }}>
                <Typography>
                  Credit score of campaignee: {Math.trunc(creditScore)}
                </Typography>
              </div>
            </div>
            <div style={{ paddingTop: '2px' }}>
              <Typography>Campaign Progress: {campaignProgress}%</Typography>

              <LinearProgress
                className={classes.progress}
                value={campaignProgress}
                variant="determinate"
              />
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent className={classes.form}>
              {/* <div style={{ flexDirection: "row" }}> */}
              <Grid>
                <div className={classes.payText}>
                  <TextField />
                </div>
                <div className={classes.payText}>
                  <Button width="30px" variant="outlined">
                    Lend
                  </Button>
                </div>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
}
 
export default ExploreCard;