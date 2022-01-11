import { Component } from 'react';

export class LandingFilter extends Component {
  state = {
    name: '',
    success: '',
  };

  handleChange = ({ target }) => {
    const field = target.name;

    var value = target.type === 'number' ? +target.value : target.value;
    if (field === 'success') {
      value = target.value === 'true' ? false : true;
    }

    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state);
    });
  };

  render() {
    const { name, success } = this.state;
    return (
      <form className='landing-filter'>
        <section className='input-container'>
          <label htmlFor='name'>Name</label>
          <input
            onChange={this.handleChange}
            value={name}
            type='text'
            name='name'
            id='name'
          />
        </section>
        <section className='input-container'>
          <label htmlFor='success'>Success</label>
          <input
            onChange={this.handleChange}
            value={success}
            type='checkbox'
            name='success'
            id='success'
          />
        </section>
      </form>
    );
  }
}
