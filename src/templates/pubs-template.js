// @flow strict
import React, {useState} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import BibEntry from '../components/BibEntry';
import { useSiteMetadata } from '../hooks';
import _ from 'lodash';


const PubsTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  let files = [];
  for (const foo of data.allFile.edges)
  {
    files[foo.node.name] = foo.node;
  }

  let pubs = data.allReference.edges.map(edge => edge.node);
  let years = _.groupBy(pubs, pub => pub.year);

  return (
    <Layout >
      <Sidebar />
      <Page title="Publications">
        { Object.keys(years).reverse().map( year =>
          (<div><h2>{year}</h2>
            <ul>
              {years[year].map(node => 
                (
                  <li key={node.key}>
                    <BibEntry {...node} hasPdf={(node.key in files)} pdf={ (node.key in files) ? files[node.key].publicURL : "none"}  />
                  </li>
                ))}
            </ul>
          </div>))
        }
      </Page>
    </Layout>
  );
};



export const query = graphql`
query PubQuery {
  allReference(sort: {fields: year, order: DESC}) {
    edges {
      node {
        authors
        editor
        year
        title
        award
        booktitle
        journal
        entry_type
        key
        raw
      }
    }
  }
  allFile (filter: {extension: {eq: "pdf"}}) {
    edges {
      node {
        id
        name
        publicURL
        relativePath
      }
    }
  }
}
`;

export default PubsTemplate;
