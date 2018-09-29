import React from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { userProfile, appFeed, userNewPublication, userAddFriend } from "../../lib/lib";
import Publication from "../atoms/Publication";

export default class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publications: [],
      newPublicationContent: '',
      addFriendCid: ''
    }
  }

  newPublicationContentChange = ev => {
    this.setState({
      newPublicationContent: ev.target.value
    });
  }

  handleInputAddFriendChange = ev => {
    this.setState({
      addFriendCid: ev.target.value
    });
  }

  handleAddFriend = async () => {
    const friend = await userAddFriend(this.state.addFriendCid)
    this.setState({
      addFriendCid: ''
    });
  }

  handleNewPublication = async () => {
    console.log('handleNewPublication');
    const publication = await userNewPublication(this.state.newPublicationContent);
    console.log('publication: ', publication);
    if (this.state.publications) {
      this.setState(prevState => ({
        publications: [publication, ...prevState.publications]
      }));
    } else {
      this.setState({
        publications: [publication]
      });
    }
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
        <AddFriendContainer>
          <input placeholder="friend cid"
            onChange={this.handleInputAddFriendChange}
            value={this.state.addFriendCid} />
          <button onClick={this.handleAddFriend}>
            add fiend
          </button>
        </AddFriendContainer>
        <NewPublicationContainer>
          <p>new publication</p>

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

const AddFriendContainer = styled.div`

`;

const PublicationsContainer = styled.div`

`;

const NewPublicationContainer = styled.div`

`;