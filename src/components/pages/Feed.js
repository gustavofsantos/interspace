import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { userProfile, appFeed, userNewPublication } from "../../lib/lib";
import Publication from "../atoms/Publication";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: [],
      newPublicationTitle: '',
      newPublicationContent: ''
    }
  }

  newPublicationTitleChange = ev => {
    this.setState({
      newPublicationTitle: ev.target.value
    });
  }

  newPublicationContentChange = ev => {
    this.setState({
      newPublicationContent: ev.target.value
    });
  }

  handleNewPublication = async () => {
    console.log('handleNewPublication');
    const publication = await userNewPublication(this.state.newPublicationTitle, this.state.newPublicationContent);
    console.log('publication: ', publication);
    this.setState(prevState => ({
      publications: [publication, ...prevState.publications]
    }));
  }

  componentDidMount() {
    const publications = appFeed();
    this.setState({
      publications
    });
  }

  render() {

    if (!userProfile()) {
      return <Redirect to="/createuser" />
    }

    return (
      <FeedContainer>
        <NewPublicationContainer>
          <p>new publication</p>
          <input
            placeholder="title"
            value={this.state.newPublicationTitle}
            onChange={this.newPublicationTitleChange} />

          <input
            placeholder="content"
            value={this.state.newPublicationContent}
            onChange={this.newPublicationContentChange} />

          <button onClick={this.handleNewPublication}>
            publish
          </button>
        </NewPublicationContainer>
        <PublicationsContainer>
          {
            this.state.publications.map((publication, key) => (
              <Publication
                title={publication.title}
                content={publication.content}
                date={publication.date}
                hash={publication.hash}
                author={publication.author}
                key={key}/>
            ))
          }
        </PublicationsContainer>
      </FeedContainer>
    );
  }
}

const FeedContainer = styled.div`
  padding: 12px;
`;

const PublicationsContainer = styled.div`

`;

const NewPublicationContainer = styled.div`

`;