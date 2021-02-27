import React , {useState,useEffect} from 'react'
import Typography from '@material-ui/core/Typography';

const Review = ({report}) => {


  return (
    <React.Fragment>
    <Typography variant="h5" gutterBottom>
      { !(report && report.error) ? `Your Report has been successfully submitted` : `Something went wrong`   } .
    </Typography>
    <Typography variant="subtitle1">
      {! (report && report.error)  ? `Notification number is ${report.data.kenmark}` : `Contact help` }
    </Typography>
  </React.Fragment>
  )
}

export default Review;