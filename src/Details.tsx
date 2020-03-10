import React, { lazy } from 'react';
import pet, { Photo } from '@frontendmasters/pet';
import { navigate, RouteComponentProps } from '@reach/router';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';

const Modal = lazy(() => import('./Modal'));

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    showModal: false,
    animal: '',
    breed: '',
    location: '',
    description: '',
    media: [] as Photo[],
    name: '',
    url: ''
  };

  componentDidMount() {
    if (!this.props.id) {
      navigate('/');
      return;
    }

    pet
      .animal(+this.props.id)
      .then(
        ({
          animal: { name, type, contact, description, photos, breeds, url }
        }) => {
          this.setState({
            url,
            name,
            animal: type,
            location: `${contact.address.city}, ${contact.address.state}`,
            description,
            media: photos,
            breed: breeds.primary,
            loading: false
          });
        }
      )
      .catch(err => this.setState({ error: err }));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => navigate(this.state.url);

  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal
    } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you liek to adpot {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No, I am a monster</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(
  props: RouteComponentProps<{ id: string }>
) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
