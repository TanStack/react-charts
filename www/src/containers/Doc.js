import React from 'react'
import { SiteData, RouteData, Head } from 'react-static'

//

import Sidebar from 'components/Sidebar'
import Markdown from 'components/Markdown'

const Doc = () => (
  <Sidebar>
    <SiteData
      render={({ repoName }) => (
        <RouteData
          render={({ editPath, markdown, title }) => (
            <React.Fragment>
              <Head>
                <title>{`${title} | ${repoName}`}</title>
              </Head>
              <Markdown source={markdown} />
              <div>
                <a href={editPath}>Edit this page on Github</a>
              </div>
            </React.Fragment>
          )}
        />
      )}
    />
  </Sidebar>
)

export default Doc
