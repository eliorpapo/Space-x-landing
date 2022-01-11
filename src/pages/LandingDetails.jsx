import { Component } from 'react';
import { landingService } from '../services/landingService';

export class LandingDetails extends Component {
  state = {
    landing: null,
  };

  componentDidMount() {
    this.loadLanding();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.loadLanding();
    }
  }

  async loadLanding() {
    const landing = await landingService.getById(this.props.match.params.id);
    this.setState({ landing });
  }

  onGoBack = () => {
    this.props.history.push('/');
  };

  render() {
    const { landing } = this.state;
    if (!landing) return <div>Loading..</div>;
    return (
      <div className='landing-details'>
        <h1>{landing.name}</h1>
        <img className='landing-img' src={landing.links.patch.small} />
        <h3>Summery: {landing.details}</h3>
        {landing.failures.length > 0 && (
          <span>
            <h2>Failures:</h2>
          </span>
        )}
        {landing.failures.map((failure, index) => (
          <h3 key={index + 'f'}> {failure.reason}</h3>
        ))}

        {landing.failures.length === 0 && <h2>The launch was successful</h2>}
        <iframe
          src={'https://www.youtube.com/embed/' + landing.links.youtube_id}
        ></iframe>
        <h4>
          <a href={landing.links.wikipedia}>
            Learn more:{' '}
            <span className='wiki-link'>{landing.links.wikipedia}</span>
          </a>
        </h4>

        <button onClick={this.onGoBack}>Back</button>
      </div>
    );
  }
}
