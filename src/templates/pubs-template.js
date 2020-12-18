// @flow strict
import React, {useState} from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import BibEntry from '../components/BibEntry';
import { useSiteMetadata } from '../hooks';


const PubsTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  let files = [];
  for (const foo of data.allFile.edges)
  {
    files[foo.node.name] = foo.node;
  }

  return (
    <Layout >
      <Sidebar />
      <Page title="Publications">
        <ul>
            {data.allReference.edges.map( ({ node, }) => 
              (<li>
                <BibEntry {...node} hasPdf={(node.key in files)} />
              </li>)
            )}
        </ul>
      </Page>
    </Layout>
  );
};

/*
{data.allReference.edges.map(( {node} ) => (
              <li key={node.key}>
                <span  >{node.authors.join(", ")}. </span>
                <span style={{fontWeight: 'bold'}}> {node.title}. </span>                
                In <span style={{fontStyle: 'italic'}} >{node.booktitle || node.journal || "UNKNOWN"},</span>
                <span> {node.year}.</span> 
                {(node.key in files ? <span> [<a href={'/pubs/' + node.key + '.pdf'}>pdf</a>] </span> : <span> no pdf </span>)} 
              </li>
            ))}
*/

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
