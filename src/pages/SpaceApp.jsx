import { Component } from 'react';
import { LandingList } from '../cmps/LandingList';
import { landingService } from '../services/landingService';
import { LandingFilter } from '../cmps/LandingFilter';

export class SpaceApp extends Component {
  state = {
    landings: null,
    filterBy: null,
    currPage: 1,
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

  nextPage = () => {
    const currPage = landingService.pageIncrease();
    this.setState({ currPage });
    this.loadLandings();
  };

  prevPage = () => {
    const currPage = landingService.pageDecrease();
    this.setState({ currPage });
    this.loadLandings();
  };

  render() {
    const { landings, currPage } = this.state;
    if (!landings) return <div>Loading...</div>;
    return (
      <div className='landing-app'>
        <LandingFilter onChangeFilter={this.onChangeFilter} />
        <button className='prev page-btn' onClick={this.prevPage}>
          <span>&#8249;</span>
        </button>
        <h2 className='curr-page'>{currPage}</h2>
        <button className='next page-btn' onClick={this.nextPage}>
          <span>&#8250;</span>
        </button>
        <LandingList landings={landings} />
      </div>
    );
  }
}

export default SpaceApp;
