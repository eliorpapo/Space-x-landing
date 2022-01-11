import { Component } from 'react';
import { LandingList } from '../cmps/LandingList';
import { landingService } from '../services/landingService';
import { LandingFilter } from '../cmps/LandingFilter';

export class SpaceApp extends Component {
  state = {
    landings: null,
    filterBy: null,
  };

  async componentDidMount() {
    this.loadLandings();
  }

  async loadLandings() {
    const { filterBy } = this.state;
    const landings = await landingService.query(filterBy);
    this.setState({ landings });
  }

  onChangeFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadLandings);
  };

  render() {
    const { landings } = this.state;
    if (!landings) return <div>Loading...</div>;
    return (
      <div className='landing-app'>
        <LandingFilter onChangeFilter={this.onChangeFilter} />
        <LandingList landings={landings} />
      </div>
    );
  }
}

export default SpaceApp;
