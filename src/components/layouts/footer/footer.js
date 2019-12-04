import React from 'react'
import { useStaticQuery, Link } from 'gatsby'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

import logo from '../../../img/DOI-2x.png'
import DownloadIcon from '-!svg-react-loader!../../../img/svg/icon-download-base.svg'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    backgroundColor: '#323c42',
    color: theme.palette.primary.contrastText
  },
  footerContainer: {
    '& p': {
      color: theme.palette.primary.contrastText
    }
  },
  footerLink: {
    color: theme.palette.common.white
  },
  footerImage: {
    maxWidth: '110px',
    width: '85%',
  },
  footerIcon: {
    fill: theme.palette.common.white
  },

}))

const Footer = props => {
  const classes = useStyles()

  const data = useStaticQuery(graphql`
    query SiteFooterQuery {
      site {
        siteMetadata {
          version
          dataRetrieval {
            name
            email
          }
          informationDataManagement {
            name
            city
            zip
            street
            email
          }
        }
      }
    }
  `)

  return (
    <footer className={`${classes.root} ${classes.footerContainer}`}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={1}>
            <a href="https://doi.gov"><img src={logo} className={classes.footerImage} alt="Department of the Interior logo" /></a>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>
              <Box mb={2}>
                Built in the open
              </Box>
              <Box mb={2}>
                This site (<Link to={`https://github.com/onrr/doi-extractives-data/releases/${data.site.siteMetadata.version}`} className={classes.footerLink}>{data.site.siteMetadata.version}</Link>) is powered by <Link className={classes.footerLink} to="/downloads" className={classes.footerLink}>open data</Link> and <Link className={classes.footerLink} to="https://github.com/ONRR/doi-extractives-data/">source code</Link>. We welcome contributions and comments on <Link className={classes.footerLink} to="https://github.com/ONRR/doi-extractives-data/issues/new">GitHub</Link>. We write about how we work on this site on <Link className={classes.footerLink} to="/blog" className={classes.footerLink}>our team's blog</Link>.
              </Box>
              <Box>
                <Link to="https://www.doi.gov/" className={classes.footerLink}>Department of the Interior</Link> | <Link to="https://www.doi.gov/privacy" className={classes.footerLink}>Privacy Policy</Link> | <Link to="https://www.doi.gov/foia" className={classes.footerLink}>FOIA</Link> | <Link to="https://www.usa.gov/" className={classes.footerLink}>USA.gov</Link>
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Typography>
                <Box mb={2}>
                  <Link to="/downloads/" className={classes.footerLink}>Download data <DownloadIcon className={classes.footerIcon} /></Link>
                </Box>
                <Divider variant="fullwidth" light="true" />
                <Box>
                  Office of Natural Resources Revenue, { data.site.siteMetadata.informationDataManagement.name }<br/>
                { data.site.siteMetadata.informationDataManagement.street }<br/>
                { data.site.siteMetadata.informationDataManagement.city } { data.site.siteMetadata.informationDataManagement.zip }<br/>
                <Link className={classes.footerLink} to={'mailto:' + data.site.siteMetadata.informationDataManagement.email}>{ data.site.siteMetadata.informationDataManagement.email }</Link>
                </Box>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  /** The version of the site release. */
  version: PropTypes.string.isRequired,
}
export default Footer