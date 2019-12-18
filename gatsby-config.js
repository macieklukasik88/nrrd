const fetch = require("isomorphic-fetch");
const { createHttpLink } = require("apollo-link-http");

// Federalist provides the BASEURL env variable for preview builds.
// https://github.com/18F/federalist-garden-build#variables-exposed-during-builds
const BASEURL = process.env.BASEURL || undefined;

// Federalist provides the google_analytics env variable
const GOOGLE_ANALYTICS_ID = process.env.google_analytics
  ? process.env.google_analytics[process.env.BRANCH] ||
    process.env.google_analytics.default
  : "UA-33523145-1";

const config = {
  siteMetadata: {
    title: "Natural Resources Revenue Data",
    description:
      "This site provides open data about natural resource management on federal lands and waters in the United States, including oil, gas, coal, and other extractive industries.",
    version: "v5.4.7",
    googleAnalyticsId: GOOGLE_ANALYTICS_ID,
    author: "",
    dataRetrieval: {
      name: "Data Specialists",
      email: "onrrdatarequests@onrr.gov"
    },
    informationDataManagement: {
      name: "Information and Data Management",
      street: "1849 C Street NW MS 5134",
      city: "Washington, D.C.",
      zip: "20240",
      email: "nrrd@onrr.gov"
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(
          `${__dirname}/src/components/layouts/DefaultLayout`
        )
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // }
      }
    },
    `gatsby-theme-apollo`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/markdown/`
      }
    },

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/img`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/img/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `hasura`,
        fieldName: `onrr`,
        createLink: () => {
          return createHttpLink({
            uri: "https://hasura-onrr.app.cloud.gov/v1/graphql",
            headers: {},
            fetch,
            resolvers: {}
          });
        }
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: []
      }
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`],
        // How to resolve each field's value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields' values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tag || node.frontmatter.tags,
            path: node =>
              node.frontmatter.unique_id
                ? "/explore/" + node.frontmatter.unique_id + "/"
                : node.frontmatter.permalink
          }
        },
        // Optional filter to limit indexed nodes
        filter: (node, getNode) => node.frontmatter.tags !== "exempt"
      }
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,

    `gatsby-plugin-meta-redirect` // make sure to put last in the array
  ]
};

if (BASEURL) {
  config.pathPrefix = `${BASEURL}`;
}

module.exports = config;
