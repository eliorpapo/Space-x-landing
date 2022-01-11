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
        <h1 className='landing-title'>{landing.name}</h1>
        <img className='landing-img' src={landing.links.patch.small} />
        <h3 className='landing-summery'>
          <span className='underline'>Summery:</span> {landing.details}
        </h3>
        {landing.failures.length > 0 && (
          <h2 className='landing-status-fail'>Failures:</h2>
        )}
        {landing.failures.map((failure, index) => (
          <h3 key={index + 'f'}> {failure.reason}</h3>
        ))}

        {landing.failures.length === 0 && (
          <h2 className='landing-status'>The launch was successful</h2>
        )}
        <iframe
          className='landing-video'
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
