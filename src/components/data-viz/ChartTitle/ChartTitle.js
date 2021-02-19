import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  charTitle: {
    borderBottom: `1px solid ${ theme.palette.grey[700] }`,
    color: theme.palette.grey[800],
    fontSize: theme.typography.h4.fontSize,
    marginBottom: theme.spacing(2),
    marginTop: 0,
  }
}))
/**
 * This is to display and format a title for a chart.
 */
const ChartTitle = props => {
  const classes = useStyles()

  return (
    <Box className={classes.charTitle} component="h4">
      {props.children}
    </Box>
  )
}

export default ChartTitle

ChartTitle.Preview = {
  group: 'Data Visualizations',
  demos: [
    {
      title: 'Example',
      code: '<ChartTitle>This is the chart title</ChartTitle>',
    }
  ]
}
